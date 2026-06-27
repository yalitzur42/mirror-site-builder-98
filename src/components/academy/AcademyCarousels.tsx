import { useEffect, useMemo, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
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
            i === selected
              ? "w-7 bg-primary-foreground"
              : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"
          }`}
        />
      ))}
    </div>
  );
};

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[260px]">
    <div className="relative rounded-[2.5rem] bg-neutral-900 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
      {/* side buttons */}
      <span className="absolute -right-[3px] top-20 h-12 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-r bg-neutral-700" />
      <span className="absolute -left-[3px] top-28 h-14 w-[3px] rounded-r bg-neutral-700" />
      <div className="relative overflow-hidden rounded-[2rem] bg-black aspect-[9/19]">
        {/* notch */}
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

  const [waApi, setWaApi] = useState<CarouselApi>();
  const [stApi, setStApi] = useState<CarouselApi>();

  const hasWhatsapp = whatsappImages.length > 0;
  const hasStudents = studentImages.length > 0;

  if (!hasWhatsapp && !hasStudents) return null;

  // Desktop: pair whatsapp images, stacked vertically (one below the other)
  const whatsappPairs = chunk(whatsappImages, 2);

  return (
    <div
      dir="rtl"
      className="relative max-w-6xl mx-auto rounded-3xl bg-background text-foreground border border-primary-foreground/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] p-6 md:p-10"
    >
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* WhatsApp Reviews - 1 per slide on mobile, 2 stacked on desktop */}
        {hasWhatsapp && (
          <div className="space-y-5 order-2 md:order-1">
            <h3 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {v("whatsapp_reviews", "title", "מה אומרים עלינו בוואטסאפ")}
            </h3>

            {/* MOBILE: 1 at a time */}
            <div className="md:hidden">
              <Carousel opts={{ loop: true, direction: "rtl" }} setApi={setWaApi} className="w-full">
                <CarouselContent>
                  {whatsappImages.map((url, i) => (
                    <CarouselItem key={i}>
                      <div className="rounded-2xl overflow-hidden border-2 border-primary-foreground/20 shadow-md mx-auto max-w-[320px]">
                        <img src={url} alt={`ביקורת וואטסאפ ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <Dots api={waApi} />
            </div>

            {/* DESKTOP: 2 stacked per slide */}
            <div className="hidden md:block">
              <DesktopWhatsapp pairs={whatsappPairs} />
            </div>
          </div>
        )}

        {/* Student Photos / Videos - phone mockup for video */}
        {hasStudents && (
          <div className="space-y-5 order-1 md:order-2">
            <h3 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2">
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
                          <div className="rounded-2xl overflow-hidden border-2 border-primary-foreground/20 shadow-md mx-auto max-w-[320px] bg-black/5">
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
  );
};

const DesktopWhatsapp = ({ pairs }: { pairs: string[][] }) => {
  const [api, setApi] = useState<CarouselApi>();
  return (
    <div>
      <Carousel opts={{ loop: true, direction: "rtl" }} setApi={setApi} className="w-full">
        <CarouselContent>
          {pairs.map((pair, i) => (
            <CarouselItem key={i}>
              <div className="flex flex-col gap-4 items-center">
                {pair.map((url, j) => (
                  <div
                    key={j}
                    className="rounded-2xl overflow-hidden border-2 border-primary-foreground/20 shadow-md w-full max-w-[300px]"
                  >
                    <img src={url} alt={`ביקורת ${i * 2 + j + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Dots api={api} />
    </div>
  );
};

export default AcademyCarousels;
