

## תוכנית: הקטנת סקשן ה-Urgency Bar הסטיקי בדף האקדמיה

### הבעיה
ה-Urgency Bar (שורה 314) משתמש ב-`sticky top-1 z-[150]` ועולה על התפריט העליון.

### פתרון
- שנות את `top-1` ל-`top-0` או ערך מתאים מתחת לגובה ה-header
- להקטין את ה-padding מ-`py-2` ל-`py-1`
- להקטין את גודל הטקסט
- להוריד את ה-`z-index` מ-150 לערך נמוך מה-header (ה-header בדרך כלל z-50, אז צריך לבדוק) — או לחלופין להשאיר אותו מעל ה-header אבל להקטין אותו משמעותית

### שינויים בקובץ `src/pages/AcademyPage.tsx`
- שורה 314: שנות classes של ה-urgency bar div:
  - `py-2` → `py-1`
  - טקסט קטן יותר: `text-sm md:text-base` → `text-xs md:text-sm`
  - הקטנת ה-countdown boxes padding/font

