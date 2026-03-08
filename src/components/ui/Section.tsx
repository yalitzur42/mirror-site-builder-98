import { ReactNode } from "react";

type SectionVariant = "dark" | "light";

interface SectionProps {
  title?: ReactNode;
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
  // First section after hero doesn't need negative margin anymore since hero wrapper handles it
  const firstSectionClasses = isFirstSection ? "" : "";
  
  return (
    <section className={`py-12 md:py-16 ${variantClasses} ${firstSectionClasses} ${className}`}>
      <div className={`container-main ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-8 overflow-hidden">
            {title && <h2 className="mb-3 text-inherit font-extrabold break-words">{title}</h2>}
            {subtitle && (
              <p className="text-xl max-w-2xl mx-auto opacity-80 font-semibold break-words">
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
