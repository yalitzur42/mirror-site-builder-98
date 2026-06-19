import Layout from "@/components/layout/Layout";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { MessageCircle, Scissors, Smartphone, Camera, Handshake, Coins } from "@/lib/icons";
import { useSiteContent } from "@/hooks/useSiteContent";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { BOOKING_URL, WA_GENERAL, waLink } from "@/lib/constants";
import { usePageMeta } from "@/hooks/usePageMeta";

import barbershopInterior from "@/assets/barbershop-working.jpg";
import gallery1 from "@/assets/haircut-sample-1.jpg";
import gallery2 from "@/assets/haircut-sample-2.jpg";
import gallery3 from "@/assets/haircut-sample-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import barberLiav from "@/assets/barber-liav-brown.jpg";
import barberNehoray from "@/assets/barber-nehoray-brown.jpg";
import barberYali from "@/assets/barber-yali-brown.jpg";
import barberIdan from "@/assets/barber-idan-brown.jpg";

const BarbershopPage = () => {
  const { v, loading } = useSiteContent("barbershop");
  usePageMeta({ title: "מספרת גברים", description: "תספורות גברים מקצועיות, פייד, קלאסי ועיצוב זקן - Mac'ho עפולה" });

  if (loading) return <Layout><PageSkeleton /></Layout>;

  const defaultBarberImages = [barberLiav, barberNehoray, barberYali, barberIdan];
  const defaultBarberNames = ["ליאב", "נהוראי", "יהלי", "עידן"];
  const defaultBarberNamesEn = ["LIAV", "NEHORAY", "YALI", "IDAN"];

  const barbers = [1, 2, 3, 4].map((i, idx) => {
    const pricesStr = v("pricing", `barber${i}_prices`, "70,80,70,100");
    return {
      nameHe: v("pricing", `barber${i}_name`, defaultBarberNames[idx]),
      nameEn: v("pricing", `barber${i}_name_en`, defaultBarberNamesEn[idx]),
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
        title={v("hero", "title", "Macho עפולה")}
        subtitle={v("hero", "subtitle", "מספרת גברים פרימיום.")}
        description={v("hero", "description", "חוויית ספרות מקצועית עם יחס אישי. הספרים שלנו מתמחים בכל סגנונות התספורות - מקלאסי ועד מודרני.")}
        primaryCta={{ label: <><Smartphone className="w-4 h-4" /> לקביעת תור</>, href: BOOKING_URL }}
        image={v("hero", "image") || barbershopInterior}
      />

      <Section title={<><Coins className="w-6 h-6 inline-block align-middle ml-1" /> מחירון</>} variant="light">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {barbers.map((barber, bIdx) => (
              <div
                key={bIdx}
                className="rounded-2xl bg-primary text-primary-foreground border-2 border-primary-foreground/20 shadow-xl overflow-hidden flex flex-col"
              >
                <div className="relative bg-primary-foreground/5 px-3 pt-4 pb-3 text-center border-b border-primary-foreground/15">
                  <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-2 border-primary-foreground/40 shadow-lg">
                    <img src={barber.image} alt={barber.nameHe} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-extrabold text-xl leading-tight">{barber.nameHe}</h3>
                  <p className="text-xs opacity-60 font-bold tracking-[0.2em]">{barber.nameEn}</p>
                </div>
                <ul className="divide-y divide-primary-foreground/15 px-3">
                  {services.map((service, sIdx) => (
                    <li key={sIdx} className="py-3 flex flex-col items-center text-center gap-1">
                      <span className="text-xs font-bold opacity-80 leading-tight">
                        {service.name}
                        {service.note && <span className="block text-[10px] font-normal opacity-60">{service.note}</span>}
                      </span>
                      <span className="text-2xl font-black">₪{barber.prices[sIdx]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
              <div className="text-5xl font-black mb-2">{v("stats", "stat1_number", "6+")}</div>
              <p className="opacity-70">{v("stats", "stat1_label", "שנות ניסיון")}</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">{v("stats", "stat2_number", "5,000+")}</div>
              <p className="opacity-70">{v("stats", "stat2_label", "גברים שיצאו מרוצים")}</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">{v("stats", "stat3_number", "⭐ 5")}</div>
              <p className="opacity-70">{v("stats", "stat3_label", "למעלה מ-1,000 ביקורות חיוביות בגוגל ובאיזי")}</p>
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
        title={<><Scissors className="w-6 h-6 inline-block align-middle ml-1" /> מוכן לתספורת שתזכור?</>}
        description={<><Scissors className="w-5 h-5 inline-block align-middle ml-1" /> קבעו תור עכשיו</>}
        buttonLabel={<><Smartphone className="w-4 h-4" /> קבעו תור עכשיו</>}
        buttonHref={BOOKING_URL}
        variant="light"
      />
    </Layout>
  );
};

export default BarbershopPage;
