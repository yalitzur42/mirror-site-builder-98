import Layout from "@/components/layout/Layout";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";

const ContactPage = () => {
  return (
    <Layout>
      <Breadcrumbs items={[{ label: "עבדו איתנו" }]} />

      <div className="section-light">
        <section className="relative py-16 md:py-24 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
          <Warp
            colors={["#3d2310", "#5a351a", "#4B2E1A", "#2a1a0d", "#6b4226"]}
            speed={1.2}
            scale={1.2}
            distortion={0.4}
            swirl={0.3}
            swirlIterations={6}
            softness={0.7}
            shape="edge"
            shapeScale={0.5}
            proportion={0.5}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
          />
          <div className="container-main text-center relative z-10">
            <h1 className="hero-title-animate mb-4">רוצים לעבוד איתנו?</h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto mb-8 text-foreground">
              🤝 אנחנו תמיד מחפשים אנשים מוכשרים שרוצים להיות חלק ממשפחת Macho. 
              בין אם אתם ספרים מנוסים או בוגרי קורסים שרוצים להתחיל – יש לנו מקום בשבילכם. 💪
            </p>
            <a
              href="https://wa.me/972544744031?text=היי, אני מעוניין לעבוד עם Macho"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-cta"
            >
              <MessageCircle className="w-5 h-5" />
              דברו איתנו בוואטסאפ
            </a>
          </div>
        </section>
      </div>

      <Section variant="light" isFirstSection>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* טופס */}
          <AnimatedSection direction="right">
            <h2 className="text-2xl font-bold mb-2">📝 השאירו פרטים</h2>
            <p className="opacity-70 mb-6">✉️ מעדיפים שנחזור אליכם? מלאו את הטופס ונחזור בהקדם.</p>
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
                <label className="block text-sm font-medium mb-2">ספרו לנו על עצמכם</label>
                <Textarea placeholder="ניסיון, מוטיבציה, מה אתם מחפשים..." rows={5} className="bg-background border-border text-foreground" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-background text-foreground hover:bg-background/90">
                שלחו פרטים
              </Button>
            </form>
          </AnimatedSection>

          {/* פרטי קשר */}
          <AnimatedSection direction="left" delay={0.2}>
            <h2 className="text-2xl font-bold mb-6">📞 פרטי התקשרות</h2>
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

            {/* מפה */}
            <div className="mt-6 aspect-video rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.5!2d34.9!3d32.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDEwJzQ4LjAiTiAzNMKwNTQnMDAuMCJF!5e0!3m2!1siw!2sil!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="מיקום Macho - תל חי 37, כפר סבא"
              />
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </Layout>
  );
};

export default ContactPage;
