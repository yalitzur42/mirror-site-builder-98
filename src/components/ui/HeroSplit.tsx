import { ReactNode } from "react";
import { Link } from "react-router-dom";

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
  const shouldShowVideo = mediaKind === "video" && Boolean(video);
  const mediaSrc = shouldShowVideo ? video : image;
  const isFull = mediaLayout === "full";

  const ctaBlock = (primaryCta || secondaryCta) && (
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
  );

  const textBlock = (
    <div className={isFull ? "text-center" : "order-2 lg:order-1 text-center lg:text-right"}>
      {badge && <span className="inline-block text-accent text-sm mb-4">{badge}</span>}

      <h1 className={`hero-title-animate text-foreground mb-4 break-words ${isFull ? "drop-shadow-2xl" : ""}`}>
        {title}
      </h1>

      {subtitle && (
        <p className="hero-subtitle-animate text-xl md:text-2xl lg:text-3xl text-accent font-bold mb-4 break-words">
          {subtitle}
        </p>
      )}

      {description && (
        <p className={`hero-description text-muted-foreground text-lg md:text-xl mb-8 break-words ${isFull ? "max-w-2xl mx-auto" : "max-w-xl mx-auto lg:mx-0"}`}>
          {description}
        </p>
      )}

      {ctaBlock}

      {children}
    </div>
  );

  if (isFull) {
    return (
      <div className="section-light">
        <section className="relative z-10 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden min-h-[520px] md:min-h-[620px] lg:min-h-[720px] flex items-center justify-center bg-[#2a1a0d]">
          {/* Full-width background media */}
          <div className="absolute inset-0">
            {shouldShowVideo && video ? (
              <video
                key={video}
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
                className="h-full w-full object-cover"
              >
                <source src={video} type="video/mp4" />
              </video>
            ) : mediaSrc ? (
              <img src={mediaSrc} alt={title} className="h-full w-full object-cover" />
            ) : null}
            {/* Dark gradient overlay for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  135deg,
                  rgba(42, 26, 13, 0.92) 0%,
                  rgba(61, 35, 16, 0.78) 40%,
                  rgba(42, 26, 13, 0.72) 70%,
                  rgba(42, 26, 13, 0.88) 100%
                )`,
              }}
            />
          </div>

          <div className="container-main relative z-10 py-20 md:py-28 lg:py-36">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
              {textBlock}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="section-light">
      <section className="relative z-10 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden" style={{ backgroundColor: "#3d2310" }}>
        <div className="container-main py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {textBlock}
            <div className="order-1 lg:order-2 relative flex items-center justify-center">
              {mediaSrc ? (
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
                    className="w-full max-w-md aspect-video object-cover rounded-lg shadow-2xl border-2 border-foreground bg-card/30"
                  >
                    <source src={mediaSrc} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={mediaSrc}
                    alt={title}
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-2xl border-2 border-foreground"
                  />
                )
              ) : (
                <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center w-full max-w-md">
                  <span className="text-muted-foreground">מדיה</span>
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
