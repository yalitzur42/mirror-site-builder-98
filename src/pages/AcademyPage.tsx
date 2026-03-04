import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import SectionDivider from "@/components/ui/SectionDivider";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Clock, Users, Award, Smartphone, Rocket, ClipboardList, HelpCircle, MessageCircle, GraduationCap, Star, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

import academyClassroom from "@/assets/academy-classroom.jpg";
import courseBeginnerHero from "@/assets/course-beginner-hero.jpg";

const AcademyPage = () => {
  const modules = ["מבוא לספרות גברים", "כלי עבודה והיגיינה", "טכניקות בסיסיות", "תספורות קלאסיות", "עיצוב זקן בסיסי", "שירות לקוחות"];

  const stats = [
    { number: "15+", label: "שנות ניסיון בהוראה" },
    { number: "500+", label: "בוגרים עובדים בתעשייה" },
    { number: "98%", label: "שביעות רצון תלמידים" },
    { number: "12", label: "מחזורים בשנה" },
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
        title="האקדמיה של Macho"
        subtitle="הצעד הראשון בקריירה שלך"
        description="קורס מקיף לספרות גברים המיועד למתחילים ללא ניסיון קודם. תלמדו את כל הבסיס הדרוש להתחיל קריירה מצליחה."
        primaryCta={{ label: <><Smartphone className="w-4 h-4" /> לפרטים והרשמה</>, href: "https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+האקדמיה" }}
        image={courseBeginnerHero}
      />

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
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-background text-foreground text-center p-6 border-border">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">משך הקורס</h3>
              <p className="opacity-70">3 חודשים</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 border-border">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">גודל הכיתה</h3>
              <p className="opacity-70">עד 8 תלמידים</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 border-border">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">תעודה</h3>
              <p className="opacity-70">הסמכה רשמית</p>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      <Section title={<><ClipboardList className="w-6 h-6 inline-block align-middle ml-1" /> תכני הקורס</>} variant="dark">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-secondary text-secondary-foreground rounded-lg">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">{index + 1}</div>
                <span>{module}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      <Section title={<><Star className="w-6 h-6 inline-block align-middle ml-1" /> למה ללמוד אצלנו?</>} variant="light">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <feature.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="opacity-70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="triangles" />

      <Section variant="dark">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6"><MessageCircle className="w-6 h-6 inline-block align-middle ml-1" /> הבוגרים שלנו מדברים</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary text-secondary-foreground rounded-xl text-right">
                <p className="opacity-85 mb-4">"הקורס ב-Macho שינה לי את החיים. תוך 3 חודשים עברתי מאפס ניסיון לעבודה במספרה מובילה."</p>
                <p className="font-bold text-sm">— דן, בוגר מחזור 2024</p>
              </div>
              <div className="p-6 bg-secondary text-secondary-foreground rounded-xl text-right">
                <p className="opacity-85 mb-4">"היחס האישי והמקצועיות של הצוות הם ברמה אחרת. הרגשתי שבאמת אכפת להם שאצליח."</p>
                <p className="font-bold text-sm">— אור, בוגר מחזור 2023</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="steps" />

      <CTASection
        title={<><Rocket className="w-6 h-6 inline-block align-middle ml-1" /> מוכנים להתחיל קריירה חדשה?</>}
        description="הקורס למתחילים הוא הצעד הראשון בדרך לקריירה מצליחה. כולל ערכת ציוד מקצועית מלאה."
        buttonLabel={<><Smartphone className="w-4 h-4" /> הירשמו עכשיו</>}
        buttonHref="https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+האקדמיה"
        variant="light"
      />
    </Layout>
  );
};

export default AcademyPage;
