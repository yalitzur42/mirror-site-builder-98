import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import CardsGrid from "@/components/ui/CardsGrid";
import FeatureGrid from "@/components/ui/FeatureGrid";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import { GraduationCap, Users, Award, Star, Clock, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Import images
import heroBarbershop from "@/assets/hero-barbershop.jpg";
import permHero from "@/assets/perm-hero.jpg";
import barbershopInterior from "@/assets/barbershop-interior.jpg";
import ownerPortrait from "@/assets/owner-portrait.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import serviceAcademy from "@/assets/service-academy.jpg";
import serviceHaircut from "@/assets/service-haircut.jpg";
import servicePerm from "@/assets/service-perm.jpg";

const HomePage = () => {
  const servicesCards = [
    { title: "לימודי ספרות גברים", href: "/academy", image: serviceAcademy },
    { title: "תספורות גברים", href: "/barbershop", image: serviceHaircut },
    { title: "פרם לגבר", href: "/perm", image: servicePerm },
  ];

  const academyFeatures = [
    { icon: GraduationCap, title: "הכשרה מקצועית", description: "תוכנית לימודים מקיפה" },
    { icon: Users, title: "קבוצות קטנות", description: "יחס אישי לכל תלמיד" },
    { icon: Award, title: "תעודה מוכרת", description: "הסמכה רשמית בסיום" },
    { icon: Star, title: "מרצים מובילים", description: "הטובים בתחום" },
  ];

  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSplit
        badge="אהלן גבר, ברוך הבא!"
        title="משפחת Macho"
        subtitle="מובילים את סצנת טיפוח השיער לגברים בישראל!"
        description="מאקדמיה ללימודי ספרות גברים, דרך מספרה ברמה אחרת ופרם מקצועי לגברים. אנחנו מאמינים ב'פרא מסודר' – לקבל את הפרא שיש בך ולנקות את המיותר."
        primaryCta={{ label: "לקביעת תור", href: "/contact" }}
        secondaryCta={{ label: "לאקדמיה", href: "/academy" }}
        image={heroBarbershop}
      />

      {/* What We Offer */}
      <Section title="מה תמצאו אצלנו?" variant="light">
        <CardsGrid items={servicesCards} columns={3} />
      </Section>

      {/* Academy Section */}
      <Section
        title="האקדמיה של המספרה"
        subtitle="הפוך את התשוקה שלך למקצוע. הצטרף לאקדמיה המובילה בישראל ללימודי ספרות גברים."
        variant="dark"
      >
        <FeatureGrid items={academyFeatures} columns={4} />
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/academy">לכל הקורסים</Link>
          </Button>
        </div>
      </Section>

      {/* Gallery */}
      <Section title="מהעבודות שלנו" variant="light">
        <GalleryGrid images={galleryImages} />
      </Section>

      {/* Perm Service */}
      <section className="py-16 md:py-24 section-dark">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img src={permHero} alt="פרם לגבר" className="rounded-lg w-full" />
            <div>
              <h2 className="mb-4">פרם לגבר</h2>
              <p className="text-muted-foreground text-lg mb-6">
                תלתלים מושלמים לגברים. טכנולוגיה מתקדמת, תוצאות מוכחות ושירות מקצועי.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>מוצרים איכותיים ובטוחים</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>תוצאות מהירות וארוכות טווח</span>
                </li>
                <li className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>התאמה אישית לסגנון שלך</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link to="/perm">למידע נוסף</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* SEO Content Section */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">המספרה – יותר מסתם מספרה</h2>
            <div className="space-y-4 opacity-80">
              <p>
                המספרה נוסדה מתוך אהבה אמיתית למקצוע הספרות ורצון להעלות את רמת השירות לגברים בישראל. אנחנו מאמינים שכל
                גבר מגיע ליחס אישי, מקצועי ואיכותי.
              </p>
              <p>
                הצוות שלנו עובר הכשרות מתמידות ומעודכן בטרנדים האחרונים מכל העולם. אנחנו גאים להביא את הטוב ביותר
                ללקוחות שלנו.
              </p>
              <p>בין אם אתה מחפש תספורת קלאסית, עיצוב זקן מדויק או פרם מושלם – במספרה תמצא את הכל תחת קורת גג אחת.</p>
            </div>
            <Button asChild className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/about">קרא עוד עלינו</Link>
            </Button>
          </div>
          <img src={barbershopInterior} alt="פנים המספרה" className="rounded-lg w-full" />
        </div>
      </Section>

      {/* Owner/Team Section */}
      <Section variant="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={ownerPortrait} alt="המייסד" className="max-w-md mx-auto rounded-lg w-full" />
          <div>
            <h2 className="mb-4">הכירו את הצוות</h2>
            <h3 className="text-xl font-semibold mb-4 opacity-80">ישראל ישראלי – מייסד המספרה</h3>
            <div className="space-y-4 opacity-70">
              <p>
                עם ניסיון של למעלה מ-15 שנה בתחום הספרות, ישראל הקים את המספרה מתוך חזון להביא שינוי אמיתי לעולם הטיפוח
                לגברים בישראל.
              </p>
              <p>בוגר קורסים מובילים בארץ ובעולם, ישראל משלב ידע מקצועי עמוק עם גישה אישית וחמה לכל לקוח.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        title="מוכנים להתחיל?"
        description="קבעו תור עכשיו וחוו את ההבדל"
        buttonLabel="לקביעת תור"
        buttonHref="/contact"
        variant="dark"
      />
    </Layout>
  );
};

export default HomePage;
