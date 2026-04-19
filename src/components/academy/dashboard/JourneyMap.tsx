import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Check } from "lucide-react";
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
  onStageClick: (stage: number) => void;
}

const NODE_BIG = 88; // stage circle px
const NODE_SMALL = 56; // task circle px

const JourneyMap = ({ userId, currentStage, approvedStages, onStageClick }: JourneyMapProps) => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<{ d: string; color: string }[]>([]);
  const prevApproved = useRef<number[]>(approvedStages);

  // Load progress for all task nodes
  useEffect(() => {
    const load = async () => {
      const keys = JOURNEY_ROWS
        .filter((r) => r.node.type === "task")
        .map((r) => {
          const t = r.node as { key: string };
          // Find which stage this task belongs to by scanning rows above (closer to top)
          // Task nodes between stage N (above) and stage N-1 (below) belong to stage N
          // We approximate using academyStages mapping.
          return resolveStageForKey(t.key) + ":" + t.key;
        });
      const fullKeys = keys.map((k) => `stage-${k}`);
      const { data } = await supabase
        .from("task_progress")
        .select("task_key, done")
        .eq("user_id", userId)
        .in("task_key", fullKeys);
      const map: Record<string, boolean> = {};
      (data || []).forEach((r) => {
        map[r.task_key] = !!r.done;
      });
      setProgress(map);
      setLoading(false);
    };
    void load();
  }, [userId]);

  // Compute SVG paths between consecutive nodes (curves)
  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const newPaths: { d: string; color: string }[] = [];

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
        // Quadratic curve - control point pulled to opposite side
        const cx = (x1 + x2) / 2 + (x2 > x1 ? -40 : 40);
        const cy = (y1 + y2) / 2;

        // Color: belongs to nearest stage downstream (the stage node below this segment)
        // Walk forward from i+1 to find the next stage
        let stageColor = STAGE_COLORS[1].color;
        for (let k = i + 1; k < JOURNEY_ROWS.length; k++) {
          const n = JOURNEY_ROWS[k].node;
          if (n.type === "stage") {
            stageColor = STAGE_COLORS[n.stage].color;
            break;
          }
        }
        newPaths.push({ d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, color: stageColor });
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
  }, [loading]);

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
          "radial-gradient(ellipse at 50% 30%, #0f1f15 0%, #07120c 40%, #050505 100%)",
        border: "2px solid #1a2a1a",
      }}
    >
      <StarsBackground />

      {/* Subtle dark green texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(40,80,50,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(40,80,50,0.12) 0%, transparent 40%)",
        }}
      />

      {/* Dashed winding path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={4}
            strokeDasharray="10 8"
            strokeLinecap="round"
            opacity={0.55}
          />
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
              {/* Decor */}
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

              {/* Node */}
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
                  ? renderStageNode(node, isStageUnlocked(node.stage), isStageCompleted(node.stage), onStageClick)
                  : renderTaskNode(node, progress, currentStage)}
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
        @keyframes journey-unlock {
          0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
          60% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

function renderStageNode(
  node: { stage: number; emoji: string; title: string; color: string; glow: string },
  unlocked: boolean,
  completed: boolean,
  onClick: (stage: number) => void,
) {
  const baseColor = unlocked ? node.color : "#2a2a2a";
  const ringGlow = unlocked ? node.glow : "transparent";
  return (
    <button
      type="button"
      onClick={() => unlocked && onClick(node.stage)}
      disabled={!unlocked}
      className="flex flex-col items-center gap-2"
      style={{ cursor: unlocked ? "pointer" : "not-allowed" }}
    >
      <div
        className="relative rounded-full flex items-center justify-center font-extrabold transition-transform hover:scale-110"
        style={{
          width: NODE_BIG,
          height: NODE_BIG,
          background: unlocked
            ? `radial-gradient(circle at 30% 30%, ${baseColor}, ${darken(baseColor)})`
            : "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
          border: `4px solid ${unlocked ? baseColor : "#333"}`,
          color: unlocked ? "#000" : "#555",
          fontSize: "2.4rem",
          // @ts-expect-error custom var
          "--glow": ringGlow,
          animation: unlocked && !completed ? "journey-pulse 2.4s ease-in-out infinite" : undefined,
          filter: unlocked ? "none" : "grayscale(0.8)",
        }}
      >
        {!unlocked ? (
          <Lock className="w-9 h-9" strokeWidth={2.5} style={{ color: "#666" }} />
        ) : completed ? (
          <div className="relative">
            <span style={{ opacity: 0.85 }}>{node.emoji}</span>
            <div
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "#22c55e", border: "2px solid #000" }}
            >
              <Check className="w-4 h-4" style={{ color: "#fff" }} strokeWidth={3} />
            </div>
          </div>
        ) : (
          <span>{node.emoji}</span>
        )}
      </div>
      <div
        className="px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap"
        style={{
          background: "rgba(0,0,0,0.7)",
          border: `1.5px solid ${unlocked ? node.color : "#333"}`,
          color: unlocked ? node.color : "#555",
          backdropFilter: "blur(4px)",
        }}
      >
        שלב {node.stage} — {node.title}
      </div>
    </button>
  );
}

function renderTaskNode(
  node: { key: string; emoji: string; label: string },
  progress: Record<string, boolean>,
  currentStage: number,
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
              : `linear-gradient(135deg, ${colors.color}33, #0a0a0a)`
            : "#0d0d0d",
          border: `3px solid ${
            stageUnlocked ? (done ? "#22c55e" : colors.color) : "#222"
          }`,
          fontSize: "1.4rem",
          boxShadow: done ? "0 0 20px rgba(34,197,94,0.4)" : "none",
          filter: stageUnlocked ? "none" : "grayscale(1)",
        }}
      >
        {stageUnlocked ? (
          done ? (
            <Check className="w-6 h-6" style={{ color: "#fff" }} strokeWidth={3} />
          ) : (
            <span>{node.emoji}</span>
          )
        ) : (
          <Lock className="w-5 h-5" style={{ color: "#444" }} />
        )}

        {/* Order number badge */}
        {taskNumber && (
          <div
            className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center text-[11px] font-extrabold"
            style={{
              background: stageUnlocked ? "#000" : "#0d0d0d",
              color: stageUnlocked ? colors.color : "#444",
              border: `2px solid ${stageUnlocked ? colors.color : "#222"}`,
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
          color: stageUnlocked ? "#fff" : "#444",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        {node.label}
      </div>
    </div>
  );
}

function darken(hex: string) {
  // simple darken by 25%
  const c = hex.replace("#", "");
  const r = Math.max(0, parseInt(c.slice(0, 2), 16) - 50);
  const g = Math.max(0, parseInt(c.slice(2, 4), 16) - 50);
  const b = Math.max(0, parseInt(c.slice(4, 6), 16) - 50);
  return `rgb(${r}, ${g}, ${b})`;
}

// Map a task key back to its stage number (matches academyStages.ts)
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
