

# תיקון חוסמי פרודקשן

## 1. דף 404 בעברית + Layout
**קובץ:** `src/pages/NotFound.tsx`
- עטיפה ב-`Layout` (Header + Footer)
- תרגום לעברית: "העמוד לא נמצא", "חזרה לדף הבית"
- שימוש ב-`Link` במקום `<a>` לניווט פנימי

## 2. דפי מדיניות פרטיות ותקנון
**קבצים חדשים:** `src/pages/PrivacyPage.tsx`, `src/pages/TermsPage.tsx`
- דפים סטטיים עטופים ב-`Layout`
- תוכן בסיסי בעברית מותאם ל-Mac'ho (מספרה, אקדמיה, פרטי קשר מהפוטר)
- מדיניות פרטיות: איסוף מידע, שימוש במידע, cookies, יצירת קשר
- תקנון: תנאי שימוש באתר, קביעת תורים, ביטולים, קניין רוחני

**קובץ:** `src/App.tsx`
- הוספת import לשני הדפים החדשים
- הוספת routes: `/privacy` ו-`/terms`

## 3. OG Image מותאם
**קובץ:** `index.html`
- החלפת `og:image` ו-`twitter:image` מ-Lovable לתמונת הלוגו של האתר (`/assets/logo.png`)
- הסרת `twitter:site` של `@Lovable`
- הוספת `og:locale` עם `he_IL`

## סיכום קבצים
| קובץ | פעולה |
|---|---|
| `src/pages/NotFound.tsx` | עדכון - עברית + Layout |
| `src/pages/PrivacyPage.tsx` | חדש |
| `src/pages/TermsPage.tsx` | חדש |
| `src/App.tsx` | הוספת 2 routes |
| `index.html` | עדכון OG tags |

