import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId, getDeviceName } from "@/lib/deviceId";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2, Trophy, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import { STAGES } from "@/lib/academyStages";
import StageCard from "@/components/academy/dashboard/StageCard";
import TaskList from "@/components/academy/dashboard/TaskList";
import PhotoUploader from "@/components/academy/dashboard/PhotoUploader";
import MilestoneBox from "@/components/academy/dashboard/MilestoneBox";
import SubmitStageButton from "@/components/academy/dashboard/SubmitStageButton";
import WeeklyIncomeTracker from "@/components/academy/dashboard/WeeklyIncomeTracker";

interface StageRequest {
  stage: number;
  status: "pending" | "approved" | "rejected";
}

const PAGE_BG = "radial-gradient(ellipse at top, #141414 0%, #0a0a0a 60%, #000 100%)";

const AcademyDashboardPage = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [deviceError, setDeviceError] = useState("");
  const [currentStage, setCurrentStage] = useState(1);
  const [requests, setRequests] = useState<StageRequest[]>([]);
  const [photos, setPhotos] = useState<Record<number, string[]>>({});
  const [taskProgress, setTaskProgress] = useState<Record<number, { done: number; total: number }>>({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    document.title = "מסע התלמיד | אקדמיית Macho";
  }, []);

  // Auth + device validation
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

  // Load student data
  const loadData = useCallback(async () => {
    if (!user) return;
    setDataLoading(true);

    // Ensure stage row exists
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

    // Load all requests
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

  const setStagePhotos = (stage: number, p: string[]) => {
    setPhotos((prev) => ({ ...prev, [stage]: p }));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/academy/login", { replace: true });
  };

  // Per-stage status
  const getStageStatus = (stageNum: number) => {
    const stageReqs = requests.filter((r) => r.stage === stageNum);
    const approved = stageReqs.some((r) => r.status === "approved");
    const pending = stageReqs.some((r) => r.status === "pending") && !approved;
    return { approved, pending };
  };

  // Overall progress
  const overallPct = useMemo(() => {
    const totalTasks = STAGES.reduce((s, st) => s + st.tasks.length, 0);
    const doneTasks = Object.values(taskProgress).reduce((s, v) => s + v.done, 0);
    return totalTasks ? (doneTasks / totalTasks) * 100 : 0;
  }, [taskProgress]);

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
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Header */}
        <header
          className="flex items-center justify-between rounded-2xl p-4 border-2"
          style={{
            background: "rgba(10,10,10,0.85)",
            borderColor: "#C9A84C",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={logo} alt="Macho" className="h-12 w-auto mix-blend-screen" />
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-extrabold truncate" style={{ color: "#C9A84C" }}>
                מסע התלמיד
              </h1>
              <p className="text-xs md:text-sm truncate" style={{ color: "#888" }}>
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

        {/* Overall progress */}
        <div
          className="rounded-2xl p-5 border-2"
          style={{ background: "rgba(10,10,10,0.7)", borderColor: "#2a2a2a" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" style={{ color: "#C9A84C" }} />
              <span className="font-extrabold text-lg" style={{ color: "#fff" }}>
                התקדמות כוללת ל-10K בחודש
              </span>
            </div>
            <span className="font-extrabold text-2xl" style={{ color: "#C9A84C" }}>
              {overallPct.toFixed(0)}%
            </span>
          </div>
          <div className="h-4 rounded-full overflow-hidden" style={{ background: "#1a1a1a" }}>
            <div
              className="h-full transition-all"
              style={{
                width: `${overallPct}%`,
                background: "linear-gradient(90deg, #C9A84C, #f0d070, #C9A84C)",
                boxShadow: "0 0 20px rgba(201, 168, 76, 0.5)",
              }}
            />
          </div>
          <p className="text-sm mt-2" style={{ color: "#666" }}>
            שלב נוכחי: <span style={{ color: "#C9A84C", fontWeight: 700 }}>{currentStage}/4</span>
          </p>
        </div>

        {dataLoading ? (
          <div className="text-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: "#C9A84C" }} />
            <p className="mt-2 text-sm" style={{ color: "#666" }}>טוען את המסע שלך...</p>
          </div>
        ) : (
          STAGES.map((stage) => {
            const { approved, pending } = getStageStatus(stage.number);
            const isLocked = stage.number > currentStage;
            const isCurrent = stage.number === currentStage && !approved;
            const isCompleted = approved && stage.number < currentStage;
            const stagePhotos = photos[stage.number] || [];

            return (
              <StageCard
                key={stage.number}
                stageNumber={stage.number}
                title={stage.title}
                subtitle={stage.subtitle}
                isLocked={isLocked}
                isCurrent={isCurrent}
                isCompleted={isCompleted}
                pendingRequest={pending}
              >
                <TaskList
                  userId={user!.id}
                  stagePrefix={`stage-${stage.number}`}
                  tasks={stage.tasks}
                  disabled={approved}
                  onProgressChange={(done, total) =>
                    setTaskProgress((p) => ({ ...p, [stage.number]: { done, total } }))
                  }
                />

                <MilestoneBox>{stage.milestone}</MilestoneBox>

                {/* Income tracker for stage 3+ */}
                {stage.number >= 3 && stage.number === currentStage && (
                  <WeeklyIncomeTracker userId={user!.id} />
                )}

                {/* Upload + submit (not for final stage 4) */}
                {stage.number < 4 && (
                  <>
                    <div>
                      <h4 className="font-bold text-base mb-2" style={{ color: "#C9A84C" }}>
                        📸 העלאת תמונות לפני/אחרי
                      </h4>
                      <PhotoUploader
                        userId={user!.id}
                        stage={stage.number}
                        photos={stagePhotos}
                        onChange={(p) => setStagePhotos(stage.number, p)}
                        disabled={approved || pending}
                      />
                    </div>

                    <SubmitStageButton
                      userId={user!.id}
                      stage={stage.number}
                      photos={stagePhotos}
                      pendingRequest={pending}
                      approved={approved}
                      onSubmitted={() => {
                        setStagePhotos(stage.number, []);
                        void loadData();
                      }}
                    />
                  </>
                )}

                {stage.number === 4 && (
                  <div
                    className="rounded-xl p-5 text-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                      border: "2px solid #C9A84C",
                    }}
                  >
                    <p className="text-lg font-extrabold" style={{ color: "#C9A84C" }}>
                      👑 אתה כבר אגדה. תמשיך להפציץ!
                    </p>
                  </div>
                )}
              </StageCard>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AcademyDashboardPage;
