import { useEffect, useState } from "react";
import { Sparkles, Smartphone, BadgeCheck } from "lucide-react";

function formatTwo(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeParts(targetISO: string) {
  const now = new Date();
  const target = new Date(targetISO);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    diff,
    days: Math.floor(totalSeconds / (3600 * 24)),
    hours: Math.floor((totalSeconds % (3600 * 24)) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

interface UrgencyBarProps {
  nextCohortStartISO: string;
  onScrollToLead: () => void;
  onPrimaryCTA: () => void;
  spotsLeft?: number;
}

const UrgencyBar = ({ nextCohortStartISO, onScrollToLead, onPrimaryCTA, spotsLeft }: UrgencyBarProps) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeParts(nextCohortStartISO));

  useEffect(() => {
    const t = window.setInterval(() => {
      setTimeLeft(getTimeParts(nextCohortStartISO));
    }, 1000);
    return () => window.clearInterval(t);
  }, [nextCohortStartISO]);

  const urgencyText = timeLeft.diff > 0
    ? `המחזור הבא מתחיל בעוד ${timeLeft.days} ימים • ${formatTwo(timeLeft.hours)}:${formatTwo(timeLeft.minutes)}:${formatTwo(timeLeft.seconds)}`
    : "המחזור הבא נפתח עכשיו — נשארו מקומות אחרונים";

  const spotsText = spotsLeft !== undefined && spotsLeft > 0 && spotsLeft <= 4
    ? ` • נשארו ${spotsLeft} מקומות!`
    : "";

  return (
    <div className="sticky top-0 z-[45] bg-foreground text-background">
      <div className="container mx-auto px-4 py-1 flex flex-col md:flex-row items-center justify-between gap-1">
        <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{urgencyText}{spotsText}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onScrollToLead}
            className="inline-flex items-center gap-1.5 rounded-full bg-background text-foreground px-3 py-1 text-xs font-semibold hover:opacity-90 transition"
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            השארת פרטים מהירה
          </button>
          <button
            onClick={onPrimaryCTA}
            className="inline-flex items-center gap-1.5 rounded-full bg-background/10 text-background px-3 py-1 text-xs font-semibold hover:bg-background/15 transition"
          >
            <Smartphone className="w-3.5 h-3.5" />
            וואטסאפ עכשיו
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBar;
