import { cn } from "@/lib/utils";

interface BrandLoaderProps {
  fullScreen?: boolean;
  label?: string;
  className?: string;
}

/**
 * Brand loader: animated scissors opening and closing in cream over brown.
 * Matches the site's premium barbershop aesthetic.
 */
const BrandLoader = ({ fullScreen = false, label = "טוען…", className }: BrandLoaderProps) => {
  const stage = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        fullScreen ? "min-h-screen w-full" : "py-16",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <svg
        viewBox="0 0 100 100"
        className="brand-loader-scissors w-24 h-24"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Pivot */}
        <circle cx="50" cy="50" r="3" fill="hsl(var(--primary))" />

        {/* Top blade + handle (rotates) */}
        <g className="brand-loader-blade-top" style={{ transformOrigin: "50px 50px" }}>
          <line x1="50" y1="50" x2="92" y2="22" />
          <circle cx="22" cy="68" r="10" />
          <line x1="50" y1="50" x2="30" y2="62" />
        </g>

        {/* Bottom blade + handle (rotates opposite) */}
        <g className="brand-loader-blade-bottom" style={{ transformOrigin: "50px 50px" }}>
          <line x1="50" y1="50" x2="92" y2="78" />
          <circle cx="22" cy="32" r="10" />
          <line x1="50" y1="50" x2="30" y2="38" />
        </g>
      </svg>

      <div className="text-primary font-extrabold tracking-widest text-base uppercase">
        {label}
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
