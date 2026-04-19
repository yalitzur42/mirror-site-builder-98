import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ListChecks, BookOpen } from "lucide-react";
import { STAGES } from "@/lib/academyStages";
import { STAGE_COLORS } from "@/lib/academyJourney";
import TaskList from "./TaskList";
import PhotoUploader from "./PhotoUploader";
import MilestoneBox from "./MilestoneBox";
import SubmitStageButton from "./SubmitStageButton";
import WeeklyIncomeTracker from "./WeeklyIncomeTracker";
import GuidesList from "./GuidesList";

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
  const [progress, setProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });
  const allDone = progress.total > 0 && progress.done === progress.total;
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
          background: "linear-gradient(180deg, #1c1c2e, #14141f)",
          borderTop: `3px solid ${colors.color}`,
          color: "#ffffff",
        }}
      >
        <SheetHeader
          className="p-5 border-b sticky top-0 z-10"
          style={{ borderColor: "#2a2a3a", background: "rgba(28,28,46,0.95)", backdropFilter: "blur(8px)" }}
        >
          <SheetTitle className="text-right text-xl font-extrabold" style={{ color: colors.color }}>
            {def.title}
          </SheetTitle>
          <p className="text-sm text-right" style={{ color: "#d0d0d0" }}>{def.subtitle}</p>
        </SheetHeader>

        <div className="p-5">
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList
              className="grid grid-cols-2 w-full mb-5 h-auto p-1"
              style={{ background: "#252535", border: "1px solid #3a3a4a" }}
            >
              <TabsTrigger
                value="tasks"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2 py-2 font-extrabold"
                style={{
                  color: colors.color,
                  // active styling via inline isn't reactive — rely on data-state via CSS below
                }}
              >
                <ListChecks className="w-4 h-4" />
                משימות
              </TabsTrigger>
              <TabsTrigger
                value="guides"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none flex items-center gap-2 py-2 font-extrabold"
                style={{ color: colors.color }}
              >
                <BookOpen className="w-4 h-4" />
                מדריכים
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-5 mt-0">
              <TaskList
                userId={userId}
                stagePrefix={`stage-${stage}`}
                stage={stage}
                tasks={def.tasks}
                disabled={approved}
                onProgressChange={(d, t) => {
                  setProgress({ done: d, total: t });
                  onTaskProgress(stage, d, t);
                }}
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
                    ready={allDone && photos.length > 0}
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
            </TabsContent>

            <TabsContent value="guides" className="mt-0">
              <GuidesList stage={stage} />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StageDetailSheet;
