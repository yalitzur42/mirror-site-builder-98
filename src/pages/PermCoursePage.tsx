import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Clock, Users, Award, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

import permHero from "@/assets/perm-hero.jpg";

const PermCoursePage = () => {
  const modules = [
    "מבוא לפרם לגברים",
    "כימיה של פרם – תיאוריה ומעשה",
    "סוגי תלתלים וגלים",
    "התאמת פרם לסוג שיער",
    "טכניקות גלילה מתקדמות",
    "טיפול ותחזוקה אחרי פרם",
  ];

  return (
    <Layout>
      <Breadcrumbs items={[
        { label: "האקדמיה", href: "/academy" },
        { label: "קורס פרם" }
      ]} />

      <HeroSplit
        title="קורס פרם"
        subtitle="🌊 הפכו למומחי פרם לגברים"
        description="קורס ייחודי מסוגו בישראל – למדו את אמנות הפרם לגברים מהחלוצים בתחום. טכניקות, כימיה ושירות ברמה הגבוהה ביותר. 🏅"
        primaryCta={{ label: "📲 לפרטים והרשמה", href: "https://wa.me/972544744031?text=היי, אני מעוניין בקורס פרם" }}
        image={permHero}
      />

      <Section variant="light" isFirstSection>
        <AnimatedSection>
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
              <p className="opacity-70">ניסיון בסיסי בספרות</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 border-border">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">תעודה</h3>
              <p className="opacity-70">הסמכת פרם מקצועית</p>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <Section title="📋 תכני הקורס" variant="dark">
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
            <h2 className="mb-4">🚀 הפרם הוא העתיד</h2>
            <p className="text-lg opacity-80 mb-4">
              הביקוש לפרם לגברים רק עולה. ספרים שיודעים לעשות פרם מקצועי נמצאים בביקוש עצום. 
              זה הזמן שלכם ללמוד את המיומנות שתבדיל אתכם מכולם.
            </p>
            <p className="opacity-70 mb-8">👑 למדו מהחלוצים בתחום הפרם לגברים בישראל</p>
            <a
              href="https://wa.me/972544744031?text=היי, אני מעוניין בקורס פרם"
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
        title="❓ יש שאלות?"
        description="🙋 אנחנו כאן בשבילכם"
        buttonLabel="💬 דברו איתנו"
        buttonHref="https://wa.me/972544744031"
        variant="dark"
      />
    </Layout>
  );
};

export default PermCoursePage;
