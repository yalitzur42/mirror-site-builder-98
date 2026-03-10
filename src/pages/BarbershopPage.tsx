import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { MessageCircle, Scissors, Smartphone, Camera, Handshake, Coins } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { BOOKING_URL, WA_GENERAL, waLink } from "@/lib/constants";
import { usePageMeta } from "@/hooks/usePageMeta";

import barbershopInterior from "@/assets/barbershop-interior.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import barberLiav from "@/assets/barber-liav.jpg";
import barberNehoray from "@/assets/barber-nehoray.jpg";
import barberYali from "@/assets/barber-yali.jpg";

const BarbershopPage = () => {
  const { v, loading } = useSiteContent("barbershop");
  usePageMeta({ title: "מספרת גברים", description: "תספורות גברים מקצועיות, פייד, קלאסי ועיצוב זקן - Mac'ho עפולה" });

  if (loading) return <Layout><PageSkeleton /></Layout>;

  const defaultBarberImages = [barberLiav, barberNehoray, barberYali];

  const barbers = [1, 2, 3].map((i, idx) => {
    const pricesStr = v("pricing", `barber${i}_prices`, "70,80,70,100");
    return {
      nameHe: v("pricing", `barber${i}_name`, ["ליאב", "נהוראי", "יהלי"][idx]),
      nameEn: v("pricing", `barber${i}_name_en`, ["LIAV", "NEHORAY", "YALI"][idx]),
      image: v("pricing", `barber${i}_image`) || defaultBarberImages[idx],
      prices: pricesStr.split(",").map(Number),
    };
  });

  const services = [
    { name: v("pricing", "service1", "תספורת גבר בלבד") },
    { name: v("pricing", "service2", "תספורת גבר וזקן") },
    { name: v("pricing", "service3", "תספורת חייל בסדיר"), note: v("pricing", "service3_note", "(נוער עד גיל 18)") },
    { name: v("pricing", "service4", "תספורת MAKEOVER") },
  ];

  // Gallery: try dynamic, fall back to static
  const dynamicGallery = v("gallery", "images");
  let galleryImages: string[];
  try {
    const parsed = JSON.parse(dynamicGallery);
    galleryImages = Array.isArray(parsed) && parsed.length > 0 ? parsed : [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
  } catch {
    galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
  }

  return (
    <Layout>
      <Breadcrumbs items={[{ label: "מספרת גברים" }]} />

      <HeroSplit
        title={v("hero", "title", "מספרת גברים")}
        subtitle={v("hero", "subtitle", "תספורות ברמה אחרת")}
        description={v("hero", "description", "חוויית ספרות מקצועית עם יחס אישי. הספרים שלנו מתמחים בכל סגנונות התספורות - מקלאסי ועד מודרני.")}
        primaryCta={{ label: <><Smartphone className="w-4 h-4" /> לקביעת תור</>, href: BOOKING_URL }}
        image={v("hero", "image") || barbershopInterior}
      />

      <Section title={<><Coins className="w-6 h-6 inline-block align-middle ml-1" /> מחירון</>} variant="light">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-6 mb-8">
              {barbers.map((barber, i) => (
                <div key={i} className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-accent">
                    <img src={barber.image} alt={barber.nameHe} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-lg">{barber.nameHe}</h3>
                  <p className="text-sm opacity-60 font-semibold tracking-wider">{barber.nameEn}</p>
                </div>
              ))}
            </div>
            <div className="divide-y divide-border/30">
              {services.map((service, sIdx) => (
                <div key={sIdx} className="py-4">
                  <p className="text-center font-bold text-lg mb-3">
                    {service.name}
                    {service.note && <span className="text-sm font-normal opacity-60 mr-2">{service.note}</span>}
                  </p>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    {barbers.map((barber, bIdx) => (
                      <span key={bIdx} className="text-2xl font-black">₪{barber.prices[sIdx]}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      <Section title={<><Camera className="w-6 h-6 inline-block align-middle ml-1" /> מהעבודות שלנו</>} variant="dark">
        <AnimatedSection>
          <GalleryGrid images={galleryImages} />
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      <Section variant="light">
        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">{v("stats", "stat1_number", "15+")}</div>
              <p className="opacity-70">{v("stats", "stat1_label", "שנות ניסיון")}</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">{v("stats", "stat2_number", "10K+")}</div>
              <p className="opacity-70">{v("stats", "stat2_label", "לקוחות מרוצים")}</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">{v("stats", "stat3_number", "5★")}</div>
              <p className="opacity-70">{v("stats", "stat3_label", "דירוג ממוצע")}</p>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="triangles" />

      <Section variant="dark">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4"><Handshake className="w-6 h-6 inline-block align-middle ml-1" /> {v("join_team", "title", "ספר שרוצה להצטרף לצוות?")}</h2>
            <p className="text-lg opacity-80 mb-8">
              {v("join_team", "description", "אנחנו תמיד מחפשים ספרים מוכשרים שרוצים להתפתח ולעבוד בסביבה מקצועית ותומכת. אם אתה חושב שאתה מתאים – דבר איתנו.")}
            </p>
            <a
              href={waLink(WA_GENERAL, "היי, אני ספר ומעוניין להצטרף לצוות Macho")}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-cta"
            >
              <MessageCircle className="w-5 h-5" />
              דברו איתנו בוואטסאפ
            </a>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="steps" />

      <CTASection
        title={<><Scissors className="w-6 h-6 inline-block align-middle ml-1" /> מוכנים לתספורת חדשה?</>}
        description={<><Scissors className="w-5 h-5 inline-block align-middle ml-1" /> קבעו תור עכשיו</>}
        buttonLabel={<><Smartphone className="w-4 h-4" /> קבעו תור בוואטסאפ</>}
        buttonHref={BOOKING_URL}
        variant="light"
      />
    </Layout>
  );
};

export default BarbershopPage;
