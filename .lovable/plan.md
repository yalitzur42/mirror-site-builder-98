

## תוכנית: הוספת Loading Skeleton לדפים בזמן טעינת תוכן דינמי

### גישה
יצירת קומפוננטת `PageSkeleton` שתציג skeleton loading state עם אנימציית pulse, ושימוש בה בכל 5 הדפים שמשתמשים ב-`useSiteContent`.

### שינויים

**1. יצירת קומפוננטת `src/components/ui/PageSkeleton.tsx`**
- קומפוננטה שמציגה skeleton של דף טיפוסי: hero section (תמונה + כותרת + טקסט), ואחריו כמה בלוקים של תוכן
- עטופה ב-`Layout` כדי שהניווט יישאר גלוי
- שימוש בקומפוננטת `Skeleton` הקיימת

**2. עדכון `useSiteContent` hook**
- להחזיר `loading` כבר מוחזר, אין צורך בשינוי

**3. עדכון 5 דפים להציג skeleton בזמן טעינה**
- `HomePage.tsx`, `AboutPage.tsx`, `BarbershopPage.tsx`, `PermPage.tsx`, `AcademyPage.tsx`
- בכל דף: לשנות את `const { v }` ל-`const { v, loading }` ולהוסיף בתחילת ה-return:
  ```tsx
  if (loading) return <Layout><PageSkeleton /></Layout>;
  ```

### סיכום
- 1 קובץ חדש (PageSkeleton)
- 5 קבצים מעודכנים (כל דף עם שורת loading guard)

