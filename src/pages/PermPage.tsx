import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Shield, Clock, CheckCircle, Sparkles } from "lucide-react";

import permHero from "@/assets/perm-hero.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const PermPage = () => {
  const treatments = [
    { area: "תלתלים קלאסיים", sessions: "טיפול אחד", price: "החל מ-₪350" },
    { area: "גלים טבעיים", sessions: "טיפול אחד", price: "החל מ-₪300" },
    { area: "תלתלים הדוקים", sessions: "טיפול אחד", price: "החל מ-₪400" },
    { area: "פרם חלקי", sessions: "טיפול אחד", price: "החל מ-₪250" },
  ];

  const benefits = [
    { icon: Shield, title: "מוצרים איכותיים", description: "מוצרים מקצועיים בלבד" },
    { icon: Clock, title: "תוצאות ארוכות", description: "החזקה של חודשים" },
    { icon: CheckCircle, title: "מראה טבעי", description: "תלתלים שנראים אמיתיים" },
    { icon: Sparkles, title: "שיער בריא", description: "טיפול משקם ומזין" },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "פרם לגבר" }]} />
      
      <HeroSplit
        title="פרם לגבר"
        subtitle="תלתלים מושלמים לגברים"
        description="תלתלים וגלים טבעיים לגברים. טכניקות מתקדמות, מראה טבעי ושירות מקצועי."
        primaryCta={{ label: "לייעוץ חינם", href: "/contact" }}
        image={permHero}
      />

      <Section title="היתרונות שלנו" variant="light">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 bg-background text-foreground rounded-lg text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <benefit.icon className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-sm opacity-70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="סוגי פרם" variant="dark">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((treatment, index) => (
            <div key={index} className="p-6 bg-secondary text-secondary-foreground rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">{treatment.area}</h3>
              <p className="text-sm mb-2 opacity-70">{treatment.sessions}</p>
              <p className="font-bold">{treatment.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={gallery3} alt="פרם לגבר" className="rounded-lg w-full" />
          <div>
            <h2 className="mb-6">איך זה עובד?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-bold mb-1">ייעוץ ראשוני</h4>
                  <p className="opacity-70">פגישת היכרות והתאמה אישית לסגנון התלתלים</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-bold mb-1">הטיפול</h4>
                  <p className="opacity-70">טיפול מקצועי של כ-2 שעות עם מוצרים איכותיים</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-bold mb-1">תלתלים מושלמים</h4>
                  <p className="opacity-70">תוצאות שנמשכות 3-6 חודשים</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        title="רוצים תלתלים?"
        description="השאירו פרטים לייעוץ חינם"
        buttonLabel="צרו קשר"
        buttonHref="/contact"
        variant="dark"
      />
    </Layout>
  );
};

export default PermPage;