import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import SectionDivider from "@/components/ui/SectionDivider";
import { Target, Eye, Heart, Handshake, Scissors, Smartphone, BookOpen } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { BOOKING_URL } from "@/lib/constants";

import teamPhoto from "@/assets/team-photo.jpg";

const AboutPage = () => {
  const { v, loading } = useSiteContent("about");

  if (loading) return <Layout><PageSkeleton /></Layout>;

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "אודות" }]} />
      
      <HeroSplit
        title={v("hero", "title", "אודות Macho")}
        subtitle={v("hero", "subtitle", "הסיפור שלנו")}
        description={v("hero", "description", "Macho נוסדה מתוך תשוקה אמיתית לספרות גברים ורצון להביא שינוי לתחום. אנחנו מאמינים שכל גבר ראוי לטיפוח מקצועי ואיכותי.")}
        image={v("hero", "image") || teamPhoto}
      />

      <Section variant="light" isFirstSection>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={v("who_we_are", "image") || teamPhoto} alt="הצוות שלנו" className="rounded-lg w-full max-w-md mx-auto" />
          <div>
            <h2 className="mb-6"><Handshake className="w-6 h-6 inline-block align-middle ml-1" /> {v("who_we_are", "title", "מי אנחנו?")}</h2>
            <div className="space-y-4 opacity-80">
              <p>{v("who_we_are", "paragraph1", "Macho הוקמה בשנת 2015 בעפולה, והפכה במהרה למוקד מוביל בתחום הספרות לגברים בישראל. מה שהתחיל כמספרה קטנה התפתח לרשת שכוללת מספרה, אקדמיה ללימודי ספרות ופרם מקצועי לגברים.")}</p>
              <p>{v("who_we_are", "paragraph2", "הצוות שלנו מונה ספרים מקצועיים ומנוסים, שעוברים הכשרות מתמידות ומתעדכנים בטרנדים החדשים ביותר מכל העולם.")}</p>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      <Section variant="dark">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-secondary rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
              <Target className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary-foreground">{v("values", "mission_title", "המשימה שלנו")}</h3>
            <p className="text-secondary-foreground opacity-70">{v("values", "mission_desc", "להעניק לכל גבר חוויית טיפוח מקצועית, אישית ואיכותית שתגרום לו להרגיש בטוח ומטופח.")}</p>
          </div>
          <div className="text-center p-8 bg-secondary rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
              <Eye className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary-foreground">{v("values", "vision_title", "החזון שלנו")}</h3>
            <p className="text-secondary-foreground opacity-70">{v("values", "vision_desc", "להפוך למותג המוביל בישראל בתחום הטיפוח לגברים, ולהכשיר את הדור הבא של הספרים המובילים.")}</p>
          </div>
          <div className="text-center p-8 bg-secondary rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
              <Heart className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary-foreground">{v("values", "values_title", "הערכים שלנו")}</h3>
            <p className="text-secondary-foreground opacity-70">{v("values", "values_desc", "מקצועיות, יחס אישי, חדשנות מתמדת ומחויבות לשביעות רצון מלאה של הלקוחות.")}</p>
          </div>
        </div>
      </Section>

      <SectionDivider from="dark" to="light" shape="triangles" />

      <CTASection
        title={<><Heart className="w-6 h-6 inline-block align-middle ml-1" /> רוצים להצטרף למשפחה?</>}
        description={<><Scissors className="w-5 h-5 inline-block align-middle ml-1" /> קבעו תור עכשיו וחוו את ההבדל</>}
        buttonLabel={<><Smartphone className="w-4 h-4" /> לקביעת תור</>}
        buttonHref={BOOKING_URL}
        variant="light"
      />
    </Layout>
  );
};

export default AboutPage;
