import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import StaggerChildren from "@/components/ui/StaggerChildren";
import SectionDivider from "@/components/ui/SectionDivider";
import { Shield, Clock, CheckCircle, Sparkles, Crown, Trophy, Waves, Gem, Smartphone, MessageCircle, HelpCircle, Target } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { WA_PERM, waLink } from "@/lib/constants";
import { usePageMeta } from "@/hooks/usePageMeta";

import permHero from "@/assets/perm-hero.jpg";
import permClassic from "@/assets/perm-classic.jpg";
import permWaves from "@/assets/perm-waves.jpg";
import permTight from "@/assets/perm-tight.jpg";
import permLight from "@/assets/perm-light.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const PermPage = () => {
  const { v, loading } = useSiteContent("perm");
  usePageMeta({ title: "פרם לגבר", description: "פרם מקצועי לגברים - גלים טבעיים, תלתלים וסטיילינג מותאם אישית" });

  if (loading) return <Layout><PageSkeleton /></Layout>;

  const defaultPermImages = [permClassic, permWaves, permTight, permLight];

  const permTypes = [1, 2, 3, 4].map((i, idx) => ({
    name: v("perm_types", `type${i}_name`, ["תלתלים קלאסיים", "גלים טבעיים", "תלתלים צפופים", "פרם קל"][idx]),
    image: v("perm_types", `type${i}_image`) || defaultPermImages[idx],
  }));

  const benefitIcons = [Shield, Clock, CheckCircle, Sparkles];
  const benefits = [1, 2, 3, 4].map((i, idx) => ({
    icon: benefitIcons[idx],
    title: v("benefits", `benefit${i}_title`, ["מוצרים איכותיים", "תוצאות ארוכות", "מראה טבעי", "שיער בריא"][idx]),
    description: v("benefits", `benefit${i}_desc`, ["מוצרים מקצועיים בלבד", "החזקה של חודשים", "תלתלים שנראים אמיתיים", "טיפול משקם ומזין"][idx]),
  }));

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "פרם לגבר" }]} />

      <HeroSplit
        title={v("hero", "title", "פרם לגבר")}
        subtitle={v("hero", "subtitle", "הראשונים והיחידים בישראל שמתמחים בזה.")}
        description={v("hero", "description", "כשכולם עוד לא האמינו שפרם לגבר זה דבר — אנחנו כבר עבדנו על זה. למדנו מהטובים בעולם, ניסינו על עצמנו, ובנינו שיטה שעובדת על השיער הישראלי. היום מגיעים אלינו מכל הארץ.")}
        primaryCta={{ label: <><Smartphone className="w-4 h-4" /> לייעוץ חינם</>, href: waLink(WA_PERM, "היי, אשמח לקבל עוד פרטים על תהליך הפרם.") }}
        image={v("hero", "image") || permHero}
      />

      <Section title={<><Gem className="w-6 h-6 inline-block align-middle ml-1" /> היתרונות שלנו</>} variant="light">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-background/10 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background/20 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm opacity-70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      <Section variant="dark">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">{v("what_is_perm", "title", "מה זה פרם?")}</h2>
            <div className="space-y-4 text-lg opacity-85">
              <p>{v("what_is_perm", "paragraph1", "פרם הוא טיפול מקצועי שמעניק לשיער גלים או תלתלים באופן קבוע למשך מספר חודשים. הטכנולוגיה התפתחה מאוד בשנים האחרונות – המוצרים בטוחים, התוצאה טבעית והשיער נשאר בריא.")}</p>
              <p><strong>למי זה מתאים?</strong> {v("what_is_perm", "paragraph2", "לכל גבר שרוצה להוסיף נפח, טקסטורה וסגנון לשיער שלו. בין אם השיער שלך ישר לגמרי ובין אם יש לך גלים קלים – פרם יכול לשדרג את הלוק שלך ברמות.")}</p>
              <p><strong>למה זה עובד היום?</strong> {v("what_is_perm", "paragraph3", "המוצרים של 2024 הם לא המוצרים של פעם. טכנולוגיה מתקדמת שומרת על בריאות השיער ונותנת תוצאה שנראית 100% טבעית.")}</p>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="triangles" />

      <Section title={<><Sparkles className="w-6 h-6 inline-block align-middle ml-1" /> סוגי פרם</>} variant="light">
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {permTypes.map((type, index) => (
              <div key={index} className="group overflow-hidden rounded-xl">
                <div className="aspect-[3/4] overflow-hidden rounded-xl border-2 border-primary-foreground">
                  <img src={type.image} alt={type.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="py-3 text-center">
                  <h3 className="font-bold text-lg">{type.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="curves" />

      <Section variant="dark">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4"><HelpCircle className="w-6 h-6 inline-block align-middle ml-1" /> רוצים לדעת איזה פרם מתאים לכם?</h2>
            <p className="text-lg opacity-80 mb-8">שלחו לנו תמונה בוואטסאפ ונייעץ לכם בחינם – בלי התחייבות.</p>
            <a href={waLink(WA_PERM, "היי, אשמח לקבל עוד פרטים על תהליך הפרם.")} target="_blank" rel="noopener noreferrer" className="whatsapp-cta">
              <Smartphone className="w-5 h-5" />
              לייעוץ חינם בוואטסאפ
            </a>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="steps" />

      <Section variant="light">
        <AnimatedSection>
          <h2 className="text-center mb-12"><HelpCircle className="w-6 h-6 inline-block align-middle ml-1" /> איך זה עובד?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src={v("process", "image") || gallery3} alt="תהליך פרם" className="rounded-xl w-full border-2 border-primary-foreground" />
            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-xl" style={{ backgroundColor: 'hsl(35, 60%, 92%)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'hsl(35, 70%, 85%)' }}>
                  <MessageCircle className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">1. {v("process", "step1_title", "ייעוץ ראשוני")}</h4>
                  <p className="opacity-70">{v("process", "step1_desc", "פגישת היכרות קצרה – מבינים מה הסגנון שמתאים לך ומתאימים את סוג הפרם")}</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl" style={{ backgroundColor: 'hsl(140, 40%, 90%)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'hsl(140, 50%, 82%)' }}>
                  <Sparkles className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">2. {v("process", "step2_title", "הטיפול")}</h4>
                  <p className="opacity-70">{v("process", "step2_desc", "כ-2 שעות של טיפול מקצועי עם מוצרים איכותיים. אתה פשוט יושב ונהנה")}</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl" style={{ backgroundColor: 'hsl(210, 50%, 92%)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'hsl(210, 55%, 84%)' }}>
                  <Trophy className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">3. {v("process", "step3_title", "תלתלים מושלמים!")}</h4>
                  <p className="opacity-70">{v("process", "step3_desc", "יוצא מהמספרה עם לוק חדש לגמרי. התוצאה נשמרת 3-6 חודשים")}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      <Section variant="dark">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 justify-center mb-6">
              <Crown className="w-8 h-8 text-accent" />
              <h2 className="mb-0">הסיפור שלנו עם הפרם</h2>
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <div className="space-y-4 text-lg opacity-85 text-center">
              <p><strong>Macho היו הראשונים בישראל</strong> {v("our_story", "paragraph1", "שהביאו את עולם הפרם לגברים לרמה מקצועית אמיתית. כשכולם עוד חשבו שפרם זה \"דבר של פעם\" – אנחנו כבר הבנו שזה הטרנד הבא.")}</p>
              <p>{v("our_story", "paragraph2", "נסענו לחו\"ל, למדנו מהטובים בעולם, הבאנו את הטכנולוגיות המתקדמות ביותר ופיתחנו שיטות עבודה ייחודיות שמותאמות לשיער ולאקלים הישראלי.")}</p>
              <p>{v("our_story", "paragraph3", "היום אנחנו גאים להיות המובילים בתחום – עם מאות גברים מרוצים שהפכו את הפרם לחלק בלתי נפרד מהסגנון שלהם.")} <strong>הניסיון שלנו הוא הביטוח שלכם.</strong></p>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="zigzag" />

      <CTASection
        title={<><Waves className="w-6 h-6 inline-block align-middle ml-1" /> רוצים תלתלים?</>}
        description={<><Target className="w-5 h-5 inline-block align-middle ml-1" /> לחצו לייעוץ חינם ללא התחייבות</>}
        buttonLabel={<><Smartphone className="w-4 h-4" /> דברו איתנו בוואטסאפ</>}
        buttonHref={waLink(WA_PERM, "היי, אשמח לקבל עוד פרטים על תהליך הפרם.")}
        variant="light"
      />
    </Layout>
  );
};

export default PermPage;
