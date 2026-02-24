// Defines the structure of all editable content on the site
// organized by page → section → fields

export interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
  defaultValue: string;
}

export interface ContentSection {
  key: string;
  title: string;
  fields: ContentField[];
}

export interface PageConfig {
  slug: string;
  title: string;
  sections: ContentSection[];
}

export const siteContentConfig: PageConfig[] = [
  {
    slug: "home",
    title: "דף ראשי",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי (Hero)",
        fields: [
          { key: "badge", label: "תגית עליונה", type: "text", defaultValue: "אהלן גבר, ברוך הבא!" },
          { key: "title", label: "כותרת ראשית", type: "text", defaultValue: "משפחת Macho" },
          { key: "subtitle", label: "כותרת משנה", type: "text", defaultValue: "מובילים את סצנת טיפוח השיער לגברים בישראל!" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "מאקדמיה ללימודי ספרות גברים, דרך מספרה ברמה אחרת ופרם מקצועי לגברים. אנחנו מאמינים ב'פרא מסודר' – לקבל את הפרא שיש בך ולנקות את המיותר." },
          { key: "image", label: "תמונת רקע", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "services",
        title: "מה תמצאו אצלנו?",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מה תמצאו אצלנו?" },
          { key: "card1_title", label: "כרטיס 1 - כותרת", type: "text", defaultValue: "לימודי ספרות גברים" },
          { key: "card1_image", label: "כרטיס 1 - תמונה", type: "image", defaultValue: "" },
          { key: "card2_title", label: "כרטיס 2 - כותרת", type: "text", defaultValue: "תספורות גברים" },
          { key: "card2_image", label: "כרטיס 2 - תמונה", type: "image", defaultValue: "" },
          { key: "card3_title", label: "כרטיס 3 - כותרת", type: "text", defaultValue: "פרם לגבר" },
          { key: "card3_image", label: "כרטיס 3 - תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "academy",
        title: "האקדמיה של Macho",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "האקדמיה של Macho" },
          { key: "subtitle", label: "תיאור", type: "textarea", defaultValue: "הפוך את התשוקה שלך למקצוע. הצטרף לאקדמיה המובילה בישראל ללימודי ספרות גברים." },
        ],
      },
      {
        key: "perm",
        title: "פרם לגבר",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "פרם לגבר" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "תלתלים מושלמים לגברים. טכנולוגיה מתקדמת, תוצאות מוכחות ושירות מקצועי." },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "about_preview",
        title: "Macho – יותר מסתם מספרה",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "Macho – יותר מסתם מספרה" },
          { key: "paragraph1", label: "פסקה 1", type: "textarea", defaultValue: "Macho נוסדה מתוך אהבה אמיתית למקצוע הספרות ורצון להעלות את רמת השירות לגברים בישראל. אנחנו מאמינים שכל גבר מגיע ליחס אישי, מקצועי ואיכותי." },
          { key: "paragraph2", label: "פסקה 2", type: "textarea", defaultValue: "הצוות שלנו עובר הכשרות מתמידות ומעודכן בטרנדים האחרונים מכל העולם. אנחנו גאים להביא את הטוב ביותר ללקוחות שלנו." },
          { key: "paragraph3", label: "פסקה 3", type: "textarea", defaultValue: "בין אם אתה מחפש תספורת קלאסית, עיצוב זקן מדויק או פרם מושלם – ב-Macho תמצא את הכל תחת קורת גג אחת." },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "owner",
        title: "הכירו את יהלי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "הכירו את יהלי" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "יהלי צור – מייסד Macho" },
          { key: "paragraph1", label: "פסקה 1", type: "textarea", defaultValue: "עם ניסיון של למעלה מ-15 שנה בתחום הספרות, ישראל הקים את Macho מתוך חזון להביא שינוי אמיתי לעולם הטיפוח לגברים בישראל." },
          { key: "paragraph2", label: "פסקה 2", type: "textarea", defaultValue: "בוגר קורסים מובילים בארץ ובעולם, ישראל משלב ידע מקצועי עמוק עם גישה אישית וחמה לכל לקוח." },
          { key: "image", label: "תמונת המייסד", type: "image", defaultValue: "" },
        ],
      },
    ],
  },
  {
    slug: "about",
    title: "אודות",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "הסיפור שלנו" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "" },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
    ],
  },
  {
    slug: "barbershop",
    title: "מספרת גברים",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "" },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
    ],
  },
  {
    slug: "perm",
    title: "פרם לגבר",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "" },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
    ],
  },
  {
    slug: "academy",
    title: "אקדמיה",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "" },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
    ],
  },
];
