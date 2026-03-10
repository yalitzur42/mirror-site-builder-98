import Layout from "@/components/layout/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container-main py-16">
        <h1 className="text-3xl font-bold mb-8">מדיניות פרטיות</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p><strong>עדכון אחרון:</strong> מרץ 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. כללי</h2>
            <p>
              Mac'ho ("אנחנו", "שלנו") מתחייבת לשמור על פרטיותך. מדיניות זו מתארת כיצד אנו אוספים, משתמשים ומגנים על המידע שלך בעת השימוש באתר שלנו.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. איסוף מידע</h2>
            <p>אנו עשויים לאסוף את סוגי המידע הבאים:</p>
            <ul className="list-disc pr-6 space-y-1">
              <li>שם מלא ופרטי קשר (טלפון, דוא"ל) בעת קביעת תור או יצירת קשר</li>
              <li>מידע טכני כגון כתובת IP, סוג דפדפן ומערכת הפעלה</li>
              <li>נתוני שימוש באתר לצורך שיפור השירות</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. שימוש במידע</h2>
            <p>המידע שנאסף משמש אותנו למטרות הבאות:</p>
            <ul className="list-disc pr-6 space-y-1">
              <li>ניהול תורים ומתן שירותי ספרות</li>
              <li>יצירת קשר בנוגע לתורים, קורסים באקדמיה ועדכונים</li>
              <li>שיפור חוויית המשתמש באתר</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. עוגיות (Cookies)</h2>
            <p>
              האתר עשוי להשתמש בעוגיות לצורך שיפור חוויית הגלישה, ניתוח תנועה באתר ושמירת העדפות. ניתן לנהל את הגדרות העוגיות דרך הדפדפן שלך.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. שיתוף מידע עם צדדים שלישיים</h2>
            <p>
              איננו מוכרים או משתפים את המידע האישי שלך עם צדדים שלישיים, למעט ספקי שירות הנדרשים לתפעול האתר (כגון מערכת תורים).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. יצירת קשר</h2>
            <p>לשאלות בנוגע למדיניות הפרטיות, ניתן ליצור קשר:</p>
            <ul className="list-disc pr-6 space-y-1">
              <li>טלפון: 054-4744031</li>
              <li>כתובת: המחשלים 5, עפולה</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
