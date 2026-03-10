import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import CardsGrid from "@/components/ui/CardsGrid";
import FeatureGrid from "@/components/ui/FeatureGrid";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import StaggerChildren from "@/components/ui/StaggerChildren";
import SectionDivider from "@/components/ui/SectionDivider";
import { GraduationCap, Users, Award, Star, Clock, Shield, Heart, Sparkles, Flame, Camera, BookOpen, Rocket, Smartphone, Scissors, Hand } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { BOOKING_URL } from "@/lib/constants";

// Import images (fallbacks)
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
  const { v, loading } = useSiteContent("home");

  if (loading) return <Layout><PageSkeleton /></Layout>;

  const servicesCards = [
    { title: v("services", "card1_title", "לימודי ספרות גברים"), href: "/academy", image: v("services", "card1_image") || serviceAcademy },
    { title: v("services", "card2_title", "תספורות גברים"), href: "/barbershop", image: v("services", "card2_image") || serviceHaircut },
    { title: v("services", "card3_title", "פרם לגבר"), href: "/perm", image: v("services", "card3_image") || servicePerm },
  ];

  const academyFeatures = [
    { icon: GraduationCap, title: v("academy", "feature1_title", "הכשרה מקצועית"), description: v("academy", "feature1_desc", "תוכנית לימודים מקיפה") },
    { icon: Users, title: v("academy", "feature2_title", "קבוצות קטנות"), description: v("academy", "feature2_desc", "יחס אישי לכל תלמיד") },
    { icon: Award, title: v("academy", "feature3_title", "תעודה מוכרת"), description: v("academy", "feature3_desc", "הסמכה רשמית בסיום") },
    { icon: Star, title: v("academy", "feature4_title", "מרצים מובילים"), description: v("academy", "feature4_desc", "הטובים בתחום") },
  ];

  // Gallery: try dynamic, fall back to static
  const dynamicGallery = v("gallery", "images");
  let galleryImages: string[];
  try {
    const parsed = JSON.parse(dynamicGallery);
    galleryImages = Array.isArray(parsed) && parsed.length > 0 ? parsed : [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
  } catch {
    galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
  }

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSplit
        badge={<><Hand className="w-4 h-4 inline-block align-middle ml-1" /> {v("hero", "badge", "אהלן גבר, ברוך הבא!")}</>}
        title={v("hero", "title", "משפחת Macho")}
        subtitle={v("hero", "subtitle", "מובילים את סצנת טיפוח השיער לגברים בישראל!")}
        description={v("hero", "description", "מאקדמיה ללימודי ספרות גברים, דרך מספרה ברמה אחרת ופרם מקצועי לגברים. אנחנו מאמינים ב'פרא מסודר' – לקבל את הפרא שיש בך ולנקות את המיותר.")}
        primaryCta={{ label: <><Smartphone className="w-4 h-4" /> לקביעת תור</>, href: BOOKING_URL }}
        secondaryCta={{ label: <><GraduationCap className="w-4 h-4" /> לאקדמיה</>, href: "/academy" }}
        image={v("hero", "image") || heroBarbershop}
      />

      {/* What We Offer */}
      <Section title={<><Sparkles className="w-6 h-6 inline-block align-middle ml-1" /> {v("services", "title", "מה תמצאו אצלנו?")}</>} variant="light">
        <AnimatedSection>
          <CardsGrid items={servicesCards} columns={3} />
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      {/* Academy Section */}
      <Section
        title={<><GraduationCap className="w-6 h-6 inline-block align-middle ml-1" /> {v("academy", "title", "האקדמיה של Macho")}</>}
        subtitle={v("academy", "subtitle", "הפוך את התשוקה שלך למקצוע. הצטרף לאקדמיה המובילה בישראל ללימודי ספרות גברים.")}
        variant="dark"
      >
        <AnimatedSection>
          <FeatureGrid items={academyFeatures} columns={4} />
        </AnimatedSection>
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/academy"><BookOpen className="w-4 h-4" /> לכל הקורסים</Link>
          </Button>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="triangles" />

      {/* Gallery */}
      <Section title={<><Camera className="w-6 h-6 inline-block align-middle ml-1" /> {v("gallery", "title", "מהעבודות שלנו")}</>} variant="light">
        <AnimatedSection>
          <GalleryGrid images={galleryImages} />
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="curves" />

      {/* Perm Service */}
      <Section variant="dark">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
          <AnimatedSection direction="right">
            <img src={v("perm", "image") || permHero} alt="פרם לגבר" className="rounded-lg w-full max-w-xs mx-auto lg:max-w-full" />
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.2}>
             <h2 className="mb-4 font-extrabold"><Flame className="w-7 h-7 inline-block align-middle ml-1" /> {v("perm", "title", "פרם לגבר")}</h2>
             <p className="text-muted-foreground text-xl mb-6 font-semibold">
               {v("perm", "description", "תלתלים מושלמים לגברים. טכנולוגיה מתקדמת, תוצאות מוכחות ושירות מקצועי.")}
            </p>
            <StaggerChildren className="space-y-3 mb-8" staggerDelay={0.1}>
              <li className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span>{v("perm", "bullet1", "מוצרים איכותיים ובטוחים")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>{v("perm", "bullet2", "תוצאות מהירות וארוכות טווח")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-primary" />
                <span>{v("perm", "bullet3", "התאמה אישית לסגנון שלך")}</span>
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

      <SectionDivider from="dark" to="light" shape="steps" />

      {/* SEO Content Section */}
      <Section variant="light">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <AnimatedSection direction="right">
            <h2 className="mb-6 font-extrabold"><Scissors className="w-7 h-7 inline-block align-middle ml-1" /> {v("about_preview", "title", "Macho – יותר מסתם מספרה")}</h2>
            <div className="space-y-4 text-lg">
              <p>{v("about_preview", "paragraph1", "Macho נוסדה מתוך אהבה אמיתית למקצוע הספרות ורצון להעלות את רמת השירות לגברים בישראל. אנחנו מאמינים שכל גבר מגיע ליחס אישי, מקצועי ואיכותי.")}</p>
              <p>{v("about_preview", "paragraph2", "הצוות שלנו עובר הכשרות מתמידות ומעודכן בטרנדים האחרונים מכל העולם. אנחנו גאים להביא את הטוב ביותר ללקוחות שלנו.")}</p>
              <p>{v("about_preview", "paragraph3", "בין אם אתה מחפש תספורת קלאסית, עיצוב זקן מדויק או פרם מושלם – ב-Macho תמצא את הכל תחת קורת גג אחת.")}</p>
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
            <img src={v("about_preview", "image") || barbershopInterior} alt="פנים Macho" className="rounded-lg w-full max-w-xs mx-auto lg:max-w-full" />
          </AnimatedSection>
        </div>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      {/* Owner/Team Section */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <AnimatedSection direction="right">
            <img src={v("owner", "image") || ownerPortrait} alt="המייסד" className="max-w-md mx-auto rounded-lg w-full" />
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.2}>
            <img src={teamIcon} alt="צוות Macho" className="w-32 mb-4 object-contain" />
            <h2 className="mb-4 font-extrabold">{v("owner", "title", "הכירו את יהלי")}</h2>
            <h3 className="text-xl font-bold mb-4">{v("owner", "subtitle", "יהלי צור – מייסד Macho")}</h3>
            <div className="space-y-4 text-lg">
              <p>{v("owner", "paragraph1", "עם ניסיון של למעלה מ-15 שנה בתחום הספרות, ישראל הקים את Macho מתוך חזון להביא שינוי אמיתי לעולם הטיפוח לגברים בישראל.")}</p>
              <p>{v("owner", "paragraph2", "בוגר קורסים מובילים בארץ ובעולם, ישראל משלב ידע מקצועי עמוק עם גישה אישית וחמה לכל לקוח.")}</p>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* CTA */}
      <AnimatedSection>
        <CTASection
          title={<><Rocket className="w-6 h-6 inline-block align-middle ml-1" /> מוכנים להתחיל?</>}
          description={<><Scissors className="w-5 h-5 inline-block align-middle ml-1" /> קבעו תור עכשיו וחוו את ההבדל</>}
          buttonLabel={<><Smartphone className="w-4 h-4" /> קבעו תור בוואטסאפ</>}
          buttonHref={BOOKING_URL}
          variant="light"
        />
      </AnimatedSection>
    </Layout>
  );
};

export default HomePage;
