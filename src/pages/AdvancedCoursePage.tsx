import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import SectionDivider from "@/components/ui/SectionDivider";
import { Clock, Users, Award, Sparkles, Zap, Smartphone, Trophy, ClipboardList, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import courseAdvancedHero from "@/assets/course-advanced-hero.jpg";

const AdvancedCoursePage = () => {
  const modules = ["טכניקות Fade מתקדמות", "עיצוב זקן מורכב", "צביעה וגוונים", "טרנדים עדכניים", "מיתוג אישי", "בניית פורטפוליו"];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "האקדמיה", href: "/academy" }, { label: "קורסים למתקדמים" }]} />
      
      <HeroSplit
        title="קורס למתקדמים"
        subtitle="שדרגו את המיומנויות"
        description="קורס מתקדם לספרים עם ניסיון שרוצים להעלות רמה. טכניקות מתקדמות, טרנדים חדשים ובניית מותג אישי."
        primaryCta={{ label: <><Smartphone className="w-4 h-4" /> לפרטים והרשמה</>, href: "https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+ספרות+למתקדמים" }}
        image={courseAdvancedHero}
      />

      <Section variant="light" isFirstSection>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-background text-foreground text-center p-6 border-border">
            <Clock className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">משך הקורס</h3>
            <p className="opacity-70">6 שבועות</p>
          </Card>
          <Card className="bg-background text-foreground text-center p-6 border-border">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">גודל הכיתה</h3>
            <p className="opacity-70">עד 6 תלמידים</p>
          </Card>
          <Card className="bg-background text-foreground text-center p-6 border-border">
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">דרישות קדם</h3>
            <p className="opacity-70">שנת ניסיון</p>
          </Card>
          <Card className="bg-background text-foreground text-center p-6 border-border">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">תעודה</h3>
            <p className="opacity-70">הסמכה מתקדמת</p>
          </Card>
        </div>
      </Section>

      <SectionDivider from="light" to="dark" shape="curves" />

      <Section title={<><ClipboardList className="w-6 h-6 inline-block align-middle ml-1" /> תכני הקורס</>} variant="dark">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">{index + 1}</div>
              <span>{module}</span>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider from="dark" to="light" shape="waves" />

      <Section variant="light">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-4"><Trophy className="w-6 h-6 inline-block align-middle ml-1" /> מוכנים לעלות רמה?</h2>
          <p className="text-lg opacity-80 mb-4">הקורס למתקדמים ייקח את הכישורים שלכם לשלב הבא. טכניקות שיבדילו אתכם מכל ספר אחר.</p>
          <p className="opacity-70 mb-8">לספרים פעילים עם ניסיון בלבד</p>
          <a href="https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+ספרות+למתקדמים" target="_blank" rel="noopener noreferrer" className="whatsapp-cta">
            <Smartphone className="w-5 h-5" />
            הצטרפו לקורס הבא
          </a>
        </div>
      </Section>

      <SectionDivider from="light" to="dark" shape="steps" />

      <CTASection
        title={<><Zap className="w-6 h-6 inline-block align-middle ml-1" /> מוכנים לשדרג?</>}
        description="המקומות מוגבלים – אל תפספסו"
        buttonLabel={<><MessageCircle className="w-4 h-4" /> דברו איתנו</>}
        buttonHref="https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+ספרות+למתקדמים"
        variant="dark"
      />
    </Layout>
  );
};

export default AdvancedCoursePage;
