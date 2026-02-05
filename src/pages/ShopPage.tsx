import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import productBeardOil from "@/assets/product-beard-oil.jpg";
import productWax from "@/assets/product-wax.jpg";
import productShampoo from "@/assets/product-shampoo.jpg";
import productSerum from "@/assets/product-serum.jpg";

const ShopPage = () => {
  const products = [
    { name: "שמן לזקן פרימיום", price: "₪89", category: "טיפוח זקן", image: productBeardOil },
    { name: "ווקס לשיער - אחיזה חזקה", price: "₪69", category: "עיצוב שיער", image: productWax },
    { name: "שמפו מקצועי", price: "₪79", category: "טיפוח שיער", image: productShampoo },
    { name: "סרום הגנה", price: "₪99", category: "טיפוח שיער", image: productSerum },
    { name: "קרם לחות לפנים", price: "₪59", category: "טיפוח פנים", image: productBeardOil },
    { name: "שמן לשיער", price: "₪75", category: "טיפוח שיער", image: productSerum },
    { name: "מברשת זקן", price: "₪45", category: "אביזרים", image: productWax },
    { name: "מסרק עץ", price: "₪35", category: "אביזרים", image: productShampoo },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "חנות" }]} />
      
      <HeroSplit
        title="החנות שלנו"
        subtitle="מוצרי טיפוח מקצועיים"
        description="מבחר מוצרים איכותיים לטיפוח השיער והזקן. אותם מוצרים שאנחנו משתמשים במספרה."
      />

      <Section title="המוצרים שלנו" variant="light">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="bg-background text-foreground overflow-hidden border-border">
              <img src={product.image} alt={product.name} className="aspect-square object-cover w-full" />
              <CardContent className="p-4 text-center bg-background">
                <span className="text-xs uppercase tracking-wider opacity-60">{product.category}</span>
                <h3 className="font-bold text-lg mt-1 mb-2 text-foreground">{product.name}</h3>
                <p className="text-foreground text-2xl font-black mb-4">{product.price}</p>
                <Button asChild variant="outline" className="w-full border-foreground text-foreground hover:bg-foreground hover:text-background">
                  <Link to="/contact">לפרטים</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center">
          <h2 className="mb-4">רוצים לרכוש?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
            המוצרים זמינים לרכישה במספרה או בהזמנה מראש. צרו קשר לקבלת מחירון מלא ופרטים נוספים.
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/contact">צרו קשר</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
};

export default ShopPage;
