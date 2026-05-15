import { useEffect, useState } from "react";
import {
  Accessibility,
  X,
  Plus,
  Minus,
  Contrast,
  Sun,
  Moon,
  Link2,
  Type,
  MousePointer2,
  AlignJustify,
  Pause,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface A11ySettings {
  fontScale: number; // 1, 1.15, 1.3, 1.5
  highContrast: boolean;
  theme: "default" | "light" | "dark";
  highlightLinks: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  spacing: boolean;
  pauseAnimations: boolean;
}

const DEFAULTS: A11ySettings = {
  fontScale: 1,
  highContrast: false,
  theme: "default",
  highlightLinks: false,
  readableFont: false,
  bigCursor: false,
  spacing: false,
  pauseAnimations: false,
};

const STORAGE_KEY = "macho-a11y";

const loadSettings = (): A11ySettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
};

const applySettings = (s: A11ySettings) => {
  const html = document.documentElement;
  html.style.fontSize = `${s.fontScale * 100}%`;
  html.classList.toggle("a11y-contrast", s.highContrast);
  html.classList.toggle("a11y-light", s.theme === "light");
  html.classList.toggle("a11y-dark", s.theme === "dark");
  html.classList.toggle("a11y-links", s.highlightLinks);
  html.classList.toggle("a11y-readable", s.readableFont);
  html.classList.toggle("a11y-cursor", s.bigCursor);
  html.classList.toggle("a11y-spacing", s.spacing);
  html.classList.toggle("a11y-no-anim", s.pauseAnimations);
};

const AccessibilityMenu = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    applySettings(loaded);
  }, []);

  const update = (patch: Partial<A11ySettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    applySettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    setSettings(DEFAULTS);
    applySettings(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const fontStep = (dir: 1 | -1) => {
    const steps = [1, 1.15, 1.3, 1.5];
    const i = steps.indexOf(settings.fontScale);
    const next = steps[Math.max(0, Math.min(steps.length - 1, (i === -1 ? 0 : i) + dir))];
    update({ fontScale: next });
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        className={cn(
          "fixed z-[60] left-4 bottom-24 md:bottom-6",
          "w-14 h-14 rounded-full bg-primary text-primary-foreground",
          "flex items-center justify-center shadow-lg",
          "hover:scale-110 transition-transform",
          "ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
        )}
      >
        <Accessibility className="w-7 h-7" strokeWidth={2} />
      </button>

      {/* Backdrop */}
      {open && (
        <button
          type="button"
          aria-label="סגירת תפריט נגישות"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        />
      )}

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="תפריט נגישות"
        aria-hidden={!open}
        className={cn(
          "fixed z-[61] left-0 top-0 bottom-0 w-[88vw] max-w-sm",
          "bg-background text-foreground border-l border-border shadow-2xl",
          "transition-transform duration-300 ease-out",
          "flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        dir="rtl"
      >
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Accessibility className="w-6 h-6" />
            נגישות
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="סגירה"
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Font size */}
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold flex items-center gap-2">
                <Type className="w-5 h-5" /> גודל טקסט
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(settings.fontScale * 100)}%
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fontStep(-1)}
                aria-label="הקטנת טקסט"
                className="flex-1 py-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center"
              >
                <Minus className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => fontStep(1)}
                aria-label="הגדלת טקסט"
                className="flex-1 py-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <ToggleRow
            icon={<Contrast className="w-5 h-5" />}
            label="ניגודיות גבוהה"
            active={settings.highContrast}
            onClick={() => update({ highContrast: !settings.highContrast })}
          />

          <div className="rounded-lg border border-border p-3">
            <span className="font-bold block mb-2">ערכת צבעים</span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { v: "default", label: "ברירת מחדל", icon: null },
                  { v: "light", label: "בהיר", icon: <Sun className="w-4 h-4" /> },
                  { v: "dark", label: "כהה", icon: <Moon className="w-4 h-4" /> },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => update({ theme: opt.v })}
                  className={cn(
                    "py-2 rounded-md text-sm font-bold flex items-center justify-center gap-1 transition-colors",
                    settings.theme === opt.v
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 hover:bg-primary/20"
                  )}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <ToggleRow
            icon={<Link2 className="w-5 h-5" />}
            label="הדגשת קישורים"
            active={settings.highlightLinks}
            onClick={() => update({ highlightLinks: !settings.highlightLinks })}
          />
          <ToggleRow
            icon={<Type className="w-5 h-5" />}
            label="פונט קריא"
            active={settings.readableFont}
            onClick={() => update({ readableFont: !settings.readableFont })}
          />
          <ToggleRow
            icon={<MousePointer2 className="w-5 h-5" />}
            label="סמן עכבר מוגדל"
            active={settings.bigCursor}
            onClick={() => update({ bigCursor: !settings.bigCursor })}
          />
          <ToggleRow
            icon={<AlignJustify className="w-5 h-5" />}
            label="ריווח שורות וטקסט"
            active={settings.spacing}
            onClick={() => update({ spacing: !settings.spacing })}
          />
          <ToggleRow
            icon={<Pause className="w-5 h-5" />}
            label="עצירת אנימציות"
            active={settings.pauseAnimations}
            onClick={() => update({ pauseAnimations: !settings.pauseAnimations })}
          />

          <button
            type="button"
            onClick={reset}
            className="w-full mt-2 py-3 rounded-lg border-2 border-primary/30 hover:bg-primary/10 transition-colors font-bold flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            איפוס הגדרות
          </button>
        </div>

        <footer className="p-4 border-t border-border">
          <Link
            to="/accessibility"
            onClick={() => setOpen(false)}
            className="block text-center text-sm font-bold underline hover:text-primary transition-colors"
          >
            הצהרת נגישות מלאה
          </Link>
        </footer>
      </aside>
    </>
  );
};

const ToggleRow = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "w-full flex items-center justify-between p-3 rounded-lg border transition-colors",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-transparent border-border hover:bg-primary/10"
    )}
  >
    <span className="flex items-center gap-2 font-bold">
      {icon}
      {label}
    </span>
    <span
      className={cn(
        "w-10 h-6 rounded-full relative transition-colors",
        active ? "bg-primary-foreground/30" : "bg-primary/20"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 w-5 h-5 rounded-full transition-all",
          active ? "right-0.5 bg-primary-foreground" : "right-[18px] bg-primary"
        )}
      />
    </span>
  </button>
);

export default AccessibilityMenu;
