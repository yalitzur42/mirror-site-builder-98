import Layout from "@/components/layout/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <div className="container-main py-16">
        <h1 className="text-3xl font-bold mb-8">תקנון האתר</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p><strong>עדכון אחרון:</strong> מרץ 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. כללי</h2>
            <p>
              ברוכים הבאים לאתר Mac'ho. השימוש באתר מהווה הסכמה לתנאים המפורטים להלן. אם אינך מסכים לתנאים אלה, אנא הימנע משימוש באתר.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. שירותים</h2>
            <p>
              Mac'ho מציעה שירותי ספרות לגברים, קורסים באקדמיה ללימודי ספרות, וטיפולי פרם לגברים. פרטי השירותים, המחירים וזמני האספקה עשויים להשתנות ללא הודעה מוקדמת.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. קביעת תורים</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>קביעת תור מתבצעת דרך מערכת התורים המקוונת שלנו</li>
              <li>יש להגיע בזמן לתור שנקבע</li>
              <li>ביטול תור יתבצע לפחות 4 שעות מראש</li>
              <li>אי הגעה ללא ביטול עלולה להוביל להגבלת השירות בעתיד</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. קורסים ולימודים</h2>
            <p>
              ההרשמה לקורסים באקדמיה כפופה לתנאים הספציפיים של כל קורס. מדיניות הביטולים וההחזרים תימסר בעת ההרשמה.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. קניין רוחני</h2>
            <p>
              כל התכנים באתר, לרבות טקסטים, תמונות, לוגו ועיצוב, הינם רכושה של Mac'ho ומוגנים בזכויות יוצרים. אין להעתיק, לשכפל או להפיץ תכנים מהאתר ללא אישור בכתב.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. הגבלת אחריות</h2>
            <p>
              Mac'ho אינה אחראית לנזקים ישירים או עקיפים הנובעים משימוש באתר. המידע באתר מוצג "כפי שהוא" (as is) ואינו מהווה ייעוץ מקצועי.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. יצירת קשר</h2>
            <p>לשאלות בנוגע לתקנון, ניתן ליצור קשר:</p>
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

export default TermsPage;
