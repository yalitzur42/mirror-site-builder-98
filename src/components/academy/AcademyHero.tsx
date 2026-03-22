import { ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AcademyHeroProps {
  title: string;
  subtitle?: string;
  description?: ReactNode;
  backgroundImage?: string;
  primaryCta?: { label: ReactNode; href: string };
  secondaryCta?: { label: ReactNode; href: string };
}

const AcademyHero = ({
  title,
  subtitle,
  description,
  backgroundImage,
  primaryCta,
  secondaryCta,
}: AcademyHeroProps) => {
  return (
    <div className="section-light">
      <section
        className="relative z-10 rounded-b-[40px] md:rounded-b-[80px] pb-20 md:pb-28 overflow-hidden"
        style={{ backgroundColor: "#3d2310" }}
      >
        {/* Background Image */}
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Brown Shader Overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(61, 35, 16, 0.88) 0%,
              rgba(75, 46, 26, 0.82) 25%,
              rgba(90, 53, 26, 0.78) 50%,
              rgba(42, 26, 13, 0.85) 75%,
              rgba(61, 35, 16, 0.9) 100%
            )`,
          }}
        />

        {/* Animated grain texture for depth */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content - Centered */}
        <div className="container-main py-20 md:py-28 lg:py-36 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* TITLE */}
            <h1 className="hero-title-animate text-foreground mb-4 break-words overflow-hidden">
              {title.split("").map((char, index) => (
                <span key={index} className="hero-letter" style={{ animationDelay: `${index * 0.05}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            {/* SUBTITLE */}
            {subtitle && (
              <p className="hero-subtitle-animate text-xl md:text-2xl lg:text-3xl text-accent font-bold mb-4 break-words overflow-hidden">
                {subtitle.split("").map((char, index) => (
                  <span key={index} className="hero-letter" style={{ animationDelay: `${0.6 + index * 0.04}s` }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
            )}

            {description && (
              <p className="hero-description text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto break-words overflow-hidden">
                {description}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-4 justify-center">
                {primaryCta && (
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {primaryCta.href.startsWith("http") ? (
                      <a href={primaryCta.href} target="_blank" rel="noopener noreferrer">{primaryCta.label}</a>
                    ) : (
                      <Link to={primaryCta.href}>{primaryCta.label}</Link>
                    )}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-foreground text-foreground hover:bg-foreground/10"
                  >
                    {secondaryCta.href.startsWith("http") ? (
                      <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer">{secondaryCta.label}</a>
                    ) : (
                      <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademyHero;
