import { useState } from "react";
import { Clock, Scissors, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SalaryCalculatorProps {
  v?: (section: string, key: string, fallback?: string) => string;
}

const SalaryCalculator = ({ v }: SalaryCalculatorProps) => {
  const get = (key: string, fallback: string) =>
    v ? v("salary_calculator", key, fallback) : fallback;

  const defaultHours = get("default_hours", "8");
  const defaultMinutes = get("default_minutes", "30");
  const defaultPrice = get("default_price", "80");
  const workDaysPerMonth = parseInt(get("work_days", "22"), 10) || 22;

  const [hoursStr, setHoursStr] = useState(defaultHours);
  const [minutesStr, setMinutesStr] = useState(defaultMinutes);
  const [priceStr, setPriceStr] = useState(defaultPrice);

  const hoursPerDay = parseInt(hoursStr, 10) || 0;
  const minutesPerCut = parseInt(minutesStr, 10) || 0;
  const pricePerCut = parseInt(priceStr, 10) || 0;

  const cutsPerHour = minutesPerCut > 0 ? 60 / minutesPerCut : 0;
  const cutsPerDay = cutsPerHour * hoursPerDay;
  const dailyIncome = cutsPerDay * pricePerCut;
  const monthlyEstimate = Math.round(dailyIncome * workDaysPerMonth);

  const clamp = (value: string, setter: (s: string) => void, min: number, max: number) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < min) {
      setter(String(min));
    } else if (num > max) {
      setter(String(max));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
          {get("title", "🧮 כמה תוכל להרוויח בחודש?")}
        </h2>
        <p className="opacity-75 text-lg md:text-xl">
          {get("subtitle", "הזז את הסליידר ותראה מספרים אמיתיים — לא הבטחות")}
        </p>
      </div>

      <Card className="bg-background text-foreground p-6 md:p-10 rounded-3xl border-2 border-foreground shadow-2xl space-y-7">
        {/* Hours per day */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 font-bold text-lg md:text-xl">
            <Clock className="w-5 h-5 md:w-6 md:h-6" />
            {get("label_hours", "שעות עבודה ביום")}
          </label>
          <Input
            type="number"
            min={1}
            max={24}
            value={hoursStr}
            onChange={(e) => setHoursStr(e.target.value)}
            onBlur={() => clamp(hoursStr, setHoursStr, 1, 24)}
            className="w-24 md:w-28 text-center text-xl md:text-2xl font-black border-2 border-foreground/30 h-12 md:h-14"
          />
        </div>

        {/* Minutes per cut */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 font-bold text-lg md:text-xl">
            <Scissors className="w-5 h-5 md:w-6 md:h-6" />
            {get("label_minutes", "זמן לתספורת (דקות)")}
          </label>
          <Input
            type="number"
            min={5}
            max={120}
            value={minutesStr}
            onChange={(e) => setMinutesStr(e.target.value)}
            onBlur={() => clamp(minutesStr, setMinutesStr, 5, 120)}
            className="w-24 md:w-28 text-center text-xl md:text-2xl font-black border-2 border-foreground/30 h-12 md:h-14"
          />
        </div>

        {/* Price per cut */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 font-bold text-lg md:text-xl">
            <Banknote className="w-5 h-5 md:w-6 md:h-6" />
            {get("label_price", "מחיר לתספורת (₪)")}
          </label>
          <Input
            type="number"
            min={1}
            max={500}
            value={priceStr}
            onChange={(e) => setPriceStr(e.target.value)}
            onBlur={() => clamp(priceStr, setPriceStr, 1, 500)}
            className="w-24 md:w-28 text-center text-xl md:text-2xl font-black border-2 border-foreground/30 h-12 md:h-14"
          />
        </div>

        {/* Result */}
        <div className="border-t-2 border-foreground/20 pt-7 text-center space-y-2">
          <p className="opacity-70 font-bold text-base md:text-lg">
            {get("result_label", `שכר חודשי מוערך (${workDaysPerMonth} ימי עבודה)`)}
          </p>
          <div
            className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
            style={{ color: "#C9A84C", textShadow: "0 2px 20px rgba(201,168,76,0.25)" }}
          >
            ₪{monthlyEstimate.toLocaleString("he-IL")}
          </div>
          <p className="text-sm md:text-base opacity-50 pt-1">
            {Math.round(cutsPerDay)} תספורות ביום × ₪{pricePerCut} × {workDaysPerMonth} ימים
          </p>
        </div>

        {/* Motivational footer */}
        <div
          className="text-center text-sm md:text-base font-bold py-3 px-4 rounded-xl"
          style={{
            backgroundColor: "rgba(201,168,76,0.12)",
            color: "#7a5a1a",
            border: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          {get("footer_text", "זה לא חלום — זה מה שבוגרי האקדמיה מרוויחים היום ✨")}
        </div>
      </Card>
    </div>
  );
};

export default SalaryCalculator;
