
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
import GalleryGrid from "@/components/ui/GalleryGrid";
import { Card } from "@/components/ui/card";

import {
  Clock, Users, Award, Smartphone, Rocket, ClipboardList, MessageCircle,
  GraduationCap, Star, BookOpen, CheckCircle2, ShieldCheck, Sparkles,
  CalendarDays, MapPin, ChevronDown, BadgeCheck, BriefcaseBusiness,
  Video, Scissors, HelpCircle, AlertTriangle, Target, UserCheck, Play,
  XCircle, ArrowRight, ShieldAlert, ImageIcon
} from "lucide-react";

import academyClassroom from "@/assets/academy-classroom.jpg";
import courseBeginnerHero from "@/assets/course-beginner-hero.jpg";
import ownerPortrait from "@/assets/owner-portrait.jpg";

import { WA_ACADEMY, waLink as _waLink } from "@/lib/constants";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import UrgencyBar from "@/components/academy/UrgencyBar";
import LeadForm from "@/components/academy/LeadForm";
import StatsCounter from "@/components/academy/StatsCounter";
import FaqAccordion from "@/components/academy/FaqAccordion";
import StickyWhatsApp from "@/components/academy/StickyWhatsApp";
import SalaryCalculator from "@/components/academy/SalaryCalculator";
import AcademyCarousels from "@/components/academy/AcademyCarousels";

function buildWaLink(text: string) {
  return _waLink(WA_ACADEMY, text);
}

