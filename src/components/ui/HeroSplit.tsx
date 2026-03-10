import { ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Warp } from "@paper-design/shaders-react";

interface HeroSplitProps {
  badge?: ReactNode;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  primaryCta?: { label: ReactNode; href: string };
  secondaryCta?: { label: ReactNode; href: string };
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
  const [shaderReady, setShaderReady] = useState(false);

  useEffect(() => {
    // Delay shader mount slightly to ensure canvas dimensions are established
    const timer = requestAnimationFrame(() => setShaderReady(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="section-light">
      <section className="relative z-10 rounded-b-[40px] md:rounded-b-[80px] pb-20 md:pb-28 overflow-hidden" style={{ backgroundColor: '#3d2310' }}>
        {/* Warp Shader Background */}
        {shaderReady && (
          <Warp
            colors={[
              "#3d2310",
              "#5a351a",
              "#4B2E1A",
              "#2a1a0d",
              "#6b4226",
            ]}
            speed={3.5}
            scale={1.5}
            distortion={0.6}
            swirl={0.3}
            swirlIterations={6}
            softness={0.7}
            shape="edge"
            shapeScale={0.5}
            proportion={0.5}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          />
        )}

        {/* Content */}
        <div className="container-main py-16 md:py-24 lg:py-32 pb-8 md:pb-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 text-center lg:text-right">
              {badge && <span className="inline-block text-accent text-sm mb-4">{badge}</span>}

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
                <p className="hero-description text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 break-words overflow-hidden">
                  {description}
                </p>
              )}

              {(primaryCta || secondaryCta) && (
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
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

              {children}
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center">
              {image ? (
                <img src={image} alt={title} className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-2xl" />
              ) : (
                <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">תמונה</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSplit;
