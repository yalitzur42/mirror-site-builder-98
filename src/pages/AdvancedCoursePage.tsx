import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Clock, Users, Award, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import courseAdvancedHero from "@/assets/course-advanced-hero.jpg";

const AdvancedCoursePage = () => {
  const modules = [
    "טכניקות Fade מתקדמות",
    "עיצוב זקן מורכב",
    "צביעה וגוונים",
    "טרנדים עדכניים",
    "מיתוג אישי",
    "בניית פורטפוליו",
  ];

  return (
    <Layout>
      <Breadcrumbs items={[
        { label: "האקדמיה", href: "/academy" },
        { label: "קורסים למתקדמים" }
      ]} />
      
      <HeroSplit
        title="קורס למתקדמים"
        subtitle="שדרגו את המיומנויות"
        description="קורס מתקדם לספרים עם ניסיון שרוצים להעלות רמה. טכניקות מתקדמות, טרנדים חדשים ובניית מותג אישי."
        primaryCta={{ label: "להרשמה", href: "/contact" }}
        image={courseAdvancedHero}
      />

      <Section variant="light">
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

      <Section title="תכני הקורס" variant="dark">
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
      </Section>

      <Section variant="light">
        <div className="text-center">
          <h2 className="mb-4">מחיר הקורס</h2>
          <div className="text-5xl font-black text-accent mb-4">₪5,500</div>
          <p className="opacity-70 mb-8">לספרים פעילים בלבד</p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <Link to="/contact">להרשמה</Link>
          </Button>
        </div>
      </Section>

      <CTASection
        title="מוכנים לשדרג?"
        buttonLabel="הרשמו עכשיו"
        buttonHref="/contact"
        variant="dark"
      />
    </Layout>
  );
};

export default AdvancedCoursePage;
