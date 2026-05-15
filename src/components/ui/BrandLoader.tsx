import { cn } from "@/lib/utils";

interface BrandLoaderProps {
  fullScreen?: boolean;
  className?: string;
}

const LOTTIE_SRC = "https://lottie.host/embed/a5a33705-7f38-42ee-8d7d-e51fa4dee9cb/d6oiyOfPzM.lottie";

const BrandLoader = ({ fullScreen = false, className }: BrandLoaderProps) => {
  const stage = (
    <div
      className={cn(
        "flex items-center justify-center",
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
