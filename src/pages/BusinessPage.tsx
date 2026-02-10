import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MapPin, Phone, Clock, Car, Scissors, Instagram, Facebook, Youtube } from "lucide-react";
import barbershopInterior from "@/assets/barbershop-interior.jpg";

const BusinessPage = () => {
  const hours = [
    { day: "ראשון - חמישי", time: "09:00 - 20:00" },
    { day: "שישי", time: "08:00 - 14:00" },
    { day: "שבת", time: "סגור" },
  ];

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "פרטי העסק" }]} />

      <HeroSplit
        title="פרטי העסק"
        subtitle="📍 Macho – כפר סבא"
        description="כל מה שצריך לדעת לפני שמגיעים אלינו. מיקום, שעות פעילות ודרכי התקשרות. 📞"
      />

      <Section variant="light" isFirstSection>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column – Info */}
          <div className="space-y-10">
            {/* Address */}
            <AnimatedSection direction="right">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">כתובת</h3>
                  <p className="opacity-70 text-lg">תל חי 37, כפר סבא</p>
                  <p className="opacity-50 text-sm mt-1">ליד כיכר ויצמן, קומת קרקע</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Phone */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">טלפון</h3>
                  <a href="tel:0544744031" className="opacity-70 text-lg hover:opacity-100 transition-opacity">
                    054-4744031
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Hours */}
            <AnimatedSection direction="right" delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">שעות פעילות</h3>
                  <div className="space-y-2">
                    {hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-8">
                        <span className="font-medium">{h.day}</span>
                        <span className="opacity-70">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Parking */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center shrink-0">
                  <Car className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">חניה</h3>
                  <p className="opacity-70 text-lg">חניה חינם ללקוחות המספרה</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Services Summary */}
            <AnimatedSection direction="right" delay={0.4}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center shrink-0">
                  <Scissors className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">שירותים</h3>
                  <p className="opacity-70 text-lg">תספורות גברים • פרם לגבר • עיצוב זקן • אקדמיה לספרות</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Social */}
            <AnimatedSection direction="right" delay={0.5}>
              <h3 className="text-xl font-bold mb-3">עקבו אחרינו</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Instagram className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Facebook className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Youtube className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column – Map + Image */}
          <div className="space-y-8">
            <AnimatedSection direction="left">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3376.5!2d34.9!3d32.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDEwJzQ4LjAiTiAzNMKwNTQnMDAuMCJF!5e0!3m2!1siw!2sil!4v1700000000000"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="מיקום Macho על המפה"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <img
                src={barbershopInterior}
                alt="פנים המספרה Macho"
                className="rounded-lg w-full shadow-lg"
              />
            </AnimatedSection>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default BusinessPage;
