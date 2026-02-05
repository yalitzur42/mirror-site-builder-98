import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import { Scissors, Clock, Star, Award } from "lucide-react";

import barbershopInterior from "@/assets/barbershop-interior.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const BarbershopPage = () => {
  const services = [
    { icon: Scissors, title: "תספורת גברים", price: "₪80", description: "תספורת מקצועית כולל שטיפה ועיצוב" },
    { icon: Scissors, title: "תספורת + זקן", price: "₪120", description: "חבילה מושלמת לטיפוח מלא" },
    { icon: Scissors, title: "עיצוב זקן", price: "₪50", description: "עיצוב מדויק ומקצועי" },
    { icon: Scissors, title: "גילוח קלאסי", price: "₪70", description: "חוויית גילוח מסורתית" },
  ];

  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "מספרת גברים" }]} />
      
      <HeroSplit
        title="מספרת גברים"
        subtitle="תספורות ברמה אחרת"
        description="חוויית ספרות מקצועית עם יחס אישי. הספרים שלנו מתמחים בכל סגנונות התספורות - מקלאסי ועד מודרני."
        primaryCta={{ label: "לקביעת תור", href: "/contact" }}
        image={barbershopInterior}
      />

      <Section title="השירותים שלנו" variant="light">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-background text-foreground rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <service.icon className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
              <p className="text-sm mb-4 opacity-70">{service.description}</p>
              <p className="text-foreground text-2xl font-bold">{service.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="מהעבודות שלנו" variant="dark">
        <GalleryGrid images={galleryImages} />
      </Section>

      <Section variant="light">
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
      </Section>

      <CTASection
        title="מוכנים לתספורת חדשה?"
        description="קבעו תור עכשיו"
        buttonLabel="לקביעת תור"
        buttonHref="/contact"
        variant="dark"
      />
    </Layout>
  );
};

export default BarbershopPage;
