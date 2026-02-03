import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Clock, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BeginnerCoursePage = () => {
  const modules = [
    "מבוא לספרות גברים",
    "כלי עבודה והיגיינה",
    "טכניקות בסיסיות",
    "תספורות קלאסיות",
    "עיצוב זקן בסיסי",
    "שירות לקוחות",
  ];

  return (
    <Layout>
      <Breadcrumbs items={[
        { label: "האקדמיה", href: "/academy" },
        { label: "קורסים למתחילים" }
      ]} />
      
      <HeroSplit
        title="קורס למתחילים"
        subtitle="הצעד הראשון בקריירה שלך"
        description="קורס מקיף לספרות גברים המיועד למתחילים ללא ניסיון קודם. תלמדו את כל הבסיס הדרוש להתחיל קריירה מצליחה."
        primaryCta={{ label: "להרשמה", href: "/contact" }}
      />

      <Section>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card text-center p-6">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">משך הקורס</h3>
            <p className="text-muted-foreground">3 חודשים</p>
          </Card>
          <Card className="bg-card text-center p-6">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">גודל הכיתה</h3>
            <p className="text-muted-foreground">עד 8 תלמידים</p>
          </Card>
          <Card className="bg-card text-center p-6">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">תעודה</h3>
            <p className="text-muted-foreground">הסמכה רשמית</p>
          </Card>
        </div>
      </Section>

      <Section title="תכני הקורס" className="bg-secondary">
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
          <div className="text-5xl font-black text-accent mb-4">₪8,500</div>
          <p className="text-muted-foreground mb-8">כולל ערכת ציוד מקצועית</p>
          <Button asChild size="lg">
            <Link to="/contact">להרשמה</Link>
          </Button>
        </div>
      </Section>

      <CTASection
        title="יש שאלות?"
        description="צרו קשר ונשמח לעזור"
        buttonLabel="צרו קשר"
        buttonHref="/contact"
        variant="gradient"
      />
    </Layout>
  );
};

export default BeginnerCoursePage;
