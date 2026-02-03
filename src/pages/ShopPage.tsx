import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const products = [
    { name: "שמן לזקן פרימיום", price: "₪89", category: "טיפוח זקן" },
    { name: "ווקס לשיער - אחיזה חזקה", price: "₪69", category: "עיצוב שיער" },
    { name: "שמפו מקצועי", price: "₪79", category: "טיפוח שיער" },
    { name: "סרום הגנה", price: "₪99", category: "טיפוח שיער" },
    { name: "קרם לחות לפנים", price: "₪59", category: "טיפוח פנים" },
    { name: "שמן לשיער", price: "₪75", category: "טיפוח שיער" },
    { name: "מברשת זקן", price: "₪45", category: "אביזרים" },
    { name: "מסרק עץ", price: "₪35", category: "אביזרים" },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "חנות" }]} />
      
      <HeroSplit
        title="החנות שלנו"
        subtitle="מוצרי טיפוח מקצועיים"
        description="מבחר מוצרים איכותיים לטיפוח השיער והזקן. אותם מוצרים שאנחנו משתמשים במספרה."
      />

      <Section title="המוצרים שלנו">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="bg-card overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">תמונת מוצר</span>
              </div>
              <CardContent className="p-4 text-center">
                <span className="text-xs text-primary uppercase tracking-wider">{product.category}</span>
                <h3 className="font-bold text-lg mt-1 mb-2">{product.name}</h3>
                <p className="text-accent text-2xl font-black mb-4">{product.price}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">לפרטים</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary">
        <div className="text-center">
          <h2 className="mb-4">רוצים לרכוש?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            המוצרים זמינים לרכישה במספרה או בהזמנה מראש. צרו קשר לקבלת מחירון מלא ופרטים נוספים.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">צרו קשר</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
};

export default ShopPage;
