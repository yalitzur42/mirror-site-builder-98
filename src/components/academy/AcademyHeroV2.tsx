import { ReactNode } from "react";
import { Scissors, ArrowLeft, CheckCircle2 } from "lucide-react";

interface CTAItem {
  label: ReactNode;
  href: string;
  onClick?: () => void;
}

interface AcademyHeroV2Props {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  primaryCta?: CTAItem;
  secondaryCta?: CTAItem;
  socialProof?: string[];
}

const AcademyHeroV2 = ({
  badge = "✂ הקורס המקצועי לספרים בישראל",
  title,
  subtitle,
  description,
  backgroundImage,
  primaryCta,
  secondaryCta,
  socialProof = ["+500 בוגרים", "ליווי אישי", "3 חודשים בלבד"],
}: AcademyHeroV2Props) => {
  const renderCta = (cta: CTAItem | undefined, isPrimary: boolean) => {
    if (!cta) return null;
    const baseClass = isPrimary
      ? "inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base md:text-lg font-black transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg"
      : "inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base md:text-lg font-bold border-2 transition-all hover:scale-[1.03] active:scale-[0.97]";
    const styleProps = isPrimary
      ? { backgroundColor: "#C9A84C", color: "#1a1208" }
      : { borderColor: "#C9A84C", color: "#ffffff", backgroundColor: "rgba(255,255,255,0.04)" };

    if (cta.href.startsWith("http")) {
      return (
        <a href={cta.href} target="_blank" rel="noopener noreferrer" className={baseClass} style={styleProps}>
          {cta.label}
        </a>
      );
    }
    return (
      <a
        href={cta.href}
        className={baseClass}
        style={styleProps}
        onClick={(e) => {
          if (cta.href.startsWith("#")) {
            e.preventDefault();
            const el = document.querySelector(cta.href);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          cta.onClick?.();
        }}
      >
        {cta.label}
      </a>
    );
  };

  return (
    <div className="section-light">
      <section
        className="relative z-10 rounded-b-[40px] md:rounded-b-[80px] overflow-hidden"
        style={{ backgroundColor: "#0d0805" }}
      >
        {/* Background image */}
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
        />

        {/* Subtle gold glow on top */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(201,168,76,0.15) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-main py-20 md:py-28 lg:py-36 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Gold pill badge */}
            {badge && (
              <div className="flex justify-center mb-6">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide border"
                  style={{
                    borderColor: "#C9A84C",
                    color: "#C9A84C",
                    backgroundColor: "rgba(201,168,76,0.08)",
                  }}
                >
                  <Scissors className="w-3.5 h-3.5" />
                  {badge}
                </span>
              </div>
            )}

            {/* H1 */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-5 leading-[1.05]"
              style={{ color: "#ffffff" }}
            >
              {title}
            </h1>

            {/* H2 sub-headline */}
            {subtitle && (
              <h2
                className="text-xl md:text-2xl lg:text-3xl font-bold mb-5"
                style={{ color: "#C9A84C" }}
              >
                {subtitle}
              </h2>
            )}

            {/* Body */}
            {description && (
              <p
                className="text-base md:text-lg mb-9 max-w-2xl mx-auto leading-relaxed"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {description}
              </p>
            )}

            {/* CTAs */}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center mb-7">
                {renderCta(primaryCta, true)}
                {renderCta(secondaryCta, false)}
              </div>
            )}

            {/* Social proof row */}
            {socialProof.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-sm md:text-base font-semibold">
                {socialProof.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: "#C9A84C" }} />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademyHeroV2;