const AcademyPage = () => {
  const { v, loading } = useSiteContent("academy");
  usePageMeta({ title: "האקדמיה", description: "קורס ספרות גברים למתחילים - 3 חודשים, קבוצות קטנות, תעודה בסיום וליווי להשתלבות בעבודה" });

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
  const spotsTotal = parseInt(v("details", "spots_total", "8")) || 8;
  const spotsTaken = parseInt(v("details", "spots_taken", "5")) || 5;
  const spotsLeft = Math.max(0, spotsTotal - spotsTaken);

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

  const problems = useMemo(
    () => [
      { icon: AlertTriangle, text: v("problems", "pain1", "רוצה להחליף מקצוע אבל לא יודע מאיפה להתחיל") },
      { icon: AlertTriangle, text: v("problems", "pain2", "למדת לבד מיוטיוב אבל חסר ביטחון לעבוד מול לקוחות") },
      { icon: AlertTriangle, text: v("problems", "pain3", "פחד להשקיע כסף וזמן בלי ערבות שזה יוביל לעבודה") },
      { icon: AlertTriangle, text: v("problems", "pain4", "מחפש מקצוע יצירתי עם חופש ושליטה בזמן שלך") },
    ],
    [v]
  );

  const solutions = useMemo(
    () => [
      v("solution", "benefit1", "תרגול מעשי מיום ראשון — לא רק צופים"),
      v("solution", "benefit2", "מנטור אישי שלוקח אותך יד ביד"),
      v("solution", "benefit3", "ליווי גם אחרי הקורס עד שנכנסים לעבודה"),
      v("solution", "benefit4", "ערכת ציוד מקצועית כלולה — מתחילים מוכנים"),
    ],
    [v]
  );

  const whoIsThisFor = useMemo(
    () => [
      v("who_is_this_for", "item1", "גברים שרוצים להחליף מקצוע ולהיכנס לתחום הספרות"),
      v("who_is_this_for", "item2", "צעירים אחרי צבא שמחפשים קריירה יצירתית ועצמאית"),
      v("who_is_this_for", "item3", "מי שמספר חברים/משפחה ורוצה להפוך את זה למקצוע"),
      v("who_is_this_for", "item4", "כל מי שמוכן ללמוד ולהשקיע — בלי צורך בניסיון קודם"),
    ],
    [v]
  );

  const testimonials = useMemo(
    () => [1, 2, 3, 4, 5, 6].map((n) => ({
      text: v("testimonials", `review${n}_text`, ""),
      name: v("testimonials", `review${n}_name`, ""),
      cohort: v("testimonials", `review${n}_cohort`, ""),
      result: v("testimonials", `review${n}_result`, ""),
      image: v("testimonials", `review${n}_image`, ""),
    })).filter((t) => t.text && t.name),
    [v]
  );

  const comparison = useMemo(
    () => [1, 2, 3, 4].map((n) => ({
      before: v("comparison", `before${n}`, ""),
      after: v("comparison", `after${n}`, ""),
    })).filter((c) => c.before && c.after),
    [v]
  );

  const guarantees = useMemo(
    () => [
      v("guarantee", "item1", "שיעור ניסיון חינם — תראה איך עובדים לפני שמחליטים"),
      v("guarantee", "item2", "ליווי עד השתלבות בעבודה — לא עוזבים אותך אחרי התעודה"),
      v("guarantee", "item3", "קבוצות קטנות — אם לא מרגיש יחס אישי, זה לא אנחנו"),
    ],
    [v]
  );

  // Results gallery
  const resultsGalleryRaw = v("results_gallery", "images", "[]");
  const resultsGallery = useMemo(() => {
    try { return JSON.parse(resultsGalleryRaw) as string[]; } catch { return []; }
  }, [resultsGalleryRaw]);

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

  const videoFile = v("video", "video_file", "");
  const videoThumbnail = v("video", "video_thumbnail", "");

  return (
    <Layout>
      {/* TOP SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-1 bg-transparent">
        <div className="h-full bg-foreground/80" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Breadcrumbs items={[{ label: "האקדמיה" }]} />

      <div ref={heroAnchorRef} />

      {/* ============ 1️⃣ HERO ============ */}
      <HeroSplit
        title={v("hero", "title", "האקדמיה של Macho")}
        subtitle={v("hero", "subtitle", "תוך 3 חודשים — בדרך לקריירה בספרות גברים")}
        description={v("hero", "description", "קורס למתחילים ללא ניסיון: הרבה תרגול, קבוצות קטנות, תעודה בסיום וליווי עד שמתחילים לעבוד.")}
        primaryCta={{
          label: <><Smartphone className="w-4 h-4" /> בדקו התאמה לקורס</>,
          href: buildWaLink("היי 👋 אני רוצה לבדוק התאמה לקורס באקדמיה של Macho. אפשר פרטים?"),
        }}
        secondaryCta={{
          label: <><Play className="w-4 h-4" /> למידע נוסף</>,
          href: "#lead-section",
        }}
        image={v("hero", "image") || courseBeginnerHero}
      />

      {/* URGENCY BAR with spots remaining */}
      <UrgencyBar
        nextCohortStartISO={nextCohortStartISO}
        onScrollToLead={onScrollToLead}
        onPrimaryCTA={onPrimaryCTA}
        spotsLeft={spotsLeft}
      />

      {/* ============ 2️⃣ VIDEO / INTRO ============ */}
      <Section variant="light">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              <Play className="w-6 h-6 inline-block align-middle ml-1" />
              {v("video", "title", "צפו ותבינו למה באים ללמוד אצלנו")}
            </h2>
            <p className="opacity-70 mb-8 text-base md:text-lg">
              {v("video", "subtitle", "סרטון קצר שמסביר בדיוק מה תקבלו ואיך הקורס עובד")}
            </p>

            {videoFile ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-primary-foreground shadow-lg">
                <video
                  src={videoFile}
                  controls
                  poster={videoThumbnail || undefined}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-primary-foreground">
                  <img
                    src={videoThumbnail || academyClassroom}
                    alt="כיתה באקדמיה"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <button
                  onClick={onScrollToLead}
                  className="inline-flex items-center gap-3 rounded-full bg-foreground text-background px-8 py-4 font-bold text-lg hover:opacity-95 transition mx-auto"
                >
                  <Smartphone className="w-5 h-5" />
                  קבלו פרטים נוספים
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </Section>

      {/* ============ CAROUSELS: WhatsApp Reviews + Student Photos ============ */}
      <Section variant="light">
        <AnimatedSection>
          <AcademyCarousels v={v} />
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      {/* ============ 3️⃣ PRIMARY FORM + OUTCOMES ============ */}
      <Section variant="dark">
        <div id="lead-section" className="scroll-mt-28" />

        {/* Spots remaining indicator */}
        {spotsLeft > 0 && spotsLeft <= 4 && (
          <div className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-4 py-1.5 animate-pulse">
              <Users className="w-4 h-4" />
              נשארו רק {spotsLeft} מקומות במחזור הקרוב!
            </span>
          </div>
        )}

        <AnimatedSection>
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5">
              <LeadForm v={v} onSend={onLeadSend} />
            </div>

            <div className="lg:col-span-7">
              <Card className="overflow-hidden rounded-2xl border-border bg-secondary text-secondary-foreground border-0 h-full">
                <div className="grid md:grid-cols-2 h-full">
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
                      <div className="inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm">
                        <Clock className="w-4 h-4 opacity-80" />
                        <span>3 חודשים</span>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm">
                        <Users className="w-4 h-4 opacity-80" />
                        <span>עד 8 תלמידים</span>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm">
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
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      {/* ============ SALARY CALCULATOR ============ */}
      <Section variant="light">
        <AnimatedSection>
          <SalaryCalculator />
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="light" shape="waves" />

      {/* ============ 4️⃣ SOCIAL PROOF ============ */}
      <Section variant="light">
        <AnimatedSection>
          {/* Trust Strip */}
          <div className="bg-muted/40 border border-border rounded-2xl p-5 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
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

          {/* Stats */}
          <StatsCounter stats={stats} />

          {/* Quick course cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
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

      <SectionDivider from="light" to="dark" shape="triangles" />

      {/* ============ 5️⃣ PROBLEM SECTION ============ */}
      <Section
        title={<><AlertTriangle className="w-6 h-6 inline-block align-middle ml-1" /> {v("problems", "title", "מרגיש שאתה תקוע?")}</>}
        subtitle={v("problems", "subtitle", "הרבה גברים מגיעים אלינו עם אותן תחושות:")}
        variant="dark"
      >
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {problems.map((pain, idx) => (
              <Card key={idx} className="bg-secondary text-secondary-foreground border-0 p-5 rounded-2xl flex items-start gap-3">
                <pain.icon className="w-5 h-5 mt-0.5 opacity-70 shrink-0" />
                <span className="opacity-90">{pain.text}</span>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button onClick={onScrollToLead} className="inline-flex items-center justify-center gap-2 rounded-xl bg-background text-foreground px-6 py-3 font-bold hover:opacity-95 transition">
              <Smartphone className="w-5 h-5" />
              אני רוצה לבדוק אם זה בשבילי
            </button>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      {/* ============ 6️⃣ SOLUTION SECTION ============ */}
      <Section
        title={<><Target className="w-6 h-6 inline-block align-middle ml-1" /> {v("solution", "title", "הדרך שלנו: מאפס לספר עובד")}</>}
        subtitle={v("solution", "subtitle", "שיטת ההכשרה של Macho Academy נבנתה כדי לתת לך את כל מה שצריך בפועל — לא רק תיאוריה.")}
        variant="light"
      >
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {solutions.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-muted/40 border border-border rounded-xl">
                <CheckCircle2 className="w-5 h-5 mt-0.5 opacity-80 shrink-0" />
                <span className="font-semibold opacity-90">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Why us features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background text-foreground border-border p-6 rounded-2xl hover:-translate-y-1 transition">
                <feature.icon className="w-10 h-10 mb-3 opacity-90" />
                <h3 className="font-black text-lg mb-1">{feature.title}</h3>
                <p className="opacity-80 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      {/* ============ 🆕 COMPARISON SECTION ============ */}
      <Section
        title={v("comparison", "title", "לפני הקורס vs אחרי הקורס")}
        variant="dark"
      >
        <AnimatedSection>
          <div className="max-w-3xl mx-auto grid gap-4">
            {comparison.map((row, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <Card className="bg-accent/15 text-foreground border-0 p-4 rounded-xl flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 opacity-80 shrink-0" />
                  <span className="font-semibold text-sm">{row.after}</span>
                </Card>
                <ArrowRight className="w-5 h-5 opacity-50 shrink-0" />
                <Card className="bg-secondary text-secondary-foreground border-0 p-4 rounded-xl flex items-start gap-2">
                  <XCircle className="w-5 h-5 mt-0.5 opacity-60 shrink-0" />
                  <span className="opacity-80 text-sm">{row.before}</span>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button onClick={onScrollToLead} className="inline-flex items-center justify-center gap-2 rounded-xl bg-background text-foreground px-6 py-3 font-bold hover:opacity-95 transition">
              <Smartphone className="w-5 h-5" />
              אני רוצה להיות בצד הימני
            </button>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="steps" />

      {/* ============ 7️⃣ AUTHORITY SECTION ============ */}
      <Section variant="light">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="text-center lg:text-right">
              <h2 className="text-3xl md:text-4xl font-black mb-2">
                <BadgeCheck className="w-6 h-6 inline-block align-middle ml-1" />
                {v("authority", "title", "הכירו את יהלי צור")}
              </h2>
              <p className="text-accent font-bold text-lg mb-6">
                {v("authority", "subtitle", "מייסד Macho Academy")}
              </p>
              <p className="opacity-85 text-base md:text-lg leading-relaxed mb-4">
                {v("authority", "paragraph1", "ניסיון של למעלה מ-15 שנה בספרות גברים, מאות בוגרים שעובדים היום בתעשייה, ותשוקה אמיתית ללמד את המקצוע.")}
              </p>
              <p className="opacity-80 text-base md:text-lg leading-relaxed">
                {v("authority", "paragraph2", "יהלי הקים את האקדמיה מתוך אמונה שכל אחד יכול ללמוד את המקצוע — בתנאי שמלמדים אותו נכון, עם סבלנות ועם שיטה.")}
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={v("authority", "image") || ownerPortrait}
                alt="יהלי צור - מייסד האקדמיה"
                className="w-full max-w-xs md:max-w-sm rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="triangles" />

      {/* ============ 8️⃣ PROGRAM / PROCESS ============ */}
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
        </AnimatedSection>

        {/* Course content modules */}
        <AnimatedSection delay={0.1}>
          <div className="mt-14">
            <h3 className="text-2xl md:text-3xl font-black text-center mb-8">
              <ClipboardList className="w-6 h-6 inline-block align-middle ml-1" /> תכני הקורס
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module, index) => (
                <div key={index} className="group flex items-center gap-3 p-4 bg-secondary/60 hover:bg-secondary/80 rounded-xl transition">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="font-semibold opacity-90">{module}</span>
                  <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-60 transition mr-auto" />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Micro proof cards */}
        <AnimatedSection delay={0.15}>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <Card className="p-6 rounded-2xl border-0 bg-secondary text-secondary-foreground">
              <Video className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg">{v("micro_proof", "card1_title", "תרגול מודרך")}</h3>
              <p className="opacity-80 text-sm mt-1">{v("micro_proof", "card1_desc", "לא רק תיאוריה — עובדים ידיים על הכלים")}</p>
            </Card>
            <Card className="p-6 rounded-2xl border-0 bg-secondary text-secondary-foreground">
              <ShieldCheck className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg">{v("micro_proof", "card2_title", "סטנדרט היגיינה")}</h3>
              <p className="opacity-80 text-sm mt-1">{v("micro_proof", "card2_desc", "איך לעבוד נכון ומקצועי לפי נהלים")}</p>
            </Card>
            <Card className="p-6 rounded-2xl border-0 bg-secondary text-secondary-foreground">
              <BriefcaseBusiness className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg">{v("micro_proof", "card3_title", "כניסה לתעשייה")}</h3>
              <p className="opacity-80 text-sm mt-1">{v("micro_proof", "card3_desc", "איך למצוא מקום, איך להציג את עצמך")}</p>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      {/* ============ 🆕 RESULTS GALLERY ============ */}
      {resultsGallery.length > 0 && (
        <>
          <Section
            title={<><ImageIcon className="w-6 h-6 inline-block align-middle ml-1" /> {v("results_gallery", "title", "העבודות של הבוגרים שלנו")}</>}
            subtitle={v("results_gallery", "subtitle", "ככה נראה הסטנדרט שלנו — תוצאות אמיתיות של תלמידים שהתחילו מאפס")}
            variant="light"
          >
            <AnimatedSection>
              <GalleryGrid images={resultsGallery} />

              <div className="mt-8 text-center">
                <button onClick={onScrollToLead} className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-bold hover:opacity-95 transition">
                  <Smartphone className="w-5 h-5" />
                  גם אני רוצה ללמוד ככה
                </button>
              </div>
            </AnimatedSection>
          </Section>
          <SectionDivider from="light" to="dark" shape="triangles" />
        </>
      )}

      {/* ============ 9️⃣ TESTIMONIALS (expanded 6 slots) ============ */}
      <Section variant={resultsGallery.length > 0 ? "dark" : "light"}>
        <AnimatedSection>
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="mb-3 text-3xl md:text-4xl font-black">
              <MessageCircle className="w-6 h-6 inline-block align-middle ml-1" /> הבוגרים שלנו מדברים
            </h2>
            <p className="opacity-70 mb-10">אמיתי, קצר ולעניין — מה אנשים חוו ומה יצא להם מזה.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <Card key={idx} className="p-5 rounded-2xl border-0 text-right bg-secondary text-secondary-foreground">
                  {/* Avatar / image */}
                  {t.image && (
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-4 border-2 border-border">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 opacity-80" />)}
                    </div>
                    <span className="text-xs opacity-60">{t.cohort}</span>
                  </div>

                  <p className="opacity-85 mb-3 text-sm leading-relaxed">"{t.text}"</p>

                  {/* Result badge */}
                  {t.result && (
                    <div className="flex items-center gap-2 text-xs font-semibold opacity-90 mb-3 bg-background/10 rounded-full px-3 py-1 w-fit">
                      <BriefcaseBusiness className="w-3.5 h-3.5" />
                      <span>{t.result}</span>
                    </div>
                  )}

                  <p className="font-bold text-sm">— {t.name}</p>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <button onClick={onScrollToLead} className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-bold hover:opacity-95 transition">
                <Smartphone className="w-5 h-5" />
                גם אני רוצה פרטים
              </button>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from={resultsGallery.length > 0 ? "dark" : "light"} to="light" shape="steps" />

      {/* ============ 🆕 GUARANTEE / RISK REVERSAL ============ */}
      <Section variant="light">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 mb-6">
              <ShieldAlert className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              {v("guarantee", "title", "בלי סיכון. בלי הפתעות.")}
            </h2>
            <p className="opacity-70 text-lg mb-8">
              {v("guarantee", "subtitle", "ההבטחה שלנו אליך")}
            </p>

            <div className="grid gap-4">
              {guarantees.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-5 bg-muted/40 border border-border rounded-xl text-right">
                  <ShieldCheck className="w-6 h-6 opacity-80 shrink-0" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button onClick={onPrimaryCTA} className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-bold hover:opacity-95 transition">
                <Smartphone className="w-5 h-5" />
                שיחה ללא התחייבות בוואטסאפ
              </button>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="waves" />

      {/* ============ 🔟 SECOND FORM / CTA ============ */}
      <Section variant="dark">
        <AnimatedSection>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                <Smartphone className="w-6 h-6 inline-block align-middle ml-1" /> מעניין? בואו נדבר
              </h2>
              <p className="opacity-70">השאירו פרטים ונחזור אליכם בוואטסאפ — מהר, בלי התחייבות.</p>

              {spotsLeft > 0 && spotsLeft <= 4 && (
                <p className="mt-3 text-accent font-bold text-sm animate-pulse">
                  ⚡ נשארו {spotsLeft} מקומות בלבד למחזור הקרוב
                </p>
              )}
            </div>
            <LeadForm v={v} onSend={onLeadSend} />
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      {/* ============ 1️⃣1️⃣ WHO IS THIS FOR ============ */}
      <Section
        title={<><UserCheck className="w-6 h-6 inline-block align-middle ml-1" /> {v("who_is_this_for", "title", "למי הקורס מתאים?")}</>}
        variant="light"
      >
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {whoIsThisFor.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-muted/40 border border-border rounded-xl">
                <CheckCircle2 className="w-5 h-5 mt-0.5 opacity-80 shrink-0" />
                <span className="opacity-90 font-semibold">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button onClick={onScrollToLead} className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-bold hover:opacity-95 transition">
              <Smartphone className="w-5 h-5" />
              בדיקת התאמה מהירה
            </button>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="steps" />

      {/* ============ 1️⃣2️⃣ FAQ ============ */}
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

      {/* ============ 1️⃣3️⃣ FINAL CTA ============ */}
      <CTASection
        title={<><Rocket className="w-6 h-6 inline-block align-middle ml-1" /> {v("cta", "title", "מוכנים להתחיל קריירה חדשה?")}</>}
        description={
          <>
            {v("cta", "description", "שלחו הודעה עכשיו כדי לבדוק התאמה למחזור הקרוב. קבוצות קטנות — המקומות נגמרים מהר.")}
            {spotsLeft > 0 && spotsLeft <= 4 && (
              <span className="block mt-2 text-sm font-bold">🔥 נשארו רק {spotsLeft} מקומות!</span>
            )}
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
