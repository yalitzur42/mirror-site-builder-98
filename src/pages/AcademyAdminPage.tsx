import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, ArrowRight, Mail, Calendar, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

interface RequestRow {
  id: string;
  user_id: string;
  stage: number;
  status: "pending" | "approved" | "rejected";
  photos_urls: string[];
  submitted_at: string;
  email: string;
  full_name: string;
  current_stage: number;
}

const PAGE_BG = "radial-gradient(ellipse at top, #141414 0%, #0a0a0a 60%, #000 100%)";

const AcademyAdminPage = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [filter, setFilter] = useState<"pending" | "all">("pending");
  const [dataLoading, setDataLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

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

  const loadRequests = useCallback(async () => {
    setDataLoading(true);
    const { data: reqs } = await supabase
      .from("stage_requests")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (!reqs) {
      setDataLoading(false);
      return;
    }

    const userIds = [...new Set(reqs.map((r) => r.user_id))];

    const [{ data: profiles }, { data: stages }] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name").in("id", userIds),
      supabase.from("student_stage").select("user_id, current_stage").in("user_id", userIds),
    ]);

    const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
    const stageMap = new Map((stages || []).map((s) => [s.user_id, s.current_stage]));

    const rows: RequestRow[] = reqs.map((r) => ({
      id: r.id,
      user_id: r.user_id,
      stage: r.stage,
      status: r.status,
      photos_urls: r.photos_urls || [],
      submitted_at: r.submitted_at,
      email: profileMap.get(r.user_id)?.email || "—",
      full_name: profileMap.get(r.user_id)?.full_name || "תלמיד",
      current_stage: stageMap.get(r.user_id) ?? 1,
    }));
    setRequests(rows);
    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) void loadRequests();
  }, [isAdmin, loadRequests]);

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
    const { error: e2 } = await supabase
      .from("student_stage")
      .upsert(
        { user_id: req.user_id, current_stage: nextStage, updated_at: new Date().toISOString() },
        { onConflict: "user_id" } as never,
      );
    setActionId(null);
    if (e1 || e2) {
      toast.error("שגיאה באישור");
      return;
    }
    toast.success(`${req.full_name} עבר לשלב ${nextStage} 🔥`);
    void loadRequests();
  };

  const reject = async (req: RequestRow) => {
    setActionId(req.id);
    const { error } = await supabase
      .from("stage_requests")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user!.id,
      })
      .eq("id", req.id);
    setActionId(null);
    if (error) {
      toast.error("שגיאה");
      return;
    }
    toast.success("הבקשה נדחתה");
    void loadRequests();
  };

  const filtered = requests.filter((r) => (filter === "pending" ? r.status === "pending" : true));
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAGE_BG }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#C9A84C" }} />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen p-3 md:p-6" style={{ background: PAGE_BG }}>
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <header
          className="flex items-center justify-between rounded-2xl p-4 border-2"
          style={{ background: "rgba(10,10,10,0.85)", borderColor: "#C9A84C" }}
        >
          <div className="flex items-center gap-3">
            <img src={logo} alt="Macho" className="h-12 w-auto mix-blend-screen" />
            <div>
              <h1 className="text-lg md:text-2xl font-extrabold" style={{ color: "#C9A84C" }}>
                ניהול תלמידים
              </h1>
              <p className="text-xs" style={{ color: "#888" }}>
                {pendingCount > 0
                  ? `${pendingCount} בקשות ממתינות`
                  : "אין בקשות חדשות"}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/academy/dashboard")}
            style={{ borderColor: "#C9A84C", color: "#C9A84C", background: "transparent" }}
          >
            <ArrowRight className="w-4 h-4" />
            חזרה
          </Button>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(["pending", "all"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg font-bold relative"
              style={{
                background: filter === f ? "#C9A84C" : "#141414",
                color: filter === f ? "#000" : "#999",
                border: `1px solid ${filter === f ? "#C9A84C" : "#2a2a2a"}`,
              }}
            >
              {f === "pending" ? "ממתינות" : "הכל"}
              {f === "pending" && pendingCount > 0 && filter !== "pending" && (
                <span
                  className="absolute -top-2 -right-2 text-xs font-extrabold px-2 py-0.5 rounded-full"
                  style={{ background: "#dc2626", color: "#fff" }}
                >
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        {dataLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: "#C9A84C" }} />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-12 rounded-2xl border-2"
            style={{ borderColor: "#2a2a2a", background: "rgba(10,10,10,0.5)" }}
          >
            <p className="text-lg font-bold" style={{ color: "#C9A84C" }}>
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
                      ? "#C9A84C"
                      : req.status === "approved"
                        ? "#22c55e"
                        : "#dc2626",
                }}
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-extrabold" style={{ color: "#fff" }}>
                      {req.full_name}
                    </h3>
                    <div
                      className="flex items-center gap-1 text-sm mt-1"
                      style={{ color: "#888" }}
                    >
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{req.email}</span>
                    </div>
                    <div
                      className="flex items-center gap-1 text-sm"
                      style={{ color: "#888" }}
                    >
                      <Calendar className="w-3 h-3" />
                      {new Date(req.submitted_at).toLocaleString("he-IL")}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end shrink-0">
                    <span
                      className="px-3 py-1 rounded-lg text-sm font-extrabold"
                      style={{ background: "#C9A84C", color: "#000" }}
                    >
                      בקשה לשלב {req.stage + 1}
                    </span>
                    <span className="text-xs" style={{ color: "#666" }}>
                      שלב נוכחי: {req.current_stage}
                    </span>
                  </div>
                </div>

                {/* Photos */}
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

                {/* Actions */}
                {req.status === "pending" ? (
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
                      אשר מעבר לשלב {req.stage + 1}
                    </Button>
                    <Button
                      onClick={() => reject(req)}
                      disabled={actionId === req.id}
                      variant="outline"
                      style={{ borderColor: "#dc2626", color: "#dc2626", background: "transparent" }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
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
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-lg" />
          <button
            type="button"
            className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "#C9A84C", color: "#000" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AcademyAdminPage;
