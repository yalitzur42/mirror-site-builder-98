import { cn } from "@/lib/utils";

interface BrandLoaderProps {
  fullScreen?: boolean;
  className?: string;
}

const LOTTIE_SRC = "https://lottie.host/embed/a5a33705-7f38-42ee-8d7d-e51fa4dee9cb/d6oiyOfPzM.lottie";
const BRAND_LETTERS = ["M", "a", "c", "\u2019", "h", "o"];

const BrandLoader = ({ fullScreen = false, className }: BrandLoaderProps) => {
  const stage = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5",
        fullScreen ? "min-h-screen w-full" : "py-16",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="טוען"
    >
      <iframe
        src={LOTTIE_SRC}
        title="Loader"
        className="w-64 h-64 border-0 bg-transparent"
        allow="autoplay"
      />
      <div
        aria-label="Mac'ho"
        className="flex gap-[0.05em] font-opensans font-extrabold leading-none overflow-hidden"
        style={{
          color: "hsl(60, 56%, 91%)",
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          letterSpacing: "0.02em",
        }}
      >
        {BRAND_LETTERS.map((ch, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              animation: "splash-letter-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              animationDelay: `${0.1 + i * 0.12}s`,
              transform: "translateY(110%)",
              opacity: 0,
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );

  if (!fullScreen) return stage;

  return (
    <div className="fixed inset-0 z-[200] bg-background flex items-center justify-center">
      {stage}
    </div>
  );
};

export default BrandLoader;
