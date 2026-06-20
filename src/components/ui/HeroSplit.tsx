import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSplitProps {
  badge?: ReactNode;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  primaryCta?: { label: ReactNode; href: string };
  secondaryCta?: { label: ReactNode; href: string };
  image?: string;
  video?: string;
  mediaKind?: "image" | "video";
  mediaLayout?: "boxed" | "full";
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
  video,
  mediaKind = "image",
  mediaLayout = "boxed",
  children,
}: HeroSplitProps) => {
  return (
    <div className="section-light">
      <section className="relative z-10 rounded-b-[40px] md:rounded-b-[80px] pb-20 md:pb-28 overflow-hidden" style={{ backgroundColor: '#3d2310' }}>
        <div className="absolute inset-0 bg-primary" />

        {/* Content */}
        <div className="container-main py-16 md:py-24 lg:py-32 pb-8 md:pb-12 relative z-10">
          {(() => {
            const shouldShowVideo = mediaKind === "video" && Boolean(video);
            const mediaSrc = shouldShowVideo ? video : image;
            const isFull = mediaLayout === "full";

            const mediaEl = mediaSrc ? (
              shouldShowVideo ? (
                <video
                  key={mediaSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={image}
                  aria-label={title}
                  onCanPlay={(event) => {
                    if (event.currentTarget.paused) {
                      void event.currentTarget.play().catch(() => undefined);
                    }
                  }}
                  className={
                    isFull
                      ? "w-full aspect-[16/7] max-h-[70vh] object-cover rounded-2xl shadow-2xl bg-card/30"
                      : "w-full aspect-square max-w-xs md:max-w-sm lg:max-w-md object-cover rounded-lg shadow-2xl border-2 border-foreground bg-card/30"
                  }
                >
                  <source src={mediaSrc} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={mediaSrc}
                  alt={title}
                  className={
                    isFull
                      ? "w-full max-h-[70vh] object-cover rounded-2xl shadow-2xl"
                      : "w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-2xl border-2 border-foreground"
                  }
                />
              )
            ) : (
              <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center w-full max-w-md">
                <span className="text-muted-foreground">מדיה</span>
              </div>
            );

            const textBlock = (
              <div className={isFull ? "text-center" : "order-2 lg:order-1 text-center lg:text-right"}>
                {badge && <span className="inline-block text-accent text-sm mb-4">{badge}</span>}

                <h1 className="hero-title-animate text-foreground mb-4 break-words overflow-hidden">
                  {title.split("").map((char, index) => (
                    <span key={index} className="hero-letter" style={{ animationDelay: `${index * 0.05}s` }}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h1>

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
                  <p className={`hero-description text-muted-foreground text-lg md:text-xl mb-8 break-words overflow-hidden ${isFull ? "max-w-2xl mx-auto" : "max-w-xl mx-auto lg:mx-0"}`}>
                    {description}
                  </p>
                )}

                {(primaryCta || secondaryCta) && (
                  <div className={`flex flex-wrap gap-4 ${isFull ? "justify-center" : "justify-center lg:justify-start"}`}>
                    {primaryCta && (
                      primaryCta.href.startsWith("http") ? (
                        <a href={primaryCta.href} target="_blank" rel="noopener noreferrer" className="btn-hero-polygon">{primaryCta.label}</a>
                      ) : (
                        <Link to={primaryCta.href} className="btn-hero-polygon">{primaryCta.label}</Link>
                      )
                    )}
                    {secondaryCta && (
                      secondaryCta.href.startsWith("http") ? (
                        <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer" className="btn-hero-corner-frame">{secondaryCta.label}</a>
                      ) : (
                        <Link to={secondaryCta.href} className="btn-hero-corner-frame">{secondaryCta.label}</Link>
                      )
                    )}
                  </div>
                )}

                {children}
              </div>
            );

            if (isFull) {
              return (
                <div className="flex flex-col gap-10">
                  <div className="w-full flex justify-center">{mediaEl}</div>
                  {textBlock}
                </div>
              );
            }

            return (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {textBlock}
                <div className="order-1 lg:order-2 relative flex items-center justify-center">
                  {mediaEl}
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
};

export default HeroSplit;
