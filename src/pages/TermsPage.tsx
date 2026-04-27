import Layout from "@/components/layout/Layout";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FileText } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

const TermsPage = () => {
  usePageMeta({ title: "תקנון האתר", description: "תנאי השימוש באתר Mac'ho" });

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "תקנון האתר" }]} />

      <Section variant="light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="mb-3">
              <FileText className="w-8 h-8 inline-block align-middle ml-2" />
              תקנון האתר
            </h1>
            <p className="opacity-70"><strong>עדכון אחרון:</strong> מרץ 2026</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-extrabold mb-3">1. כללי</h2>
              <p className="opacity-80">
                ברוכים הבאים לאתר Mac'ho. השימוש באתר מהווה הסכמה לתנאים המפורטים להלן. אם אינך מסכים לתנאים אלה, אנא הימנע משימוש באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">2. שירותים</h2>
              <p className="opacity-80">
                Mac'ho מציעה שירותי ספרות לגברים, קורסים באקדמיה ללימודי ספרות, וטיפולי פרם לגברים. פרטי השירותים, המחירים וזמני האספקה עשויים להשתנות ללא הודעה מוקדמת.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">3. קביעת תורים</h2>
              <ul className="list-disc pr-6 space-y-2 opacity-80">
                <li>קביעת תור מתבצעת דרך מערכת התורים המקוונת שלנו</li>
                <li>יש להגיע בזמן לתור שנקבע</li>
                <li>ביטול תור יתבצע לפחות 4 שעות מראש</li>
                <li>אי הגעה ללא ביטול עלולה להוביל להגבלת השירות בעתיד</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">4. קורסים ולימודים</h2>
              <p className="opacity-80">
                ההרשמה לקורסים באקדמיה כפופה לתנאים הספציפיים של כל קורס. מדיניות הביטולים וההחזרים תימסר בעת ההרשמה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">5. קניין רוחני</h2>
              <p className="opacity-80">
                כל התכנים באתר, לרבות טקסטים, תמונות, לוגו ועיצוב, הינם רכושה של Mac'ho ומוגנים בזכויות יוצרים. אין להעתיק, לשכפל או להפיץ תכנים מהאתר ללא אישור בכתב.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">6. הגבלת אחריות</h2>
              <p className="opacity-80">
                Mac'ho אינה אחראית לנזקים ישירים או עקיפים הנובעים משימוש באתר. המידע באתר מוצג "כפי שהוא" (as is) ואינו מהווה ייעוץ מקצועי.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold mb-3">7. יצירת קשר</h2>
              <p className="opacity-80 mb-2">לשאלות בנוגע לתקנון, ניתן ליצור קשר:</p>
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

export default TermsPage;
