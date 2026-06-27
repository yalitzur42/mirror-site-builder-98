import { useEffect, useMemo, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { Warp } from "@paper-design/shaders-react";
import { MessageCircle, Users } from "@/lib/icons";

interface AcademyCarouselsProps {
  v: (sectionKey: string, fieldKey: string, fallback?: string) => string;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const Dots = ({ api }: { api: CarouselApi | undefined }) => {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
  }, [api]);

  if (count <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => api?.scrollTo(i)}
          aria-label={`עבור לשקופית ${i + 1}`}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === selected ? "w-8 bg-secondary" : "w-2 bg-secondary/40 hover:bg-secondary/70"
          }`}
        />
      ))}
    </div>
  );
};

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[260px]">
    <div className="relative rounded-[2.5rem] bg-neutral-900 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
      <span className="absolute -right-[3px] top-20 h-12 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-r bg-neutral-700" />
      <span className="absolute -left-[3px] top-28 h-14 w-[3px] rounded-r bg-neutral-700" />
      <div className="relative overflow-hidden rounded-[2rem] bg-black aspect-[9/19]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-6 w-24 rounded-full bg-black" />
        {children}
      </div>
    </div>
  </div>
);

const arrowClass =
  "border-2 border-secondary bg-secondary/10 text-secondary hover:bg-secondary hover:text-primary w-10 h-10 backdrop-blur-sm";

const VIDEO_PLAY_EVENT = "academy-video-play";

const VideoWithSound = ({ src }: { src: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const idRef = useRef<string>(Math.random().toString(36).slice(2));
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === idRef.current) return;
      const el = ref.current;
      if (!el) return;
      el.pause();
      el.muted = true;
      setActivated(false);
    };
    window.addEventListener(VIDEO_PLAY_EVENT, handler);
    return () => window.removeEventListener(VIDEO_PLAY_EVENT, handler);
  }, []);

  const handlePlay = () => {
    const el = ref.current;
    if (!el) return;
    window.dispatchEvent(new CustomEvent(VIDEO_PLAY_EVENT, { detail: idRef.current }));
    el.muted = false;
    el.currentTime = 0;
    el.volume = 1;
    el.play().then(() => setActivated(true)).catch(() => setActivated(true));
  };

  const handlePause = () => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.muted = true;
    setActivated(false);
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={ref}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      {activated ? (
        <button
          type="button"
          onClick={handlePause}
          aria-label="עצור סרטון"
          className="absolute inset-0 z-20 flex items-end justify-center bg-transparent pb-6 transition-colors hover:bg-black/20 group"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary shadow-[0_8px_24px_rgba(0,0,0,0.55)] ring-2 ring-primary/70 transition-transform group-hover:scale-105">
            <span className="h-5 w-1.5 rounded-sm bg-primary" />
            <span className="mr-1.5 h-5 w-1.5 rounded-sm bg-primary" />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="הפעל סרטון עם סאונד"
          className="absolute inset-0 z-20 flex items-end justify-center bg-gradient-to-t from-black/85 via-black/25 to-transparent pb-6 transition-colors hover:from-black/90 group"
        >
          <span className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full bg-secondary shadow-[0_10px_35px_rgba(0,0,0,0.75)] ring-4 ring-primary/80 transition-transform group-hover:scale-110">
            <span className="absolute inset-0 rounded-full bg-secondary/35 animate-ping" />
            <span
              aria-hidden="true"
              className="relative mr-1 h-0 w-0 border-y-[15px] border-r-0 border-l-[26px] border-y-transparent"
              style={{ borderLeftColor: "hsl(var(--primary))" }}
            />
          </span>
        </button>
      )}
      )}
    </div>
  );
};



const AcademyCarousels = ({ v }: AcademyCarouselsProps) => {
  const whatsappImages: string[] = useMemo(() => {
    try { return JSON.parse(v("whatsapp_reviews", "images", "[]")); } catch { return []; }
  }, [v]);

  const studentImages: string[] = useMemo(() => {
    try { return JSON.parse(v("student_photos", "images", "[]")); } catch { return []; }
  }, [v]);

  const [waMobileApi, setWaMobileApi] = useState<CarouselApi>();
  const [waDesktopApi, setWaDesktopApi] = useState<CarouselApi>();
  const [stApi, setStApi] = useState<CarouselApi>();

  const hasWhatsapp = whatsappImages.length > 0;
  const hasStudents = studentImages.length > 0;

  if (!hasWhatsapp && !hasStudents) return null;

  const whatsappPairs = chunk(whatsappImages, 2);

  return (
    <div
      dir="rtl"
      className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-secondary/20"
      style={{ backgroundColor: "#3d2310" }}
    >
      <Warp
        colors={["#3d2310", "#5a351a", "#4B2E1A", "#2a1a0d", "#6b4226"]}
        speed={3.5}
        scale={1.5}
        distortion={0.6}
        swirl={0.3}
        swirlIterations={6}
        softness={0.7}
        shape="edge"
        shapeScale={0.5}
        proportion={0.5}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(135deg, rgba(42,26,13,0.45) 0%, rgba(42,26,13,0.2) 50%, rgba(42,26,13,0.45) 100%)" }}
      />

      <div className="relative z-10 p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* WhatsApp Reviews */}
          {hasWhatsapp && (
            <div className="space-y-5 order-2 md:order-1">
              <h3
                className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2"
                style={{ color: "hsl(var(--secondary))" }}
              >
                <MessageCircle className="w-5 h-5" />
                {v("whatsapp_reviews", "title", "מה אומרים עלינו בוואטסאפ")}
              </h3>

              {/* MOBILE: 1 per slide */}
              <div className="md:hidden relative px-12">
                <Carousel opts={{ loop: true, direction: "rtl" }} setApi={setWaMobileApi} className="w-full">
                  <CarouselContent>
                    {whatsappImages.map((url, i) => (
                      <CarouselItem key={i}>
                        <div className="rounded-2xl overflow-hidden shadow-xl mx-auto max-w-[320px]">
                          <img src={url} alt={`ביקורת ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className={`${arrowClass} -left-1`} />
                  <CarouselNext className={`${arrowClass} -right-1`} />
                </Carousel>
                <Dots api={waMobileApi} />
              </div>

              {/* DESKTOP: 2 stacked per slide */}
              <div className="hidden md:block relative px-12">
                <Carousel opts={{ loop: true, direction: "rtl" }} setApi={setWaDesktopApi} className="w-full">
                  <CarouselContent>
                    {whatsappPairs.map((pair, i) => (
                      <CarouselItem key={i}>
                        <div className="flex flex-col gap-4 items-center">
                          {pair.map((url, j) => (
                            <div
                              key={j}
                              className="rounded-2xl overflow-hidden shadow-xl w-full max-w-[300px]"
                            >
                              <img
                                src={url}
                                alt={`ביקורת ${i * 2 + j + 1}`}
                                className="w-full h-auto object-contain"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className={`${arrowClass} -left-1`} />
                  <CarouselNext className={`${arrowClass} -right-1`} />
                </Carousel>
                <Dots api={waDesktopApi} />
              </div>
            </div>
          )}

          {/* Student Photos / Videos */}
          {hasStudents && (
            <div className="space-y-5 order-1 md:order-2">
              <h3
                className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2"
                style={{ color: "hsl(var(--secondary))" }}
              >
                <Users className="w-5 h-5" />
                {v("student_photos", "title", "התלמידים שלנו בפעולה")}
              </h3>
              <div className="relative px-12">
                <Carousel opts={{ loop: true, direction: "rtl" }} setApi={setStApi} className="w-full">
                  <CarouselContent>
                    {studentImages.map((url, i) => {
                      const isVideo = /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url) || url.includes("/site-videos/");
                      return (
                        <CarouselItem key={i}>
                          {isVideo ? (
                            <PhoneFrame>
                              <VideoWithSound src={url} />
                            </PhoneFrame>
                          ) : (
                            <div className="rounded-2xl overflow-hidden shadow-xl mx-auto max-w-[320px]">
                              <img src={url} alt={`תלמיד ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                            </div>
                          )}
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className={`${arrowClass} -left-1`} />
                  <CarouselNext className={`${arrowClass} -right-1`} />
                </Carousel>
                <Dots api={stApi} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademyCarousels;
