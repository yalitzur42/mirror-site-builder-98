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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="mb-3">
          <Calculator className="w-6 h-6 inline-block align-middle ml-1" />
          מחשבון שכר מוערך
        </h2>
        <p className="opacity-70 text-lg">גלו כמה ספר יכול להרוויח – התאימו את המספרים אליכם</p>
      </div>

      <Card className="bg-background text-foreground p-6 md:p-8 rounded-2xl border-2 border-foreground space-y-8">
        {/* Hours per day */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 font-bold text-lg">
            <Clock className="w-5 h-5" />
            שעות עבודה ביום
          </label>
          <Input
            type="number"
            min={1}
            max={24}
            value={hoursStr}
            onChange={(e) => setHoursStr(e.target.value)}
            onBlur={() => clamp(hoursStr, setHoursStr, 1, 24)}
            className="w-24 text-center text-xl font-black border-2 border-foreground/30"
          />
        </div>

        {/* Minutes per cut */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 font-bold text-lg">
            <Scissors className="w-5 h-5" />
            זמן לתספורת (דקות)
          </label>
          <Input
            type="number"
            min={5}
            max={120}
            value={minutesStr}
            onChange={(e) => setMinutesStr(e.target.value)}
            onBlur={() => clamp(minutesStr, setMinutesStr, 5, 120)}
            className="w-24 text-center text-xl font-black border-2 border-foreground/30"
          />
        </div>

        {/* Price per cut */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 font-bold text-lg">
            <Banknote className="w-5 h-5" />
            מחיר לתספורת (₪)
          </label>
          <Input
            type="number"
            min={1}
            max={500}
            value={pricePerCut}
            onChange={(e) => handleNumber(e.target.value, setPricePerCut, 1, 500)}
            className="w-24 text-center text-xl font-black border-2 border-foreground/30"
          />
        </div>

        {/* Result */}
        <div className="border-t-2 border-foreground/20 pt-6 text-center space-y-2">
          <p className="opacity-70 font-semibold">שכר חודשי מוערך (22 ימי עבודה)</p>
          <div className="text-5xl md:text-6xl font-black">
            ₪{monthlyEstimate.toLocaleString("he-IL")}
          </div>
          <p className="text-sm opacity-50">
            {Math.round(cutsPerDay)} תספורות ביום × ₪{pricePerCut} × {workDaysPerMonth} ימים
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SalaryCalculator;
