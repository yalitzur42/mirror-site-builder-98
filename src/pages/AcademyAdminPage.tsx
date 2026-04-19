import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Loader2,
  Check,
  X,
  ArrowRight,
  Mail,
  Calendar,
  Image as ImageIcon,
  Users,
  ClipboardList,
  TrendingUp,
  Eye,
  UserPlus,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { STAGES } from "@/lib/academyStages";

const PAGE_BG = "radial-gradient(ellipse at top, #141414 0%, #0a0a0a 60%, #000 100%)";
const GOLD = "#C9A84C";

interface RequestRow {
  id: string;
  user_id: string;
  stage: number;
  status: "pending" | "approved" | "rejected";
  photos_urls: string[];
  submitted_at: string;
  admin_note: string | null;
  email: string;
  full_name: string;
  current_stage: number;
}

interface StudentRow {
  id: string;
  email: string;
  full_name: string;
  created_at: string | null;
  current_stage: number;
  tasks_done: number;
  last_active: string | null;
}

interface IncomeRow {
  user_id: string;
  email: string;
  full_name: string;
  month_total: number;
  weeks_count: number;
}

const stageLabel = (n: number) => STAGES.find((s) => s.number === n)?.title || `שלב ${n}`;

const AcademyAdminPage = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<"requests" | "students" | "income">("requests");
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [incomes, setIncomes] = useState<IncomeRow[]>([]);
  const [filter, setFilter] = useState<"pending" | "all">("pending");
  const [dataLoading, setDataLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [openStudent, setOpenStudent] = useState<StudentRow | null>(null);
  const [studentDetail, setStudentDetail] = useState<{
    tasks: { task_key: string; done: boolean }[];
    incomes: { week_date: string; total: number; haircuts_count: number }[];
    photos: string[];
  } | null>(null);

  useEffect(() => {
    document.title = "ניהול תלמידים | אקדמיית Macho";
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/academy/login", { replace: true });
      return;
    }
    if (!isAdmin) {
      toast.error("אין לך הרשאת אדמין");
      navigate("/academy/dashboard", { replace: true });
    }
  }, [loading, user, isAdmin, navigate]);

  const loadAll = useCallback(async () => {
    setDataLoading(true);
    const [
      { data: reqs },
      { data: profiles },
      { data: stages },
      { data: tasks },
      { data: weekly },
    ] = await Promise.all([
      supabase.from("stage_requests").select("*").order("submitted_at", { ascending: false }),
      supabase.from("profiles").select("id, email, full_name, created_at, role"),
      supabase.from("student_stage").select("user_id, current_stage, updated_at"),
      supabase.from("task_progress").select("user_id, task_key, done, updated_at"),
      supabase.from("weekly_income").select("user_id, week_date, total, haircuts_count"),
    ]);

    const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
    const stageMap = new Map((stages || []).map((s) => [s.user_id, s]));

    // Requests rows
    const reqRows: RequestRow[] = (reqs || []).map((r) => ({
      id: r.id,
      user_id: r.user_id,
      stage: r.stage,
      status: r.status,
      photos_urls: r.photos_urls || [],
      submitted_at: r.submitted_at,
      admin_note: r.admin_note,
      email: profileMap.get(r.user_id)?.email || "—",
      full_name: profileMap.get(r.user_id)?.full_name || "תלמיד",
      current_stage: stageMap.get(r.user_id)?.current_stage ?? 1,
    }));
    setRequests(reqRows);

    // Students table
    const studentProfiles = (profiles || []).filter((p) => p.role !== "admin");
    const tasksByUser = new Map<string, { count: number; latest: string | null }>();
    (tasks || []).forEach((t) => {
      if (!t.user_id) return;
      const cur = tasksByUser.get(t.user_id) || { count: 0, latest: null };
      if (t.done) cur.count += 1;
      if (t.updated_at && (!cur.latest || t.updated_at > cur.latest)) cur.latest = t.updated_at;
      tasksByUser.set(t.user_id, cur);
    });

    const studentRows: StudentRow[] = studentProfiles.map((p) => ({
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      created_at: p.created_at,
      current_stage: stageMap.get(p.id)?.current_stage ?? 1,
      tasks_done: tasksByUser.get(p.id)?.count ?? 0,
      last_active: tasksByUser.get(p.id)?.latest ?? stageMap.get(p.id)?.updated_at ?? null,
    }));
    setStudents(studentRows);

    // Income aggregation – this month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const incomeByUser = new Map<string, { total: number; weeks: number }>();
    (weekly || []).forEach((w) => {
      const d = new Date(w.week_date);
      if (d < monthStart) return;
      const cur = incomeByUser.get(w.user_id) || { total: 0, weeks: 0 };
      cur.total += Number(w.total || 0);
      cur.weeks += 1;
      incomeByUser.set(w.user_id, cur);
    });

    const incomeRows: IncomeRow[] = studentProfiles.map((p) => ({
      user_id: p.id,
      email: p.email,
      full_name: p.full_name,
      month_total: incomeByUser.get(p.id)?.total ?? 0,
      weeks_count: incomeByUser.get(p.id)?.weeks ?? 0,
    }));
    incomeRows.sort((a, b) => b.month_total - a.month_total);
    setIncomes(incomeRows);

    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) void loadAll();
  }, [isAdmin, loadAll]);

  // Realtime: refresh when stage_requests change + toast on new pending
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("admin-stage-requests")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "stage_requests" },
        () => {
          toast.info("📩 בקשת מעבר חדשה התקבלה!");
          void loadAll();
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "stage_requests" },
        () => {
          void loadAll();
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [isAdmin, loadAll]);

  const approve = async (req: RequestRow) => {
    setActionId(req.id);
    const nextStage = Math.min(4, req.stage + 1);
    const { error: e1 } = await supabase
      .from("stage_requests")
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user!.id,
      })
      .eq("id", req.id);
    const { error: e2 } = await supabase.from("student_stage").upsert(
      { user_id: req.user_id, current_stage: nextStage, updated_at: new Date().toISOString() },
      { onConflict: "user_id" } as never,
    );
    setActionId(null);
    if (e1 || e2) {
      toast.error("שגיאה באישור");
      return;
    }
    toast.success(`${req.full_name} עבר לשלב ${nextStage} 🔥`);
    void loadAll();
  };

  const submitReject = async (req: RequestRow) => {
    if (!rejectReason.trim()) {
      toast.error("חובה להזין סיבה לדחייה");
      return;
    }
    setActionId(req.id);
    const { error } = await supabase
      .from("stage_requests")
      .update({
        status: "rejected",
        admin_note: rejectReason.trim(),
        reviewed_at: new Date().toISOString(),
        reviewed_by: user!.id,
      })
      .eq("id", req.id);
    setActionId(null);
    if (error) {
      toast.error("שגיאה");
      return;
    }
    toast.success("הבקשה נדחתה והתלמיד יקבל התראה");
    setRejectingId(null);
    setRejectReason("");
    void loadAll();
  };

  const openStudentDetail = async (s: StudentRow) => {
    setOpenStudent(s);
    setStudentDetail(null);
    const [{ data: tasks }, { data: weekly }, { data: reqs }] = await Promise.all([
      supabase.from("task_progress").select("task_key, done").eq("user_id", s.id),
      supabase
        .from("weekly_income")
        .select("week_date, total, haircuts_count")
        .eq("user_id", s.id)
        .order("week_date", { ascending: false }),
      supabase
        .from("stage_requests")
        .select("photos_urls")
        .eq("user_id", s.id)
        .order("submitted_at", { ascending: false }),
    ]);
    const photos = (reqs || []).flatMap((r) => r.photos_urls || []);
    setStudentDetail({
      tasks: (tasks || []).map((t) => ({ task_key: t.task_key, done: !!t.done })),
      incomes: weekly || [],
      photos,
    });
  };

  const filtered = requests.filter((r) => (filter === "pending" ? r.status === "pending" : true));
  const pendingCount = useMemo(
    () => requests.filter((r) => r.status === "pending").length,
    [requests],
  );

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAGE_BG }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: GOLD }} />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen p-3 md:p-6" style={{ background: PAGE_BG }}>
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <header
          className="flex items-center justify-between rounded-2xl p-4 border-2"
          style={{ background: "rgba(10,10,10,0.85)", borderColor: GOLD }}
        >
          <div className="flex items-center gap-3">
            <img src={logo} alt="Macho" className="h-12 w-auto mix-blend-screen" />
            <div>
              <h1 className="text-lg md:text-2xl font-extrabold" style={{ color: GOLD }}>
                ניהול תלמידים
              </h1>
              <p className="text-xs" style={{ color: "#888" }}>
                {pendingCount > 0 ? `${pendingCount} בקשות ממתינות` : "אין בקשות חדשות"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/academy/admin/lessons")}
              style={{ borderColor: GOLD, color: GOLD, background: "transparent" }}
            >
              🎬 שיעורים
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/academy/dashboard")}
              style={{ borderColor: GOLD, color: GOLD, background: "transparent" }}
            >
              <ArrowRight className="w-4 h-4" />
              חזרה
            </Button>
          </div>
        </header>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="w-full">
          <TabsList
            className="w-full grid grid-cols-3 h-auto p-1 gap-1"
            style={{ background: "#141414", border: `1px solid ${GOLD}33` }}
          >
            <TabsTrigger
              value="requests"
              className="data-[state=active]:bg-[#C9A84C] data-[state=active]:text-black text-[#999] font-bold py-2 relative"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">בקשות מעבר</span>
              <span className="sm:hidden">בקשות</span>
              {pendingCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-xs font-extrabold px-2 py-0.5 rounded-full min-w-[20px] text-center"
                  style={{ background: "#dc2626", color: "#fff" }}
                >
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-[#C9A84C] data-[state=active]:text-black text-[#999] font-bold py-2"
            >
              <Users className="w-4 h-4" />
              תלמידים
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="data-[state=active]:bg-[#C9A84C] data-[state=active]:text-black text-[#999] font-bold py-2"
            >
              <TrendingUp className="w-4 h-4" />
              הכנסות
            </TabsTrigger>
          </TabsList>

          {/* ====== TAB 1: REQUESTS ====== */}
          <TabsContent value="requests" className="space-y-4 mt-4">
            <div className="flex gap-2">
              {(["pending", "all"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-lg font-bold"
                  style={{
                    background: filter === f ? GOLD : "#141414",
                    color: filter === f ? "#000" : "#999",
                    border: `1px solid ${filter === f ? GOLD : "#2a2a2a"}`,
                  }}
                >
                  {f === "pending" ? `ממתינות (${pendingCount})` : `הכל (${requests.length})`}
                </button>
              ))}
            </div>

            {dataLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: GOLD }} />
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-12 rounded-2xl border-2"
                style={{ borderColor: "#2a2a2a", background: "rgba(10,10,10,0.5)" }}
              >
                <p className="text-lg font-bold" style={{ color: GOLD }}>
                  🎉 כל הבקשות טופלו!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((req) => (
                  <div
                    key={req.id}
                    className="rounded-2xl border-2 p-4 md:p-5 space-y-4"
                    style={{
                      background: "rgba(15,15,15,0.85)",
                      borderColor:
                        req.status === "pending"
                          ? GOLD
                          : req.status === "approved"
                            ? "#22c55e"
                            : "#dc2626",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-extrabold" style={{ color: "#fff" }}>
                          {req.full_name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm mt-1" style={{ color: "#888" }}>
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{req.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm" style={{ color: "#888" }}>
                          <Calendar className="w-3 h-3" />
                          {new Date(req.submitted_at).toLocaleString("he-IL")}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-end shrink-0">
                        <span
                          className="px-3 py-1 rounded-lg text-sm font-extrabold"
                          style={{ background: GOLD, color: "#000" }}
                        >
                          בקשה לשלב {req.stage + 1}
                        </span>
                        <span className="text-xs" style={{ color: "#666" }}>
                          שלב נוכחי: {req.current_stage}
                        </span>
                      </div>
                    </div>

                    {req.photos_urls.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {req.photos_urls.map((url) => (
                          <button
                            key={url}
                            type="button"
                            onClick={() => setLightbox(url)}
                            className="aspect-square rounded-lg overflow-hidden"
                            style={{ border: "1px solid #2a2a2a" }}
                          >
                            <img src={url} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm" style={{ color: "#666" }}>
                        <ImageIcon className="w-4 h-4" />
                        אין תמונות
                      </div>
                    )}

                    {req.admin_note && req.status === "rejected" && (
                      <div
                        className="rounded-lg p-3 text-sm"
                        style={{ background: "rgba(220,38,38,0.1)", color: "#fca5a5" }}
                      >
                        <strong>סיבת דחייה:</strong> {req.admin_note}
                      </div>
                    )}

                    {req.status === "pending" ? (
                      rejectingId === req.id ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="סיבת הדחייה (יישלח לתלמיד)..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="bg-black border-[#dc2626] text-white"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => submitReject(req)}
                              disabled={actionId === req.id}
                              className="flex-1 font-extrabold"
                              style={{ background: "#dc2626", color: "#fff" }}
                            >
                              {actionId === req.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                              שלח דחייה
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setRejectingId(null);
                                setRejectReason("");
                              }}
                              style={{ borderColor: "#666", color: "#999", background: "transparent" }}
                            >
                              ביטול
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => approve(req)}
                            disabled={actionId === req.id}
                            className="flex-1 font-extrabold"
                            style={{ background: "#22c55e", color: "#000" }}
                          >
                            {actionId === req.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                            אשר מעבר
                          </Button>
                          <Button
                            onClick={() => {
                              setRejectingId(req.id);
                              setRejectReason("");
                            }}
                            variant="outline"
                            style={{ borderColor: "#dc2626", color: "#dc2626", background: "transparent" }}
                          >
                            <X className="w-4 h-4" />
                            דחה
                          </Button>
                        </div>
                      )
                    ) : (
                      <div
                        className="rounded-lg p-2 text-center text-sm font-bold"
                        style={{
                          background:
                            req.status === "approved"
                              ? "rgba(34,197,94,0.1)"
                              : "rgba(220,38,38,0.1)",
                          color: req.status === "approved" ? "#22c55e" : "#dc2626",
                        }}
                      >
                        {req.status === "approved" ? "✓ אושר" : "✗ נדחה"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ====== TAB 2: STUDENTS ====== */}
          <TabsContent value="students" className="mt-4">
            {dataLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: GOLD }} />
              </div>
            ) : students.length === 0 ? (
              <div
                className="text-center py-12 rounded-2xl border-2"
                style={{ borderColor: "#2a2a2a", background: "rgba(10,10,10,0.5)" }}
              >
                <p className="text-lg font-bold" style={{ color: GOLD }}>
                  אין תלמידים רשומים עדיין
                </p>
              </div>
            ) : (
              <div
                className="rounded-2xl border-2 overflow-hidden"
                style={{ borderColor: `${GOLD}55`, background: "rgba(15,15,15,0.85)" }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead style={{ background: "#1a1a1a" }}>
                      <tr style={{ color: GOLD }}>
                        <th className="text-right p-3 font-extrabold">שם</th>
                        <th className="text-right p-3 font-extrabold hidden md:table-cell">אימייל</th>
                        <th className="text-center p-3 font-extrabold">שלב</th>
                        <th className="text-center p-3 font-extrabold hidden sm:table-cell">משימות</th>
                        <th className="text-right p-3 font-extrabold hidden lg:table-cell">פעיל</th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <tr
                          key={s.id}
                          className="border-t border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors"
                        >
                          <td className="p-3 font-bold text-white">{s.full_name}</td>
                          <td className="p-3 text-[#888] hidden md:table-cell truncate max-w-[200px]">
                            {s.email}
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className="inline-block px-2 py-1 rounded font-extrabold text-xs"
                              style={{ background: GOLD, color: "#000" }}
                            >
                              {s.current_stage}/4
                            </span>
                          </td>
                          <td className="p-3 text-center text-[#ccc] hidden sm:table-cell">
                            {s.tasks_done}
                          </td>
                          <td className="p-3 text-[#888] text-xs hidden lg:table-cell">
                            {s.last_active
                              ? new Date(s.last_active).toLocaleDateString("he-IL")
                              : "—"}
                          </td>
                          <td className="p-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openStudentDetail(s)}
                              style={{ borderColor: GOLD, color: GOLD, background: "transparent" }}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>

          {/* ====== TAB 3: INCOME ====== */}
          <TabsContent value="income" className="mt-4 space-y-3">
            <p className="text-sm" style={{ color: "#888" }}>
              סיכום הכנסות החודש הנוכחי. יעד: 10,000 ש״ח לחודש לתלמיד.
            </p>
            {dataLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: GOLD }} />
              </div>
            ) : incomes.every((i) => i.month_total === 0) ? (
              <div
                className="text-center py-12 rounded-2xl border-2"
                style={{ borderColor: "#2a2a2a", background: "rgba(10,10,10,0.5)" }}
              >
                <p className="text-lg font-bold" style={{ color: GOLD }}>
                  עוד אין דיווחי הכנסה החודש
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {incomes.map((row) => {
                  const pct = Math.min(100, (row.month_total / 10000) * 100);
                  return (
                    <div
                      key={row.user_id}
                      className="rounded-xl border-2 p-3 space-y-2"
                      style={{ borderColor: `${GOLD}44`, background: "rgba(15,15,15,0.85)" }}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <p className="font-extrabold text-white truncate">{row.full_name}</p>
                          <p className="text-xs text-[#888] truncate">{row.email}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-extrabold" style={{ color: GOLD }}>
                            ₪{row.month_total.toLocaleString("he-IL")}
                          </p>
                          <p className="text-xs text-[#666]">{row.weeks_count} שבועות</p>
                        </div>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1a1a1a" }}>
                        <div
                          className="h-full transition-all"
                          style={{
                            width: `${pct}%`,
                            background: pct >= 100 ? "#22c55e" : GOLD,
                          }}
                        />
                      </div>
                      <p className="text-xs text-left" style={{ color: pct >= 100 ? "#22c55e" : "#666" }}>
                        {pct.toFixed(0)}% מהיעד {pct >= 100 ? "🏆" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Student detail modal */}
      <Dialog open={!!openStudent} onOpenChange={(o) => !o && setOpenStudent(null)}>
        <DialogContent
          dir="rtl"
          className="max-w-2xl max-h-[90vh] overflow-y-auto border-2"
          style={{ background: "#0a0a0a", borderColor: GOLD }}
        >
          <DialogHeader>
            <DialogTitle className="text-right text-2xl font-extrabold" style={{ color: GOLD }}>
              {openStudent?.full_name}
            </DialogTitle>
            <p className="text-sm text-[#888] text-right">{openStudent?.email}</p>
          </DialogHeader>

          {!studentDetail ? (
            <div className="py-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: GOLD }} />
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="rounded-lg p-3 grid grid-cols-3 gap-2 text-center"
                style={{ background: "#141414" }}
              >
                <div>
                  <p className="text-xs text-[#888]">שלב נוכחי</p>
                  <p className="font-extrabold text-lg" style={{ color: GOLD }}>
                    {openStudent?.current_stage}/4
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">משימות</p>
                  <p className="font-extrabold text-lg text-white">
                    {studentDetail.tasks.filter((t) => t.done).length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">תמונות</p>
                  <p className="font-extrabold text-lg text-white">
                    {studentDetail.photos.length}
                  </p>
                </div>
              </div>

              {/* Tasks by stage */}
              <div className="space-y-3">
                <h4 className="font-extrabold" style={{ color: GOLD }}>משימות שהושלמו</h4>
                {STAGES.map((stage) => {
                  const completed = stage.tasks.filter((t) =>
                    studentDetail.tasks.find((sd) => sd.task_key === t.key && sd.done),
                  );
                  if (completed.length === 0) return null;
                  return (
                    <div
                      key={stage.number}
                      className="rounded-lg p-3"
                      style={{ background: "#141414", border: `1px solid ${GOLD}33` }}
                    >
                      <p className="text-sm font-bold mb-2" style={{ color: GOLD }}>
                        {stage.title}
                      </p>
                      <ul className="space-y-1 text-sm text-white">
                        {completed.map((t) => (
                          <li key={t.key} className="flex items-center gap-2">
                            <Check className="w-3 h-3 text-green-500" />
                            {t.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Weekly income */}
              {studentDetail.incomes.length > 0 && (
                <div>
                  <h4 className="font-extrabold mb-2" style={{ color: GOLD }}>היסטוריית הכנסות</h4>
                  <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${GOLD}33` }}>
                    <table className="w-full text-sm">
                      <thead style={{ background: "#1a1a1a", color: GOLD }}>
                        <tr>
                          <th className="p-2 text-right">שבוע</th>
                          <th className="p-2 text-center">תספורות</th>
                          <th className="p-2 text-left">סה״כ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentDetail.incomes.map((w) => (
                          <tr key={w.week_date} className="border-t border-[#2a2a2a]">
                            <td className="p-2 text-white">
                              {new Date(w.week_date).toLocaleDateString("he-IL")}
                            </td>
                            <td className="p-2 text-center text-[#ccc]">{w.haircuts_count}</td>
                            <td className="p-2 text-left font-bold" style={{ color: GOLD }}>
                              ₪{Number(w.total).toLocaleString("he-IL")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Photos */}
              {studentDetail.photos.length > 0 && (
                <div>
                  <h4 className="font-extrabold mb-2" style={{ color: GOLD }}>תמונות שהוגשו</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {studentDetail.photos.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setLightbox(url)}
                        className="aspect-square rounded overflow-hidden"
                        style={{ border: "1px solid #2a2a2a" }}
                      >
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-lg" />
          <button
            type="button"
            className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: GOLD, color: "#000" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AcademyAdminPage;
