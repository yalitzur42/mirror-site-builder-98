import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Smartphone, MessageCircle, CheckCircle2, ShieldCheck } from "lucide-react";

interface LeadFormProps {
  v: (section: string, key: string, fallback?: string) => string;
  onSend: (name: string, phone: string, goal: "info" | "fit" | "reserve") => void;
}

const LeadForm = ({ v, onSend }: LeadFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState<"info" | "fit" | "reserve">("fit");

  const goals = [
    { key: "fit" as const, label: v("lead_form", "goal1", "בדיקת התאמה") },
    { key: "info" as const, label: v("lead_form", "goal2", "רק פרטים") },
    { key: "reserve" as const, label: v("lead_form", "goal3", "שריון מקום") },
  ];

  return (
    <Card className="bg-background text-foreground border-border p-6 md:p-8 rounded-2xl">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-black leading-tight">
            {v("lead_form", "title", "בדיקת התאמה מהירה")}
          </h2>
          <p className="opacity-70 mt-2 text-sm md:text-base">
            {v("lead_form", "subtitle", "משאירים 2 פרטים — ונשלח לכם תשובה בוואטסאפ עם כל מה שצריך לדעת.")}
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-foreground text-background">
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>

      {/* Goal pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {goals.map((p) => {
          const active = goal === p.key;
          return (
            <button
              key={p.key}
              onClick={() => setGoal(p.key)}
              className={[
                "px-4 py-2 rounded-full text-sm font-semibold border transition",
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent border-border hover:bg-muted/40",
              ].join(" ")}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3">
        <label className="text-sm font-semibold">שם</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="לדוגמה: דניאל"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
        />

        <label className="text-sm font-semibold mt-1">טלפון</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="05X-XXXXXXX"
          inputMode="tel"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-foreground/20"
        />

        <button
          onClick={() => onSend(name, phone, goal)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 font-bold hover:opacity-95 transition"
        >
          <Smartphone className="w-5 h-5" />
          {v("lead_form", "button_text", "שלח פרטים — נחזור אליך בהקדם")}
        </button>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 opacity-80">
            <CheckCircle2 className="w-4 h-4" />
            <span>תשובה מהירה</span>
          </div>
          <div className="flex items-center gap-2 opacity-80">
            <ShieldCheck className="w-4 h-4" />
            <span>ללא התחייבות</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LeadForm;
