import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import { Scissors, Clock, Star, Award } from "lucide-react";

const BarbershopPage = () => {
  const services = [
    { icon: Scissors, title: "תספורת גברים", price: "₪80", description: "תספורת מקצועית כולל שטיפה ועיצוב" },
    { icon: Scissors, title: "תספורת + זקן", price: "₪120", description: "חבילה מושלמת לטיפוח מלא" },
    { icon: Scissors, title: "עיצוב זקן", price: "₪50", description: "עיצוב מדויק ומקצועי" },
    { icon: Scissors, title: "גילוח קלאסי", price: "₪70", description: "חוויית גילוח מסורתית" },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "מספרת גברים" }]} />
      
      <HeroSplit
        title="מספרת גברים"
        subtitle="תספורות ברמה אחרת"
        description="חוויית ספרות מקצועית עם יחס אישי. הספרים שלנו מתמחים בכל סגנונות התספורות - מקלאסי ועד מודרני."
        primaryCta={{ label: "לקביעת תור", href: "/contact" }}
      />

      <Section title="השירותים שלנו">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-card rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <p className="text-accent text-2xl font-bold">{service.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="מהעבודות שלנו" className="bg-secondary">
        <GalleryGrid images={[]} />
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-black text-primary mb-2">15+</div>
            <p className="text-muted-foreground">שנות ניסיון</p>
          </div>
          <div>
            <div className="text-5xl font-black text-primary mb-2">10K+</div>
            <p className="text-muted-foreground">לקוחות מרוצים</p>
          </div>
          <div>
            <div className="text-5xl font-black text-primary mb-2">5★</div>
            <p className="text-muted-foreground">דירוג ממוצע</p>
          </div>
        </div>
      </Section>

      <CTASection
        title="מוכנים לתספורת חדשה?"
        description="קבעו תור עכשיו"
        buttonLabel="לקביעת תור"
        buttonHref="/contact"
        variant="gradient"
      />
    </Layout>
  );
};

export default BarbershopPage;
