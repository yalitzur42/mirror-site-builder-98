import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

const Section = ({ title, subtitle, children, className = "", containerClassName = "" }: SectionProps) => {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className={`container-main ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="mb-4">{title}</h2>}
            {subtitle && (
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
