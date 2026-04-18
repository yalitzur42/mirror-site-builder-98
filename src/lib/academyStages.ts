export interface StageDef {
  number: number;
  title: string;
  subtitle: string;
  tasks: { key: string; label: string }[];
  milestone: string;
}

export const STAGES: StageDef[] = [
  {
    number: 1,
    title: "🔬 שלב המעבדה",
    subtitle: "בניית ביטחון ותיק עבודות",
    tasks: [
      { key: "ambassadors_list", label: "✂ יצירת רשימת 10 שגרירים (משפחה וחברים קרובים)" },
      { key: "broadcast", label: "📱 שליחת הודעת תפוצה — תספורות במתנה בתמורה לתרגול" },
      { key: "watch_lessons", label: "🎬 צפייה בשיעור הרלוונטי לפני כל תספורת" },
      { key: "before_after", label: "📸 צילום לפני/אחרי כל תספורת ושליחה ליהלי" },
    ],
    milestone: "יעד למעבר: 10 תספורות מתועדות + אישור יהלי",
  },
  {
    number: 2,
    title: "👑 שלב השגרירים",
    subtitle: "בניית מוניטין ונוכחות דיגיטלית",
    tasks: [
      { key: "instagram", label: "📸 הקמת אינסטגרם עסקי לפי המדריך" },
      { key: "follow_locals", label: "👥 Follow לכל מכר באזור הגיאוגרפי" },
      { key: "story_hunt", label: "🎯 ציד סטורי — כל מי שמגיב מקבל הזמנה לתספורת חינם" },
      { key: "client_xp", label: "⭐ מתן חוויית לקוח 10/10 לפי המדריך" },
      { key: "deposit_fee", label: "💰 גביית דמי רצינות 30-40 ש\"ח (להרגיל את עצמך לגבות כסף)" },
    ],
    milestone: "יעד למעבר: 15 תספורות בשבוע + 5 פידבקים חיוביים + אישור יהלי",
  },
  {
    number: 3,
    title: "🚀 חדירה לשוק",
    subtitle: "כניסה ללקוחות זרים והתחלת הכנסה",
    tasks: [
      { key: "google_business", label: "🗺 פתיחת גוגל ביזנס ואיזי" },
      { key: "100_reviews", label: "⭐ צבירת 100 ביקורות חיוביות (גם מאנשים שלא הסתפרו!)" },
      { key: "penetration_pricing", label: "💇 תמחור חדירה — 10 ש\"ח מתחת למחיר השוק" },
      { key: "reels_content", label: "🎥 יצירת תוכן פותר בעיות (Reels)" },
      { key: "upsell", label: "🧴 Upsell — מכירת מוצרי שיער ותכשירים" },
    ],
    milestone: "יעד למעבר: יומן מלא 80% + 100 ביקורות גוגל + אישור יהלי",
  },
  {
    number: 4,
    title: "💎 הדרך ל-20K",
    subtitle: "מהמקצוען לאגדה",
    tasks: [
      { key: "premium_pricing", label: "👑 העלאת מחיר לפרימיום (מעל מחיר השוק)" },
      { key: "ads_campaign", label: "📣 קמפיין ממומן גוגל/מטא" },
      { key: "returning_clients", label: "📊 ניתוח נתוני לקוחות חוזרים" },
      { key: "time_optimization", label: "⚡ אופטימיזציה של זמן עבודה (יותר לקוחות ביום)" },
    ],
    milestone: "יעד: 20,000 ש\"ח בחודש 👑",
  },
];
