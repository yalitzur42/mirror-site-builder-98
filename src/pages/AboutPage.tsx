import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import { Target, Eye, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <Breadcrumbs items={[{ label: "אודות" }]} />
      
      <HeroSplit
        title="אודות המספרה"
        subtitle="הסיפור שלנו"
        description="המספרה נוסדה מתוך תשוקה אמיתית לספרות גברים ורצון להביא שינוי לתחום. אנחנו מאמינים שכל גבר ראוי לטיפוח מקצועי ואיכותי."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">תמונת הצוות</span>
          </div>
          <div>
            <h2 className="mb-6">מי אנחנו?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                המספרה הוקמה בשנת 2015 בכפר סבא, והפכה במהרה למוקד מוביל בתחום 
                הספרות לגברים בישראל. מה שהתחיל כמספרה קטנה התפתח לרשת שכוללת 
                מספרה, אקדמיה ללימודי ספרות וקליניקה להסרת שיער בלייזר.
              </p>
              <p>
                הצוות שלנו מונה ספרים מקצועיים ומנוסים, שעוברים הכשרות מתמידות 
                ומתעדכנים בטרנדים החדשים ביותר מכל העולם.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-card rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">המשימה שלנו</h3>
            <p className="text-muted-foreground">
              להעניק לכל גבר חוויית טיפוח מקצועית, אישית ואיכותית שתגרום לו להרגיש 
              בטוח ומטופח.
            </p>
          </div>
          <div className="text-center p-8 bg-card rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">החזון שלנו</h3>
            <p className="text-muted-foreground">
              להפוך למותג המוביל בישראל בתחום הטיפוח לגברים, ולהכשיר את הדור 
              הבא של הספרים המובילים.
            </p>
          </div>
          <div className="text-center p-8 bg-card rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">הערכים שלנו</h3>
            <p className="text-muted-foreground">
              מקצועיות, יחס אישי, חדשנות מתמדת ומחויבות לשביעות רצון מלאה של 
              הלקוחות.
            </p>
          </div>
        </div>
      </Section>

      <CTASection
        title="רוצים להצטרף למשפחה?"
        description="קבעו תור עכשיו וחוו את ההבדל"
        buttonLabel="לקביעת תור"
        buttonHref="/contact"
        variant="gradient"
      />
    </Layout>
  );
};

export default AboutPage;
