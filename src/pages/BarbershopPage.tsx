import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Scissors, MessageCircle } from "lucide-react";

import barbershopInterior from "@/assets/barbershop-interior.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const BarbershopPage = () => {
  const priceList = [
    { name: "תספורת גברים", price: "₪80", desc: "כולל שטיפה ועיצוב" },
    { name: "תספורת + זקן", price: "₪120", desc: "חבילה מושלמת לטיפוח מלא" },
    { name: "עיצוב זקן", price: "₪50", desc: "עיצוב מדויק ומקצועי" },
    { name: "גילוח קלאסי", price: "₪70", desc: "חוויית גילוח מסורתית" },
    { name: "תספורת ילדים", price: "₪60", desc: "עד גיל 12" },
    { name: "צביעת שיער", price: "₪150", desc: "צבע מקצועי + תספורת" },
  ];

  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "מספרת גברים" }]} />

      <HeroSplit
        title="מספרת גברים"
        subtitle="תספורות ברמה אחרת"
        description="חוויית ספרות מקצועית עם יחס אישי. הספרים שלנו מתמחים בכל סגנונות התספורות - מקלאסי ועד מודרני."
        primaryCta={{ label: "📲 לקביעת תור", href: "https://wa.me/972544744031?text=היי, אשמח לקבוע תור למספרה" }}
        image={barbershopInterior}
      />

      {/* מחירון */}
      <Section title="מחירון" variant="light" isFirstSection>
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="divide-y divide-border/30">
              {priceList.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-5 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center shrink-0">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-sm opacity-60">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-black whitespace-nowrap">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* גלריה */}
      <Section title="מהעבודות שלנו" variant="dark">
        <AnimatedSection>
          <GalleryGrid images={galleryImages} />
        </AnimatedSection>
      </Section>

      {/* מספרים */}
      <Section variant="light">
        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">15+</div>
              <p className="opacity-70">שנות ניסיון</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">10K+</div>
              <p className="opacity-70">לקוחות מרוצים</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">5★</div>
              <p className="opacity-70">דירוג ממוצע</p>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* הצטרפות לצוות */}
      <Section variant="dark">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">ספר שרוצה להצטרף לצוות?</h2>
            <p className="text-lg opacity-80 mb-8">
              אנחנו תמיד מחפשים ספרים מוכשרים שרוצים להתפתח ולעבוד בסביבה מקצועית ותומכת. אם אתה חושב שאתה מתאים – דבר איתנו.
            </p>
            <a
              href="https://wa.me/972544744031?text=היי, אני ספר ומעוניין להצטרף לצוות Macho"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-cta"
            >
              <MessageCircle className="w-5 h-5" />
              דברו איתנו בוואטסאפ
            </a>
          </div>
        </AnimatedSection>
      </Section>

      <CTASection
        title="מוכנים לתספורת חדשה?"
        description="קבעו תור עכשיו"
        buttonLabel="📲 קבעו תור בוואטסאפ"
        buttonHref="https://wa.me/972544744031?text=היי, אשמח לקבוע תור"
        variant="light"
      />
    </Layout>
  );
};

export default BarbershopPage;
