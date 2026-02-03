import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Clock, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      />

      <Section>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card text-center p-6">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">משך הקורס</h3>
            <p className="text-muted-foreground">4 שבועות</p>
          </Card>
          <Card className="bg-card text-center p-6">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">גודל הכיתה</h3>
            <p className="text-muted-foreground">עד 10 תלמידים</p>
          </Card>
          <Card className="bg-card text-center p-6">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">תעודה</h3>
            <p className="text-muted-foreground">אישור השתתפות</p>
          </Card>
        </div>
      </Section>

      <Section title="מה תלמדו?" className="bg-secondary">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {index + 1}
              </div>
              <span>{module}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="mb-4">מחיר הקורס</h2>
          <div className="text-5xl font-black text-accent mb-4">₪2,900</div>
          <p className="text-muted-foreground mb-8">כולל חומרי לימוד</p>
          <Button asChild size="lg">
            <Link to="/contact">להרשמה</Link>
          </Button>
        </div>
      </Section>

      <CTASection
        title="מתלבטים?"
        description="זה הקורס המושלם להתחיל"
        buttonLabel="דברו איתנו"
        buttonHref="/contact"
        variant="gradient"
      />
    </Layout>
  );
};

export default BasicCoursePage;
