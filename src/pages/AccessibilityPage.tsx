import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Accessibility } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PHONE_DISPLAY } from "@/lib/constants";

const PHONE_TEL = "+972549808868";
const CONTACT_EMAIL = "info@macho.co.il";

const AccessibilityPage = () => {
  usePageMeta({ title: "הצהרת נגישות", description: "הצהרת הנגישות של Mac'ho" });

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "הצהרת נגישות" }]} />

      <Section variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="mb-3">
              <Accessibility className="w-8 h-8 inline-block align-middle ml-2" />
              הצהרת נגישות
            </h1>
          </div>

          <div className="space-y-6 leading-loose">
            <p>
              אתר Mac'ho מחויב להנגשת התכנים והשירותים שלו לכלל הציבור, לרבות אנשים עם מוגבלות,
              בהתאם לתקן הישראלי 5568 ברמה AA ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג–2013.
            </p>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">תפריט הנגישות באתר</h2>
              <p>בכל עמוד באתר זמין כפתור נגישות צף (בצד שמאל למטה) המאפשר לבצע את ההתאמות הבאות:</p>
              <ul className="list-disc pr-6 mt-3 space-y-1">
                <li>שינוי גודל טקסט (הגדלה / הקטנה)</li>
                <li>ניגודיות גבוהה</li>
                <li>החלפת ערכת צבעים: בהיר / כהה</li>
                <li>הדגשת קישורים</li>
                <li>פונט קריא במיוחד</li>
                <li>סמן עכבר מוגדל</li>
                <li>ריווח שורות וטקסט</li>
                <li>עצירת אנימציות</li>
                <li>איפוס כל ההגדרות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">התאמות נוספות</h2>
              <ul className="list-disc pr-6 space-y-1">
                <li>ניווט מלא באמצעות מקלדת (Tab / Shift+Tab / Enter).</li>
                <li>טקסטים חלופיים (alt) לתמונות מהותיות.</li>
                <li>היררכיית כותרות סמנטית (H1–H4).</li>
                <li>תמיכה בטכנולוגיות מסייעות וקוראי מסך.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">מגבלות ידועות</h2>
              <p>
                ייתכן ובחלקים מסוימים באתר תיתקלו ברכיבים שטרם הונגשו במלואם, לרבות תכנים של צד שלישי
                (כגון מערכת קביעת תורים חיצונית). אנו פועלים באופן שוטף לשפר את הנגישות.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">פנייה לרכז הנגישות</h2>
              <p>נתקלתם בבעיית נגישות? נשמח לדעת ולתקן. ניתן לפנות אלינו:</p>
              <ul className="list-disc pr-6 mt-3 space-y-1">
                <li>בטלפון: <a href={`tel:${PHONE_TEL}`} className="underline font-bold">{PHONE_DISPLAY}</a></li>
                <li>במייל: <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-bold">{CONTACT_EMAIL}</a></li>
              </ul>
              <p className="mt-3 text-sm">
                הצהרה זו עודכנה לאחרונה בתאריך {new Date().toLocaleDateString("he-IL")}.
              </p>
            </section>

            <Link to="/" className="inline-block mt-6 underline font-bold">חזרה לדף הבית</Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default AccessibilityPage;
