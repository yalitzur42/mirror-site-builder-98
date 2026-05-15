import { Link } from "react-router-dom";
import { PHONE_DISPLAY } from "@/lib/constants";

const PHONE_TEL = "+972549808868";
const CONTACT_EMAIL = "info@macho.co.il";

const AccessibilityPage = () => {
  return (
    <div className="container-main py-12 max-w-3xl">
      <Link to="/" className="text-primary underline text-sm">חזרה לדף הבית</Link>
      <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">הצהרת נגישות</h1>

      <div className="space-y-6 text-foreground/90 leading-loose">
        <p>
          אתר Mac'ho מחויב להנגשת התכנים והשירותים שלו לכלל הציבור, לרבות אנשים עם מוגבלות,
          בהתאם לתקן הישראלי 5568 ברמה AA ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג–2013.
        </p>

        <section>
          <h2 className="text-2xl font-extrabold mb-3">תפריט הנגישות באתר</h2>
          <p>בכל עמוד באתר זמין כפתור נגישות צף (בצד שמאל למטה) המאפשר לבצע את ההתאמות הבאות:</p>
          <ul className="list-disc pr-6 mt-3 space-y-1">
            <li>שינוי גודל טקסט</li>
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
            <li>בטלפון: <a href={`tel:${PHONE_NUMBER}`} className="underline text-primary">{PHONE_DISPLAY}</a></li>
            <li>במייל: <a href={`mailto:${CONTACT_EMAIL}`} className="underline text-primary">{CONTACT_EMAIL}</a></li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            הצהרה זו עודכנה לאחרונה בתאריך {new Date().toLocaleDateString("he-IL")}.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AccessibilityPage;
