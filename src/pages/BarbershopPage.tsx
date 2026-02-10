import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MessageCircle } from "lucide-react";

import barbershopInterior from "@/assets/barbershop-interior.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import barberLiav from "@/assets/barber-liav.jpg";
import barberNehoray from "@/assets/barber-nehoray.jpg";
import barberYali from "@/assets/barber-yali.jpg";

const BarbershopPage = () => {
  const barbers = [
    { nameHe: "ליאב", nameEn: "LIAV", image: barberLiav, prices: [70, 80, 70, 100] },
    { nameHe: "נהוראי", nameEn: "NEHORAY", image: barberNehoray, prices: [70, 90, 80, 100] },
    { nameHe: "יהלי", nameEn: "YALI", image: barberYali, prices: [100, 120, 100, 130] },
  ];

  const services = [
    { name: "תספורת גבר בלבד" },
    { name: "תספורת גבר וזקן" },
    { name: "תספורת חייל בסדיר", note: "(נוער עד גיל 18)" },
    { name: "תספורת MAKEOVER" },
  ];

  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "מספרת גברים" }]} />

      <HeroSplit
        title="מספרת גברים"
        subtitle="✂️ תספורות ברמה אחרת"
        description="חוויית ספרות מקצועית עם יחס אישי. הספרים שלנו מתמחים בכל סגנונות התספורות - מקלאסי ועד מודרני. 💈"
        primaryCta={{ label: "📲 לקביעת תור", href: "https://calmark.io/p/ZBfbx" }}
        image={barbershopInterior}
      />

      <Section title="💰 מחירון" variant="light" isFirstSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            {/* Barber headers */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {barbers.map((barber, i) => (
                <div key={i} className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-accent">
                    <img src={barber.image} alt={barber.nameHe} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-lg">{barber.nameHe}</h3>
                  <p className="text-sm opacity-60 font-semibold tracking-wider">{barber.nameEn}</p>
                </div>
              ))}
            </div>

            {/* Price rows */}
            <div className="divide-y divide-border/30">
              {services.map((service, sIdx) => (
                <div key={sIdx} className="py-4">
                  <p className="text-center font-bold text-lg mb-3">
                    {service.name}
                    {service.note && <span className="text-sm font-normal opacity-60 mr-2">{service.note}</span>}
                  </p>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    {barbers.map((barber, bIdx) => (
                      <span key={bIdx} className="text-2xl font-black">₪{barber.prices[sIdx]}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* גלריה */}
      <Section title="📸 מהעבודות שלנו" variant="dark">
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
            <h2 className="mb-4">🤝 ספר שרוצה להצטרף לצוות?</h2>
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
        title="💇‍♂️ מוכנים לתספורת חדשה?"
        description="✂️ קבעו תור עכשיו"
        buttonLabel="📲 קבעו תור בוואטסאפ"
        buttonHref="https://calmark.io/p/ZBfbx"
        variant="light"
      />
    </Layout>
  );
};

export default BarbershopPage;
