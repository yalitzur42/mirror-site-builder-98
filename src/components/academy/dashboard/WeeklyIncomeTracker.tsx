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

const formatWeekLabel = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()}.${d.getMonth() + 1}`;
};

interface HistoryRow {
  week_date: string;
  total: number;
}

const WeeklyIncomeTracker = ({ userId }: { userId: string }) => {
  const [haircuts, setHaircuts] = useState(0);
  const [avgPrice, setAvgPrice] = useState(60);
  const [products, setProducts] = useState(0);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const weekDate = getWeekStart();
  const weekTotal = haircuts * avgPrice + products;
  // Projected monthly = weekly × 4 vs 10K goal
  const projectedMonthly = weekTotal * 4;
  const monthlyPct = Math.min(100, (projectedMonthly / MONTHLY_GOAL) * 100);
  const remaining = Math.max(0, MONTHLY_GOAL - projectedMonthly);

  const loadHistory = async () => {
    const { data } = await supabase
      .from("weekly_income")
      .select("week_date, total")
      .eq("user_id", userId)
      .order("week_date", { ascending: false })
      .limit(4);
    setHistory((data || []) as HistoryRow[]);
  };

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
        setAvgPrice(Number(thisWeek.avg_price) || 60);
        setProducts(Number(thisWeek.products_income));
      }
      await loadHistory();
      setLoading(false);
    };
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    await loadHistory();
  };

  // Motivational message based on weekly→monthly projection
  const motivation = (() => {
    if (monthlyPct < 25) return { text: "אתה בדרך הנכונה — תמשיך! 💪", color: "#9ca3af" };
    if (monthlyPct < 50) return { text: "מרשים! אתה בדרך ל-10K 🔥", color: "#f59e0b" };
    if (monthlyPct < 75) return { text: "כמעט שם! אל תעצור עכשיו ⚡", color: "#fbbf24" };
    return { text: "מטורף! אתה על סף ה-10K 👑", color: "#C9A84C" };
  })();

  if (loading) {
    return (
      <div className="text-center p-4" style={{ color: "#999" }}>
        טוען מחשבון הכנסה...
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-5 space-y-4"
      style={{ background: "#1e1e2e", border: "1px solid #3a3a4a" }}
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5" style={{ color: "#C9A84C" }} />
        <h4 className="font-extrabold text-lg" style={{ color: "#ffffff" }}>
          מעקב הכנסה שבועית 📊
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-sm block mb-1 font-bold" style={{ color: "#d0d0d0" }}>
            כמה תספורות עשית השבוע?
          </label>
          <Input
            type="number"
            min="0"
            value={haircuts || ""}
            onChange={(e) => setHaircuts(Number(e.target.value) || 0)}
            style={{ background: "#252535", borderColor: "#3a3a4a", color: "#ffffff" }}
          />
        </div>
        <div>
          <label className="text-sm block mb-1 font-bold" style={{ color: "#d0d0d0" }}>
            מחיר ממוצע לתספורת (₪)
          </label>
          <Input
            type="number"
            min="0"
            value={avgPrice || ""}
            onChange={(e) => setAvgPrice(Number(e.target.value) || 0)}
            style={{ background: "#252535", borderColor: "#3a3a4a", color: "#ffffff" }}
          />
        </div>
        <div>
          <label className="text-sm block mb-1 font-bold" style={{ color: "#d0d0d0" }}>
            הכנסה ממוצרים (₪)
          </label>
          <Input
            type="number"
            min="0"
            value={products || ""}
            onChange={(e) => setProducts(Number(e.target.value) || 0)}
            style={{ background: "#252535", borderColor: "#3a3a4a", color: "#ffffff" }}
          />
        </div>
      </div>

      <div
        className="rounded-lg p-4 flex items-center justify-between"
        style={{ background: "rgba(201, 168, 76, 0.1)", border: "1px solid #C9A84C" }}
      >
        <span className="font-bold text-base" style={{ color: "#ffffff" }}>
          סה"כ השבוע:
        </span>
        <span className="text-3xl font-extrabold" style={{ color: "#C9A84C" }}>
          {weekTotal.toLocaleString()} ₪
        </span>
      </div>

      {/* Monthly goal projection */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-bold" style={{ color: "#d0d0d0" }}>
            יעד חודשי: {MONTHLY_GOAL.toLocaleString()} ₪
          </span>
          <span className="text-sm font-extrabold" style={{ color: "#C9A84C" }}>
            {monthlyPct.toFixed(0)}%
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#252535" }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${monthlyPct}%`,
              background: "linear-gradient(90deg, #C9A84C, #f0d070)",
            }}
          />
        </div>
        <p className="text-sm font-bold text-center" style={{ color: "#e0e0e0" }}>
          {remaining > 0
            ? `נשאר לך ${remaining.toLocaleString()} ₪ להשלמת היעד החודשי`
            : "הגעת ליעד החודשי! 🎉"}
        </p>
      </div>

      {/* Motivational */}
      <div
        className="rounded-lg p-3 text-center font-extrabold"
        style={{ background: "#1a1a2e", border: `1px solid ${motivation.color}`, color: motivation.color }}
      >
        {motivation.text}
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving || weekTotal === 0}
        className="w-full rounded-lg p-3 font-extrabold flex items-center justify-center gap-2 disabled:opacity-50"
        style={{ background: "#C9A84C", color: "#0a0a0a" }}
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        שמור שבוע
      </button>

      {/* History */}
      {history.length > 0 && (
        <div className="pt-3 border-t space-y-2" style={{ borderColor: "#3a3a4a" }}>
          <p className="text-sm font-extrabold" style={{ color: "#ffffff" }}>
            4 השבועות האחרונים:
          </p>
          <div className="space-y-1">
            {history.map((row, i) => (
              <div
                key={row.week_date}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm"
                style={{ background: "#252535", border: "1px solid #3a3a4a" }}
              >
                <span style={{ color: "#d0d0d0" }}>
                  שבוע {history.length - i} ({formatWeekLabel(row.week_date)})
                </span>
                <span className="font-extrabold" style={{ color: "#C9A84C" }}>
                  {Number(row.total).toLocaleString()} ₪
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyIncomeTracker;
