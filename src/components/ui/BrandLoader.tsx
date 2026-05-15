import { cn } from "@/lib/utils";

interface BrandLoaderProps {
  fullScreen?: boolean;
  className?: string;
}

/**
 * Brand loader: the Mac'ho logo with a soft pulse and an indeterminate
 * cream progress bar underneath. Premium, minimal, and on-brand.
 */
const BrandLoader = ({ fullScreen = false, className }: BrandLoaderProps) => {
  const stage = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-8",
        fullScreen ? "min-h-screen w-full" : "py-16",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="טוען"
    >
      <img
        src="/logo.png"
        alt="Mac'ho"
        className="brand-loader-logo w-40 h-auto select-none"
        draggable={false}
      />
      <div className="relative w-48 h-[2px] overflow-hidden bg-primary/15 rounded-full">
        <div className="brand-loader-bar absolute top-0 bottom-0 w-1/3 bg-primary rounded-full" />
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
