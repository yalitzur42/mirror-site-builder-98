import Layout from "@/components/layout/Layout";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ShieldCheck } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

const PrivacyPage = () => {
  usePageMeta({ title: "מדיניות פרטיות", description: "מדיניות הפרטיות של Mac'ho" });

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "מדיניות פרטיות" }]} />

      <Section variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="mb-3">
              <ShieldCheck className="w-8 h-8 inline-block align-middle ml-2" />
              מדיניות פרטיות
            </h1>
            <p className="opacity-70"><strong>עדכון אחרון:</strong> מרץ 2026</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-extrabold mb-3">1. כללי</h2>
              <p className="opacity-80">
                Mac'ho ("אנחנו", "שלנו") מתחייבת לשמור על פרטיותך. מדיניות זו מתארת כיצד אנו אוספים, משתמשים ומגנים על המידע שלך בעת השימוש באתר שלנו.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">2. איסוף מידע</h2>
              <p className="opacity-80 mb-2">אנו עשויים לאסוף את סוגי המידע הבאים:</p>
              <ul className="list-disc pr-6 space-y-2 opacity-80">
                <li>שם מלא ופרטי קשר (טלפון, דוא"ל) בעת קביעת תור או יצירת קשר</li>
                <li>מידע טכני כגון כתובת IP, סוג דפדפן ומערכת הפעלה</li>
                <li>נתוני שימוש באתר לצורך שיפור השירות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">3. שימוש במידע</h2>
              <p className="opacity-80 mb-2">המידע שנאסף משמש אותנו למטרות הבאות:</p>
              <ul className="list-disc pr-6 space-y-2 opacity-80">
                <li>ניהול תורים ומתן שירותי ספרות</li>
                <li>יצירת קשר בנוגע לתורים, קורסים באקדמיה ועדכונים</li>
                <li>שיפור חוויית המשתמש באתר</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">4. עוגיות (Cookies)</h2>
              <p className="opacity-80">
                האתר עשוי להשתמש בעוגיות לצורך שיפור חוויית הגלישה, ניתוח תנועה באתר ושמירת העדפות. ניתן לנהל את הגדרות העוגיות דרך הדפדפן שלך.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">5. שיתוף מידע עם צדדים שלישיים</h2>
              <p className="opacity-80">
                איננו מוכרים או משתפים את המידע האישי שלך עם צדדים שלישיים, למעט ספקי שירות הנדרשים לתפעול האתר (כגון מערכת תורים).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">6. יצירת קשר</h2>
              <p className="opacity-80 mb-2">לשאלות בנוגע למדיניות הפרטיות, ניתן ליצור קשר:</p>
              <ul className="list-disc pr-6 space-y-2 opacity-80">
                <li>טלפון: 054-980-8868</li>
                <li>כתובת: המחשלים 5, עפולה</li>
              </ul>
            </section>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default PrivacyPage;
