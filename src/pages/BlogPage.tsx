import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

import blogBeardTips from "@/assets/blog-beard-tips.jpg";
import blogTrends from "@/assets/blog-trends.jpg";
import blogProducts from "@/assets/blog-products.jpg";
import blogAcademyStory from "@/assets/blog-academy-story.jpg";
import blogPerm from "@/assets/blog-perm.jpg";
import blogInterview from "@/assets/blog-interview.jpg";

const BlogPage = () => {
  const posts = [
    {
      title: "5 טיפים לתחזוקת זקן מושלם",
      excerpt: "איך לשמור על הזקן בריא ומטופח בין הביקורים במספרה...",
      date: "15 ינואר 2024",
      readTime: "5 דקות קריאה",
      image: blogBeardTips,
    },
    {
      title: "טרנדים בתספורות גברים ל-2024",
      excerpt: "סקירה של הסגנונות החמים ביותר לשנה הקרובה...",
      date: "10 ינואר 2024",
      readTime: "7 דקות קריאה",
      image: blogTrends,
    },
    {
      title: "מדריך לבחירת המוצר הנכון לסוג השיער שלך",
      excerpt: "לא כל מוצר מתאים לכל אחד. הנה איך לדעת מה נכון לכם...",
      date: "5 ינואר 2024",
      readTime: "4 דקות קריאה",
      image: blogProducts,
    },
    {
      title: "הסיפור מאחורי האקדמיה שלנו",
      excerpt: "איך הפכנו מחלום לאקדמיה המובילה בישראל...",
      date: "1 ינואר 2024",
      readTime: "6 דקות קריאה",
      image: blogAcademyStory,
    },
    {
      title: "פרם לגבר - כל מה שצריך לדעת",
      excerpt: "מדריך מקיף על טיפול התלתלים, התוצאות וההכנה הנדרשת...",
      date: "25 דצמבר 2023",
      readTime: "8 דקות קריאה",
      image: blogPerm,
    },
    {
      title: "איך להתכונן לראיון עבודה כספר",
      excerpt: "טיפים מנצחים לבוגרי האקדמיה שמחפשים עבודה...",
      date: "20 דצמבר 2023",
      readTime: "5 דקות קריאה",
      image: blogInterview,
    },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "בלוג" }]} />
      
      <HeroSplit
        title="הבלוג שלנו"
        subtitle="טיפים, חדשות ועדכונים"
        description="מאמרים מקצועיים על טיפוח גברים, טרנדים בעולם הספרות וטיפים שימושיים לחיי היומיום."
      />

      <Section variant="light" isFirstSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="bg-background text-foreground overflow-hidden group border-border">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm opacity-60 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
                  {post.title}
                </h3>
                <p className="opacity-70 mb-4">{post.excerpt}</p>
                <Button variant="ghost" className="p-0 h-auto hover:opacity-80">
                  קרא עוד <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default BlogPage;
