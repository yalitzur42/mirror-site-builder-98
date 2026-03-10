
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
  Clock,
  Users,
  Award,
  Smartphone,
  Rocket,
  ClipboardList,
  MessageCircle,
  GraduationCap,
  Star,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  MapPin,
  ChevronDown,
  BadgeCheck,
  BriefcaseBusiness,
  Video,
  Scissors,
  HelpCircle } from
"lucide-react";

import academyClassroom from "@/assets/academy-classroom.jpg";
import courseBeginnerHero from "@/assets/course-beginner-hero.jpg";

/* --------------------------------------------------
   CRO + EFFECTS (no extra libs needed)
   - sticky whatsapp CTA
   - urgency bar w/ countdown
   - animated counters (IntersectionObserver)
   - scroll progress indicator
   - accordion FAQ
   - lead micro-form (name + phone) -> prefilled WhatsApp
   - section “how it works” timeline
   - gallery placeholders (use your real images)
-------------------------------------------------- */

const WHATSAPP_NUMBER = "972552935987";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

function buildWaLink(text: string) {
  const encoded = encodeURIComponent(text);
  return `${WHATSAPP_BASE}?text=${encoded}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
      const clientHeight = doc.clientHeight || window.innerHeight;
      const max = Math.max(1, scrollHeight - clientHeight);
      setProgress(clamp(scrollTop / max * 100, 0, 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

function formatTwo(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeParts(targetISO: string) {
  const now = new Date();
  const target = new Date(targetISO);
  const diff = target.getTime() - now.getTime();
  const safe = Math.max(0, diff);

  const totalSeconds = Math.floor(safe / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor(totalSeconds % (3600 * 24) / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;

  return { diff: safe, days, hours, minutes, seconds };
}

type FaqItem = {q: string;a: string;};

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
    v("modules", "module6", "שירות לקוחות ומכירה")],

    [v]
  );

  const stats = useMemo(
    () => [
    { value: parseInt(v("stats", "stat1_number", "15")) || 15, suffix: v("stats", "stat1_number", "15+").replace(/\d+/, ""), label: v("stats", "stat1_label", "שנות ניסיון בהוראה") },
    { value: parseInt(v("stats", "stat2_number", "500")) || 500, suffix: v("stats", "stat2_number", "500+").replace(/\d+/, ""), label: v("stats", "stat2_label", "בוגרים עובדים בתעשייה") },
    { value: parseInt(v("stats", "stat3_number", "98")) || 98, suffix: v("stats", "stat3_number", "98%").replace(/\d+/, ""), label: v("stats", "stat3_label", "שביעות רצון תלמידים") },
    { value: parseInt(v("stats", "stat4_number", "12")) || 12, suffix: v("stats", "stat4_number", "12").replace(/\d+/, ""), label: v("stats", "stat4_label", "מחזורים בשנה") }],

    [v]
  );

  const features = useMemo(
    () => [
    { icon: GraduationCap, title: v("why_us", "feature1_title", "הכשרה מעשית"), description: v("why_us", "feature1_desc", "לומדים תוך כדי עבודה אמיתית") },
    { icon: Users, title: v("why_us", "feature2_title", "קבוצות קטנות"), description: v("why_us", "feature2_desc", "עד 8 תלמידים בכיתה") },
    { icon: Award, title: v("why_us", "feature3_title", "תעודה מוכרת"), description: v("why_us", "feature3_desc", "הסמכה רשמית בסיום") },
    { icon: Clock, title: v("why_us", "feature4_title", "גמישות בשעות"), description: v("why_us", "feature4_desc", "מסלולי בוקר/ערב") },
    { icon: BookOpen, title: v("why_us", "feature5_title", "חומרי לימוד"), description: v("why_us", "feature5_desc", "ערכת ציוד מקצועית לכל תלמיד") },
    { icon: Star, title: v("why_us", "feature6_title", "ליווי אישי"), description: v("why_us", "feature6_desc", "תמיכה גם אחרי הקורס") }],

    [v]
  );

  // Set a REAL date for next cohort (from admin or fallback)
  const nextCohortStartISO = v("details", "next_cohort", "2026-04-15") + "T18:00:00.000+03:00";

  const faq: FaqItem[] = useMemo(
    () => [
    { q: v("faq", "q1", "צריך ניסיון קודם?"), a: v("faq", "a1", "לא. הקורס מיועד למתחילים. מתחילים מהבסיס ומתקדמים לתרגול מעשי בהדרגה.") },
    { q: v("faq", "q2", "כמה פעמים בשבוע לומדים?"), a: v("faq", "a2", "בד״כ 2–3 מפגשים בשבוע (תלוי במסלול).") },
    { q: v("faq", "q3", "האם מקבלים תעודה?"), a: v("faq", "a3", "כן. בסיום הקורס ובהשלמת המטלות תקבלו תעודת הסמכה רשמית.") },
    { q: v("faq", "q4", "יש ליווי אחרי הקורס?"), a: v("faq", "a4", "כן. יש קבוצת בוגרים/מנטורינג והכוונה להשתלבות במספרות.") },
    { q: v("faq", "q5", "מה לגבי ציוד?"), a: v("faq", "a5", "כולל ערכת ציוד מקצועית בסיסית לכל תלמיד.") }],

    [v]
  );

  // ====== CRO STATE ======
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadGoal, setLeadGoal] = useState<"info" | "fit" | "reserve">("fit");

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ====== EFFECTS: Stats counter on view ======
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [statsDisplay, setStatsDisplay] = useState(stats.map(() => 0));
  const statsWrapRef = useRef<HTMLDivElement | null>(null);

  // ====== EFFECTS: Countdown urgency ======
  const [timeLeft, setTimeLeft] = useState(() => getTimeParts(nextCohortStartISO));

  // ====== EFFECTS: Sticky CTA visibility ======
  const [showSticky, setShowSticky] = useState(false);
  const heroAnchorRef = useRef<HTMLDivElement | null>(null);

  // ====== EFFECTS: Scroll progress ======
  const scrollProgress = useScrollProgress();

  // ====== Hooks ======
  useEffect(() => {
    const t = window.setInterval(() => {
      setTimeLeft(getTimeParts(nextCohortStartISO));
    }, 1000);
    return () => window.clearInterval(t);
  }, [nextCohortStartISO]);

  useEffect(() => {
    // Sticky button appears after hero
    const el = heroAnchorRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Animate stats only once when visible
    const el = statsWrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);

          const start = performance.now();
          const duration = 1400;

          const tick = (now: number) => {
            const p = clamp((now - start) / duration, 0, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - p, 3);

            setStatsDisplay(stats.map((s) => Math.floor(s.value * eased)));

            if (p < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [stats, statsAnimated]);

  // ====== Actions ======
  const buildLeadMessage = () => {
    const goalText =
    leadGoal === "info" ?
    "אני רוצה עוד פרטים על האקדמיה" :
    leadGoal === "reserve" ?
    "אני רוצה לשריין מקום למחזור הקרוב" :
    "אני רוצה לבדוק התאמה לקורס";

    const lines = [
    "היי 👋",
    goalText,
    "",
    leadName ? `שם: ${leadName}` : "",
    leadPhone ? `טלפון: ${leadPhone}` : "",
    "",
    "אפשר לדבר? 🙂"].
    filter(Boolean);

    return lines.join("\n");
  };

  const onSendLeadToWhatsApp = () => {
    const url = buildWaLink(buildLeadMessage());
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onPrimaryCTA = () => {
    const url = buildWaLink("היי 👋 אני רוצה לבדוק התאמה לקורס באקדמיה של Macho. אפשר פרטים?");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onScrollToLead = () => {
    const el = document.getElementById("lead-section");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const urgencyText = timeLeft.diff > 0 ?
  `המחזור הבא מתחיל בעוד ${timeLeft.days} ימים • ${formatTwo(timeLeft.hours)}:${formatTwo(timeLeft.minutes)}:${formatTwo(timeLeft.seconds)}` :
  "המחזור הבא נפתח עכשיו — נשארו מקומות אחרונים";

  if (loading) return <Layout><PageSkeleton /></Layout>;

  return (
    <Layout>
      {/* TOP SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-1 bg-transparent">
        <div
          className="h-full bg-foreground/80"
          style={{ width: `${scrollProgress}%` }} />
        
      </div>

      <Breadcrumbs items={[{ label: "האקדמיה" }]} />

      {/* HERO ANCHOR (for sticky button logic) */}
      <div ref={heroAnchorRef} />

      <HeroSplit
        title={v("hero", "title", "האקדמיה של Macho")}
        subtitle={v("hero", "subtitle", "תוך 3 חודשים — בדרך לקריירה בספרות גברים")}
        description={v("hero", "description", "קורס למתחילים ללא ניסיון: הרבה תרגול, קבוצות קטנות, תעודה בסיום וליווי עד שמתחילים לעבוד.")}
        primaryCta={{
          label:
          <>
              <Smartphone className="w-4 h-4" /> בדקו התאמה לקורס
            </>,

          href: buildWaLink("היי 👋 אני רוצה לבדוק התאמה לקורס באקדמיה של Macho. אפשר פרטים?")
        }}
        image={v("hero", "image") || courseBeginnerHero} />
      

      {/* URGENCY BAR */}
      <div className="sticky top-0 z-[45] bg-foreground text-background">
        <div className="container mx-auto px-4 py-1 flex flex-col md:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{urgencyText}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onScrollToLead}
              className="inline-flex items-center gap-1.5 rounded-full bg-background text-foreground px-3 py-1 text-xs font-semibold hover:opacity-90 transition">
              
              <BadgeCheck className="w-3.5 h-3.5" />
              השארת פרטים מהירה
            </button>

            <button
              onClick={onPrimaryCTA}
              className="inline-flex items-center gap-1.5 rounded-full bg-background/10 text-background px-3 py-1 text-xs font-semibold hover:bg-background/15 transition">
              
              <Smartphone className="w-3.5 h-3.5" />
              וואטסאפ עכשיו
            </button>
          </div>
        </div>
      </div>

      {/* TRUST STRIP (micro-proof) */}
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

      {/* LEAD SECTION (conversion driver) */}
      <Section variant="light" isFirstSection>
        <div id="lead-section" className="scroll-mt-28" />

        <AnimatedSection>
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Lead Card */}
            <div className="lg:col-span-5">
              <Card className="bg-background text-foreground border-border p-6 md:p-8 rounded-2xl">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black leading-tight">
                      {v("lead_form", "title", "בדיקת התאמה מהירה")}
                    </h2>
                    <p className="opacity-70 mt-2 text-sm md:text-base">
                      {v("lead_form", "subtitle", "משאירים 2 פרטים — ונשלח לכם תשובה בוואטסאפ עם כל מה שצריך לדעת.")}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-foreground text-background">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                </div>

                {/* Goal pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                  { key: "fit", label: v("lead_form", "goal1", "בדיקת התאמה") },
                  { key: "info", label: v("lead_form", "goal2", "רק פרטים") },
                  { key: "reserve", label: v("lead_form", "goal3", "שריון מקום") }].
                  map((p) => {
                    const active = leadGoal === p.key as any;
                    return (
                      <button
                        key={p.key}
                        onClick={() => setLeadGoal(p.key as any)}
                        className={[
                        "px-4 py-2 rounded-full text-sm font-semibold border transition",
                        active ?
                        "bg-foreground text-background border-foreground" :
                        "bg-transparent border-border hover:bg-muted/40"].
                        join(" ")}>
                        
                        {p.label}
                      </button>);

                  })}
                </div>

                <div className="grid gap-3">
                  <label className="text-sm font-semibold">שם</label>
                  <input
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="לדוגמה: דניאל"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20" />
                  

                  <label className="text-sm font-semibold mt-1">טלפון</label>
                  <input
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="05X-XXXXXXX"
                    inputMode="tel"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20" />
                  

                  <button
                    onClick={onSendLeadToWhatsApp}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 font-bold hover:opacity-95 transition">
                    
                    <Smartphone className="w-5 h-5" />
                    {v("lead_form", "button_text", "שלחו לי פרטים בוואטסאפ")}
                  </button>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 opacity-80">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>תשובה מהירה</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-80">
                      <ShieldCheck className="w-4 h-4" />
                      <span>ללא התחייבות</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Proof + Details */}
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
                         v("outcomes", "item4", "בטחון מקצועי מול לקוחות אמיתיים")].
                         map((item) =>
                         <li key={item} className="flex items-start gap-2">
                             <CheckCircle2 className="w-5 h-5 mt-0.5 opacity-80" />
                             <span className="opacity-85">{item}</span>
                           </li>
                         )}
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
                      <img
                        src={academyClassroom}
                        alt="כיתה באקדמיה"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy" />
                      
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

                {/* Stats (animated) */}
                <div ref={statsWrapRef}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((stat, index) =>
                    <div key={index} className="p-4 md:p-6">
                        <div className="text-4xl md:text-5xl font-black mb-2">
                          {statsAnimated ? `${statsDisplay[index]}${stat.suffix}` : "0"}
                        </div>
                        <p className="opacity-70 text-sm">{stat.label}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mini CTA row */}
                <div className="flex flex-col md:flex-row gap-3">
                  <button
                    onClick={onPrimaryCTA}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 font-bold hover:opacity-95 transition">
                    
                    <Smartphone className="w-5 h-5" />
                    שיחה בוואטסאפ עכשיו
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById("faq");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 font-bold hover:bg-muted/40 transition">
                    
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

      {/* HOW IT WORKS (story + CRO) */}
      <Section
        title={
        <>
            <Sparkles className="w-6 h-6 inline-block align-middle ml-1" /> איך זה עובד בפועל
          </>
        }
        variant="dark">
        
        <AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
            {
              icon: MessageCircle,
              title: v("how_it_works", "step1_title", "1) בדיקת התאמה"),
              desc: v("how_it_works", "step1_desc", "שולחים הודעה קצרה/פרטים — ובודקים התאמה למסלול.")
            },
            {
              icon: Scissors,
              title: v("how_it_works", "step2_title", "2) תרגול מעשי"),
              desc: v("how_it_works", "step2_desc", "לומדים בסיס + מתרגלים בהדרכה צמודה עד ביטחון מלא.")
            },
            {
              icon: BriefcaseBusiness,
              title: v("how_it_works", "step3_title", "3) התחלת עבודה"),
              desc: v("how_it_works", "step3_desc", "תיק עבודות + ליווי והכוונה להשתלבות במספרות.")
            }].
            map((step, idx) =>
            <Card
              key={idx}
              className="bg-secondary text-secondary-foreground border-0 p-6 rounded-2xl">
              
                <step.icon className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="font-black text-xl mb-2">{step.title}</h3>
                <p className="opacity-80">{step.desc}</p>

                <div className="mt-5 flex items-center gap-2 opacity-85 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>שלב {idx + 1} מתוך 3</span>
                </div>
              </Card>
            )}
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3">
            <button
              onClick={onScrollToLead}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-background text-foreground px-6 py-3 font-bold hover:opacity-95 transition">
              
              <BadgeCheck className="w-5 h-5" />
              בדיקת התאמה מהירה
            </button>

            <button
              onClick={onPrimaryCTA}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-background/10 text-background px-6 py-3 font-bold hover:bg-background/15 transition">
              
              <Smartphone className="w-5 h-5" />
              וואטסאפ עכשיו
            </button>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      {/* COURSE CONTENT */}
      <Section
        title={
        <>
            <ClipboardList className="w-6 h-6 inline-block align-middle ml-1" /> תכני הקורס
          </>
        }
        variant="light">
        
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) =>
            <div
              key={index}
              className="group flex items-center gap-3 p-4 bg-muted/40 hover:bg-muted/55 border border-border rounded-xl transition">
              
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <span className="font-semibold opacity-90">{module}</span>
                <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-60 transition mr-auto" />
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Micro proof row */}
        <AnimatedSection delay={0.12}>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-2xl border-border text-[hsl(60,56%,91%)]">
              <Video className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg text-primary">תרגול מודרך</h3>
              <p className="opacity-80 text-sm mt-1">לא רק תיאוריה — עובדים ידיים על הכלים</p>
            </Card>
            <Card className="p-6 rounded-2xl border-border text-[hsl(60,56%,91%)]">
              <ShieldCheck className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg text-primary">סטנדרט היגיינה</h3>
              <p className="opacity-80 text-sm mt-1">איך לעבוד נכון ומקצועי לפי נהלים</p>
            </Card>
            <Card className="p-6 rounded-2xl border-border text-[hsl(60,56%,91%)]">
              <BriefcaseBusiness className="w-10 h-10 mb-3" />
              <h3 className="font-black text-lg text-primary">כניסה לתעשייה</h3>
              <p className="opacity-80 text-sm mt-1">איך למצוא מקום, איך להציג את עצמך</p>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="light" to="dark" shape="triangles" />

      {/* WHY US */}
      <Section
        title={
        <>
            <Star className="w-6 h-6 inline-block align-middle ml-1" /> למה ללמוד אצלנו?
          </>
        }
        variant="dark">
        
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) =>
            <Card
              key={index}
              className="bg-secondary text-secondary-foreground border-0 p-6 rounded-2xl hover:-translate-y-1 transition">
              
                <feature.icon className="w-10 h-10 mb-3 opacity-90" />
                <h3 className="font-black text-lg mb-1">{feature.title}</h3>
                <p className="opacity-80 text-sm">{feature.description}</p>

                <div className="mt-4 flex items-center gap-2 text-sm opacity-85">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>מיקוד בתכל׳ס — תוצאות</span>
                </div>
              </Card>
            )}
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="steps" />

      {/* TESTIMONIALS (more proof + stronger format) */}
      <Section variant="light">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-3 text-3xl md:text-4xl font-black">
              <MessageCircle className="w-6 h-6 inline-block align-middle ml-1" /> הבוגרים שלנו מדברים
            </h2>
            <p className="opacity-70 mb-10">
              אמיתי, קצר ולעניין — מה אנשים חוו ומה יצא להם מזה.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-2xl border-border text-right bg-background">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 opacity-80" />
                    <Star className="w-4 h-4 opacity-80" />
                    <Star className="w-4 h-4 opacity-80" />
                    <Star className="w-4 h-4 opacity-80" />
                    <Star className="w-4 h-4 opacity-80" />
                  </div>
                  <span className="text-xs opacity-60">מחזור 2024</span>
                </div>

                <p className="opacity-85 mb-4">
                  "תוך 3 חודשים עברתי מאפס ניסיון לעבודה במספרה מובילה. התרגול והיחס האישי עשו את ההבדל."
                </p>
                <p className="font-bold text-sm">— דן</p>
              </Card>

              <Card className="p-6 rounded-2xl border-border text-right bg-background">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 opacity-80" />
                    <Star className="w-4 h-4 opacity-80" />
                    <Star className="w-4 h-4 opacity-80" />
                    <Star className="w-4 h-4 opacity-80" />
                    <Star className="w-4 h-4 opacity-80" />
                  </div>
                  <span className="text-xs opacity-60">מחזור 2023</span>
                </div>

                <p className="opacity-85 mb-4">
                  "המקצועיות של הצוות ברמה אחרת. קיבלתי ביטחון אמיתי לעבוד מול לקוחות, גם אחרי הקורס המשיכו ללוות."
                </p>
                <p className="font-bold text-sm">— אור</p>
              </Card>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <button
                onClick={onScrollToLead}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-bold hover:opacity-95 transition">
                
                <Smartphone className="w-5 h-5" />
                גם אני רוצה פרטים
              </button>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* FAQ */}
      <SectionDivider from="light" to="dark" shape="waves" />

      <Section
        title={
        <>
            <HelpCircle className="w-6 h-6 inline-block align-middle ml-1" /> שאלות נפוצות
          </>
        }
        variant="dark">
        
        <div id="faq" className="scroll-mt-28" />
        <AnimatedSection>
          <div className="max-w-4xl mx-auto grid gap-3">
            {faq.map((item, i) => {
              const open = openFaq === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="text-right w-full rounded-2xl bg-secondary text-secondary-foreground px-5 py-4 border-0">
                  
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-black text-base md:text-lg">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 transition ${open ? "rotate-180" : ""}`} />
                  </div>
                  <div
                    className={`grid transition-all duration-300 ${
                    open ? "grid-rows-[1fr] mt-3 opacity-85" : "grid-rows-[0fr] mt-0 opacity-0"}`
                    }>
                    
                    <div className="overflow-hidden text-sm md:text-base leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </button>);

            })}
          </div>

          <div className="mt-10 text-center">
            <p className="opacity-80 mb-4">יש עוד שאלה? שלחו הודעה ונענה מהר.</p>
            <button
              onClick={onPrimaryCTA}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-background text-foreground px-6 py-3 font-bold hover:opacity-95 transition">
              
              <Smartphone className="w-5 h-5" />
              שלחו שאלה בוואטסאפ
            </button>
          </div>
        </AnimatedSection>
      </Section>

      <SectionDivider from="dark" to="light" shape="curves" />

      {/* FINAL CTA (strong) */}
      <CTASection
        title={
        <>
            <Rocket className="w-6 h-6 inline-block align-middle ml-1" /> {v("cta", "title", "מוכנים להתחיל קריירה חדשה?")}
          </>
        }
        description={v("cta", "description", "שלחו הודעה עכשיו כדי לבדוק התאמה למחזור הקרוב. קבוצות קטנות — המקומות נגמרים מהר.")}
        buttonLabel={
        <>
            <Smartphone className="w-4 h-4" /> שריינו מקום / בדקו התאמה
          </>
        }
        buttonHref={buildWaLink("היי 👋 אני רוצה לשריין מקום למחזור הקרוב באקדמיה של Macho. אפשר פרטים?")}
        variant="light" />
      

      {/* STICKY WHATSAPP CTA */}
      <div
        className={[
        "fixed bottom-5 left-5 z-[220] transition-all duration-300",
        showSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"].
        join(" ")}>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={onScrollToLead}
            className="hidden md:inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-bold shadow-lg hover:opacity-95 transition">
            
            <BadgeCheck className="w-4 h-4" />
            בדיקת התאמה מהירה
          </button>

          <button
            onClick={onPrimaryCTA}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 text-white px-5 py-3 text-sm md:text-base font-black shadow-lg hover:opacity-95 transition"
            aria-label="WhatsApp">
            
            <Smartphone className="w-5 h-5" />
            וואטסאפ עכשיו
          </button>
        </div>
      </div>
    </Layout>);

};

export default AcademyPage;