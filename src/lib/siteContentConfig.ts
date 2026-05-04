// Defines the structure of all editable content on the site
// organized by page → section → fields

export interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "gallery" | "video";
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
          { key: "subtitle", label: "תיאור", type: "textarea", defaultValue: "" },
          { key: "feature1_title", label: "תכונה 1 - כותרת", type: "text", defaultValue: "הכשרה מקצועית" },
          { key: "feature1_desc", label: "תכונה 1 - תיאור", type: "text", defaultValue: "" },
          { key: "feature2_title", label: "תכונה 2 - כותרת", type: "text", defaultValue: "קבוצות קטנות" },
          { key: "feature2_desc", label: "תכונה 2 - תיאור", type: "text", defaultValue: "" },
          { key: "feature3_title", label: "תכונה 3 - כותרת", type: "text", defaultValue: "תעודה מוכרת" },
          { key: "feature3_desc", label: "תכונה 3 - תיאור", type: "text", defaultValue: "" },
          { key: "feature4_title", label: "תכונה 4 - כותרת", type: "text", defaultValue: "מרצים מובילים" },
          { key: "feature4_desc", label: "תכונה 4 - תיאור", type: "text", defaultValue: "" },
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
          { key: "paragraph2", label: "פסקה 2", type: "textarea", defaultValue: "" },
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
  // הסקשנים מסודרים לפי הסדר בעמוד מלמעלה למטה
  {
    slug: "academy",
    title: "האקדמיה – קורס למתחילים",
    sections: [
      {
        key: "hero",
        title: "01 · סקשן ראשי (Hero)",
        fields: [
          { key: "badge", label: "תגית עליונה", type: "text", defaultValue: "✂ קורס ספרות גברים — עפולה" },
          { key: "title", label: "כותרת ראשית", type: "text", defaultValue: "מאפס ניסיון לספר עם יומן מלא" },
          { key: "subtitle", label: "כותרת משנה", type: "text", defaultValue: "תוך 3 חודשים. בלי הבטחות שווא — עם תוצאות אמיתיות." },
          { key: "description", label: "תיאור", type: "textarea", defaultValue: "השיטה של יהלי — לימוד מקצועי, עסקי ושיווקי, עד שאתה באמת עובד ומרוויח." },
          { key: "image", label: "תמונת רקע", type: "image", defaultValue: "" },
          { key: "social_proof1", label: "הוכחה חברתית 1", type: "text", defaultValue: "✂️ הכשרה מעשית" },
          { key: "social_proof2", label: "הוכחה חברתית 2", type: "text", defaultValue: "📜 תעודה מוכרת" },
          { key: "social_proof3", label: "הוכחה חברתית 3", type: "text", defaultValue: "👥 קבוצות עד 4" },
          { key: "primary_cta_label", label: "כפתור ראשי", type: "text", defaultValue: "🎓 הצטרף לאקדמיה ←" },
          { key: "secondary_cta_label", label: "כפתור משני", type: "text", defaultValue: "✅ בדוק אם זה מתאים לי" },
        ],
      },
      {
        key: "urgency_bar",
        title: "02 · רצועת דחיפות (Urgency Bar – למעלה)",
        fields: [
          { key: "cta1_label", label: "כפתור 1 - השארת פרטים", type: "text", defaultValue: "השארת פרטים מהירה" },
          { key: "cta2_label", label: "כפתור 2 - וואטסאפ", type: "text", defaultValue: "וואטסאפ עכשיו" },
          { key: "fallback_text", label: "טקסט כשהמחזור פתוח", type: "text", defaultValue: "המחזור הבא נפתח עכשיו — נשארו מקומות אחרונים" },
        ],
      },
      {
        key: "details",
        title: "03 · פרטי המחזור הקרוב (תאריך + מקומות)",
        fields: [
          { key: "next_cohort", label: "תאריך התחלת מחזור (YYYY-MM-DD)", type: "text", defaultValue: "2026-04-15" },
          { key: "spots_total", label: "סה״כ מקומות במחזור", type: "text", defaultValue: "8" },
          { key: "spots_taken", label: "מקומות שנתפסו", type: "text", defaultValue: "5" },
        ],
      },
      {
        key: "video",
        title: "04 · סקשן וידאו / הסבר",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "צפו ותבינו למה באים ללמוד אצלנו" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "סרטון קצר שמסביר בדיוק מה תקבלו ואיך הקורס עובד" },
          { key: "video_file", label: "העלאת קובץ סרטון (MP4/WebM, עד 100MB)", type: "video", defaultValue: "" },
          { key: "video_thumbnail", label: "תמונת תצוגה לסרטון", type: "image", defaultValue: "" },
          { key: "fallback_button", label: "כפתור כשאין סרטון", type: "text", defaultValue: "קבלו פרטים נוספים" },
        ],
      },
      {
        key: "whatsapp_reviews",
        title: "05 · קרוסלת ביקורות וואטסאפ (צילומי מסך)",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מה אומרים עלינו בוואטסאפ" },
          { key: "images", label: "צילומי מסך וואטסאפ", type: "gallery", defaultValue: "[]" },
        ],
      },
      {
        key: "student_photos",
        title: "06 · קרוסלת תמונות תלמידים",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "התלמידים שלנו בפעולה" },
          { key: "images", label: "תמונות תלמידים", type: "gallery", defaultValue: "[]" },
        ],
      },
      {
        key: "lead_form",
        title: "08 · טופס השארת פרטים (ראשי)",
        fields: [
          { key: "title", label: "כותרת הטופס", type: "text", defaultValue: "בדיקת התאמה מהירה" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "משאירים 2 פרטים — ונשלח לכם תשובה בוואטסאפ עם כל מה שצריך לדעת." },
          { key: "goal1", label: "אפשרות 1", type: "text", defaultValue: "בדיקת התאמה" },
          { key: "goal2", label: "אפשרות 2", type: "text", defaultValue: "רק פרטים" },
          { key: "goal3", label: "אפשרות 3", type: "text", defaultValue: "שריון מקום" },
          { key: "button_text", label: "טקסט כפתור שליחה", type: "text", defaultValue: "שלחו לי פרטים בוואטסאפ" },
        ],
      },
      {
        key: "outcomes",
        title: "09 · מה יוצא לכם מזה (לצד הטופס)",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מה יוצא לכם מזה בפועל?" },
          { key: "image", label: "תמונה", type: "image", defaultValue: "" },
          { key: "item1", label: "תוצאה 1", type: "text", defaultValue: "תספורות בביקוש גבוה (Fade/Taper/Classic)" },
          { key: "item2", label: "תוצאה 2", type: "text", defaultValue: "עבודה נקייה ומדויקת (קווים, מעברים, סימטריה)" },
          { key: "item3", label: "תוצאה 3", type: "text", defaultValue: "תיק עבודות לתחילת עבודה במספרות" },
          { key: "item4", label: "תוצאה 4", type: "text", defaultValue: "בטחון מקצועי מול לקוחות אמיתיים" },
          { key: "badge1", label: "תגית 1 (משך)", type: "text", defaultValue: "3 חודשים" },
          { key: "badge2", label: "תגית 2 (גודל קבוצה)", type: "text", defaultValue: "קבוצות עד 4 תלמידים" },
          { key: "badge3", label: "תגית 3 (תעודה)", type: "text", defaultValue: "תעודת סיום" },
          { key: "location_text", label: "טקסט מיקום (על התמונה)", type: "text", defaultValue: "מיקום: יישלח בוואטסאפ" },
        ],
      },
      {
        key: "trust_strip",
        title: "10 · רצועת אמון (Trust Strip)",
        fields: [
          { key: "item1", label: "פריט 1", type: "text", defaultValue: "קבוצות קטנות • יחס אישי" },
          { key: "item2", label: "פריט 2", type: "text", defaultValue: "תעודה בסיום" },
          { key: "item3", label: "פריט 3", type: "text", defaultValue: "הכוונה להשתלבות בעבודה" },
          { key: "item4", label: "פריט 4", type: "text", defaultValue: "תרגול אמיתי לאורך הקורס" },
        ],
      },
      {
        key: "problems",
        title: "11 · בעיות / כאבים (Problem Section)",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מרגיש שאתה תקוע?" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "אנחנו יודעים בדיוק איך אתה מרגיש — כי עברנו את זה" },
          { key: "pain1", label: "כאב 1", type: "text", defaultValue: "יצאת מהצבא ועדיין לא מצאת כיוון אמיתי" },
          { key: "pain2", label: "כאב 2", type: "text", defaultValue: "ניסית ללמוד לבד מיוטיוב — חסר לך הביטחון לעבוד מול אנשים" },
          { key: "pain3", label: "כאב 3", type: "text", defaultValue: "מפחד להשקיע כסף בקורס נוסף שלא יחזיר את עצמו" },
          { key: "pain4", label: "כאב 4", type: "text", defaultValue: "רוצה מקצוע שייתן לך חופש, עצמאות ושליטה על הזמן שלך" },
          { key: "cta_label", label: "כפתור תחתון", type: "text", defaultValue: "אני רוצה לבדוק אם זה בשבילי" },
        ],
      },
      {
        key: "solution",
        title: "12 · הפתרון שלנו (Solution)",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "הדרך שלנו: מאפס לספר עובד" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "לא מלמדים רק לגזור. מלמדים איך להיות ספר שאנשים רוצים לחזור אליו." },
          { key: "benefit1", label: "יתרון 1", type: "text", defaultValue: "🎯 מפת דרכים ברורה ל-10,000 ₪ בחודש" },
          { key: "benefit2", label: "יתרון 2", type: "text", defaultValue: "💪 ביטחון ושיטה ברורה מהיום הראשון" },
          { key: "benefit4", label: "יתרון 3", type: "text", defaultValue: "🤝 מנטור אישי לכל שאלה" },
        ],
      },
      {
        key: "why_us",
        title: "13 · למה ללמוד אצלנו (6 כרטיסים)",
        fields: [
          { key: "feature1_title", label: "תכונה 1 - כותרת", type: "text", defaultValue: "הכשרה מעשית" },
          { key: "feature1_desc", label: "תכונה 1 - תיאור", type: "text", defaultValue: "לומדים תוך כדי עבודה אמיתית" },
          { key: "feature2_title", label: "תכונה 2 - כותרת", type: "text", defaultValue: "קבוצות קטנות" },
          { key: "feature2_desc", label: "תכונה 2 - תיאור", type: "text", defaultValue: "עד 4 תלמידים בכיתה" },
          { key: "feature3_title", label: "תכונה 3 - כותרת", type: "text", defaultValue: "תעודה מוכרת" },
          { key: "feature3_desc", label: "תכונה 3 - תיאור", type: "text", defaultValue: "הסמכה רשמית בסיום" },
          { key: "feature4_title", label: "תכונה 4 - כותרת", type: "text", defaultValue: "תכנים דיגיטליים" },
          { key: "feature4_desc", label: "תכונה 4 - תיאור", type: "text", defaultValue: "מדריכים עסקיים ושיווקיים" },
          { key: "feature5_title", label: "תכונה 5 - כותרת", type: "text", defaultValue: "מפת דרכים ל-10K" },
          { key: "feature5_desc", label: "תכונה 5 - תיאור", type: "text", defaultValue: "שלב אחרי שלב עד הכנסה" },
          { key: "feature6_title", label: "תכונה 6 - כותרת", type: "text", defaultValue: "מנטור אישי" },
          { key: "feature6_desc", label: "תכונה 6 - תיאור", type: "text", defaultValue: "תמיכה מקצועית, עסקית ושיווקית" },
        ],
      },
      {
        key: "comparison",
        title: "14 · השוואה: לפני / אחרי הקורס",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "לפני הקורס vs אחרי הקורס" },
          { key: "label_before", label: "תווית - לפני", type: "text", defaultValue: "✗ לפני הקורס" },
          { key: "label_after", label: "תווית - אחרי", type: "text", defaultValue: "✓ אחרי הקורס" },
          { key: "before1", label: "לפני 1", type: "text", defaultValue: "אין ניסיון ואין ביטחון" },
          { key: "after1", label: "אחרי 1", type: "text", defaultValue: "ידע מעשי + תיק עבודות מוכן" },
          { key: "before2", label: "לפני 2", type: "text", defaultValue: "לומד לבד מיוטיוב בלי כיוון" },
          { key: "after2", label: "אחרי 2", type: "text", defaultValue: "שיטה מסודרת + מנטור אישי" },
          { key: "before3", label: "לפני 3", type: "text", defaultValue: "פחד להחליף מקצוע" },
          { key: "after3", label: "אחרי 3", type: "text", defaultValue: "קריירה חדשה עם ביקוש גבוה" },
          { key: "before4", label: "לפני 4", type: "text", defaultValue: "לא יודע איך להיכנס לתעשייה" },
          { key: "after4", label: "אחרי 4", type: "text", defaultValue: "ליווי + הכוונה להשתלבות בעבודה" },
          { key: "cta_label", label: "כפתור תחתון", type: "text", defaultValue: "אני רוצה להיות בצד הימני" },
        ],
      },
      {
        key: "authority",
        title: "15 · המומחה / הסמכות (יהלי)",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "הכירו את יהלי צור" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "מייסד Macho Academy" },
          { key: "paragraph1", label: "פסקה 1", type: "textarea", defaultValue: "ספר מקצועי עם מעל 6 שנות ניסיון. פתח את מאצו ב-2022, בנה צוות, פיתח שיטת לימוד, ועזר ל-20+ אנשים להפוך את המקצוע הזה לפרנסה אמיתית." },
          { key: "paragraph2", label: "פסקה 2", type: "textarea", defaultValue: "יהלי הקים את האקדמיה מתוך אמונה שכל אחד יכול ללמוד את המקצוע — אבל לא מספיק ללמד רק לגזור. צריך ללמד איך מביאים לקוחות, איך בונים יומן, ואיך מגיעים ל-10,000 ₪ בחודש." },
          { key: "image", label: "תמונת המומחה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "how_it_works",
        title: "16 · השיטה שלנו (3 שלבים)",
        fields: [
          { key: "section_title", label: "כותרת הסקשן", type: "text", defaultValue: "⚙️ השיטה שלנו — פשוטה, ברורה, עם תוצאות" },
          { key: "step1_title", label: "שלב 1 - כותרת", type: "text", defaultValue: "1) בדיקת התאמה" },
          { key: "step1_desc", label: "שלב 1 - תיאור", type: "text", defaultValue: "שולחים פרטים, מבינים אם זה מתאים ומה המסלול הנכון." },
          { key: "step2_title", label: "שלב 2 - כותרת", type: "text", defaultValue: "2) לומדים ומתרגלים" },
          { key: "step2_desc", label: "שלב 2 - תיאור", type: "text", defaultValue: "8 שיעורים פרונטליים + קורס דיגיטלי + שיעורי בית עם פידבק אישי." },
          { key: "step3_title", label: "שלב 3 - כותרת", type: "text", defaultValue: "3) יוצאים עובדים" },
          { key: "step3_desc", label: "שלב 3 - תיאור", type: "text", defaultValue: "תיק עבודות, מפת דרכים ל-10K, וליווי שנה — עד שאתה באמת שם." },
        ],
      },
      {
        key: "modules",
        title: "17 · תכני הקורס (8 מודולים)",
        fields: [
          { key: "section_title", label: "כותרת הסקשן", type: "text", defaultValue: "תכני הקורס" },
          { key: "module1", label: "מודול 1", type: "text", defaultValue: "🪒 שיעור 1 – יסודות המספריים + הכרת הראש והפנים" },
          { key: "module2", label: "מודול 2", type: "text", defaultValue: "✂️ שיעור 2 – גזירות פרקטי, סידור שיער וחומרים + 7 שלבי קבלת לקוח" },
          { key: "module3", label: "מודול 3", type: "text", defaultValue: "⚙️ שיעור 3 – יסודות המכונה ועבודה" },
          { key: "module4", label: "מודול 4", type: "text", defaultValue: "🧔 שיעור 4 – זקן ומודליסט דירוג אמצע" },
          { key: "module5", label: "מודול 5", type: "text", defaultValue: "🎯 שיעור 5 – מודליסט טייפר" },
          { key: "module6", label: "מודול 6", type: "text", defaultValue: "🔥 שיעור 6 + 7 – מודליסט מולט + מוייקן" },
          { key: "module7", label: "מודול 7", type: "text", defaultValue: "🚀 שיעור 8 – חודש וחצי אחרי סיום הקורס: 2 מודליסטים" },
          { key: "module8", label: "מודול 8", type: "text", defaultValue: "💎 בונוס – תכנים דיגיטליים + מפת דרכים ל-10K בחודש" },
        ],
      },
      {
        key: "micro_proof",
        title: "18 · כרטיסי הוכחה (3 כרטיסים)",
        fields: [
          { key: "card1_title", label: "כרטיס 1 - כותרת", type: "text", defaultValue: "תרגול מודרך" },
          { key: "card1_desc", label: "כרטיס 1 - תיאור", type: "text", defaultValue: "לא רק תיאוריה — עובדים ידיים על הכלים" },
          { key: "card2_title", label: "כרטיס 2 - כותרת", type: "text", defaultValue: "סטנדרט היגיינה" },
          { key: "card2_desc", label: "כרטיס 2 - תיאור", type: "text", defaultValue: "איך לעבוד נכון ומקצועי לפי נהלים" },
          { key: "card3_title", label: "כרטיס 3 - כותרת", type: "text", defaultValue: "כניסה לתעשייה" },
          { key: "card3_desc", label: "כרטיס 3 - תיאור", type: "text", defaultValue: "איך למצוא מקום, איך להציג את עצמך" },
        ],
      },
      {
        key: "results_gallery",
        title: "19 · גלריית תוצאות בוגרים",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "העבודות של הבוגרים שלנו" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "ככה נראה הסטנדרט שלנו — תוצאות אמיתיות של תלמידים שהתחילו מאפס" },
          { key: "images", label: "תמונות עבודות", type: "gallery", defaultValue: "[]" },
          { key: "cta_label", label: "כפתור תחתון", type: "text", defaultValue: "גם אני רוצה ללמוד ככה" },
        ],
      },
      {
        key: "testimonials",
        title: "20 · תגובות בוגרים (6 ביקורות)",
        fields: [
          { key: "section_title", label: "כותרת הסקשן", type: "text", defaultValue: "הבוגרים שלנו מדברים" },
          { key: "section_subtitle", label: "תת כותרת הסקשן", type: "text", defaultValue: "אמיתי, קצר ולעניין — מה אנשים חוו ומה יצא להם מזה." },
          { key: "cta_label", label: "כפתור תחתון", type: "text", defaultValue: "גם אני רוצה פרטים" },
          { key: "review1_text", label: "ביקורת 1 - טקסט", type: "textarea", defaultValue: "תוך 3 חודשים עברתי מאפס ניסיון לעבודה במספרה מובילה. התרגול והיחס האישי עשו את ההבדל." },
          { key: "review1_name", label: "ביקורת 1 - שם", type: "text", defaultValue: "דן" },
          { key: "review1_cohort", label: "ביקורת 1 - מחזור", type: "text", defaultValue: "מחזור 2024" },
          { key: "review1_result", label: "ביקורת 1 - תוצאה", type: "text", defaultValue: "עובד במספרה מובילה בת״א" },
          { key: "review1_image", label: "ביקורת 1 - תמונה", type: "image", defaultValue: "" },
          { key: "review2_text", label: "ביקורת 2 - טקסט", type: "textarea", defaultValue: "המקצועיות של הצוות ברמה אחרת. קיבלתי ביטחון אמיתי לעבוד מול לקוחות, גם אחרי הקורס המשיכו ללוות." },
          { key: "review2_name", label: "ביקורת 2 - שם", type: "text", defaultValue: "אור" },
          { key: "review2_cohort", label: "ביקורת 2 - מחזור", type: "text", defaultValue: "מחזור 2023" },
          { key: "review2_result", label: "ביקורת 2 - תוצאה", type: "text", defaultValue: "פתח מספרה עצמאית" },
          { key: "review2_image", label: "ביקורת 2 - תמונה", type: "image", defaultValue: "" },
          { key: "review3_text", label: "ביקורת 3 - טקסט", type: "textarea", defaultValue: "הגעתי בלי שום רקע. היום אני עובד ומרוויח ממשהו שאני אוהב. האקדמיה שינתה לי את החיים." },
          { key: "review3_name", label: "ביקורת 3 - שם", type: "text", defaultValue: "יוסי" },
          { key: "review3_cohort", label: "ביקורת 3 - מחזור", type: "text", defaultValue: "מחזור 2024" },
          { key: "review3_result", label: "ביקורת 3 - תוצאה", type: "text", defaultValue: "התקבל לצוות של מספרה בחיפה" },
          { key: "review3_image", label: "ביקורת 3 - תמונה", type: "image", defaultValue: "" },
          { key: "review4_text", label: "ביקורת 4 - טקסט", type: "textarea", defaultValue: "חשבתי שזה לא בשבילי כי אני לא מספיק יצירתי. הצוות הוכיח לי אחרת. יש שיטה — ואפשר ללמוד הכל." },
          { key: "review4_name", label: "ביקורת 4 - שם", type: "text", defaultValue: "עמית" },
          { key: "review4_cohort", label: "ביקורת 4 - מחזור", type: "text", defaultValue: "מחזור 2025" },
          { key: "review4_result", label: "ביקורת 4 - תוצאה", type: "text", defaultValue: "מתרגל ומתכונן לפתוח עסק" },
          { key: "review4_image", label: "ביקורת 4 - תמונה", type: "image", defaultValue: "" },
          { key: "review5_text", label: "ביקורת 5 - טקסט", type: "textarea", defaultValue: "אחרי שנים בהייטק הרגשתי שחוק. הקורס נתן לי מקצוע חדש עם סיפוק אמיתי. הכי שווה." },
          { key: "review5_name", label: "ביקורת 5 - שם", type: "text", defaultValue: "רון" },
          { key: "review5_cohort", label: "ביקורת 5 - מחזור", type: "text", defaultValue: "מחזור 2023" },
          { key: "review5_result", label: "ביקורת 5 - תוצאה", type: "text", defaultValue: "עובד כספר ומרוויח יותר ממה שציפה" },
          { key: "review5_image", label: "ביקורת 5 - תמונה", type: "image", defaultValue: "" },
          { key: "review6_text", label: "ביקורת 6 - טקסט", type: "textarea", defaultValue: "היחס האישי פה הוא משהו שלא מוצאים. הרגשתי שבאמת אכפת להם שאצליח." },
          { key: "review6_name", label: "ביקורת 6 - שם", type: "text", defaultValue: "נועם" },
          { key: "review6_cohort", label: "ביקורת 6 - מחזור", type: "text", defaultValue: "מחזור 2024" },
          { key: "review6_result", label: "ביקורת 6 - תוצאה", type: "text", defaultValue: "מספר בזמן לימודים באוניברסיטה" },
          { key: "review6_image", label: "ביקורת 6 - תמונה", type: "image", defaultValue: "" },
        ],
      },
      {
        key: "lead_form_2",
        title: "22 · טופס השארת פרטים שני (תחתון)",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "מעניין? בואו נדבר" },
          { key: "subtitle", label: "תת כותרת", type: "text", defaultValue: "השאירו פרטים ונחזור אליכם בוואטסאפ — מהר, בלי התחייבות." },
        ],
      },
      {
        key: "who_is_this_for",
        title: "23 · למי הקורס מתאים?",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "למי הקורס מתאים?" },
          { key: "item1", label: "קהל 1", type: "text", defaultValue: "גברים שרוצים להחליף מקצוע ולהיכנס לתחום הספרות" },
          { key: "item2", label: "קהל 2", type: "text", defaultValue: "צעירים אחרי צבא שמחפשים קריירה יצירתית ועצמאית" },
          { key: "item3", label: "קהל 3", type: "text", defaultValue: "מי שמספר חברים/משפחה ורוצה להפוך את זה למקצוע" },
          { key: "item4", label: "קהל 4", type: "text", defaultValue: "כל מי שמוכן ללמוד ולהשקיע — בלי צורך בניסיון קודם" },
          { key: "cta_label", label: "כפתור תחתון", type: "text", defaultValue: "בדיקת התאמה מהירה" },
        ],
      },
      {
        key: "faq",
        title: "24 · שאלות נפוצות (FAQ)",
        fields: [
          { key: "section_title", label: "כותרת הסקשן", type: "text", defaultValue: "שאלות נפוצות" },
          { key: "footer_text", label: "טקסט תחתון", type: "text", defaultValue: "יש עוד שאלה? שלחו הודעה ונענה מהר." },
          { key: "cta_label", label: "כפתור תחתון", type: "text", defaultValue: "שלחו שאלה בוואטסאפ" },
          { key: "q1", label: "שאלה 1", type: "text", defaultValue: "צריך ניסיון קודם?" },
          { key: "a1", label: "תשובה 1", type: "textarea", defaultValue: "לא. הקורס בנוי בדיוק למי שמתחיל מאפס. מתחילים מהבסיס ולא זורקים אותך למים." },
          { key: "q2", label: "שאלה 2", type: "text", defaultValue: "כמה פעמים בשבוע לומדים?" },
          { key: "a2", label: "תשובה 2", type: "textarea", defaultValue: "8 שיעורים פרונטליים לאורך הקורס + שיעורי בית ותרגול עצמאי בין השיעורים." },
          { key: "q3", label: "שאלה 3", type: "text", defaultValue: "מקבלים תעודה?" },
          { key: "a3", label: "תשובה 3", type: "textarea", defaultValue: "כן, תעודת סיום מאקדמיית מאצו." },
          { key: "q4", label: "שאלה 4", type: "text", defaultValue: "יש ליווי אחרי הקורס?" },
          { key: "a4", label: "תשובה 4", type: "textarea", defaultValue: "כן — שנה של ליווי בפלטפורמה הדיגיטלית + אפשרות לשאול את יהלי ישירות." },
          { key: "q5", label: "שאלה 5", type: "text", defaultValue: "מה לגבי ציוד?" },
          { key: "a5", label: "תשובה 5", type: "textarea", defaultValue: "בשיעורים עצמם הציוד מסופק. בהמשך נעזור לך לדעת בדיוק מה לקנות ואיפה." },
          { key: "q6", label: "שאלה 6", type: "text", defaultValue: "כמה עולה הקורס?" },
          { key: "a6", label: "תשובה 6", type: "textarea", defaultValue: "השאר פרטים ונחזור אליך עם כל המידע — בלי התחייבות." },
          { key: "q7", label: "שאלה 7", type: "text", defaultValue: "איפה הקורס מתקיים?" },
          { key: "a7", label: "תשובה 7", type: "textarea", defaultValue: "במספרה שלנו בעפולה, המחשלים 5." },
        ],
      },
      {
        key: "final_cta",
        title: "25 · קריאה לפעולה סופית (Final CTA)",
        fields: [
          { key: "title", label: "כותרת", type: "text", defaultValue: "🔥 נשארו 2 מקומות בחודש הזה" },
          { key: "subtitle", label: "תת כותרת", type: "textarea", defaultValue: "מעניין? בוא נדבר — בלי התחייבות. בשיחה של 15 דקות נבדוק ביחד אם זה מתאים לך, ונבנה לך מפת הכנסה אישית חינם." },
          { key: "button_text", label: "טקסט כפתור", type: "text", defaultValue: "👉 שלח לי הודעה ב-WhatsApp" },
        ],
      },
    ],
  },

  // ==================== הגדרות כלליות ====================
  {
    slug: "global",
    title: "הגדרות כלליות",
    sections: [
      {
        key: "hours",
        title: "שעות פעילות",
        fields: [
          { key: "sunday_thursday", label: "ראשון - חמישי", type: "text", defaultValue: "09:00 - 20:00" },
          { key: "friday", label: "שישי", type: "text", defaultValue: "08:00 - 14:00" },
          { key: "saturday", label: "שבת", type: "text", defaultValue: "סגור" },
        ],
      },
    ],
  },
];
