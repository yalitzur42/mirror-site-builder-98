import { Smartphone, BadgeCheck } from "lucide-react";

interface StickyWhatsAppProps {
  visible: boolean;
  onScrollToLead: () => void;
  onPrimaryCTA: () => void;
}

const StickyWhatsApp = ({ visible, onScrollToLead, onPrimaryCTA }: StickyWhatsAppProps) => {
  return (
    <div
      className={[
        "fixed bottom-5 left-5 z-[220] transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <div className="flex flex-col gap-2">
        <button
          onClick={onScrollToLead}
          className="hidden md:inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-bold shadow-lg hover:opacity-95 transition"
        >
          <BadgeCheck className="w-4 h-4" />
          בדיקת התאמה מהירה
        </button>

        <button
          onClick={onPrimaryCTA}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-whatsapp text-white px-6 py-3.5 text-base font-black shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/30"
          aria-label="WhatsApp"
        >
          <Smartphone className="w-5 h-5 animate-pulse" />
          וואטסאפ עכשיו
        </button>
      </div>
    </div>
  );
};

export default StickyWhatsApp;
