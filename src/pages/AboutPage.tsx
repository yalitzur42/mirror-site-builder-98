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
import { usePageMeta } from "@/hooks/usePageMeta";

import teamPhoto from "@/assets/team-photo.jpg";

const AboutPage = () => {
  const { v, loading } = useSiteContent("about");
  usePageMeta({ title: "אודות", description: "הכירו את Mac'ho - הסיפור, הצוות והחזון שלנו" });

  if (loading) return <Layout><PageSkeleton /></Layout>;

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "אודות" }]} />
      
      <HeroSplit
        title={v("hero", "title", "אודות Macho")}
        subtitle={v("hero", "subtitle", "הסיפור שמאחורי המספרה")}
        description={v("hero", "description", "מאצו לא נפתחה מתוך תוכנית עסקית. היא נפתחה כי יהלי רצה לבנות מקום שגבר יכנס אליו ויצא עם חוויה אמיתית — לא רק תספורת.")}
        image={v("hero", "image") || teamPhoto}
      />

      <Section variant="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={v("who_we_are", "image") || teamPhoto} alt="הצוות שלנו" className="rounded-lg w-full max-w-md mx-auto border-2 border-primary-foreground" />
          <div>
            <h2 className="mb-6"><Handshake className="w-6 h-6 inline-block align-middle ml-1" /> {v("who_we_are", "title", "מי אנחנו")}</h2>
            <div className="space-y-4 opacity-80">
              <p>{v("who_we_are", "paragraph1", "מאצו נפתחה ב-2022 בעפולה. התחלנו כמספרת גברים, הוספנו פרם לגבר שלא היה קיים בישראל, ופתחנו אקדמיה מתוך רצון לחלוק את מה שלמדנו. מאצו גדל כי הלקוחות גדלו איתנו.")}</p>
              <p>{v("who_we_are", "paragraph2", "הצוות שלנו — 4 ספרים וקוסמטיקאית — כולם הוכשרו על ידי יהלי. אותה שיטה, אותו סטנדרט. הלקוח לא תלוי במי שיצא לו.")}</p>
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
            <p className="text-secondary-foreground opacity-70">{v("values", "mission_desc", "לתת לכל גבר שנכנס אלינו חוויה שהוא לא מצפה לה — ומוצא את עצמו חוזר בגללה.")}</p>
          </div>
          <div className="text-center p-8 bg-secondary rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
              <Eye className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary-foreground">{v("values", "vision_title", "החזון שלנו")}</h3>
            <p className="text-secondary-foreground opacity-70">{v("values", "vision_desc", "להפוך את מאצו למקום שגברים מגיעים אליו לא כי הוא קרוב, אלא כי אין כמוהו.")}</p>
          </div>
          <div className="text-center p-8 bg-secondary rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
              <Heart className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-secondary-foreground">{v("values", "values_title", "הערכים שלנו")}</h3>
            <p className="text-secondary-foreground opacity-70">{v("values", "values_desc", "עמידה בזמנים, דיבור ישיר, שירות שמכבד את הלקוח — ותספורת שתישאר טובה גם שלושה שבועות אחרי.")}</p>
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
