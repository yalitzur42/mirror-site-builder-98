import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check, PlayCircle } from "lucide-react";
import LessonPlayerModal from "./LessonPlayerModal";

interface Task {
  key: string;
  label: string;
}

interface LessonRef {
  id: string;
  title: string;
  description: string | null;
  video_path: string | null;
  video_url: string | null;
  related_task_key: string | null;
}

interface TaskListProps {
  userId: string;
  stagePrefix: string;
  stage: number;
  tasks: Task[];
  disabled?: boolean;
  onProgressChange?: (done: number, total: number) => void;
}

const TaskList = ({ userId, stagePrefix, stage, tasks, disabled, onProgressChange }: TaskListProps) => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Record<string, LessonRef>>({});
  const [openLesson, setOpenLesson] = useState<LessonRef | null>(null);

  useEffect(() => {
    const load = async () => {
      const keys = tasks.map((t) => `${stagePrefix}:${t.key}`);
      const [progressRes, lessonsRes] = await Promise.all([
        supabase
          .from("task_progress")
          .select("task_key, done")
          .eq("user_id", userId)
          .in("task_key", keys),
        (supabase as unknown as {
          from: (t: string) => {
            select: (s: string) => {
              eq: (c: string, v: unknown) => {
                eq: (c: string, v: unknown) => {
                  not: (c: string, op: string, v: unknown) => Promise<{ data: LessonRef[] | null }>;
                };
              };
            };
          };
        })
          .from("guides")
          .select("id, title, description, video_path, video_url, related_task_key")
          .eq("stage_number", stage)
          .eq("is_published", true)
          .not("related_task_key", "is", null),
      ]);
      const map: Record<string, boolean> = {};
      (progressRes.data || []).forEach((row) => {
        map[row.task_key] = !!row.done;
      });
      setProgress(map);
      const lmap: Record<string, LessonRef> = {};
      (lessonsRes.data || []).forEach((l) => {
        if (l.related_task_key) lmap[l.related_task_key] = l;
      });
      setLessons(lmap);
      setLoading(false);
    };
    void load();
  }, [userId, stagePrefix, stage, tasks]);

  useEffect(() => {
    const done = tasks.filter((t) => progress[`${stagePrefix}:${t.key}`]).length;
    onProgressChange?.(done, tasks.length);
  }, [progress, tasks, stagePrefix, onProgressChange]);

  const toggle = async (key: string) => {
    if (disabled) return;
    const fullKey = `${stagePrefix}:${key}`;
    const newDone = !progress[fullKey];
    setProgress((p) => ({ ...p, [fullKey]: newDone }));
    await supabase
      .from("task_progress")
      .upsert(
        { user_id: userId, task_key: fullKey, done: newDone, updated_at: new Date().toISOString() },
        { onConflict: "user_id,task_key" } as never,
      );
  };

  if (loading) {
    return <div className="text-sm" style={{ color: "#666" }}>טוען משימות...</div>;
  }

  return (
    <>
      <ol className="space-y-2">
        {tasks.map((t, idx) => {
          const done = progress[`${stagePrefix}:${t.key}`];
          const num = idx + 1;
          const lesson = lessons[t.key];
          return (
            <li key={t.key} className="space-y-1.5">
              <button
                type="button"
                onClick={() => toggle(t.key)}
                disabled={disabled}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-right transition-all"
                style={{
                  background: done ? "rgba(201, 168, 76, 0.08)" : "#0f0f0f",
                  border: `1px solid ${done ? "#C9A84C" : "#252525"}`,
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.6 : 1,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-extrabold"
                  style={{
                    background: done ? "#C9A84C" : "#0a0a0a",
                    border: `2px solid ${done ? "#C9A84C" : "#3a3a3a"}`,
                    color: done ? "#000" : "#C9A84C",
                  }}
                >
                  {done ? <Check className="w-4 h-4" strokeWidth={3} /> : num}
                </div>
                <span
                  className="text-base flex-1"
                  style={{
                    color: done ? "#C9A84C" : "#fff",
                    textDecoration: done ? "line-through" : "none",
                  }}
                >
                  {t.label}
                </span>
              </button>
              {lesson && (
                <button
                  type="button"
                  onClick={() => setOpenLesson(lesson)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-extrabold transition-all hover:scale-[1.01]"
                  style={{
                    background: "linear-gradient(180deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))",
                    border: "1px solid #C9A84C",
                    color: "#C9A84C",
                  }}
                >
                  <PlayCircle className="w-4 h-4" />
                  🎬 צפה בשיעור לפני התספורת
                </button>
              )}
            </li>
          );
        })}
      </ol>
      <LessonPlayerModal
        open={!!openLesson}
        onClose={() => setOpenLesson(null)}
        lesson={openLesson}
      />
    </>
  );
};

export default TaskList;
