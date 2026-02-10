import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import StaggerChildren from "@/components/ui/StaggerChildren";
import { Shield, Clock, CheckCircle, Sparkles, Crown, Trophy } from "lucide-react";

import permHero from "@/assets/perm-hero.jpg";
import permClassic from "@/assets/perm-classic.jpg";
import permWaves from "@/assets/perm-waves.jpg";
import permTight from "@/assets/perm-tight.jpg";
import permLight from "@/assets/perm-light.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const PermPage = () => {
  const permTypes = [
    { name: "תלתלים קלאסיים", image: permClassic },
    { name: "גלים טבעיים", image: permWaves },
    { name: "תלתלים צפופים", image: permTight },
    { name: "פרם קל", image: permLight },
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
        description="תלתלים וגלים טבעיים לגברים. טכניקות מתקדמות, מראה טבעי ושירות מקצועי. Macho – החלוצים בפרם לגברים בישראל."
        primaryCta={{ label: "📲 לייעוץ חינם", href: "https://wa.me/972544744031?text=היי, אני מעוניין בייעוץ לפרם לגבר" }}
        image={permHero}
      />

      {/* היתרונות */}
      <Section title="היתרונות שלנו" variant="light" isFirstSection>
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

      {/* מה זה פרם? */}
      <Section variant="dark">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">מה זה פרם?</h2>
            <div className="space-y-4 text-lg opacity-85">
              <p>
                פרם הוא טיפול מקצועי שמעניק לשיער גלים או תלתלים באופן קבוע למשך מספר חודשים. 
                הטכנולוגיה התפתחה מאוד בשנים האחרונות – המוצרים בטוחים, התוצאה טבעית והשיער נשאר בריא.
              </p>
              <p>
                <strong>למי זה מתאים?</strong> לכל גבר שרוצה להוסיף נפח, טקסטורה וסגנון לשיער שלו. 
                בין אם השיער שלך ישר לגמרי ובין אם יש לך גלים קלים – פרם יכול לשדרג את הלוק שלך ברמות.
              </p>
              <p>
                <strong>למה זה עובד היום?</strong> המוצרים של 2024 הם לא המוצרים של פעם. 
                טכנולוגיה מתקדמת שומרת על בריאות השיער ונותנת תוצאה שנראית 100% טבעית.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* סוגי פרם */}
      <Section title="סוגי פרם" variant="light">
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {permTypes.map((type, index) => (
              <div key={index} className="group overflow-hidden rounded-xl">
                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="py-3 text-center">
                  <h3 className="font-bold text-lg">{type.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      {/* CTA ייעוץ */}
      <Section variant="dark">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">רוצים לדעת איזה פרם מתאים לכם?</h2>
            <p className="text-lg opacity-80 mb-8">
              שלחו לנו תמונה בוואטסאפ ונייעץ לכם בחינם – בלי התחייבות.
            </p>
            <a
              href="https://wa.me/972544744031?text=היי, אני מעוניין בייעוץ לפרם לגבר"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-cta"
            >
              📲 לייעוץ חינם בוואטסאפ
            </a>
          </div>
        </AnimatedSection>
      </Section>

      {/* איך זה עובד – צבעוני ואימוג'י */}
      <Section variant="light">
        <AnimatedSection>
          <h2 className="text-center mb-12">איך זה עובד? 🤔</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src={gallery3} alt="תהליך פרם" className="rounded-xl w-full" />
            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-xl" style={{ backgroundColor: 'hsl(35, 60%, 92%)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0" style={{ backgroundColor: 'hsl(35, 70%, 85%)' }}>
                  💬
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">1. ייעוץ ראשוני</h4>
                  <p className="opacity-70">פגישת היכרות קצרה – מבינים מה הסגנון שמתאים לך ומתאימים את סוג הפרם 🎯</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl" style={{ backgroundColor: 'hsl(140, 40%, 90%)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0" style={{ backgroundColor: 'hsl(140, 50%, 82%)' }}>
                  ✨
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">2. הטיפול</h4>
                  <p className="opacity-70">כ-2 שעות של טיפול מקצועי עם מוצרים איכותיים. אתה פשוט יושב ונהנה ☕</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl" style={{ backgroundColor: 'hsl(210, 50%, 92%)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0" style={{ backgroundColor: 'hsl(210, 55%, 84%)' }}>
                  🔥
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">3. תלתלים מושלמים!</h4>
                  <p className="opacity-70">יוצא מהמספרה עם לוק חדש לגמרי. התוצאה נשמרת 3-6 חודשים 💪</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* הסיפור של Macho והפרם */}
      <Section variant="dark">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 justify-center mb-6">
              <Crown className="w-8 h-8 text-accent" />
              <h2 className="mb-0">הסיפור שלנו עם הפרם</h2>
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <div className="space-y-4 text-lg opacity-85 text-center">
              <p>
                <strong>Macho היו הראשונים בישראל</strong> שהביאו את עולם הפרם לגברים לרמה מקצועית אמיתית. 
                כשכולם עוד חשבו שפרם זה "דבר של פעם" – אנחנו כבר הבנו שזה הטרנד הבא.
              </p>
              <p>
                נסענו לחו"ל, למדנו מהטובים בעולם, הבאנו את הטכנולוגיות המתקדמות ביותר 
                ופיתחנו שיטות עבודה ייחודיות שמותאמות לשיער ולאקלים הישראלי.
              </p>
              <p>
                היום אנחנו גאים להיות המובילים בתחום – עם מאות גברים מרוצים שהפכו 
                את הפרם לחלק בלתי נפרד מהסגנון שלהם. <strong>הניסיון שלנו הוא הביטוח שלכם.</strong>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <CTASection
        title="רוצים תלתלים?"
        description="לחצו לייעוץ חינם ללא התחייבות"
        buttonLabel="📲 דברו איתנו בוואטסאפ"
        buttonHref="https://wa.me/972544744031?text=היי, אני מעוניין בפרם לגבר"
        variant="light"
      />
    </Layout>
  );
};

export default PermPage;
