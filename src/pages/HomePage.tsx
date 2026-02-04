import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import CardsGrid from "@/components/ui/CardsGrid";
import FeatureGrid from "@/components/ui/FeatureGrid";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import { GraduationCap, Scissors, Users, Award, Star, Clock, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  const servicesCards = [
    { title: "לימודי ספרות גברים", href: "/academy" },
    { title: "תספורות גברים", href: "/barbershop" },
    { title: "פרם לגבר", href: "/perm" },
    { title: "מוצרי המספרה", href: "/shop" },
  ];

  const academyFeatures = [
    { icon: GraduationCap, title: "הכשרה מקצועית", description: "תוכנית לימודים מקיפה" },
    { icon: Users, title: "קבוצות קטנות", description: "יחס אישי לכל תלמיד" },
    { icon: Award, title: "תעודה מוכרת", description: "הסמכה רשמית בסיום" },
    { icon: Star, title: "מרצים מובילים", description: "הטובים בתחום" },
  ];

  const products = [
    { title: "שמן לזקן", description: "תערובת שמנים טבעית", price: "₪89" },
    { title: "ווקס לשיער", description: "אחיזה חזקה", price: "₪69" },
    { title: "שמפו מקצועי", description: "לכל סוגי השיער", price: "₪79" },
    { title: "סרום לשיער", description: "הגנה וברק", price: "₪99" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSplit
        badge="אהלן גבר, ברוך הבא!"
        title="משפחת Macho"
        subtitle="מובילים את סצנת טיפוח השיער לגברים בישראל!"
        description="מאקדמיה ללימודי ספרות גברים, דרך מספרה ברמה אחרת ופרם מקצועי לגברים. אנחנו מאמינים ב'פרא מסודר' – לקבל את הפרא שיש בך ולנקות את המיותר."
        primaryCta={{ label: "לקביעת תור", href: "/contact" }}
        secondaryCta={{ label: "לאקדמיה", href: "/academy" }}
      />

      {/* What We Offer */}
      <Section title="מה תמצאו אצלנו?">
        <CardsGrid items={servicesCards} columns={4} />
      </Section>

      {/* Academy Section */}
      <Section
        title="האקדמיה של המספרה"
        subtitle="הפוך את התשוקה שלך למקצוע. הצטרף לאקדמיה המובילה בישראל ללימודי ספרות גברים."
        className="bg-secondary"
      >
        <FeatureGrid items={academyFeatures} columns={4} />
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/academy">לכל הקורסים</Link>
          </Button>
        </div>
      </Section>

      {/* Gallery */}
      <Section title="מהעבודות שלנו">
        <GalleryGrid images={[]} />
      </Section>

      {/* Perm Service */}
      <section className="py-16 md:py-24">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">תמונת פרם לגבר</span>
            </div>
            <div>
              <h2 className="mb-4">פרם לגבר</h2>
              <p className="text-muted-foreground text-lg mb-6">
                תלתלים מושלמים לגברים. טכנולוגיה מתקדמת, תוצאות מוכחות ושירות מקצועי.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>מוצרים איכותיים ובטוחים</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>תוצאות מהירות וארוכות טווח</span>
                </li>
                <li className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>התאמה אישית לסגנון שלך</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link to="/perm">למידע נוסף</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <Section title="המוצרים שלנו" className="bg-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="bg-card">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">תמונת מוצר</span>
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-lg">{product.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
                <p className="text-accent font-bold text-xl">{product.price}</p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link to="/shop">לפרטים</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild size="lg">
            <Link to="/shop">לכל המוצרים</Link>
          </Button>
        </div>
      </Section>

      {/* SEO Content Section */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">המספרה – יותר מסתם מספרה</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                המספרה נוסדה מתוך אהבה אמיתית למקצוע הספרות ורצון להעלות את רמת השירות לגברים בישראל. אנחנו מאמינים שכל
                גבר מגיע ליחס אישי, מקצועי ואיכותי.
              </p>
              <p>
                הצוות שלנו עובר הכשרות מתמידות ומעודכן בטרנדים האחרונים מכל העולם. אנחנו גאים להביא את הטוב ביותר
                ללקוחות שלנו.
              </p>
              <p>בין אם אתה מחפש תספורת קלאסית, עיצוב זקן מדויק או פרם מושלם – במספרה תמצא את הכל תחת קורת גג אחת.</p>
            </div>
            <Button asChild className="mt-6">
              <Link to="/about">קרא עוד עלינו</Link>
            </Button>
          </div>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">תמונה</span>
          </div>
        </div>
      </Section>

      {/* Owner/Team Section */}
      <Section className="bg-secondary">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-square max-w-md mx-auto bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">תמונת הבעלים</span>
          </div>
          <div>
            <h2 className="mb-4">הכירו את הצוות</h2>
            <h3 className="text-xl text-accent mb-4">ישראל ישראלי – מייסד המספרה</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                עם ניסיון של למעלה מ-15 שנה בתחום הספרות, ישראל הקים את המספרה מתוך חזון להביא שינוי אמיתי לעולם הטיפוח
                לגברים בישראל.
              </p>
              <p>בוגר קורסים מובילים בארץ ובעולם, ישראל משלב ידע מקצועי עמוק עם גישה אישית וחמה לכל לקוח.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        title="מוכנים להתחיל?"
        description="קבעו תור עכשיו וחוו את ההבדל"
        buttonLabel="לקביעת תור"
        buttonHref="/contact"
        variant="gradient"
      />
    </Layout>
  );
};

export default HomePage;
