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
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* WhatsApp Reviews Carousel - 1 image at a time */}
      {hasWhatsapp && (
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {v("whatsapp_reviews", "title", "מה אומרים עלינו בוואטסאפ")}
          </h3>
          <div className="px-10">
            <Carousel opts={{ loop: true, direction: "rtl" }} className="w-full">
              <CarouselContent>
                {whatsappImages.map((url, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-[9/16] max-h-[420px] mx-auto rounded-xl overflow-hidden border-2 border-primary-foreground">
                      <img src={url} alt={`ביקורת וואטסאפ ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-primary-foreground text-foreground -left-2" />
              <CarouselNext className="border-primary-foreground text-foreground -right-2" />
            </Carousel>
          </div>
        </div>
      )}

      {/* Student Photos Carousel - 2 images at a time */}
      {hasStudents && (
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2">
            <Users className="w-5 h-5" />
            {v("student_photos", "title", "התלמידים שלנו בפעולה")}
          </h3>
          <div className="px-10">
            <Carousel opts={{ loop: true, direction: "rtl" }} className="w-full">
              <CarouselContent className="-ml-3">
                {studentImages.map((url, i) => (
                  <CarouselItem key={i} className="basis-1/2 pl-3">
                    <div className="aspect-square rounded-xl overflow-hidden border-2 border-primary-foreground">
                      <img src={url} alt={`תלמיד ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-primary-foreground text-foreground -left-2" />
              <CarouselNext className="border-primary-foreground text-foreground -right-2" />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademyCarousels;
