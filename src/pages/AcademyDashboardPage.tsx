import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId, getDeviceName } from "@/lib/deviceId";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2, Trophy, Shield, Send, Loader2 as Spin } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { STAGES } from "@/lib/academyStages";
import JourneyMap from "@/components/academy/dashboard/JourneyMap";
import StageDetailSheet from "@/components/academy/dashboard/StageDetailSheet";
import PhotoUploader from "@/components/academy/dashboard/PhotoUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StageRequest {
  stage: number;
  status: "pending" | "approved" | "rejected";
}

const PAGE_BG = "radial-gradient(ellipse at top, #1a1d2e 0%, #0f1119 60%, #050612 100%)";

const AcademyDashboardPage = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [deviceError, setDeviceError] = useState("");
  const [currentStage, setCurrentStage] = useState(1);
  const [requests, setRequests] = useState<StageRequest[]>([]);
  const [taskProgress, setTaskProgress] = useState<Record<number, { done: number; total: number }>>({});
  const [dataLoading, setDataLoading] = useState(true);
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [submitOpen, setSubmitOpen] = useState<number | null>(null);
  const [submitPhotos, setSubmitPhotos] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "מסע התלמיד | אקדמיית Macho";
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/academy/login", { replace: true });
      return;
    }
    const validate = async () => {
      const { data } = await supabase.rpc("register_device", {
        p_device_id: getDeviceId(),
        p_device_name: getDeviceName(),
      });
      if (data === "limit_reached") {
        setDeviceError("הגעת למגבלת 2 מכשירים. פנה לאקדמיה.");
        await signOut();
        setTimeout(() => navigate("/academy/login", { replace: true }), 2500);
        return;
      }
      setChecking(false);
    };
    void validate();
  }, [loading, user, navigate, signOut]);

  const loadData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);

    const { data: stageRow } = await supabase
      .from("student_stage")
      .select("current_stage")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!stageRow) {
      await supabase.from("student_stage").insert({ user_id: user.id, current_stage: 1 });
      setCurrentStage(1);
    } else {
      setCurrentStage(stageRow.current_stage);
    }

    const { data: reqs } = await supabase
      .from("stage_requests")
      .select("stage, status")
      .eq("user_id", user.id)
      .order("submitted_at", { ascending: false });
    setRequests((reqs || []) as StageRequest[]);

    setDataLoading(false);
  }, [user]);

  useEffect(() => {
    if (!checking && user) void loadData();
  }, [checking, user, loadData]);

  // Realtime: refresh requests when admin approves
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel(`stage_requests_${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "stage_requests", filter: `user_id=eq.${user.id}` },
        () => void loadData(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "student_stage", filter: `user_id=eq.${user.id}` },
        () => void loadData(),
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(ch);
    };
  }, [user, loadData]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/academy/login", { replace: true });
  };

  const getStageStatus = (stageNum: number) => {
    const stageReqs = requests.filter((r) => r.stage === stageNum);
    const approved = stageReqs.some((r) => r.status === "approved");
    const pending = stageReqs.some((r) => r.status === "pending") && !approved;
    return { approved, pending };
  };

  const approvedStages = useMemo(
    () =>
      Array.from(
        new Set(requests.filter((r) => r.status === "approved").map((r) => r.stage)),
      ),
    [requests],
  );

  const pendingStages = useMemo(
    () =>
      Array.from(
        new Set(requests.filter((r) => r.status === "pending").map((r) => r.stage)),
      ),
    [requests],
  );

  const overallPct = useMemo(() => {
    const totalTasks = STAGES.reduce((s, st) => s + st.tasks.length, 0);
    const doneTasks = Object.values(taskProgress).reduce((s, v) => s + v.done, 0);
    return totalTasks ? (doneTasks / totalTasks) * 100 : 0;
  }, [taskProgress]);

  const activeStatus = activeStage ? getStageStatus(activeStage) : { approved: false, pending: false };

  // Submit-from-map flow
  const handleMapSubmit = (stage: number) => {
    setSubmitOpen(stage);
    setSubmitPhotos([]);
  };

  const doSubmit = async () => {
    if (!user || submitOpen === null) return;
    if (submitPhotos.length === 0) {
      toast.error("חובה להעלות לפחות תמונה אחת");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("stage_requests").insert({
      user_id: user.id,
      stage: submitOpen,
      photos_urls: submitPhotos,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast.error("שגיאה בשליחת הבקשה");
      return;
    }
    toast.success("הבקשה נשלחה! יהלי יאשר בקרוב 🔥");
    setSubmitOpen(null);
    setSubmitPhotos([]);
    void loadData();
  };

  if (loading || checking) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center gap-4 p-4"
        style={{ background: PAGE_BG }}
      >
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#C9A84C" }} />
        <p style={{ color: "#C9A84C" }}>{deviceError || "טוען..."}</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen p-3 md:p-6" style={{ background: PAGE_BG }}>
      <div className="max-w-2xl mx-auto space-y-5">
        <header
          className="flex items-center justify-between rounded-2xl p-4 border-2"
          style={{
            background: "rgba(28,30,46,0.85)",
            borderColor: "#C9A84C",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={logo} alt="Macho" className="h-12 w-auto mix-blend-screen" />
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-extrabold truncate" style={{ color: "#C9A84C" }}>
                המסע שלך
              </h1>
              <p className="text-xs md:text-sm truncate" style={{ color: "#a8a8b8" }}>
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button
                onClick={() => navigate("/academy/admin")}
                size="sm"
                className="font-bold"
                style={{ background: "#C9A84C", color: "#000" }}
              >
                <Shield className="w-4 h-4" />
                <span className="hidden md:inline">אדמין</span>
              </Button>
            )}
            <Button
              onClick={handleSignOut}
              size="sm"
              variant="outline"
              style={{ borderColor: "#C9A84C", color: "#C9A84C", background: "transparent" }}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <div
          className="rounded-2xl p-5 border-2"
          style={{ background: "rgba(28,30,46,0.7)", borderColor: "#3a3d52" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" style={{ color: "#C9A84C" }} />
              <span className="font-extrabold text-lg" style={{ color: "#fff" }}>
                התקדמות כוללת
              </span>
            </div>
            <span className="font-extrabold text-2xl" style={{ color: "#C9A84C" }}>
              {overallPct.toFixed(0)}%
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "#1f2236" }}>
            <div
              className="h-full transition-all"
              style={{
                width: `${overallPct}%`,
                background: "linear-gradient(90deg, #C9A84C, #f0d070, #C9A84C)",
                boxShadow: "0 0 20px rgba(201, 168, 76, 0.5)",
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm" style={{ color: "#c8c8d8" }}>
              שלב {currentStage} מתוך 4
            </p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{
                    background: s <= currentStage ? "#C9A84C" : "#3a3d52",
                    boxShadow: s === currentStage ? "0 0 10px #C9A84C" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {dataLoading ? (
          <div className="text-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: "#C9A84C" }} />
            <p className="mt-2 text-sm" style={{ color: "#a8a8b8" }}>טוען את המסע שלך...</p>
          </div>
        ) : (
          <JourneyMap
            userId={user!.id}
            currentStage={currentStage}
            approvedStages={approvedStages}
            pendingStages={pendingStages}
            onStageClick={(s) => setActiveStage(s)}
            onSubmitStage={handleMapSubmit}
          />
        )}

        <p className="text-center text-sm" style={{ color: "#a8a8b8" }}>
          לחץ על שלב פתוח כדי לסמן משימות, להעלות תמונות ולשלוח בקשת מעבר
        </p>
      </div>

      <StageDetailSheet
        open={activeStage !== null}
        onClose={() => setActiveStage(null)}
        userId={user?.id || ""}
        stage={activeStage}
        approved={activeStatus.approved}
        pending={activeStatus.pending}
        onSubmitted={loadData}
        onTaskProgress={(stage, done, total) =>
          setTaskProgress((p) => ({ ...p, [stage]: { done, total } }))
        }
      />

      {/* Quick submit dialog from map banner */}
      <Dialog open={submitOpen !== null} onOpenChange={(o) => !o && setSubmitOpen(null)}>
        <DialogContent
          dir="rtl"
          className="max-w-md"
          style={{ background: "#1c1c2e", color: "#fff", border: "2px solid #C9A84C" }}
        >
          <DialogHeader>
            <DialogTitle className="text-right text-xl font-extrabold" style={{ color: "#C9A84C" }}>
              📸 שלח בקשת מעבר — שלב {submitOpen}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "#d0d0d0" }}>
              העלה תמונות לפני / אחרי לאישור יהלי
            </p>
            {submitOpen !== null && user && (
              <PhotoUploader
                userId={user.id}
                stage={submitOpen}
                photos={submitPhotos}
                onChange={setSubmitPhotos}
              />
            )}
            <button
              type="button"
              onClick={doSubmit}
              disabled={submitting || submitPhotos.length === 0}
              className="w-full rounded-xl p-3 font-extrabold text-base flex items-center justify-center gap-2 transition-all"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #f0d070)",
                color: "#000",
                opacity: submitting || submitPhotos.length === 0 ? 0.6 : 1,
                cursor: submitting || submitPhotos.length === 0 ? "not-allowed" : "pointer",
                boxShadow: "0 8px 30px -8px rgba(201,168,76,0.6)",
              }}
            >
              {submitting ? <Spin className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              שלח ליהלי
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcademyDashboardPage;
