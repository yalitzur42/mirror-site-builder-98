interface SectionDividerProps {
  from?: "dark" | "light";
  to?: "dark" | "light";
}

const SectionDivider = ({ from = "dark", to = "light" }: SectionDividerProps) => {
  const topColor = from === "dark" ? "hsl(25, 50%, 20%)" : "hsl(60, 56%, 91%)";
  const bottomColor = to === "dark" ? "hsl(25, 50%, 20%)" : "hsl(60, 56%, 91%)";

  return (
    <div className="relative w-full h-8 md:h-12 -my-px" style={{ backgroundColor: bottomColor }}>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 L0,24 L60,48 L120,24 L180,48 L240,24 L300,48 L360,24 L420,48 L480,24 L540,48 L600,24 L660,48 L720,24 L780,48 L840,24 L900,48 L960,24 L1020,48 L1080,24 L1140,48 L1200,24 L1200,0 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
