// Defines the structure of all editable content on the site
// organized by page → section → fields

export interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "gallery";
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
  // ==================== דף ראשי ====================
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
          { key: "feature1_title", label: "תכונה 1 - כותרת", type: "text", defaultValue: "הכשרה מקצועית" },
          { key: "feature1_desc", label: "תכונה 1 - תיאור", type: "text", defaultValue: "תוכנית לימודים מקיפה" },
          { key: "feature2_title", label: "תכונה 2 - כותרת", type: "text", defaultValue: "קבוצות קטנות" },
          { key: "feature2_desc", label: "תכונה 2 - תיאור", type: "text", defaultValue: "יחס אישי לכל תלמיד" },
          { key: "feature3_title", label: "תכונה 3 - כותרת", type: "text", defaultValue: "תעודה מוכרת" },
          { key: "feature3_desc", label: "תכונה 3 - תיאור", type: "text", defaultValue: "הסמכה רשמית בסיום" },
          { key: "feature4_title", label: "תכונה 4 - כותרת", type: "text", defaultValue: "מרצים מובילים" },
          { key: "feature4_desc", label: "תכונה 4 - תיאור", type: "text", defaultValue: "הטובים בתחום" },
        ],
      },
      {
        key: "gallery",
        title: "מהעבודות שלנו",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מהעבודות שלנו" },
          { key: "images", label: "תמונות עבודות", type: "gallery", defaultValue: "[]" },
        ],
      },
      {
        key: "perm",
        title: "פרם לגבר",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "פרם לגבר" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "תלתלים מושלמים לגברים. טכנולוגיה מתקדמת, תוצאות מוכחות ושירות מקצועי." },
          { key: "bullet1", label: "נקודה 1", type: "text", defaultValue: "מוצרים איכותיים ובטוחים" },
          { key: "bullet2", label: "נקודה 2", type: "text", defaultValue: "תוצאות מהירות וארוכות טווח" },
          { key: "bullet3", label: "נקודה 3", type: "text", defaultValue: "התאמה אישית לסגנון שלך" },
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

  // ==================== אודות ====================
  {
    slug: "about",
    title: "אודות",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "אודות Macho" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "הסיפור שלנו" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "Macho נוסדה מתוך תשוקה אמיתית לספרות גברים ורצון להביא שינוי לתחום. אנחנו מאמינים שכל גבר ראוי לטיפוח מקצועי ואיכותי." },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "who_we_are",
        title: "מי אנחנו?",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מי אנחנו?" },
          { key: "paragraph1", label: "פסקה 1", type: "textarea", defaultValue: "Macho הוקמה בשנת 2015 בעפולה, והפכה במהרה למוקד מוביל בתחום הספרות לגברים בישראל. מה שהתחיל כמספרה קטנה התפתח לרשת שכוללת מספרה, אקדמיה ללימודי ספרות ופרם מקצועי לגברים." },
          { key: "paragraph2", label: "פסקה 2", type: "textarea", defaultValue: "הצוות שלנו מונה ספרים מקצועיים ומנוסים, שעוברים הכשרות מתמידות ומתעדכנים בטרנדים החדשים ביותר מכל העולם." },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "values",
        title: "המשימה, החזון, הערכים",
        fields: [
          { key: "mission_title", label: "כרטיס 1 - כותרת", type: "text", defaultValue: "המשימה שלנו" },
          { key: "mission_desc", label: "כרטיס 1 - תיאור", type: "textarea", defaultValue: "להעניק לכל גבר חוויית טיפוח מקצועית, אישית ואיכותית שתגרום לו להרגיש בטוח ומטופח." },
          { key: "vision_title", label: "כרטיס 2 - כותרת", type: "text", defaultValue: "החזון שלנו" },
          { key: "vision_desc", label: "כרטיס 2 - תיאור", type: "textarea", defaultValue: "להפוך למותג המוביל בישראל בתחום הטיפוח לגברים, ולהכשיר את הדור הבא של הספרים המובילים." },
          { key: "values_title", label: "כרטיס 3 - כותרת", type: "text", defaultValue: "הערכים שלנו" },
          { key: "values_desc", label: "כרטיס 3 - תיאור", type: "textarea", defaultValue: "מקצועיות, יחס אישי, חדשנות מתמדת ומחויבות לשביעות רצון מלאה של הלקוחות." },
        ],
      },
    ],
  },

  // ==================== מספרת גברים ====================
  {
    slug: "barbershop",
    title: "מספרת גברים",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מספרת גברים" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "תספורות ברמה אחרת" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "חוויית ספרות מקצועית עם יחס אישי. הספרים שלנו מתמחים בכל סגנונות התספורות - מקלאסי ועד מודרני." },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "pricing",
        title: "מחירון",
        fields: [
          { key: "barber1_name", label: "ספר 1 - שם", type: "text", defaultValue: "ליאב" },
          { key: "barber1_name_en", label: "ספר 1 - שם באנגלית", type: "text", defaultValue: "LIAV" },
          { key: "barber1_image", label: "ספר 1 - תמונה", type: "image", defaultValue: "" },
          { key: "barber1_prices", label: "ספר 1 - מחירים (מופרד בפסיקים)", type: "text", defaultValue: "70,80,70,100" },
          { key: "barber2_name", label: "ספר 2 - שם", type: "text", defaultValue: "נהוראי" },
          { key: "barber2_name_en", label: "ספר 2 - שם באנגלית", type: "text", defaultValue: "NEHORAY" },
          { key: "barber2_image", label: "ספר 2 - תמונה", type: "image", defaultValue: "" },
          { key: "barber2_prices", label: "ספר 2 - מחירים (מופרד בפסיקים)", type: "text", defaultValue: "70,90,80,100" },
          { key: "barber3_name", label: "ספר 3 - שם", type: "text", defaultValue: "יהלי" },
          { key: "barber3_name_en", label: "ספר 3 - שם באנגלית", type: "text", defaultValue: "YALI" },
          { key: "barber3_image", label: "ספר 3 - תמונה", type: "image", defaultValue: "" },
          { key: "barber3_prices", label: "ספר 3 - מחירים (מופרד בפסיקים)", type: "text", defaultValue: "100,120,100,130" },
          { key: "service1", label: "שירות 1", type: "text", defaultValue: "תספורת גבר בלבד" },
          { key: "service2", label: "שירות 2", type: "text", defaultValue: "תספורת גבר וזקן" },
          { key: "service3", label: "שירות 3", type: "text", defaultValue: "תספורת חייל בסדיר" },
          { key: "service3_note", label: "שירות 3 - הערה", type: "text", defaultValue: "(נוער עד גיל 18)" },
          { key: "service4", label: "שירות 4", type: "text", defaultValue: "תספורת MAKEOVER" },
        ],
      },
      {
        key: "gallery",
        title: "מהעבודות שלנו",
        fields: [
          { key: "images", label: "תמונות עבודות", type: "gallery", defaultValue: "[]" },
        ],
      },
      {
        key: "stats",
        title: "נתונים",
        fields: [
          { key: "stat1_number", label: "נתון 1 - מספר", type: "text", defaultValue: "15+" },
          { key: "stat1_label", label: "נתון 1 - תיאור", type: "text", defaultValue: "שנות ניסיון" },
          { key: "stat2_number", label: "נתון 2 - מספר", type: "text", defaultValue: "10K+" },
          { key: "stat2_label", label: "נתון 2 - תיאור", type: "text", defaultValue: "לקוחות מרוצים" },
          { key: "stat3_number", label: "נתון 3 - מספר", type: "text", defaultValue: "5★" },
          { key: "stat3_label", label: "נתון 3 - תיאור", type: "text", defaultValue: "דירוג ממוצע" },
        ],
      },
      {
        key: "join_team",
        title: "ספר שרוצה להצטרף לצוות?",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "ספר שרוצה להצטרף לצוות?" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "אנחנו תמיד מחפשים ספרים מוכשרים שרוצים להתפתח ולעבוד בסביבה מקצועית ותומכת. אם אתה חושב שאתה מתאים – דבר איתנו." },
        ],
      },
    ],
  },

  // ==================== פרם לגבר ====================
  {
    slug: "perm",
    title: "פרם לגבר",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "פרם לגבר" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "תלתלים מושלמים לגברים" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "תלתלים וגלים טבעיים לגברים. טכניקות מתקדמות, מראה טבעי ושירות מקצועי. Macho – החלוצים בפרם לגברים בישראל." },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "benefits",
        title: "היתרונות שלנו",
        fields: [
          { key: "benefit1_title", label: "יתרון 1 - כותרת", type: "text", defaultValue: "מוצרים איכותיים" },
          { key: "benefit1_desc", label: "יתרון 1 - תיאור", type: "text", defaultValue: "מוצרים מקצועיים בלבד" },
          { key: "benefit2_title", label: "יתרון 2 - כותרת", type: "text", defaultValue: "תוצאות ארוכות" },
          { key: "benefit2_desc", label: "יתרון 2 - תיאור", type: "text", defaultValue: "החזקה של חודשים" },
          { key: "benefit3_title", label: "יתרון 3 - כותרת", type: "text", defaultValue: "מראה טבעי" },
          { key: "benefit3_desc", label: "יתרון 3 - תיאור", type: "text", defaultValue: "תלתלים שנראים אמיתיים" },
          { key: "benefit4_title", label: "יתרון 4 - כותרת", type: "text", defaultValue: "שיער בריא" },
          { key: "benefit4_desc", label: "יתרון 4 - תיאור", type: "text", defaultValue: "טיפול משקם ומזין" },
        ],
      },
      {
        key: "what_is_perm",
        title: "מה זה פרם?",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מה זה פרם?" },
          { key: "paragraph1", label: "פסקה 1", type: "textarea", defaultValue: "פרם הוא טיפול מקצועי שמעניק לשיער גלים או תלתלים באופן קבוע למשך מספר חודשים. הטכנולוגיה התפתחה מאוד בשנים האחרונות – המוצרים בטוחים, התוצאה טבעית והשיער נשאר בריא." },
          { key: "paragraph2", label: "למי זה מתאים?", type: "textarea", defaultValue: "לכל גבר שרוצה להוסיף נפח, טקסטורה וסגנון לשיער שלו. בין אם השיער שלך ישר לגמרי ובין אם יש לך גלים קלים – פרם יכול לשדרג את הלוק שלך ברמות." },
          { key: "paragraph3", label: "למה זה עובד היום?", type: "textarea", defaultValue: "המוצרים של 2024 הם לא המוצרים של פעם. טכנולוגיה מתקדמת שומרת על בריאות השיער ונותנת תוצאה שנראית 100% טבעית." },
        ],
      },
      {
        key: "perm_types",
        title: "סוגי פרם",
        fields: [
          { key: "type1_name", label: "סוג 1 - שם", type: "text", defaultValue: "תלתלים קלאסיים" },
          { key: "type1_image", label: "סוג 1 - תמונה", type: "image", defaultValue: "" },
          { key: "type2_name", label: "סוג 2 - שם", type: "text", defaultValue: "גלים טבעיים" },
          { key: "type2_image", label: "סוג 2 - תמונה", type: "image", defaultValue: "" },
          { key: "type3_name", label: "סוג 3 - שם", type: "text", defaultValue: "תלתלים צפופים" },
          { key: "type3_image", label: "סוג 3 - תמונה", type: "image", defaultValue: "" },
          { key: "type4_name", label: "סוג 4 - שם", type: "text", defaultValue: "פרם קל" },
          { key: "type4_image", label: "סוג 4 - תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "process",
        title: "איך זה עובד?",
        fields: [
          { key: "step1_title", label: "שלב 1 - כותרת", type: "text", defaultValue: "ייעוץ ראשוני" },
          { key: "step1_desc", label: "שלב 1 - תיאור", type: "textarea", defaultValue: "פגישת היכרות קצרה – מבינים מה הסגנון שמתאים לך ומתאימים את סוג הפרם" },
          { key: "step2_title", label: "שלב 2 - כותרת", type: "text", defaultValue: "הטיפול" },
          { key: "step2_desc", label: "שלב 2 - תיאור", type: "textarea", defaultValue: "כ-2 שעות של טיפול מקצועי עם מוצרים איכותיים. אתה פשוט יושב ונהנה" },
          { key: "step3_title", label: "שלב 3 - כותרת", type: "text", defaultValue: "תלתלים מושלמים!" },
          { key: "step3_desc", label: "שלב 3 - תיאור", type: "textarea", defaultValue: "יוצא מהמספרה עם לוק חדש לגמרי. התוצאה נשמרת 3-6 חודשים" },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "our_story",
        title: "הסיפור שלנו עם הפרם",
        fields: [
          { key: "paragraph1", label: "פסקה 1", type: "textarea", defaultValue: "Macho היו הראשונים בישראל שהביאו את עולם הפרם לגברים לרמה מקצועית אמיתית. כשכולם עוד חשבו שפרם זה \"דבר של פעם\" – אנחנו כבר הבנו שזה הטרנד הבא." },
          { key: "paragraph2", label: "פסקה 2", type: "textarea", defaultValue: "נסענו לחו\"ל, למדנו מהטובים בעולם, הבאנו את הטכנולוגיות המתקדמות ביותר ופיתחנו שיטות עבודה ייחודיות שמותאמות לשיער ולאקלים הישראלי." },
          { key: "paragraph3", label: "פסקה 3", type: "textarea", defaultValue: "היום אנחנו גאים להיות המובילים בתחום – עם מאות גברים מרוצים שהפכו את הפרם לחלק בלתי נפרד מהסגנון שלהם. הניסיון שלנו הוא הביטוח שלכם." },
        ],
      },
    ],
  },

  // ==================== האקדמיה – קורס למתחילים ====================
  {
    slug: "academy",
    title: "האקדמיה – קורס למתחילים",
    sections: [
      {
        key: "hero",
        title: "סקשן ראשי",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "האקדמיה של Macho" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "הפוך את התשוקה למקצוע" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "קורס מקיף לספרות גברים למתחילים ללא ניסיון קודם. תלמדו את כל הבסיס הדרוש להתחיל קריירה מצליחה." },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "stats",
        title: "נתונים",
        fields: [
          { key: "stat1_number", label: "נתון 1 - מספר", type: "text", defaultValue: "15+" },
          { key: "stat1_label", label: "נתון 1 - תיאור", type: "text", defaultValue: "שנות ניסיון בהוראה" },
          { key: "stat2_number", label: "נתון 2 - מספר", type: "text", defaultValue: "500+" },
          { key: "stat2_label", label: "נתון 2 - תיאור", type: "text", defaultValue: "בוגרים עובדים בתעשייה" },
          { key: "stat3_number", label: "נתון 3 - מספר", type: "text", defaultValue: "98%" },
          { key: "stat3_label", label: "נתון 3 - תיאור", type: "text", defaultValue: "שביעות רצון תלמידים" },
          { key: "stat4_number", label: "נתון 4 - מספר", type: "text", defaultValue: "12" },
          { key: "stat4_label", label: "נתון 4 - תיאור", type: "text", defaultValue: "מחזורים בשנה" },
        ],
      },
      {
        key: "details",
        title: "פרטי הקורס",
        fields: [
          { key: "duration", label: "משך הקורס", type: "text", defaultValue: "3 חודשים" },
          { key: "class_size", label: "גודל הכיתה", type: "text", defaultValue: "עד 8 תלמידים" },
          { key: "certificate", label: "תעודה", type: "text", defaultValue: "הסמכה רשמית" },
          { key: "next_cohort", label: "תאריך מחזור הבא", type: "text", defaultValue: "2026-04-15" },
        ],
      },
      {
        key: "modules",
        title: "תכני הקורס",
        fields: [
          { key: "module1", label: "מודול 1", type: "text", defaultValue: "מבוא לספרות גברים" },
          { key: "module2", label: "מודול 2", type: "text", defaultValue: "כלי עבודה והיגיינה" },
          { key: "module3", label: "מודול 3", type: "text", defaultValue: "טכניקות בסיסיות" },
          { key: "module4", label: "מודול 4", type: "text", defaultValue: "תספורות קלאסיות" },
          { key: "module5", label: "מודול 5", type: "text", defaultValue: "עיצוב זקן בסיסי" },
          { key: "module6", label: "מודול 6", type: "text", defaultValue: "שירות לקוחות ומכירה" },
        ],
      },
      {
        key: "why_us",
        title: "למה ללמוד אצלנו?",
        fields: [
          { key: "feature1_title", label: "תכונה 1 - כותרת", type: "text", defaultValue: "הכשרה מעשית" },
          { key: "feature1_desc", label: "תכונה 1 - תיאור", type: "text", defaultValue: "לומדים תוך כדי עבודה אמיתית" },
          { key: "feature2_title", label: "תכונה 2 - כותרת", type: "text", defaultValue: "קבוצות קטנות" },
          { key: "feature2_desc", label: "תכונה 2 - תיאור", type: "text", defaultValue: "עד 8 תלמידים בכיתה" },
          { key: "feature3_title", label: "תכונה 3 - כותרת", type: "text", defaultValue: "תעודה מוכרת" },
          { key: "feature3_desc", label: "תכונה 3 - תיאור", type: "text", defaultValue: "הסמכה רשמית בסיום" },
          { key: "feature4_title", label: "תכונה 4 - כותרת", type: "text", defaultValue: "גמישות בשעות" },
          { key: "feature4_desc", label: "תכונה 4 - תיאור", type: "text", defaultValue: "מסלולי בוקר/ערב" },
          { key: "feature5_title", label: "תכונה 5 - כותרת", type: "text", defaultValue: "חומרי לימוד" },
          { key: "feature5_desc", label: "תכונה 5 - תיאור", type: "text", defaultValue: "ערכת ציוד מקצועית לכל תלמיד" },
          { key: "feature6_title", label: "תכונה 6 - כותרת", type: "text", defaultValue: "ליווי אישי" },
          { key: "feature6_desc", label: "תכונה 6 - תיאור", type: "text", defaultValue: "תמיכה גם אחרי הקורס" },
        ],
      },
      {
        key: "faq",
        title: "שאלות נפוצות",
        fields: [
          { key: "q1", label: "שאלה 1", type: "text", defaultValue: "צריך ניסיון קודם?" },
          { key: "a1", label: "תשובה 1", type: "textarea", defaultValue: "לא. הקורס מיועד למתחילים. מתחילים מהבסיס ומתקדמים לתרגול מעשי בהדרגה." },
          { key: "q2", label: "שאלה 2", type: "text", defaultValue: "כמה פעמים בשבוע לומדים?" },
          { key: "a2", label: "תשובה 2", type: "textarea", defaultValue: "בד״כ 2–3 מפגשים בשבוע (תלוי במסלול)." },
          { key: "q3", label: "שאלה 3", type: "text", defaultValue: "האם מקבלים תעודה?" },
          { key: "a3", label: "תשובה 3", type: "textarea", defaultValue: "כן. בסיום הקורס ובהשלמת המטלות תקבלו תעודת הסמכה רשמית." },
          { key: "q4", label: "שאלה 4", type: "text", defaultValue: "יש ליווי אחרי הקורס?" },
          { key: "a4", label: "תשובה 4", type: "textarea", defaultValue: "כן. יש קבוצת בוגרים/מנטורינג והכוונה להשתלבות במספרות." },
          { key: "q5", label: "שאלה 5", type: "text", defaultValue: "מה לגבי ציוד?" },
          { key: "a5", label: "תשובה 5", type: "textarea", defaultValue: "כולל ערכת ציוד מקצועית בסיסית לכל תלמיד." },
        ],
      },
      {
        key: "cta",
        title: "קריאה לפעולה",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מוכנים להתחיל קריירה חדשה?" },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "הקורס למתחילים הוא הצעד הראשון בדרך לקריירה מצליחה בעולם הספרות." },
          { key: "note", label: "הערה", type: "text", defaultValue: "כולל ערכת ציוד מקצועית מלאה" },
        ],
      },
    ],
  },
];
