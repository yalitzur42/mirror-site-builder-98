import { useEffect, useMemo, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { Warp } from "@paper-design/shaders-react";
import { MessageCircle, Users } from "@/lib/icons";

interface AcademyCarouselsProps {
  v: (sectionKey: string, fieldKey: string, fallback?: string) => string;
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
            i === selected
              ? "w-8 bg-secondary"
              : "w-2 bg-secondary/40 hover:bg-secondary/70"
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

  return (
    <div
      dir="rtl"
      className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-secondary/20"
      style={{ backgroundColor: "#3d2310" }}
    >
      {/* Brown 3D warp shader background */}
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
      {/* Dark overlay for content contrast */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(135deg, rgba(42,26,13,0.45) 0%, rgba(42,26,13,0.2) 50%, rgba(42,26,13,0.45) 100%)" }}
      />

      <div className="relative z-10 p-6 md:p-10 text-secondary">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* WhatsApp Reviews */}
          {hasWhatsapp && (
            <div className="space-y-5 order-2 md:order-1">
              <h3 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2 text-secondary">
                <MessageCircle className="w-5 h-5" />
                {v("whatsapp_reviews", "title", "מה אומרים עלינו בוואטסאפ")}
              </h3>

              {/* MOBILE: 1 per slide horizontal */}
              <div className="md:hidden">
                <Carousel opts={{ loop: true, direction: "rtl" }} setApi={setWaMobileApi} className="w-full">
                  <CarouselContent>
                    {whatsappImages.map((url, i) => (
                      <CarouselItem key={i}>
                        <div className="rounded-2xl overflow-hidden shadow-xl mx-auto max-w-[320px]">
                          <img src={url} alt={`ביקורת וואטסאפ ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <Dots api={waMobileApi} />
              </div>

              {/* DESKTOP: vertical carousel, 2 visible stacked one below the other */}
              <div className="hidden md:block">
                <Carousel
                  orientation="vertical"
                  opts={{ loop: true }}
                  setApi={setWaDesktopApi}
                  className="w-full"
                >
                  <CarouselContent className="h-[560px]">
                    {whatsappImages.map((url, i) => (
                      <CarouselItem key={i} className="basis-1/2">
                        <div className="h-full flex items-center justify-center">
                          <div className="rounded-2xl overflow-hidden shadow-xl w-full max-w-[300px] max-h-full">
                            <img src={url} alt={`ביקורת וואטסאפ ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <Dots api={waDesktopApi} />
              </div>
            </div>
          )}

          {/* Student Photos / Videos */}
          {hasStudents && (
            <div className="space-y-5 order-1 md:order-2">
              <h3 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2 text-secondary">
                <Users className="w-5 h-5" />
                {v("student_photos", "title", "התלמידים שלנו בפעולה")}
              </h3>
              <div className="relative">
                <Carousel opts={{ loop: true, direction: "rtl" }} setApi={setStApi} className="w-full">
                  <CarouselContent>
                    {studentImages.map((url, i) => {
                      const isVideo = /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url) || url.includes("/site-videos/");
                      return (
                        <CarouselItem key={i}>
                          {isVideo ? (
                            <PhoneFrame>
                              <video
                                src={url}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                              />
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
