import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageCircle, Handshake, Zap, FileText } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";
import { useToast } from "@/hooks/use-toast";
import { WA_GENERAL, waLink } from "@/lib/constants";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast({ title: "שגיאה", description: "נא למלא שם וטלפון", variant: "destructive" });
      return;
    }

    const text = [
      `היי, אני רוצה לעבוד עם Macho 💈`,
      `שם: ${name.trim()}`,
      phone.trim() ? `טלפון: ${phone.trim()}` : "",
      email.trim() ? `אימייל: ${email.trim()}` : "",
      message.trim() ? `עוד פרטים: ${message.trim()}` : "",
    ].filter(Boolean).join("\n");

    window.open(
      waLink(WA_GENERAL, text),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "עבדו איתנו" }]} />

      <div className="section-light">
        <section className="relative py-16 md:py-24 overflow-hidden rounded-b-[40px] md:rounded-b-[80px]">
          <Warp
            colors={["#3d2310", "#5a351a", "#4B2E1A", "#2a1a0d", "#6b4226"]}
            speed={3.5}
            scale={1.5}
            distortion={0.6}
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
              <Handshake className="w-5 h-5 inline-block align-middle ml-1" /> אנחנו תמיד מחפשים אנשים מוכשרים שרוצים להיות חלק ממשפחת Macho. 
              בין אם אתם ספרים מנוסים או בוגרי קורסים שרוצים להתחיל – יש לנו מקום בשבילכם. <Zap className="w-5 h-5 inline-block align-middle ml-1" />
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
            <h2 className="text-2xl font-bold mb-2"><FileText className="w-5 h-5 inline-block align-middle ml-1" /> השאירו פרטים</h2>
            <p className="opacity-70 mb-6"><Mail className="w-4 h-4 inline-block align-middle ml-1" /> מעדיפים שנחזור אליכם? מלאו את הטופס ונחזור בהקדם.</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">שם מלא *</label>
                  <Input placeholder="הכניסו את שמכם" className="bg-background border-border text-foreground" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">טלפון *</label>
                  <Input type="tel" placeholder="050-0000000" className="bg-background border-border text-foreground" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">אימייל</label>
                <Input type="email" placeholder="your@email.com" className="bg-background border-border text-foreground" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ספרו לנו על עצמכם</label>
                <Textarea placeholder="ניסיון, מוטיבציה, מה אתם מחפשים..." rows={5} className="bg-background border-border text-foreground" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button type="submit" size="lg" className="w-full bg-background text-foreground hover:bg-background/90">
                <MessageCircle className="w-5 h-5 ml-2" />
                שלחו פרטים בוואטסאפ
              </Button>
            </form>
          </AnimatedSection>

          {/* תמונה או אלמנט נוסף */}
          <AnimatedSection direction="left" delay={0.2}>
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 p-8">
                <Handshake className="w-16 h-16 mx-auto opacity-30" />
                <p className="text-lg opacity-60">נשמח לשמוע מכם ולחזור בהקדם!</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </Layout>
  );
};

export default ContactPage;