import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
  variant?: "default" | "gradient";
}

const CTASection = ({
  title,
  description,
  buttonLabel,
  buttonHref,
  variant = "default",
}: CTASectionProps) => {
  return (
    <section
      className={`py-16 md:py-24 ${
        variant === "gradient" ? "gradient-hero" : "bg-secondary"
      }`}
    >
      <div className="container-main text-center">
        <h2 className="mb-4">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to={buttonHref}>{buttonLabel}</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
