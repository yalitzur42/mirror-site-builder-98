import { ReactNode } from "react";

type SectionVariant = "dark" | "light";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  variant?: SectionVariant;
}

const Section = ({ 
  title, 
  subtitle, 
  children, 
  className = "", 
  containerClassName = "",
  variant = "dark",
  isFirstSection = false
}: SectionProps & { isFirstSection?: boolean }) => {
  const variantClasses = variant === "light" ? "section-light" : "section-dark";
  const firstSectionClasses = isFirstSection 
    ? "rounded-t-[40px] md:rounded-t-[80px] -mt-10 md:-mt-16 relative z-10" 
    : "";
  
  return (
    <section className={`py-16 md:py-24 ${variantClasses} ${firstSectionClasses} ${className}`}>
      <div className={`container-main ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="mb-4 text-inherit">{title}</h2>}
            {subtitle && (
              <p className="text-lg max-w-2xl mx-auto opacity-80">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
