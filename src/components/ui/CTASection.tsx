import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: ReactNode;
  description?: ReactNode;
  buttonLabel: ReactNode;
  buttonHref: string;
  variant?: "default" | "gradient" | "dark" | "light";
}

const CTASection = ({
  title,
  description,
  buttonLabel,
  buttonHref,
  variant = "default",
}: CTASectionProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "gradient-hero";
      case "dark":
        return "section-dark";
      case "light":
        return "section-light";
      default:
        return "bg-secondary";
    }
  };

  const getButtonClasses = () => {
    if (variant === "light") {
      return "bg-background text-foreground hover:bg-background/90";
    }
    return "bg-secondary text-secondary-foreground hover:bg-secondary/90";
  };

  return (
    <section className={`py-16 md:py-24 ${getVariantClasses()}`}>
      <div className="container-main text-center">
        <h2 className="mb-4">{title}</h2>
        {description && (
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
            {description}
          </p>
        )}
        <Button asChild size="lg" className={getButtonClasses()}>
          {buttonHref.startsWith("http") ? (
            <a href={buttonHref} target="_blank" rel="noopener noreferrer">{buttonLabel}</a>
          ) : (
            <Link to={buttonHref}>{buttonLabel}</Link>
          )}
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
