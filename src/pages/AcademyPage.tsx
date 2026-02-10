import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CardsGrid from "@/components/ui/CardsGrid";
import FeatureGrid from "@/components/ui/FeatureGrid";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { GraduationCap, Users, Award, Clock, BookOpen, Star } from "lucide-react";

import academyClassroom from "@/assets/academy-classroom.jpg";
import courseBeginnerHero from "@/assets/course-beginner-hero.jpg";
import courseAdvancedHero from "@/assets/course-advanced-hero.jpg";

const AcademyPage = () => {
  const courses = [
    { title: "קורס למתחילים", href: "/academy/beginner", description: "הצעד הראשון בקריירה", image: courseBeginnerHero },
    { title: "קורס למתקדמים", href: "/academy/advanced", description: "שדרוג המיומנויות", image: courseAdvancedHero },
    { title: "קורס כימיה וצבע", href: "/academy/chemistry", description: "צביעה וגוונים מקצועיים" },
    { title: "קורס פרם", href: "/academy/perm-course", description: "התמחות בפרם לגברים" },
    
  ];

  const features = [
    { icon: GraduationCap, title: "הכשרה מקיפה", description: "תוכנית לימודים מלאה ומעשית" },
    { icon: Users, title: "קבוצות קטנות", description: "עד 8 תלמידים בכיתה" },
    { icon: Award, title: "תעודה מוכרת", description: "הסמכה רשמית בסיום" },
    { icon: Clock, title: "גמישות בשעות", description: "קורסים בבוקר ובערב" },
    { icon: BookOpen, title: "חומרי לימוד", description: "ערכה מקצועית לכל תלמיד" },
    { icon: Star, title: "ליווי אישי", description: "תמיכה גם אחרי הקורס" },
  ];

  const stats = [
    { number: "15+", label: "שנות ניסיון בהוראה" },
    { number: "500+", label: "בוגרים עובדים בתעשייה" },
    { number: "98%", label: "שביעות רצון תלמידים" },
    { number: "12", label: "מחזורים בשנה" },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "האקדמיה" }]} />

      <HeroSplit
        title="האקדמיה של Macho"
        subtitle="הפוך את התשוקה למקצוע"
        description="אקדמיה מובילה ללימודי ספרות גברים בישראל. תוכניות לימוד מקיפות, מרצים מובילים וציוד מקצועי."
        primaryCta={{ label: "📲 לפרטים והרשמה", href: "https://wa.me/972544744031?text=היי, אני מעוניין בפרטים על האקדמיה" }}
        image={academyClassroom}
      />

      {/* מספרים יבשים – אמון */}
      <Section variant="light" isFirstSection>
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
                <p className="opacity-70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 className="text-center mb-8">הקורסים שלנו</h2>
          <CardsGrid items={courses} columns={4} />
        </AnimatedSection>
      </Section>

      <Section title="למה ללמוד אצלנו?" variant="dark">
        <AnimatedSection>
          <FeatureGrid items={features} columns={3} />
        </AnimatedSection>
      </Section>

      <Section variant="light">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">מה תלמדו באקדמיה?</h2>
              <ul className="space-y-4">
                {[
                  "טכניקות תספורת מתקדמות",
                  "עיצוב זקן מקצועי",
                  "צביעה ושינוי צבע",
                  "טכניקות פרם מתקדמות",
                  "ניהול עסק עצמאי",
                  "שירות לקוחות ומכירות",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-sm shrink-0 mt-0.5">✓</div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <img src={academyClassroom} alt="לימודים באקדמיה" className="rounded-lg w-full" />
          </div>
        </AnimatedSection>
      </Section>

      {/* תלמידים ותוצאות */}
      <Section variant="dark">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6">הבוגרים שלנו מדברים</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary rounded-xl text-right">
                <p className="opacity-85 mb-4">"הקורס ב-Macho שינה לי את החיים. תוך 3 חודשים עברתי מאפס ניסיון לעבודה במספרה מובילה."</p>
                <p className="font-bold text-sm">— דן, בוגר מחזור 2024</p>
              </div>
              <div className="p-6 bg-secondary rounded-xl text-right">
                <p className="opacity-85 mb-4">"היחס האישי והמקצועיות של הצוות הם ברמה אחרת. הרגשתי שבאמת אכפת להם שאצליח."</p>
                <p className="font-bold text-sm">— אור, בוגר מחזור 2023</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <CTASection
        title="רוצים להצטרף?"
        description="שלחו הודעה בוואטסאפ ונחזור אליכם עם כל הפרטים"
        buttonLabel="📲 הירשמו עכשיו"
        buttonHref="https://wa.me/972544744031?text=היי, אני מעוניין להירשם לאקדמיה"
        variant="light"
      />
    </Layout>
  );
};

export default AcademyPage;
