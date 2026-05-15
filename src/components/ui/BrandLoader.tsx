import { cn } from "@/lib/utils";

interface BrandLoaderProps {
  fullScreen?: boolean;
  label?: string;
  className?: string;
}

/**
 * Brand loader: a polygon-cut "razor blade" sliding right-to-left (RTL),
 * leaving a cream trail across a brown stage. Matches the site's visual system
 * (primary brown bg, cream foreground, polygon-cut motif from hero buttons).
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
      <div className="relative w-64 h-16 overflow-hidden">
        {/* Trail line */}
        <div className="absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2 bg-primary/15 rounded-full" />
        <div className="brand-loader-trail absolute top-1/2 right-0 h-[2px] -translate-y-1/2 bg-primary rounded-full" />

        {/* Razor blade */}
        <div className="brand-loader-blade absolute top-1/2 -translate-y-1/2 right-0">
          <div className="brand-loader-blade-shape relative w-14 h-7 flex items-center justify-center">
            {/* Inner slit */}
            <div className="absolute inset-y-2 left-2 right-2 bg-background/80 rounded-sm" />
            {/* Edge highlight */}
            <div className="absolute inset-x-3 top-[6px] h-[1px] bg-primary/60" />
            <div className="absolute inset-x-3 bottom-[6px] h-[1px] bg-primary/60" />
          </div>
        </div>
      </div>

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
