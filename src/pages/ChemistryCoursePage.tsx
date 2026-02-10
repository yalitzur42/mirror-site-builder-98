import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Clock, Users, Award, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

import courseAdvancedHero from "@/assets/course-advanced-hero.jpg";

const ChemistryCoursePage = () => {
  const modules = [
    "בסיס כימיה של שיער",
    "תורת הצבע והגוונים",
    "טכניקות צביעה מתקדמות",
    "הבהרה והכהיה",
    "תיקון צבע",
    "שימוש במוצרים מקצועיים",
  ];

  return (
    <Layout>
      <Breadcrumbs items={[
        { label: "האקדמיה", href: "/academy" },
        { label: "קורס כימיה וצבע" }
      ]} />

      <HeroSplit
        title="קורס כימיה וצבע"
        subtitle="שלטו באמנות הצבע"
        description="קורס מקיף שיעניק לכם שליטה מלאה בעולם הצביעה והכימיה. תלמדו להבין את המדע מאחורי הצבע וליצור תוצאות מדויקות ומרהיבות."
        primaryCta={{ label: "📲 לפרטים והרשמה", href: "https://wa.me/972544744031?text=היי, אני מעוניין בקורס כימיה וצבע" }}
        image={courseAdvancedHero}
      />

      <Section variant="light" isFirstSection>
        <AnimatedSection>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-background text-foreground text-center p-6 border-border">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">משך הקורס</h3>
              <p className="opacity-70">8 שבועות</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 border-border">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">גודל הכיתה</h3>
              <p className="opacity-70">עד 6 תלמידים</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 border-border">
              <Palette className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">התמחות</h3>
              <p className="opacity-70">צביעה וכימיה</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 border-border">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">תעודה</h3>
              <p className="opacity-70">הסמכה מקצועית</p>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <Section title="מה תלמדו?" variant="dark">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <span>{module}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <Section variant="light">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">הפכו למומחי צבע</h2>
            <p className="text-lg opacity-80 mb-6">
              צביעת שיער היא אמנות ומדע. בקורס הזה תלמדו את שניהם – ותצאו עם היכולת ליצור כל גוון שהלקוח מבקש.
            </p>
            <a
              href="https://wa.me/972544744031?text=היי, אני מעוניין בקורס כימיה וצבע"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-cta"
            >
              📲 הצטרפו לקורס הבא
            </a>
          </div>
        </AnimatedSection>
      </Section>

      <CTASection
        title="יש שאלות?"
        description="אנחנו כאן בשבילכם"
        buttonLabel="💬 דברו איתנו"
        buttonHref="https://wa.me/972544744031"
        variant="dark"
      />
    </Layout>
  );
};

export default ChemistryCoursePage;
