import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Check, Send } from "lucide-react";
import { JOURNEY_ROWS, STAGE_COLORS } from "@/lib/academyJourney";
import { STAGES } from "@/lib/academyStages";
import StarsBackground from "./StarsBackground";

// Map task_key -> its 1-based order within its stage (per academyStages.ts)
const TASK_NUMBER: Record<string, number> = (() => {
  const m: Record<string, number> = {};
  STAGES.forEach((s) => s.tasks.forEach((t, i) => (m[t.key] = i + 1)));
  return m;
})();

interface JourneyMapProps {
  userId: string;
  currentStage: number;
  approvedStages: number[];
  pendingStages: number[];
  onStageClick: (stage: number) => void;
  onSubmitStage?: (stage: number) => void;
}

const NODE_BIG = 92;
const NODE_SMALL = 60;

const JourneyMap = ({
  userId,
  currentStage,
  approvedStages,
  pendingStages,
  onStageClick,
  onSubmitStage,
}: JourneyMapProps) => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [recentlyDone, setRecentlyDone] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<{ d: string; color: string; lit: boolean }[]>([]);
  const prevApproved = useRef<number[]>(approvedStages);
  const prevProgress = useRef<Record<string, boolean>>({});

  // Load progress + subscribe to realtime updates
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("task_progress")
        .select("task_key, done")
        .eq("user_id", userId);
      const map: Record<string, boolean> = {};
      (data || []).forEach((r) => {
        map[r.task_key] = !!r.done;
      });
      setProgress(map);
      prevProgress.current = map;
      setLoading(false);
    };
    void load();

    const channel = supabase
      .channel(`task_progress_${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "task_progress", filter: `user_id=eq.${userId}` },
        (payload) => {
          const row = (payload.new || payload.old) as { task_key: string; done: boolean };
          setProgress((p) => ({ ...p, [row.task_key]: !!(payload.new as { done: boolean })?.done }));
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId]);

  // Detect newly completed tasks → trigger pop animation + check stage completion
  useEffect(() => {
    const prev = prevProgress.current;
    Object.keys(progress).forEach((key) => {
      if (progress[key] && !prev[key]) {
        setRecentlyDone(key);
        setTimeout(() => setRecentlyDone((r) => (r === key ? null : r)), 600);
      }
    });
    prevProgress.current = progress;
  }, [progress]);

  // Compute SVG paths between consecutive nodes — and which segments are "lit"
  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const newPaths: { d: string; color: string; lit: boolean }[] = [];

      for (let i = 0; i < JOURNEY_ROWS.length - 1; i++) {
        const a = nodeRefs.current[`row-${i}`];
        const b = nodeRefs.current[`row-${i + 1}`];
        if (!a || !b) continue;
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        const x1 = ar.left + ar.width / 2 - cRect.left;
        const y1 = ar.top + ar.height / 2 - cRect.top;
        const x2 = br.left + br.width / 2 - cRect.left;
        const y2 = br.top + br.height / 2 - cRect.top;
        const cx = (x1 + x2) / 2 + (x2 > x1 ? -40 : 40);
        const cy = (y1 + y2) / 2;

        let stageColor = STAGE_COLORS[1].color;
        for (let k = i + 1; k < JOURNEY_ROWS.length; k++) {
          const n = JOURNEY_ROWS[k].node;
          if (n.type === "stage") {
            stageColor = STAGE_COLORS[n.stage].color;
            break;
          }
        }

        // A segment is "lit" if both endpoints are completed (for tasks) or stage approved
        const lit = isNodeCompleted(JOURNEY_ROWS[i].node, progress, approvedStages) &&
          isNodeCompleted(JOURNEY_ROWS[i + 1].node, progress, approvedStages);

        newPaths.push({ d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, color: stageColor, lit });
      }
      setPaths(newPaths);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [loading, progress, approvedStages]);

  // Confetti when a new stage gets approved
  useEffect(() => {
    const newly = approvedStages.filter((s) => !prevApproved.current.includes(s));
    if (newly.length) {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#C9A84C", "#9B59B6", "#E74C3C", "#ffffff"],
      });
    }
    prevApproved.current = approvedStages;
  }, [approvedStages]);

  // Stage task progress info
  const stageTaskInfo = useMemo(() => {
    const info: Record<number, { done: number; total: number; allDone: boolean }> = {};
    STAGES.forEach((s) => {
      const total = s.tasks.length;
      const done = s.tasks.filter((t) => progress[`stage-${s.number}:${t.key}`]).length;
      info[s.number] = { done, total, allDone: total > 0 && done === total };
    });
    return info;
  }, [progress]);

  // Confetti when last task of current stage gets completed
  const prevAllDone = useRef<Record<number, boolean>>({});
  useEffect(() => {
    Object.keys(stageTaskInfo).forEach((k) => {
      const stage = Number(k);
      const now = stageTaskInfo[stage].allDone;
      const before = prevAllDone.current[stage];
      if (now && !before && stage <= currentStage && !approvedStages.includes(stage)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C9A84C", "#22c55e", "#f0d070"],
        });
      }
      prevAllDone.current[stage] = now;
    });
  }, [stageTaskInfo, currentStage, approvedStages]);

  // Find the next incomplete task (in player progression order)
  const nextTaskKey = useMemo(() => {
    for (let s = 1; s <= currentStage; s++) {
      const stageDef = STAGES.find((st) => st.number === s);
      if (!stageDef) continue;
      for (const t of stageDef.tasks) {
        if (!progress[`stage-${s}:${t.key}`]) return t.key;
      }
    }
    return null;
  }, [progress, currentStage]);

  const totalHeight = useMemo(
    () => JOURNEY_ROWS.reduce((s, r) => s + r.height, 0) + 80,
    [],
  );

  const isStageUnlocked = (stage: number) => stage <= currentStage;
  const isStageCompleted = (stage: number) =>
    approvedStages.includes(stage) && stage < currentStage;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        height: totalHeight,
        background:
          "radial-gradient(ellipse at 50% 30%, #1f2236 0%, #161827 45%, #0e1019 100%)",
        border: "2px solid #2a2d40",
      }}
    >
      <StarsBackground />

      {/* Warm light spots behind active stage */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 78%, rgba(201,168,76,0.12) 0%, transparent 35%), radial-gradient(circle at 20% 30%, rgba(155,89,182,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(231,76,60,0.06) 0%, transparent 40%)",
        }}
      />

      {/* Dashed winding path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {paths.map((p, i) => (
          <g key={i}>
            <path
              d={p.d}
              fill="none"
              stroke={p.lit ? "#22c55e" : p.color}
              strokeWidth={p.lit ? 5 : 4}
              strokeDasharray={p.lit ? "12 4" : "10 8"}
              strokeLinecap="round"
              opacity={p.lit ? 0.95 : 0.55}
              style={p.lit ? { filter: "drop-shadow(0 0 6px rgba(34,197,94,0.7))" } : undefined}
            />
          </g>
        ))}
      </svg>

      {/* Rows of nodes */}
      <div className="relative" style={{ zIndex: 2 }}>
        {JOURNEY_ROWS.map((row, idx) => {
          const node = row.node;
          return (
            <div
              key={idx}
              className="relative w-full"
              style={{ height: row.height }}
            >
              {row.decor?.map((d, di) => (
                <div
                  key={di}
                  className="absolute select-none pointer-events-none"
                  style={{
                    left: `${d.x}%`,
                    top: `calc(50% + ${d.yOffset}px)`,
                    transform: "translate(-50%, -50%)",
                    fontSize: `${d.size}rem`,
                    animation: `journey-float 3.5s ease-in-out ${d.delay}s infinite`,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
                    opacity: 0.85,
                  }}
                >
                  {d.emoji}
                </div>
              ))}

              <div
                ref={(el) => (nodeRefs.current[`row-${idx}`] = el)}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {node.type === "stage"
                  ? renderStageNode(
                      node,
                      isStageUnlocked(node.stage),
                      isStageCompleted(node.stage),
                      stageTaskInfo[node.stage] || { done: 0, total: 0, allDone: false },
                      pendingStages.includes(node.stage),
                      approvedStages.includes(node.stage),
                      onStageClick,
                      onSubmitStage,
                    )
                  : renderTaskNode(
                      node,
                      progress,
                      currentStage,
                      recentlyDone === node.key,
                      nextTaskKey === node.key,
                    )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes journey-float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
        @keyframes journey-pulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--glow), 0 0 30px var(--glow); }
          50% { box-shadow: 0 0 0 14px transparent, 0 0 50px var(--glow); }
        }
        @keyframes task-pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes next-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0), 0 0 14px rgba(201,168,76,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(201,168,76,0.15), 0 0 28px rgba(201,168,76,0.85); }
        }
        @keyframes ready-pulse {
          0%, 100% { box-shadow: 0 0 18px rgba(34,197,94,0.6); transform: scale(1); }
          50% { box-shadow: 0 0 38px rgba(34,197,94,0.9); transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

function isNodeCompleted(
  node: { type: "stage"; stage: number } | { type: "task"; key: string },
  progress: Record<string, boolean>,
  approvedStages: number[],
) {
  if (node.type === "stage") return approvedStages.includes(node.stage);
  const stage = resolveStageForKey(node.key);
  return !!progress[`stage-${stage}:${node.key}`];
}

function renderStageNode(
  node: { stage: number; emoji: string; title: string; color: string; glow: string },
  unlocked: boolean,
  completed: boolean,
  taskInfo: { done: number; total: number; allDone: boolean },
  pending: boolean,
  approved: boolean,
  onClick: (stage: number) => void,
  onSubmit?: (stage: number) => void,
) {
  const baseColor = unlocked ? node.color : "#3a3a4a";
  const ringGlow = unlocked ? node.glow : "transparent";
  const pct = taskInfo.total > 0 ? (taskInfo.done / taskInfo.total) * 100 : 0;
  const showReadyBanner = unlocked && !approved && taskInfo.allDone;

  // Progress ring SVG
  const ringSize = NODE_BIG + 16;
  const ringRadius = (ringSize - 8) / 2;
  const ringCirc = 2 * Math.PI * ringRadius;
  const ringOffset = ringCirc * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => unlocked && onClick(node.stage)}
        disabled={!unlocked}
        className="flex flex-col items-center gap-2"
        style={{ cursor: unlocked ? "pointer" : "not-allowed" }}
      >
        <div className="relative" style={{ width: ringSize, height: ringSize }}>
          {/* Progress ring */}
          {unlocked && taskInfo.total > 0 && !completed && (
            <svg
              className="absolute inset-0 -rotate-90"
              width={ringSize}
              height={ringSize}
              style={{ pointerEvents: "none" }}
            >
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={4}
              />
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                fill="none"
                stroke={taskInfo.allDone ? "#22c55e" : node.color}
                strokeWidth={4}
                strokeDasharray={ringCirc}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease",
                  filter: `drop-shadow(0 0 6px ${taskInfo.allDone ? "rgba(34,197,94,0.7)" : node.color + "99"})`,
                }}
              />
            </svg>
          )}

          {/* Inner stage circle */}
          <div
            className="absolute rounded-full flex items-center justify-center font-extrabold transition-transform hover:scale-110"
            style={{
              width: NODE_BIG,
              height: NODE_BIG,
              top: 8,
              left: 8,
              background: unlocked
                ? `radial-gradient(circle at 30% 30%, ${baseColor}, ${darken(baseColor)})`
                : "linear-gradient(135deg, #2a2a3a, #1a1a25)",
              border: `4px solid ${unlocked ? baseColor : "#3a3a4a"}`,
              color: unlocked ? "#000" : "#7a7a85",
              fontSize: "2.4rem",
              // @ts-expect-error custom var
              "--glow": ringGlow,
              animation:
                unlocked && !completed && !taskInfo.allDone
                  ? "journey-pulse 2.4s ease-in-out infinite"
                  : taskInfo.allDone && !approved
                    ? "ready-pulse 1.5s ease-in-out infinite"
                    : undefined,
              filter: unlocked ? "none" : "grayscale(0.7)",
            }}
          >
            {!unlocked ? (
              <Lock className="w-9 h-9" strokeWidth={2.5} style={{ color: "#7a7a85" }} />
            ) : completed || approved ? (
              <Check className="w-12 h-12" style={{ color: "#fff" }} strokeWidth={3} />
            ) : taskInfo.allDone ? (
              <Check className="w-12 h-12" style={{ color: "#fff" }} strokeWidth={3} />
            ) : (
              <span>{node.emoji}</span>
            )}
          </div>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap"
          style={{
            background: "rgba(20,22,36,0.85)",
            border: `1.5px solid ${unlocked ? node.color : "#3a3a4a"}`,
            color: unlocked ? node.color : "#7a7a85",
            backdropFilter: "blur(4px)",
          }}
        >
          שלב {node.stage} — {node.title}
          {unlocked && taskInfo.total > 0 && !approved && (
            <span style={{ marginInlineStart: 6, opacity: 0.75 }}>
              {taskInfo.done}/{taskInfo.total}
            </span>
          )}
        </div>
      </button>

      {/* Ready-to-submit banner */}
      {showReadyBanner && !pending && (
        <div
          className="rounded-xl px-3 py-2.5 text-center max-w-[260px] animate-fade-in"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.22), rgba(201,168,76,0.08))",
            border: "2px solid #C9A84C",
            color: "#fff",
            boxShadow: "0 0 24px rgba(201,168,76,0.45)",
          }}
        >
          <p className="text-xs font-extrabold mb-2" style={{ color: "#C9A84C" }}>
            🔥 כל הכבוד! השלמת את שלב {node.stage}
          </p>
          {onSubmit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSubmit(node.stage);
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #f0d070)",
                color: "#000",
                animation: "ready-pulse 1.5s ease-in-out infinite",
              }}
            >
              <Send className="w-3.5 h-3.5" />
              שלח בקשת מעבר ליהלי
            </button>
          )}
        </div>
      )}
      {showReadyBanner && pending && (
        <div
          className="rounded-xl px-3 py-2 text-center text-xs font-extrabold"
          style={{
            background: "rgba(201,168,76,0.08)",
            border: "1.5px dashed #C9A84C",
            color: "#C9A84C",
          }}
        >
          ⏳ בקשתך נשלחה — ממתינה לאישור
        </div>
      )}
    </div>
  );
}

function renderTaskNode(
  node: { key: string; emoji: string; label: string },
  progress: Record<string, boolean>,
  currentStage: number,
  justCompleted: boolean,
  isNext: boolean,
) {
  const stage = resolveStageForKey(node.key);
  const fullKey = `stage-${stage}:${node.key}`;
  const done = !!progress[fullKey];
  const stageUnlocked = stage <= currentStage;
  const colors = STAGE_COLORS[stage] || STAGE_COLORS[1];

  const taskNumber = TASK_NUMBER[node.key];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="rounded-full flex items-center justify-center relative"
        style={{
          width: NODE_SMALL,
          height: NODE_SMALL,
          background: stageUnlocked
            ? done
              ? "linear-gradient(135deg, #22c55e, #16a34a)"
              : `linear-gradient(135deg, ${colors.color}33, #1e1e1e)`
            : "#1a1a1a",
          border: `3px solid ${
            stageUnlocked ? (done ? "#22c55e" : colors.color) : "#2a2a35"
          }`,
          fontSize: "1.4rem",
          boxShadow: done
            ? "0 0 22px rgba(34,197,94,0.5)"
            : stageUnlocked
              ? `0 0 12px ${colors.color}55`
              : "none",
          filter: stageUnlocked ? "none" : "grayscale(1)",
          animation: justCompleted
            ? "task-pop 0.6s ease-out"
            : isNext && !done
              ? "next-glow 1.8s ease-in-out infinite"
              : undefined,
          transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {stageUnlocked ? (
          done ? (
            <Check className="w-6 h-6" style={{ color: "#fff" }} strokeWidth={3} />
          ) : (
            <span>{node.emoji}</span>
          )
        ) : (
          <Lock className="w-5 h-5" style={{ color: "#555" }} />
        )}

        {taskNumber && (
          <div
            className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center text-[11px] font-extrabold"
            style={{
              background: stageUnlocked ? "#0a0c14" : "#1a1a25",
              color: stageUnlocked ? colors.color : "#555",
              border: `2px solid ${stageUnlocked ? colors.color : "#2a2a35"}`,
              boxShadow: stageUnlocked ? `0 0 8px ${colors.color}66` : "none",
              lineHeight: 1,
            }}
          >
            {taskNumber}
          </div>
        )}
      </div>
      <div
        className="text-[11px] font-bold whitespace-nowrap px-2 py-0.5 rounded"
        style={{
          color: stageUnlocked ? "#e8e8e8" : "#555",
          background: "rgba(14,16,25,0.7)",
        }}
      >
        {node.label}
      </div>
    </div>
  );
}

function darken(hex: string) {
  if (!hex.startsWith("#")) return hex;
  const c = hex.replace("#", "");
  const r = Math.max(0, parseInt(c.slice(0, 2), 16) - 50);
  const g = Math.max(0, parseInt(c.slice(2, 4), 16) - 50);
  const b = Math.max(0, parseInt(c.slice(4, 6), 16) - 50);
  return `rgb(${r}, ${g}, ${b})`;
}

function resolveStageForKey(key: string): number {
  const map: Record<string, number> = {
    ambassadors_list: 1,
    broadcast: 1,
    watch_lessons: 1,
    before_after: 1,
    instagram: 2,
    follow_locals: 2,
    story_hunt: 2,
    client_xp: 2,
    deposit_fee: 2,
    google_business: 3,
    "100_reviews": 3,
    penetration_pricing: 3,
    reels_content: 3,
    upsell: 3,
    premium_pricing: 4,
    ads_campaign: 4,
    returning_clients: 4,
    time_optimization: 4,
  };
  return map[key] || 1;
}

export default JourneyMap;
