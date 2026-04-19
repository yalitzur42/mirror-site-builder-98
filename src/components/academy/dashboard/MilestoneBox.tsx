import { Target } from "lucide-react";

const MilestoneBox = ({ children }: { children: React.ReactNode }) => (
  <div
    className="rounded-xl p-4 flex items-start gap-3"
    style={{
      background: "#1e1a00",
      border: "2px solid #C9A84C",
      boxShadow: "0 0 18px rgba(201,168,76,0.18)",
    }}
  >
    <Target className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "#C9A84C" }} />
    <div className="font-bold text-base" style={{ color: "#ffffff" }}>
      {children}
    </div>
  </div>
);

export default MilestoneBox;
