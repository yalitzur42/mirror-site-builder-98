import { useState } from "react";
import { Calculator, Clock, Scissors, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SalaryCalculator = () => {
  const [hoursStr, setHoursStr] = useState("8");
  const [minutesStr, setMinutesStr] = useState("30");
  const [priceStr, setPriceStr] = useState("80");

  const hoursPerDay = parseInt(hoursStr, 10) || 0;
  const minutesPerCut = parseInt(minutesStr, 10) || 0;
  const pricePerCut = parseInt(priceStr, 10) || 0;

  const cutsPerHour = minutesPerCut > 0 ? 60 / minutesPerCut : 0;
  const cutsPerDay = cutsPerHour * hoursPerDay;
  const dailyIncome = cutsPerDay * pricePerCut;
  const workDaysPerMonth = 22;
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
          <Calculator className="w-7 h-7 md:w-9 md:h-9 inline-block align-middle ml-2" />
          כמה תוכל להרוויח בחודש? 💰
        </h2>
        <p className="opacity-75 text-lg md:text-xl">
          הזן את המספרים שלך וראה את הפוטנציאל
        </p>
      </div>

      <Card className="bg-background text-foreground p-6 md:p-10 rounded-3xl border-2 border-foreground shadow-2xl space-y-7">
        {/* Hours per day */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 font-bold text-lg md:text-xl">
            <Clock className="w-5 h-5 md:w-6 md:h-6" />
            שעות עבודה ביום
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
            זמן לתספורת (דקות)
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
            מחיר לתספורת (₪)
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
            שכר חודשי מוערך (22 ימי עבודה)
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
          זה לא חלום — זה מה שבוגרי האקדמיה מרוויחים היום ✨
        </div>
      </Card>
    </div>
  );
};

export default SalaryCalculator;
