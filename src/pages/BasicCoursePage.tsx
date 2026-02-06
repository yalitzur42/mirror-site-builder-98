import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Clock, Users, Award } from "lucide-react";
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
        primaryCta={{ label: "להרשמה", href: "/contact" }}
        image={courseBasicHero}
      />

      <Section variant="light">
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

      <Section variant="light">
        <div className="text-center">
          <h2 className="mb-4">מחיר הקורס</h2>
          <div className="text-5xl font-black text-accent mb-4">₪2,900</div>
          <p className="opacity-70 mb-8">כולל חומרי לימוד</p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <Link to="/contact">להרשמה</Link>
          </Button>
        </div>
      </Section>

      <CTASection
        title="מתלבטים?"
        description="זה הקורס המושלם להתחיל"
        buttonLabel="דברו איתנו"
        buttonHref="/contact"
        variant="dark"
      />
    </Layout>
  );
};

export default BasicCoursePage;
