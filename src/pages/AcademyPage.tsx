
import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";
import PageSkeleton from "@/components/ui/PageSkeleton";
import HeroSplit from "@/components/ui/HeroSplit";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTASection from "@/components/ui/CTASection";
import SectionDivider from "@/components/ui/SectionDivider";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/card";

import {
  Clock, Users, Award, Smartphone, Rocket, ClipboardList, MessageCircle,
  GraduationCap, Star, BookOpen, CheckCircle2, ShieldCheck, Sparkles,
  CalendarDays, MapPin, ChevronDown, BadgeCheck, BriefcaseBusiness,
  Video, Scissors, HelpCircle
} from "lucide-react";

import academyClassroom from "@/assets/academy-classroom.jpg";
import courseBeginnerHero from "@/assets/course-beginner-hero.jpg";

import { WA_ACADEMY, waLink as _waLink } from "@/lib/constants";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import UrgencyBar from "@/components/academy/UrgencyBar";
import LeadForm from "@/components/academy/LeadForm";
import StatsCounter from "@/components/academy/StatsCounter";
import FaqAccordion from "@/components/academy/FaqAccordion";
import StickyWhatsApp from "@/components/academy/StickyWhatsApp";

function buildWaLink(text: string) {
  return _waLink(WA_ACADEMY, text);
}

