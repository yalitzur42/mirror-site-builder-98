import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MapPin, Phone, Clock, Instagram, Navigation } from "lucide-react";
import TikTokIcon from "@/components/ui/TikTokIcon";
import barbershopInterior from "@/assets/barbershop-interior.jpg";
import { BUSINESS_ADDRESS, BUSINESS_ADDRESS_NOTE, BUSINESS_HOURS, PHONE_DISPLAY, PHONE_TEL, WAZE_URL, GMAPS_URL, INSTAGRAM_URL, TIKTOK_URL } from "@/lib/constants";
import { usePageMeta } from "@/hooks/usePageMeta";

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

      

      <Section variant="light">
        <div className="max-w-2xl mx-auto space-y-10 text-center">
          {/* Address */}
          <AnimatedSection direction="up">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold">כתובת</h3>
              <p className="opacity-70 text-lg">{BUSINESS_ADDRESS}</p>
              <p className="opacity-50 text-sm">{BUSINESS_ADDRESS_NOTE}</p>
              <div className="flex gap-2 mt-1">
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-waze text-white text-sm font-bold hover:bg-brand-waze-hover transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  Waze
                </a>
                <a
                  href={gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background text-foreground text-sm font-bold hover:opacity-90 transition-all"
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
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                <Phone className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold">טלפון</h3>
              <a href={`tel:${PHONE_TEL}`} className="opacity-70 text-lg hover:opacity-100 transition-opacity">
                {PHONE_DISPLAY}
              </a>
            </div>
          </AnimatedSection>

          {/* Hours */}
          <AnimatedSection direction="up" delay={0.2}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                <Clock className="w-6 h-6 text-foreground" />
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
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Instagram className="w-6 h-6 text-foreground" />
                </a>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:opacity-80 transition-opacity">
                  <TikTokIcon className="w-6 h-6 text-foreground" />
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
