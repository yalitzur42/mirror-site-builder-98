import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Play, Monitor, Clock, Infinity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OnlineCoursesPage = () => {
  const courses = [
    {
      title: "קורס Fade מלא",
      description: "כל מה שצריך לדעת על טכניקת ה-Fade",
      lessons: 24,
      price: "₪790",
    },
    {
      title: "עיצוב זקן מקצועי",
      description: "מהבסיס ועד טכניקות מתקדמות",
      lessons: 18,
      price: "₪590",
    },
    {
      title: "טכניקות מספריים",
      description: "שליטה מלאה בעבודה עם מספריים",
      lessons: 15,
      price: "₪490",
    },
    {
      title: "חבילת הכל כלול",
      description: "כל הקורסים במחיר מיוחד",
      lessons: 57,
      price: "₪1,490",
    },
  ];

  const features = [
    { icon: Play, title: "תכנים באיכות HD", description: "וידאו מקצועי וברור" },
    { icon: Monitor, title: "צפייה בכל מכשיר", description: "מחשב, טאבלט או נייד" },
    { icon: Clock, title: "למידה בקצב שלך", description: "ללא הגבלת זמן" },
    { icon: Infinity, title: "גישה לכל החיים", description: "שלמו פעם אחת" },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "קורסים דיגיטליים" }]} />
      
      <HeroSplit
        title="קורסים דיגיטליים"
        subtitle="למידה מרחוק בקצב שלך"
        description="קורסים מקצועיים בוידאו שתוכלו לצפות מכל מקום ובכל זמן. תכנים איכותיים עם גישה לכל החיים."
      />

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="הקורסים שלנו" className="bg-secondary">
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="bg-card">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Play className="w-16 h-16 text-muted-foreground" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{course.lessons} שיעורים</span>
                  <span className="text-2xl font-black text-accent">{course.price}</span>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link to="/contact">לפרטים</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="רוצים לראות תצוגה מקדימה?"
        description="צרו קשר ונשלח לכם דוגמה חינם"
        buttonLabel="צרו קשר"
        buttonHref="/contact"
        variant="gradient"
      />
    </Layout>
  );
};

export default OnlineCoursesPage;