const AcademyPage = () => {
  const { v, loading } = useSiteContent("academy");

  // ====== DATA (dynamic from admin) ======
  const modules = useMemo(
    () => [
      v("modules", "module1", "מבוא לספרות גברים"),
      v("modules", "module2", "כלי עבודה והיגיינה"),
      v("modules", "module3", "טכניקות בסיסיות"),
      v("modules", "module4", "תספורות קלאסיות"),
      v("modules", "module5", "עיצוב זקן בסיסי"),
      v("modules", "module6", "שירות לקוחות ומכירה"),
    ],
    [v]
  );

  const stats = useMemo(
    () => [
      { value: parseInt(v("stats", "stat1_number", "15")) || 15, suffix: v("stats", "stat1_number", "15+").replace(/\d+/, ""), label: v("stats", "stat1_label", "שנות ניסיון בהוראה") },
      { value: parseInt(v("stats", "stat2_number", "500")) || 500, suffix: v("stats", "stat2_number", "500+").replace(/\d+/, ""), label: v("stats", "stat2_label", "בוגרים עובדים בתעשייה") },
      { value: parseInt(v("stats", "stat3_number", "98")) || 98, suffix: v("stats", "stat3_number", "98%").replace(/\d+/, ""), label: v("stats", "stat3_label", "שביעות רצון תלמידים") },
      { value: parseInt(v("stats", "stat4_number", "12")) || 12, suffix: v("stats", "stat4_number", "12").replace(/\d+/, ""), label: v("stats", "stat4_label", "מחזורים בשנה") },
    ],
    [v]
  );

  const features = useMemo(
    () => [
      { icon: GraduationCap, title: v("why_us", "feature1_title", "הכשרה מעשית"), description: v("why_us", "feature1_desc", "לומדים תוך כדי עבודה אמיתית") },
      { icon: Users, title: v("why_us", "feature2_title", "קבוצות קטנות"), description: v("why_us", "feature2_desc", "עד 8 תלמידים בכיתה") },
      { icon: Award, title: v("why_us", "feature3_title", "תעודה מוכרת"), description: v("why_us", "feature3_desc", "הסמכה רשמית בסיום") },
      { icon: Clock, title: v("why_us", "feature4_title", "גמישות בשעות"), description: v("why_us", "feature4_desc", "מסלולי בוקר/ערב") },
      { icon: BookOpen, title: v("why_us", "feature5_title", "חומרי לימוד"), description: v("why_us", "feature5_desc", "ערכת ציוד מקצועית לכל תלמיד") },
      { icon: Star, title: v("why_us", "feature6_title", "ליווי אישי"), description: v("why_us", "feature6_desc", "תמיכה גם אחרי הקורס") },
    ],
    [v]
  );

  const nextCohortStartISO = v("details", "next_cohort", "2026-04-15") + "T18:00:00.000+03:00";

  const faq = useMemo(
    () => [
      { q: v("faq", "q1", "צריך ניסיון קודם?"), a: v("faq", "a1", "לא. הקורס מיועד למתחילים. מתחילים מהבסיס ומתקדמים לתרגול מעשי בהדרגה.") },
      { q: v("faq", "q2", "כמה פעמים בשבוע לומדים?"), a: v("faq", "a2", "בד״כ 2–3 מפגשים בשבוע (תלוי במסלול).") },
      { q: v("faq", "q3", "האם מקבלים תעודה?"), a: v("faq", "a3", "כן. בסיום הקורס ובהשלמת המטלות תקבלו תעודת הסמכה רשמית.") },
      { q: v("faq", "q4", "יש ליווי אחרי הקורס?"), a: v("faq", "a4", "כן. יש קבוצת בוגרים/מנטורינג והכוונה להשתלבות במספרות.") },
      { q: v("faq", "q5", "מה לגבי ציוד?"), a: v("faq", "a5", "כולל ערכת ציוד מקצועית בסיסית לכל תלמיד.") },
    ],
    [v]
  );

  // ====== EFFECTS ======
  const [showSticky, setShowSticky] = useState(false);
  const heroAnchorRef = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const el = heroAnchorRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ====== Actions ======
  const onPrimaryCTA = () => {
    window.open(buildWaLink("היי 👋 אני רוצה לבדוק התאמה לקורס באקדמיה של Macho. אפשר פרטים?"), "_blank", "noopener,noreferrer");
  };

  const onScrollToLead = () => {
    document.getElementById("lead-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onLeadSend = (name: string, phone: string, goal: "info" | "fit" | "reserve") => {
    const goalText =
      goal === "info" ? "אני רוצה עוד פרטים על האקדמיה" :
      goal === "reserve" ? "אני רוצה לשריין מקום למחזור הקרוב" :
      "אני רוצה לבדוק התאמה לקורס";

    const lines = ["היי 👋", goalText, "", name ? `שם: ${name}` : "", phone ? `טלפון: ${phone}` : "", "", "אפשר לדבר? 🙂"].filter(Boolean);
    window.open(buildWaLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  if (loading) return <Layout><PageSkeleton /></Layout>;

  return (
    <Layout>
      {/* TOP SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-1 bg-transparent">
        <div className="h-full bg-foreground/80" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Breadcrumbs items={[{ label: "האקדמיה" }]} />

      <div ref={heroAnchorRef} />

      <HeroSplit
        title={v("hero", "title", "האקדמיה של Macho")}
        subtitle={v("hero", "subtitle", "תוך 3 חודשים — בדרך לקריירה בספרות גברים")}
        description={v("hero", "description", "קורס למתחילים ללא ניסיון: הרבה תרגול, קבוצות קטנות, תעודה בסיום וליווי עד שמתחילים לעבוד.")}
        primaryCta={{
          label: <><Smartphone className="w-4 h-4" /> בדקו התאמה לקורס</>,
          href: buildWaLink("היי 👋 אני רוצה לבדוק התאמה לקורס באקדמיה של Macho. אפשר פרטים?"),
        }}
        image={v("hero", "image") || courseBeginnerHero}
      />

      {/* URGENCY BAR */}
      <UrgencyBar
        nextCohortStartISO={nextCohortStartISO}
        onScrollToLead={onScrollToLead}
        onPrimaryCTA={onPrimaryCTA}
      />

      {/* TRUST STRIP */}
      <div className="bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 opacity-80" />
            <span>{v("trust_strip", "item1", "קבוצות קטנות • יחס אישי")}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 opacity-80" />
            <span>{v("trust_strip", "item2", "תעודה בסיום")}</span>
          </div>
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="w-4 h-4 opacity-80" />
            <span>{v("trust_strip", "item3", "הכוונה להשתלבות בעבודה")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 opacity-80" />
            <span>{v("trust_strip", "item4", "תרגול אמיתי לאורך הקורס")}</span>
          </div>
        </div>
      </div>

      {/* LEAD SECTION */}
      <Section variant="light" isFirstSection>
        <div id="lead-section" className="scroll-mt-28" />

        <AnimatedSection>
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5">
              <LeadForm v={v} onSend={onLeadSend} />
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-6">
                <Card className="overflow-hidden rounded-2xl border-border bg-background">
                  <div className="grid md:grid-cols-2">
                    <div className="p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-black">
                        {v("outcomes", "title", "מה יוצא לכם מזה בפועל?")}
                      </h3>
                      <ul className="mt-4 grid gap-3 text-sm md:text-base">
                        {[
                          v("outcomes", "item1", "תספורות בביקוש גבוה (Fade/Taper/Classic)"),
                          v("outcomes", "item2", "עבודה נקייה ומדויקת (קווים, מעברים, סימטריה)"),
                          v("outcomes", "item3", "תיק עבודות לתחילת עבודה במספרות"),
                          v("outcomes", "item4", "בטחון מקצועי מול לקוחות אמיתיים"),
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 mt-0.5 opacity-80" />
                            <span className="opacity-85">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-muted/40 border border-border px-4 py-2 text-sm">
                          <Clock className="w-4 h-4 opacity-80" />
                          <span>3 חודשים</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-muted/40 border border-border px-4 py-2 text-sm">
                          <Users className="w-4 h-4 opacity-80" />
                          <span>עד 8 תלמידים</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-muted/40 border border-border px-4 py-2 text-sm">
                          <Award className="w-4 h-4 opacity-80" />
                          <span>תעודה בסיום</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative min-h-[260px] md:min-h-full">
                      <img src={v("outcomes", "image") || academyClassroom} alt="כיתה באקדמיה" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 right-4 left-4 text-right text-white">
                        <div className="text-sm opacity-90 flex items-center justify-end gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>מיקום: יישלח בוואטסאפ</span>
                        </div>
                        <div className="text-sm opacity-90 flex items-center justify-end gap-2 mt-1">
                          <CalendarDays className="w-4 h-4" />
                          <span>מחזור קרוב: {new Date(nextCohortStartISO).toLocaleDateString("he-IL")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Stats */}
                <StatsCounter stats={stats} />

                {/* Mini CTA row */}
                <div className="flex flex-col md:flex-row gap-3">
                  <button onClick={onPrimaryCTA} className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 font-bold hover:opacity-95 transition">
                    <Smartphone className="w-5 h-5" />
                    שיחה בוואטסאפ עכשיו
                  </button>
                  <button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 font-bold hover:bg-muted/40 transition">
                    <HelpCircle className="w-5 h-5" />
                    שאלות נפוצות
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Course quick cards */}
        <AnimatedSection delay={0.15}>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-background text-foreground text-center p-6 border-border rounded-2xl hover:-translate-y-1 transition">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">משך הקורס</h3>
              <p className="opacity-70">{v("details", "duration", "3 חודשים")}</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 border-border rounded-2xl hover:-translate-y-1 transition">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">גודל הכיתה</h3>
              <p className="opacity-70">{v("details", "class_size", "עד 8 תלמידים")}</p>
            </Card>
            <Card className="bg-background text-foreground text-center p-6 border-border rounded-2xl hover:-translate-y-1 transition">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">תעודה</h3>
              <p className="opacity-70">{v("details", "certificate", "הסמכה רשמית")}</p>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      {/* HOW IT WORKS */}
      <Section title={<><Sparkles className="w-6 h-6 inline-block align-middle ml-1" /> איך זה עובד בפועל</>} variant="dark">
        <AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: v("how_it_works", "step1_title", "1) בדיקת התאמה"), desc: v("how_it_works", "step1_desc", "שולחים הודעה קצרה/פרטים — ובודקים התאמה למסלול.") },
              { icon: Scissors, title: v("how_it_works", "step2_title", "2) תרגול מעשי"), desc: v("how_it_works", "step2_desc", "לומדים בסיס + מתרגלים בהדרכה צמודה עד ביטחון מלא.") },
              { icon: BriefcaseBusiness, title: v("how_it_works", "step3_title", "3) התחלת עבודה"), desc: v("how_it_works", "step3_desc", "תיק עבודות + ליווי והכוונה להשתלבות במספרות.") },
            ].map((step, idx) => (
              <Card key={idx} className="bg-secondary text-secondary-foreground border-0 p-6 rounded-2xl">
                <step.icon className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="font-black text-xl mb-2">{step.title}</h3>
                <p className="opacity-80">{step.desc}</p>
                <div className="mt-5 flex items-center gap-2 opacity-85 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>שלב {idx + 1} מתוך 3</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3">
            <button onClick={onScrollToLead} className="inline-flex items-center justify-center gap-2 rounded-xl bg-background text-foreground px-6 py-3 font-bold hover:opacity-95 transition">
              <BadgeCheck className="w-5 h-5" />
              בדיקת התאמה מהירה
            </button>
            <button onClick={onPrimaryCTA} className="inline-flex items-center justify-center gap-2 rounded-xl bg-background/10 text-background px-6 py-3 font-bold hover:bg-background/15 transition">
              <Smartphone className="w-5 h-5" />
              וואטסאפ עכשיו
            </button>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      {/* COURSE CONTENT */}
      <Section title={<><ClipboardList className="w-6 h-6 inline-block align-middle ml-1" /> תכני הקורס</>} variant="light">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <div key={index} className="group flex items-center gap-3 p-4 bg-muted/40 hover:bg-muted/55 border border-border rounded-xl transition">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <span className="font-semibold opacity-90">{module}</span>
                <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-60 transition mr-auto" />
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-2xl border-border text-foreground">
              <Video className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg text-primary">{v("micro_proof", "card1_title", "תרגול מודרך")}</h3>
              <p className="opacity-80 text-sm mt-1">{v("micro_proof", "card1_desc", "לא רק תיאוריה — עובדים ידיים על הכלים")}</p>
            </Card>
            <Card className="p-6 rounded-2xl border-border text-foreground">
              <ShieldCheck className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg text-primary">{v("micro_proof", "card2_title", "סטנדרט היגיינה")}</h3>
              <p className="opacity-80 text-sm mt-1">{v("micro_proof", "card2_desc", "איך לעבוד נכון ומקצועי לפי נהלים")}</p>
            </Card>
            <Card className="p-6 rounded-2xl border-border text-foreground">
              <BriefcaseBusiness className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg text-primary">{v("micro_proof", "card3_title", "כניסה לתעשייה")}</h3>
              <p className="opacity-80 text-sm mt-1">{v("micro_proof", "card3_desc", "איך למצוא מקום, איך להציג את עצמך")}</p>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="triangles" />

      {/* WHY US */}
      <Section title={<><Star className="w-6 h-6 inline-block align-middle ml-1" /> למה ללמוד אצלנו?</>} variant="dark">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-secondary text-secondary-foreground border-0 p-6 rounded-2xl hover:-translate-y-1 transition">
                <feature.icon className="w-10 h-10 mb-3 opacity-90" />
                <h3 className="font-black text-lg mb-1">{feature.title}</h3>
                <p className="opacity-80 text-sm">{feature.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm opacity-85">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>מיקוד בתכל׳ס — תוצאות</span>
                </div>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="steps" />

      {/* TESTIMONIALS */}
      <Section variant="light">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-3 text-3xl md:text-4xl font-black">
              <MessageCircle className="w-6 h-6 inline-block align-middle ml-1" /> הבוגרים שלנו מדברים
            </h2>
            <p className="opacity-70 mb-10">אמיתי, קצר ולעניין — מה אנשים חוו ומה יצא להם מזה.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-2xl border-border text-right bg-background">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 opacity-80" />)}
                  </div>
                  <span className="text-xs opacity-60">{v("testimonials", "review1_cohort", "מחזור 2024")}</span>
                </div>
                <p className="opacity-85 mb-4">"{v("testimonials", "review1_text", "תוך 3 חודשים עברתי מאפס ניסיון לעבודה במספרה מובילה. התרגול והיחס האישי עשו את ההבדל.")}"</p>
                <p className="font-bold text-sm">— {v("testimonials", "review1_name", "דן")}</p>
              </Card>

              <Card className="p-6 rounded-2xl border-border text-right bg-background">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 opacity-80" />)}
                  </div>
                  <span className="text-xs opacity-60">{v("testimonials", "review2_cohort", "מחזור 2023")}</span>
                </div>
                <p className="opacity-85 mb-4">"{v("testimonials", "review2_text", "המקצועיות של הצוות ברמה אחרת. קיבלתי ביטחון אמיתי לעבוד מול לקוחות, גם אחרי הקורס המשיכו ללוות.")}"</p>
                <p className="font-bold text-sm">— {v("testimonials", "review2_name", "אור")}</p>
              </Card>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <button onClick={onScrollToLead} className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-bold hover:opacity-95 transition">
                <Smartphone className="w-5 h-5" />
                גם אני רוצה פרטים
              </button>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* FAQ */}
      <SectionDivider from="light" to="dark" shape="waves" />

      <Section title={<><HelpCircle className="w-6 h-6 inline-block align-middle ml-1" /> שאלות נפוצות</>} variant="dark">
        <div id="faq" className="scroll-mt-28" />
        <AnimatedSection>
          <FaqAccordion items={faq} />

          <div className="mt-10 text-center">
            <p className="opacity-80 mb-4">יש עוד שאלה? שלחו הודעה ונענה מהר.</p>
            <button onClick={onPrimaryCTA} className="inline-flex items-center justify-center gap-2 rounded-xl bg-background text-foreground px-6 py-3 font-bold hover:opacity-95 transition">
              <Smartphone className="w-5 h-5" />
              שלחו שאלה בוואטסאפ
            </button>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      {/* FINAL CTA */}
      <CTASection
        title={<><Rocket className="w-6 h-6 inline-block align-middle ml-1" /> {v("cta", "title", "מוכנים להתחיל קריירה חדשה?")}</>}
        description={
          <>
            {v("cta", "description", "שלחו הודעה עכשיו כדי לבדוק התאמה למחזור הקרוב. קבוצות קטנות — המקומות נגמרים מהר.")}
            {v("cta", "note", "") && <span className="block mt-2 text-sm opacity-70">✦ {v("cta", "note", "כולל ערכת ציוד מקצועית מלאה")}</span>}
          </>
        }
        buttonLabel={<><Smartphone className="w-4 h-4" /> שריינו מקום / בדקו התאמה</>}
        buttonHref={buildWaLink("היי 👋 אני רוצה לשריין מקום למחזור הקרוב באקדמיה של Macho. אפשר פרטים?")}
        variant="light"
      />

      {/* STICKY WHATSAPP CTA */}
      <StickyWhatsApp visible={showSticky} onScrollToLead={onScrollToLead} onPrimaryCTA={onPrimaryCTA} />
    </Layout>
  );
};

export default AcademyPage;
