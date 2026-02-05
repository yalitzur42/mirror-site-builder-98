import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CardsGrid from "@/components/ui/CardsGrid";
import FeatureGrid from "@/components/ui/FeatureGrid";
import CTASection from "@/components/ui/CTASection";
import { GraduationCap, Users, Award, Clock, BookOpen, Star } from "lucide-react";

import academyClassroom from "@/assets/academy-classroom.jpg";

const AcademyPage = () => {
  const courses = [
    { title: "קורס למתחילים", href: "/academy/beginner", description: "הצעד הראשון בקריירה" },
    { title: "קורס למתקדמים", href: "/academy/advanced", description: "שדרוג המיומנויות" },
    { title: "קורס בסיסי", href: "/academy/basic-course", description: "יסודות הספרות" },
    { title: "קורסים דיגיטליים", href: "/online-courses", description: "למידה מרחוק" },
  ];

  const features = [
    { icon: GraduationCap, title: "הכשרה מקיפה", description: "תוכנית לימודים מלאה ומעשית" },
    { icon: Users, title: "קבוצות קטנות", description: "עד 8 תלמידים בכיתה" },
    { icon: Award, title: "תעודה מוכרת", description: "הסמכה רשמית בסיום" },
    { icon: Clock, title: "גמישות בשעות", description: "קורסים בבוקר ובערב" },
    { icon: BookOpen, title: "חומרי לימוד", description: "ערכה מקצועית לכל תלמיד" },
    { icon: Star, title: "ליווי אישי", description: "תמיכה גם אחרי הקורס" },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "האקדמיה" }]} />
      
      <HeroSplit
        title="האקדמיה של המספרה"
        subtitle="הפוך את התשוקה למקצוע"
        description="אקדמיה מובילה ללימודי ספרות גברים בישראל. תוכניות לימוד מקיפות, מרצים מובילים וציוד מקצועי."
        primaryCta={{ label: "לפרטים נוספים", href: "/contact" }}
        image={academyClassroom}
      />

      <Section title="הקורסים שלנו" variant="light">
        <CardsGrid items={courses} columns={4} />
      </Section>

      <Section title="למה ללמוד אצלנו?" variant="dark">
        <FeatureGrid items={features} columns={3} />
      </Section>

      <Section variant="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">מה תלמדו באקדמיה?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center text-sm shrink-0 mt-0.5">✓</div>
                <span>טכניקות תספורת מתקדמות</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center text-sm shrink-0 mt-0.5">✓</div>
                <span>עיצוב זקן מקצועי</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center text-sm shrink-0 mt-0.5">✓</div>
                <span>צביעה ושינוי צבע</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center text-sm shrink-0 mt-0.5">✓</div>
                <span>ניהול עסק עצמאי</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center text-sm shrink-0 mt-0.5">✓</div>
                <span>שירות לקוחות ומכירות</span>
              </li>
            </ul>
          </div>
          <img src={academyClassroom} alt="לימודים באקדמיה" className="rounded-lg w-full" />
        </div>
      </Section>

      <CTASection
        title="רוצים להצטרף?"
        description="השאירו פרטים ונחזור אליכם"
        buttonLabel="להרשמה"
        buttonHref="/contact"
        variant="dark"
      />
    </Layout>
  );
};

export default AcademyPage;
