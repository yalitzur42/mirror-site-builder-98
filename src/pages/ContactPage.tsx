import Layout from "@/components/layout/Layout";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const ContactPage = () => {
  return (
    <Layout>
      <Breadcrumbs items={[{ label: "צור קשר" }]} />
      
      <section className="gradient-hero py-16 md:py-24">
        <div className="container-main text-center">
          <h1 className="mb-4">צרו קשר</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            יש לכם שאלות? רוצים לקבוע תור? השאירו פרטים ונחזור אליכם בהקדם.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">השאירו פרטים</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">שם מלא</label>
                  <Input placeholder="הכניסו את שמכם" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">טלפון</label>
                  <Input type="tel" placeholder="050-0000000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">אימייל</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">נושא</label>
                <Input placeholder="במה נוכל לעזור?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">הודעה</label>
                <Textarea placeholder="כתבו את הודעתכם כאן..." rows={5} />
              </div>
              <Button type="submit" size="lg" className="w-full">
                שלחו הודעה
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">פרטי התקשרות</h2>
            <div className="space-y-4">
              <Card className="bg-card">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">כתובת</h4>
                    <p className="text-muted-foreground">תל חי 37, כפר סבא</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">טלפון</h4>
                    <p className="text-muted-foreground">054-4744031</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">אימייל</h4>
                    <p className="text-muted-foreground">info@hamaspera.co.il</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">שעות פעילות</h4>
                    <p className="text-muted-foreground">ראשון - חמישי: 09:00 - 20:00</p>
                    <p className="text-muted-foreground">שישי: 09:00 - 14:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 aspect-video bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">מפה</span>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default ContactPage;
