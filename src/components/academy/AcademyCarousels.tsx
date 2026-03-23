import { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { MessageCircle, Users } from "lucide-react";

interface AcademyCarouselsProps {
  v: (sectionKey: string, fieldKey: string, fallback?: string) => string;
}

const AcademyCarousels = ({ v }: AcademyCarouselsProps) => {
  const whatsappImages: string[] = useMemo(() => {
    try { return JSON.parse(v("whatsapp_reviews", "images", "[]")); } catch { return []; }
  }, [v]);

  const studentImages: string[] = useMemo(() => {
    try { return JSON.parse(v("student_photos", "images", "[]")); } catch { return []; }
  }, [v]);

  const hasWhatsapp = whatsappImages.length > 0;
  const hasStudents = studentImages.length > 0;

  if (!hasWhatsapp && !hasStudents) return null;

  return (
    <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-start" dir="rtl">
      {/* WhatsApp Reviews Carousel - RIGHT side (first in RTL) - 1 image at a time */}
      {hasWhatsapp && (
        <div className="space-y-5">
          <h3 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {v("whatsapp_reviews", "title", "מה אומרים עלינו בוואטסאפ")}
          </h3>
          <div className="relative px-12">
            <Carousel opts={{ loop: true, direction: "rtl" }} className="w-full">
              <CarouselContent>
                {whatsappImages.map((url, i) => (
                  <CarouselItem key={i}>
                    <div className="rounded-2xl overflow-hidden border-2 border-primary-foreground shadow-md mx-auto max-w-[320px]">
                      <img
                        src={url}
                        alt={`ביקורת וואטסאפ ${i + 1}`}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-2 border-primary bg-background text-primary hover:bg-background/80 -left-1 w-10 h-10" />
              <CarouselNext className="border-2 border-primary bg-background text-primary hover:bg-background/80 -right-1 w-10 h-10" />
            </Carousel>
          </div>
        </div>
      )}

      {/* Student Photos Carousel - LEFT side (second in RTL) - 2 images visible */}
      {hasStudents && (
        <div className="space-y-5">
          <h3 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2">
            <Users className="w-5 h-5" />
            {v("student_photos", "title", "התלמידים שלנו בפעולה")}
          </h3>
          <div className="relative px-12">
            <Carousel opts={{ loop: true, direction: "rtl" }} className="w-full">
              <CarouselContent>
                {studentImages.map((url, i) => (
                  <CarouselItem key={i}>
                    <div className="rounded-2xl overflow-hidden border-2 border-primary-foreground shadow-md mx-auto max-w-[320px]">
                      <img
                        src={url}
                        alt={`תלמיד ${i + 1}`}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-2 border-primary-foreground bg-primary-foreground text-background hover:bg-primary-foreground/80 -left-1 w-10 h-10" />
              <CarouselNext className="border-2 border-primary-foreground bg-primary-foreground text-background hover:bg-primary-foreground/80 -right-1 w-10 h-10" />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademyCarousels;
