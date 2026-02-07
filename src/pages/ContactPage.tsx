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
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            יש לכם שאלות? רוצים לקבוע תור? השאירו פרטים ונחזור אליכם בהקדם.
          </p>
        </div>
      </section>

      <Section variant="light">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">השאירו פרטים</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">שם מלא</label>
                  <Input placeholder="הכניסו את שמכם" className="bg-background border-border text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">טלפון</label>
                  <Input type="tel" placeholder="050-0000000" className="bg-background border-border text-foreground" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">אימייל</label>
                <Input type="email" placeholder="your@email.com" className="bg-background border-border text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">נושא</label>
                <Input placeholder="במה נוכל לעזור?" className="bg-background border-border text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">הודעה</label>
                <Textarea placeholder="כתבו את הודעתכם כאן..." rows={5} className="bg-background border-border text-foreground" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-background text-foreground hover:bg-background/90">
                שלחו הודעה
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">פרטי התקשרות</h2>
            <div className="space-y-4">
              <Card className="bg-background text-foreground border-border">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">כתובת</h4>
                    <p className="opacity-70">תל חי 37, כפר סבא</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background text-foreground border-border">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Phone className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">טלפון</h4>
                    <p className="opacity-70">054-4744031</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background text-foreground border-border">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Mail className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">אימייל</h4>
                    <p className="opacity-70">info@macho.co.il</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background text-foreground border-border">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">שעות פעילות</h4>
                    <p className="opacity-70">ראשון - חמישי: 09:00 - 20:00</p>
                    <p className="opacity-70">שישי: 09:00 - 14:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 aspect-video bg-background rounded-lg flex items-center justify-center border border-border">
              <span className="text-foreground opacity-50">מפה</span>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default ContactPage;
