import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSplitProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  children?: ReactNode;
}

const HeroSplit = ({
  badge,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  children,
}: HeroSplitProps) => {
  return (
    <section className="gradient-hero relative overflow-hidden rounded-b-[90px] md:rounded-b-[140px]">
      <div className="container-main py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-right">
            {badge && <span className="inline-block text-accent text-sm mb-4">{badge}</span>}

            {/* TITLE – letter by letter */}
            <h1
              className="
  hero-title-animate
  text-foreground
  mb-6
  text-4xl
  sm:text-5xl
  md:text-6xl
  lg:text-7xl
  font-extrabold
  leading-tight
  tracking-tight
"
            >
              {title.split("").map((char, index) => (
                <span key={index} className="hero-letter" style={{ animationDelay: `${index * 0.05}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            {/* SUBTITLE – letter by letter */}
            {subtitle && (
              <p
                className="
  hero-subtitle-animate
  text-accent
  font-bold
  mb-6
  text-xl
  sm:text-2xl
  md:text-3xl
"
              >
                {subtitle.split("").map((char, index) => (
                  <span key={index} className="hero-letter" style={{ animationDelay: `${0.6 + index * 0.04}s` }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
            )}

            {description && (
              <p
                className="
  hero-description
  text-muted-foreground
  text-base
  sm:text-lg
  md:text-xl
  leading-relaxed
  mb-10
  max-w-2xl
  mx-auto
  lg:mx-0
"
              >
                {description}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {primaryCta && (
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-foreground text-foreground hover:bg-foreground/10"
                  >
                    <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}

            {children}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            {image ? (
              <img src={image} alt="" className="w-full max-w-md mx-auto lg:max-w-none" />
            ) : (
              <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">תמונה</span>
              </div>
            )}

            {/* Decorative line */}
            <div className="absolute -right-8 top-1/4 w-32 h-64 opacity-20">
              <div className="w-2 h-full bg-foreground/30 rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;
