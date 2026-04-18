import { ReactNode } from "react";
import { Lock, CheckCircle2, Clock } from "lucide-react";

interface StageCardProps {
  stageNumber: number;
  title: string;
  subtitle: string;
  isLocked: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  pendingRequest: boolean;
  children?: ReactNode;
}

const StageCard = ({
  stageNumber,
  title,
  subtitle,
  isLocked,
  isCurrent,
  isCompleted,
  pendingRequest,
  children,
}: StageCardProps) => {
  return (
    <div
      className="rounded-2xl border-2 overflow-hidden transition-all"
      style={{
        background: isLocked
          ? "linear-gradient(180deg, #0a0a0a, #050505)"
          : "linear-gradient(180deg, #141414, #0a0a0a)",
        borderColor: isCompleted
          ? "#C9A84C"
          : isCurrent
            ? "#C9A84C"
            : isLocked
              ? "#1f1f1f"
              : "#3a3a3a",
        boxShadow: isCurrent ? "0 0 40px -10px rgba(201, 168, 76, 0.4)" : "none",
        opacity: isLocked ? 0.55 : 1,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 border-b"
        style={{
          borderColor: isLocked ? "#1f1f1f" : "#2a2a2a",
          background: isCurrent ? "rgba(201, 168, 76, 0.06)" : "transparent",
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 font-extrabold text-xl"
            style={{
              background: isCompleted || isCurrent ? "#C9A84C" : "#1a1a1a",
              color: isCompleted || isCurrent ? "#000" : "#666",
              border: `2px solid ${isCompleted || isCurrent ? "#C9A84C" : "#2a2a2a"}`,
            }}
          >
            {stageNumber}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-xl md:text-2xl font-extrabold truncate"
              style={{ color: isLocked ? "#666" : "#fff" }}
            >
              {title}
            </h3>
            <p
              className="text-sm truncate"
              style={{ color: isLocked ? "#444" : "#C9A84C" }}
            >
              {subtitle}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          {isCompleted ? (
            <CheckCircle2 className="w-7 h-7" style={{ color: "#C9A84C" }} />
          ) : pendingRequest ? (
            <Clock className="w-7 h-7" style={{ color: "#C9A84C" }} />
          ) : isLocked ? (
            <Lock className="w-7 h-7" style={{ color: "#C9A84C" }} />
          ) : null}
        </div>
      </div>

      {/* Body */}
      {!isLocked && <div className="p-5 space-y-5">{children}</div>}
      {isLocked && (
        <div className="p-5 text-center">
          <p className="text-sm" style={{ color: "#666" }}>
            🔒 שלב זה ייפתח לאחר אישור יהלי על השלב הקודם
          </p>
        </div>
      )}
    </div>
  );
};

export default StageCard;
