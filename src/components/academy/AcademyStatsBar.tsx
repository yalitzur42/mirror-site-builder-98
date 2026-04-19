interface StatItem {
  number: string;
  label: string;
}

interface AcademyStatsBarProps {
  items?: StatItem[];
}

const DEFAULT_ITEMS: StatItem[] = [
  { number: "+500", label: "בוגרים" },
  { number: "98%", label: "שביעות רצון" },
  { number: "3", label: "חודשים בממוצע" },
  { number: "10K ₪", label: "יעד חודשי" },
];

const AcademyStatsBar = ({ items = DEFAULT_ITEMS }: AcademyStatsBarProps) => {
  return (
    <section
      className="relative z-[5] py-6 md:py-8"
      style={{ backgroundColor: "#2a1a0d" }}
    >
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {items.map((it, i) => (
            <div
              key={i}
              className="px-2 md:px-4 md:border-l border-white/10 last:border-l-0 first:border-l-0 md:first:border-l"
            >
              <div
                className="text-3xl md:text-4xl lg:text-5xl font-black mb-1"
                style={{ color: "#C9A84C" }}
              >
                {it.number}
              </div>
              <div
                className="text-xs md:text-sm font-semibold uppercase tracking-wide"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyStatsBar;
