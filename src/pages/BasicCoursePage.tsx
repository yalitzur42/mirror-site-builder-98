import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import SectionDivider from "@/components/ui/SectionDivider";
import { Clock, Users, Award, Smartphone, MessageCircle, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import courseBasicHero from "@/assets/course-basic-hero.jpg";

const BasicCoursePage = () => {
  const modules = [
    "היכרות עם כלי עבודה",
    "טכניקות חיתוך בסיסיות",
    "עבודה עם מכונה",
    "שימוש במספריים",
    "בסיס לעיצוב זקן",
    "תקשורת עם לקוחות",
  ];

  return (
    <Layout>
      <Breadcrumbs items={[
        { label: "האקדמיה", href: "/academy" },
        { label: "קורס בסיסי" }
      ]} />
      
      <HeroSplit
        title="קורס בסיסי"
        subtitle="היסודות לקריירה מצליחה"
        description="קורס קצר וממוקד שנותן את כל הבסיס הדרוש להתחיל. מושלם למי שרוצה לטעום את התחום לפני קורס מלא."
        primaryCta={{ label: <><Smartphone className="w-4 h-4" /> לפרטים והרשמה</>, href: "https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+הבסיסי" }}
        image={courseBasicHero}
      />

      <Section variant="light" isFirstSection>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-background text-foreground text-center p-6 border-border">
            <Clock className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">משך הקורס</h3>
            <p className="opacity-70">4 שבועות</p>
          </Card>
          <Card className="bg-background text-foreground text-center p-6 border-border">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">גודל הכיתה</h3>
            <p className="opacity-70">עד 10 תלמידים</p>
          </Card>
          <Card className="bg-background text-foreground text-center p-6 border-border">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">תעודה</h3>
            <p className="opacity-70">אישור השתתפות</p>
          </Card>
        </div>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      <Section title="מה תלמדו?" variant="dark">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <span>{module}</span>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      <Section variant="light">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-4">הצעד הבא שלך מתחיל כאן</h2>
          <p className="text-lg opacity-80 mb-6">
            הקורס הבסיסי הוא הדרך המהירה ביותר לטעום את עולם הספרות. מקומות מוגבלים – שריינו את שלכם.
          </p>
          <a
            href="https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+הבסיסי"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta"
          >
            <Smartphone className="w-5 h-5" />
            שריינו מקום בוואטסאפ
          </a>
        </div>
      </Section>

      <SectionDivider from="light" to="dark" shape="triangles" />

      <CTASection
        title={<><HelpCircle className="w-6 h-6 inline-block align-middle ml-1" /> מתלבטים?</>}
        description="דברו איתנו ונעזור לכם להחליט"
        buttonLabel={<><MessageCircle className="w-4 h-4" /> שלחו הודעה</>}
        buttonHref="https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+הבסיסי"
        variant="dark"
      />
    </Layout>
  );
};

export default BasicCoursePage;