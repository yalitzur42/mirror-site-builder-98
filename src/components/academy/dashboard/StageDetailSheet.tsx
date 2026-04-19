import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { STAGES } from "@/lib/academyStages";
import { STAGE_COLORS } from "@/lib/academyJourney";
import TaskList from "./TaskList";
import PhotoUploader from "./PhotoUploader";
import MilestoneBox from "./MilestoneBox";
import SubmitStageButton from "./SubmitStageButton";
import WeeklyIncomeTracker from "./WeeklyIncomeTracker";

interface Props {
  open: boolean;
  onClose: () => void;
  userId: string;
  stage: number | null;
  approved: boolean;
  pending: boolean;
  onSubmitted: () => void;
  onTaskProgress: (stage: number, done: number, total: number) => void;
}

const StageDetailSheet = ({
  open,
  onClose,
  userId,
  stage,
  approved,
  pending,
  onSubmitted,
  onTaskProgress,
}: Props) => {
  const [photos, setPhotos] = useState<string[]>([]);
  if (!stage) return null;
  const def = STAGES.find((s) => s.number === stage);
  if (!def) return null;
  const colors = STAGE_COLORS[stage];

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        dir="rtl"
        className="max-h-[92vh] overflow-y-auto p-0"
        style={{
          background: "linear-gradient(180deg, #0a0a0a, #050505)",
          borderTop: `3px solid ${colors.color}`,
          color: "#fff",
        }}
      >
        <SheetHeader
          className="p-5 border-b sticky top-0 z-10"
          style={{ borderColor: "#1f1f1f", background: "rgba(10,10,10,0.95)", backdropFilter: "blur(8px)" }}
        >
          <SheetTitle className="text-right text-xl font-extrabold" style={{ color: colors.color }}>
            {def.title}
          </SheetTitle>
          <p className="text-sm text-right" style={{ color: "#aaa" }}>{def.subtitle}</p>
        </SheetHeader>

        <div className="p-5 space-y-5">
          <TaskList
            userId={userId}
            stagePrefix={`stage-${stage}`}
            tasks={def.tasks}
            disabled={approved}
            onProgressChange={(d, t) => onTaskProgress(stage, d, t)}
          />

          <MilestoneBox>{def.milestone}</MilestoneBox>

          {stage >= 3 && <WeeklyIncomeTracker userId={userId} />}

          {stage < 4 && (
            <>
              <div>
                <h4 className="font-bold text-base mb-2" style={{ color: colors.color }}>
                  📸 העלאת תמונות לפני / אחרי
                </h4>
                <PhotoUploader
                  userId={userId}
                  stage={stage}
                  photos={photos}
                  onChange={setPhotos}
                  disabled={approved || pending}
                />
              </div>

              <SubmitStageButton
                userId={userId}
                stage={stage}
                photos={photos}
                pendingRequest={pending}
                approved={approved}
                onSubmitted={() => {
                  setPhotos([]);
                  onSubmitted();
                  onClose();
                }}
              />
            </>
          )}

          {stage === 4 && (
            <div
              className="rounded-xl p-5 text-center"
              style={{
                background: `linear-gradient(135deg, ${colors.color}26, ${colors.color}0d)`,
                border: `2px solid ${colors.color}`,
              }}
            >
              <p className="text-lg font-extrabold" style={{ color: colors.color }}>
                👑 אתה כבר אגדה. תמשיך להפציץ!
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StageDetailSheet;
