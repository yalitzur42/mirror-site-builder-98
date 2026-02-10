import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Clock, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import courseBeginnerHero from "@/assets/course-beginner-hero.jpg";

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
        subtitle="🌱 הצעד הראשון בקריירה שלך"
        description="קורס מקיף לספרות גברים המיועד למתחילים ללא ניסיון קודם. תלמדו את כל הבסיס הדרוש להתחיל קריירה מצליחה. 🎯"
        primaryCta={{ label: "📲 לפרטים והרשמה", href: "https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+ספרות+למתחילים" }}
        image={courseBeginnerHero}
      />

      <Section variant="light" isFirstSection>
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
      </Section>

      <Section title="📋 תכני הקורס" variant="dark">
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
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-4">🚀 מוכנים להתחיל קריירה חדשה?</h2>
          <p className="text-lg opacity-80 mb-4">
            הקורס למתחילים הוא הצעד הראשון בדרך לקריירה מצליחה בעולם הספרות. בוגרי הקורס עובדים במספרות המובילות בארץ.
          </p>
          <p className="opacity-70 mb-8">🎒 כולל ערכת ציוד מקצועית מלאה</p>
          <a
            href="https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+ספרות+למתחילים"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta"
          >
            📲 הירשמו עכשיו בוואטסאפ
          </a>
        </div>
      </Section>

      <CTASection
        title="❓ יש שאלות?"
        description="🙋 אנחנו כאן בשבילכם"
        buttonLabel="💬 דברו איתנו"
        buttonHref="https://wa.me/972552935987?text=היי+אני+אשמח+לשמוע+עוד+פרטים+על+הקורס+ספרות+למתחילים"
        variant="dark"
      />
    </Layout>
  );
};

export default BeginnerCoursePage;
