import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { MapPin, Phone, Clock, Instagram, Navigation } from "lucide-react";
import TikTokIcon from "@/components/ui/TikTokIcon";
import barbershopInterior from "@/assets/barbershop-interior.jpg";
import { BUSINESS_ADDRESS, BUSINESS_ADDRESS_NOTE, BUSINESS_HOURS, PHONE_DISPLAY, PHONE_TEL, WAZE_URL, GMAPS_URL, INSTAGRAM_URL, TIKTOK_URL } from "@/lib/constants";

const BusinessPage = () => {
  const hours = BUSINESS_HOURS;
  const wazeUrl = WAZE_URL;
  const gmapsUrl = GMAPS_URL;

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "פרטי העסק" }]} />

      <HeroSplit
        title="פרטי העסק"
        subtitle="Macho – עפולה"
        description={<>כל מה שצריך לדעת לפני שמגיעים אלינו. מיקום, שעות פעילות ודרכי התקשרות.</>}
        image={barbershopInterior}
      />

      

      <Section variant="light" isFirstSection>
        <div className="max-w-2xl mx-auto space-y-10 text-center">
          {/* Address */}
          <AnimatedSection direction="up">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[hsl(60_56%_91%)]" />
              </div>
              <h3 className="text-xl font-bold">כתובת</h3>
              <p className="opacity-70 text-lg">{BUSINESS_ADDRESS}</p>
              <p className="opacity-50 text-sm">{BUSINESS_ADDRESS_NOTE}</p>
              <div className="flex gap-2 mt-1">
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#33ccff] text-white text-sm font-bold hover:bg-[#28b8e8] transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  Waze
                </a>
                <a
                  href={gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] text-sm font-bold hover:opacity-90 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  Google Maps
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Phone */}
          <AnimatedSection direction="up" delay={0.1}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center">
                <Phone className="w-6 h-6 text-[hsl(60_56%_91%)]" />
              </div>
              <h3 className="text-xl font-bold">טלפון</h3>
              <a href="tel:0544744031" className="opacity-70 text-lg hover:opacity-100 transition-opacity">
                054-4744031
              </a>
            </div>
          </AnimatedSection>

          {/* Hours */}
          <AnimatedSection direction="up" delay={0.2}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[hsl(60_56%_91%)]" />
              </div>
              <h3 className="text-xl font-bold mb-1">שעות פעילות</h3>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-8">
                    <span className="font-medium">{h.day}</span>
                    <span className="opacity-70">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Social */}
          <AnimatedSection direction="up" delay={0.3}>
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xl font-bold">עקבו אחרינו</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/macho.afula" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Instagram className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </a>
                <a href="https://www.tiktok.com/@yali.tzur" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[hsl(25_50%_20%)] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <TikTokIcon className="w-6 h-6 text-[hsl(60_56%_91%)]" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </Layout>
  );
};

export default BusinessPage;
