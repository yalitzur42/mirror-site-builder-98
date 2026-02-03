import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Shield, Clock, CheckCircle, Zap } from "lucide-react";

const LaserPage = () => {
  const treatments = [
    { area: "גב", sessions: "6-8 טיפולים", price: "החל מ-₪350" },
    { area: "חזה", sessions: "6-8 טיפולים", price: "החל מ-₪300" },
    { area: "כתפיים", sessions: "4-6 טיפולים", price: "החל מ-₪200" },
    { area: "פנים", sessions: "4-6 טיפולים", price: "החל מ-₪150" },
  ];

  const benefits = [
    { icon: Shield, title: "בטיחות מקסימלית", description: "טכנולוגיה מאושרת FDA" },
    { icon: Clock, title: "טיפולים מהירים", description: "כל טיפול כ-30 דקות" },
    { icon: CheckCircle, title: "תוצאות קבועות", description: "הפחתה משמעותית בשיער" },
    { icon: Zap, title: "מינימום כאב", description: "מערכת קירור מתקדמת" },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "הסרת שיער בלייזר" }]} />
      
      <HeroSplit
        title="הסרת שיער בלייזר"
        subtitle="טכנולוגיה מתקדמת לגברים"
        description="טיפולי הסרת שיער בלייזר מותאמים במיוחד לגברים. תוצאות קבועות, מינימום כאב ושירות מקצועי."
        primaryCta={{ label: "לייעוץ חינם", href: "/contact" }}
      />

      <Section title="היתרונות שלנו">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 bg-card rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="אזורי טיפול" className="bg-secondary">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((treatment, index) => (
            <div key={index} className="p-6 bg-card rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">{treatment.area}</h3>
              <p className="text-muted-foreground text-sm mb-2">{treatment.sessions}</p>
              <p className="text-accent font-bold">{treatment.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">תמונת טיפול</span>
          </div>
          <div>
            <h2 className="mb-6">איך זה עובד?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-bold mb-1">ייעוץ ראשוני</h4>
                  <p className="text-muted-foreground">פגישת היכרות והתאמה אישית לתוכנית הטיפול</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-bold mb-1">סדרת טיפולים</h4>
                  <p className="text-muted-foreground">6-8 טיפולים במרווחים של 4-6 שבועות</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-bold mb-1">תוצאות קבועות</h4>
                  <p className="text-muted-foreground">הפחתה של עד 90% בצמיחת השיער</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        title="רוצים לדעת יותר?"
        description="השאירו פרטים לייעוץ חינם"
        buttonLabel="צרו קשר"
        buttonHref="/contact"
        variant="gradient"
      />
    </Layout>
  );
};

export default LaserPage;
