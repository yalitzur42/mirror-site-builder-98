import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import CardsGrid from "@/components/ui/CardsGrid";
import FeatureGrid from "@/components/ui/FeatureGrid";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import StaggerChildren from "@/components/ui/StaggerChildren";
import { GraduationCap, Users, Award, Star, Clock, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Import images
import heroBarbershop from "@/assets/hero-barbershop.jpg";
import permHero from "@/assets/perm-hero.jpg";
import barbershopInterior from "@/assets/barbershop-interior.jpg";
import ownerPortrait from "@/assets/owner-portrait.jpg";
import teamIcon from "@/assets/team-icon.png";
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
        badge="👋 אהלן גבר, ברוך הבא!"
        title="משפחת Macho"
        subtitle="מובילים את סצנת טיפוח השיער לגברים בישראל!"
        description="מאקדמיה ללימודי ספרות גברים, דרך מספרה ברמה אחרת ופרם מקצועי לגברים. אנחנו מאמינים ב'פרא מסודר' – לקבל את הפרא שיש בך ולנקות את המיותר."
        primaryCta={{ label: "📲 לקביעת תור", href: "https://wa.me/972544744031?text=היי, אשמח לקבוע תור" }}
        secondaryCta={{ label: "🎓 לאקדמיה", href: "/academy" }}
        image={heroBarbershop}
      />

      {/* What We Offer */}
      <Section title="✨ מה תמצאו אצלנו?" variant="light" isFirstSection>
        <AnimatedSection>
          <CardsGrid items={servicesCards} columns={3} />
        </AnimatedSection>
      </Section>

      {/* Academy Section */}
      <Section
        title="🎓 האקדמיה של Macho"
        subtitle="הפוך את התשוקה שלך למקצוע. הצטרף לאקדמיה המובילה בישראל ללימודי ספרות גברים."
        variant="dark"
      >
        <AnimatedSection>
          <FeatureGrid items={academyFeatures} columns={4} />
        </AnimatedSection>
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/academy">📚 לכל הקורסים</Link>
          </Button>
        </AnimatedSection>
      </Section>

      {/* Gallery */}
      <Section title="📸 מהעבודות שלנו" variant="light">
        <AnimatedSection>
          <GalleryGrid images={galleryImages} />
        </AnimatedSection>
      </Section>

      {/* Perm Service */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right">
            <img src={permHero} alt="פרם לגבר" className="rounded-lg w-full" />
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.2}>
            <h2 className="mb-4">🔥 פרם לגבר</h2>
            <p className="text-muted-foreground text-lg mb-6">
              תלתלים מושלמים לגברים. טכנולוגיה מתקדמת, תוצאות מוכחות ושירות מקצועי.
            </p>
            <StaggerChildren className="space-y-3 mb-8" staggerDelay={0.1}>
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
            </StaggerChildren>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Button asChild size="lg">
                <Link to="/perm">למידע נוסף</Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </Section>

      {/* SEO Content Section */}
      <Section variant="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right">
            <h2 className="mb-6">💈 Macho – יותר מסתם מספרה</h2>
            <div className="space-y-4 opacity-80">
              <p>
                Macho נוסדה מתוך אהבה אמיתית למקצוע הספרות ורצון להעלות את רמת השירות לגברים בישראל. אנחנו מאמינים שכל
                גבר מגיע ליחס אישי, מקצועי ואיכותי.
              </p>
              <p>
                הצוות שלנו עובר הכשרות מתמידות ומעודכן בטרנדים האחרונים מכל העולם. אנחנו גאים להביא את הטוב ביותר
                ללקוחות שלנו.
              </p>
              <p>בין אם אתה מחפש תספורת קלאסית, עיצוב זקן מדויק או פרם מושלם – ב-Macho תמצא את הכל תחת קורת גג אחת.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Button asChild className="mt-6 bg-background text-foreground hover:bg-background/90">
                <Link to="/about">קרא עוד עלינו</Link>
              </Button>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.2}>
            <img src={barbershopInterior} alt="פנים Macho" className="rounded-lg w-full" />
          </AnimatedSection>
        </div>
      </Section>

      {/* Owner/Team Section */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right">
            <img src={ownerPortrait} alt="המייסד" className="max-w-md mx-auto rounded-lg w-full" />
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.2}>
            <img src={teamIcon} alt="" className="w-32 mb-4 object-contain" />
            <h2 className="mb-4">👥 הכירו את הצוות</h2>
            <h3 className="text-xl font-semibold mb-4 opacity-80">ישראל ישראלי – מייסד Macho</h3>
            <div className="space-y-4 opacity-70">
              <p>
                עם ניסיון של למעלה מ-15 שנה בתחום הספרות, ישראל הקים את Macho מתוך חזון להביא שינוי אמיתי לעולם הטיפוח
                לגברים בישראל.
              </p>
              <p>בוגר קורסים מובילים בארץ ובעולם, ישראל משלב ידע מקצועי עמוק עם גישה אישית וחמה לכל לקוח.</p>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* CTA */}
      <AnimatedSection>
        <CTASection
          title="🚀 מוכנים להתחיל?"
          description="✂️ קבעו תור עכשיו וחוו את ההבדל"
          buttonLabel="📲 קבעו תור בוואטסאפ"
          buttonHref="https://wa.me/972544744031?text=היי, אשמח לקבוע תור"
          variant="light"
        />
      </AnimatedSection>
    </Layout>
  );
};

export default HomePage;
