import { useState } from "react";
import { Calculator, Clock, Scissors, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const SalaryCalculator = () => {
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [minutesPerCut, setMinutesPerCut] = useState(30);
  const [pricePerCut, setPricePerCut] = useState(80);

  const cutsPerHour = 60 / minutesPerCut;
  const cutsPerDay = cutsPerHour * hoursPerDay;
  const dailyIncome = cutsPerDay * pricePerCut;
  const workDaysPerMonth = 22;
  const monthlyEstimate = Math.round(dailyIncome * workDaysPerMonth);

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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 font-bold text-lg">
              <Clock className="w-5 h-5" />
              שעות עבודה ביום
            </label>
            <span className="text-2xl font-black">{hoursPerDay}</span>
          </div>
          <Slider
            value={[hoursPerDay]}
            onValueChange={([val]) => setHoursPerDay(val)}
            min={4}
            max={12}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm opacity-50">
            <span>4 שעות</span>
            <span>12 שעות</span>
          </div>
        </div>

        {/* Minutes per cut */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 font-bold text-lg">
              <Scissors className="w-5 h-5" />
              זמן לתספורת (דקות)
            </label>
            <span className="text-2xl font-black">{minutesPerCut}</span>
          </div>
          <Slider
            value={[minutesPerCut]}
            onValueChange={([val]) => setMinutesPerCut(val)}
            min={15}
            max={60}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm opacity-50">
            <span>15 דקות</span>
            <span>60 דקות</span>
          </div>
        </div>

        {/* Price per cut */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 font-bold text-lg">
              <Banknote className="w-5 h-5" />
              מחיר לתספורת (₪)
            </label>
            <span className="text-2xl font-black">₪{pricePerCut}</span>
          </div>
          <Slider
            value={[pricePerCut]}
            onValueChange={([val]) => setPricePerCut(val)}
            min={40}
            max={200}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm opacity-50">
            <span>₪40</span>
            <span>₪200</span>
          </div>
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
