type DividerShape = "zigzag" | "waves" | "triangles" | "curves" | "steps";

interface SectionDividerProps {
  from?: "dark" | "light";
  to?: "dark" | "light";
  shape?: DividerShape;
}

const shapes: Record<DividerShape, string> = {
  zigzag:
    "M0,0 L0,24 L60,48 L120,24 L180,48 L240,24 L300,48 L360,24 L420,48 L480,24 L540,48 L600,24 L660,48 L720,24 L780,48 L840,24 L900,48 L960,24 L1020,48 L1080,24 L1140,48 L1200,24 L1200,0 Z",
  waves:
    "M0,0 L0,28 Q60,48 120,28 Q180,8 240,28 Q300,48 360,28 Q420,8 480,28 Q540,48 600,28 Q660,8 720,28 Q780,48 840,28 Q900,8 960,28 Q1020,48 1080,28 Q1140,8 1200,28 L1200,0 Z",
  triangles:
    "M0,0 L0,0 L100,48 L200,0 L300,48 L400,0 L500,48 L600,0 L700,48 L800,0 L900,48 L1000,0 L1100,48 L1200,0 Z",
  curves:
    "M0,0 L0,16 C100,48 200,48 300,16 C400,-16 500,-16 600,16 C700,48 800,48 900,16 C1000,-16 1100,-16 1200,16 L1200,0 Z",
  steps:
    "M0,0 L0,12 L150,12 L150,28 L300,28 L300,42 L450,42 L450,28 L600,28 L600,12 L750,12 L750,28 L900,28 L900,42 L1050,42 L1050,28 L1200,28 L1200,0 Z",
};

const SectionDivider = ({ from = "dark", to = "light", shape = "zigzag" }: SectionDividerProps) => {
  const topColor = from === "dark" ? "hsl(25, 50%, 20%)" : "hsl(60, 56%, 91%)";
  const bottomColor = to === "dark" ? "hsl(25, 50%, 20%)" : "hsl(60, 56%, 91%)";
  const isToLight = to === "light";

  return (
    <div className="relative w-full h-8 md:h-12 -my-px overflow-hidden" style={{ backgroundColor: bottomColor }}>
      {/* If transitioning TO light, show marble texture in background */}
      {isToLight && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/marble-bg.png')",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
            backgroundRepeat: "repeat-y",
            backgroundColor: "hsl(60, 56%, 91%)",
          }}
        />
      )}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={shapes[shape]} fill={topColor} />
      </svg>
    </div>
  );
};

export default SectionDivider;
