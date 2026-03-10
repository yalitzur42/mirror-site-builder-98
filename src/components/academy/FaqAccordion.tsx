import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

const FaqAccordion = ({ items }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto grid gap-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <button
            key={i}
            onClick={() => setOpenIndex(open ? null : i)}
            className="text-right w-full rounded-2xl bg-secondary text-secondary-foreground px-5 py-4 border-0"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-black text-base md:text-lg">{item.q}</span>
              <ChevronDown className={`w-5 h-5 transition ${open ? "rotate-180" : ""}`} />
            </div>
            <div
              className={`grid transition-all duration-300 ${
                open ? "grid-rows-[1fr] mt-3 opacity-85" : "grid-rows-[0fr] mt-0 opacity-0"
              }`}
            >
              <div className="overflow-hidden text-sm md:text-base leading-relaxed">
                {item.a}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
