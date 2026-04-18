import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { TrendingUp, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MONTHLY_GOAL = 10000;

const getWeekStart = () => {
  const d = new Date();
  const day = d.getDay(); // Sunday = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
};

const WeeklyIncomeTracker = ({ userId }: { userId: string }) => {
  const [haircuts, setHaircuts] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [products, setProducts] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const weekDate = getWeekStart();
  const weekTotal = haircuts * avgPrice + products;

  useEffect(() => {
    const load = async () => {
      const { data: thisWeek } = await supabase
        .from("weekly_income")
        .select("*")
        .eq("user_id", userId)
        .eq("week_date", weekDate)
        .maybeSingle();
      if (thisWeek) {
        setHaircuts(thisWeek.haircuts_count);
        setAvgPrice(Number(thisWeek.avg_price));
        setProducts(Number(thisWeek.products_income));
      }
      // Monthly sum (last 4 weeks)
      const fourWeeksAgo = new Date();
      fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
      const { data: monthData } = await supabase
        .from("weekly_income")
        .select("total")
        .eq("user_id", userId)
        .gte("week_date", fourWeeksAgo.toISOString().split("T")[0]);
      const sum = (monthData || []).reduce((s, r) => s + Number(r.total), 0);
      setMonthTotal(sum);
      setLoading(false);
    };
    void load();
  }, [userId, weekDate]);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("weekly_income").upsert(
      {
        user_id: userId,
        week_date: weekDate,
        haircuts_count: haircuts,
        avg_price: avgPrice,
        products_income: products,
        total: weekTotal,
      },
      { onConflict: "user_id,week_date" } as never,
    );
    setSaving(false);
    if (error) {
      toast.error("שגיאה בשמירה");
      return;
    }
    toast.success("נשמר! 💪");
    // Reload monthly
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    const { data: monthData } = await supabase
      .from("weekly_income")
      .select("total")
      .eq("user_id", userId)
      .gte("week_date", fourWeeksAgo.toISOString().split("T")[0]);
    setMonthTotal((monthData || []).reduce((s, r) => s + Number(r.total), 0));
  };

  const monthlyPct = Math.min(100, (monthTotal / MONTHLY_GOAL) * 100);

  if (loading) {
    return (
      <div className="text-center p-4" style={{ color: "#666" }}>
        טוען מחשבון הכנסה...
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-5 space-y-4"
      style={{ background: "#0a0a0a", border: "1px solid #2a2a2a" }}
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5" style={{ color: "#C9A84C" }} />
        <h4 className="font-extrabold text-lg" style={{ color: "#fff" }}>
          מעקב הכנסה שבועית
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-sm block mb-1" style={{ color: "#999" }}>
            תספורות השבוע
          </label>
          <Input
            type="number"
            min="0"
            value={haircuts || ""}
            onChange={(e) => setHaircuts(Number(e.target.value) || 0)}
            style={{ background: "#141414", borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
        <div>
          <label className="text-sm block mb-1" style={{ color: "#999" }}>
            מחיר ממוצע (₪)
          </label>
          <Input
            type="number"
            min="0"
            value={avgPrice || ""}
            onChange={(e) => setAvgPrice(Number(e.target.value) || 0)}
            style={{ background: "#141414", borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
        <div>
          <label className="text-sm block mb-1" style={{ color: "#999" }}>
            הכנסה ממוצרים (₪)
          </label>
          <Input
            type="number"
            min="0"
            value={products || ""}
            onChange={(e) => setProducts(Number(e.target.value) || 0)}
            style={{ background: "#141414", borderColor: "#2a2a2a", color: "#fff" }}
          />
        </div>
      </div>

      <div
        className="rounded-lg p-3 flex items-center justify-between"
        style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid #C9A84C" }}
      >
        <span className="font-bold" style={{ color: "#fff" }}>
          סה"כ השבוע:
        </span>
        <span className="text-2xl font-extrabold" style={{ color: "#C9A84C" }}>
          ₪{weekTotal.toLocaleString()}
        </span>
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="w-full rounded-lg p-3 font-bold flex items-center justify-center gap-2"
        style={{ background: "#C9A84C", color: "#000" }}
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        שמור שבוע
      </button>

      {/* Monthly goal */}
      <div className="pt-3 border-t" style={{ borderColor: "#2a2a2a" }}>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-bold" style={{ color: "#999" }}>
            יעד חודשי: ₪{MONTHLY_GOAL.toLocaleString()}
          </span>
          <span className="text-sm font-extrabold" style={{ color: "#C9A84C" }}>
            ₪{monthTotal.toLocaleString()} ({monthlyPct.toFixed(0)}%)
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#1a1a1a" }}>
          <div
            className="h-full transition-all"
            style={{
              width: `${monthlyPct}%`,
              background: "linear-gradient(90deg, #C9A84C, #f0d070)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyIncomeTracker;
