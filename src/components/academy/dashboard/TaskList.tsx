import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";

interface Task {
  key: string;
  label: string;
}

interface TaskListProps {
  userId: string;
  stagePrefix: string;
  tasks: Task[];
  disabled?: boolean;
  onProgressChange?: (done: number, total: number) => void;
}

const TaskList = ({ userId, stagePrefix, tasks, disabled, onProgressChange }: TaskListProps) => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const keys = tasks.map((t) => `${stagePrefix}:${t.key}`);
      const { data } = await supabase
        .from("task_progress")
        .select("task_key, done")
        .eq("user_id", userId)
        .in("task_key", keys);
      const map: Record<string, boolean> = {};
      (data || []).forEach((row) => {
        map[row.task_key] = !!row.done;
      });
      setProgress(map);
      setLoading(false);
    };
    void load();
  }, [userId, stagePrefix, tasks]);

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
    <ul className="space-y-2">
      {tasks.map((t) => {
        const done = progress[`${stagePrefix}:${t.key}`];
        return (
          <li key={t.key}>
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
                className="w-6 h-6 rounded shrink-0 flex items-center justify-center"
                style={{
                  background: done ? "#C9A84C" : "transparent",
                  border: `2px solid ${done ? "#C9A84C" : "#444"}`,
                }}
              >
                {done && <Check className="w-4 h-4" style={{ color: "#000" }} strokeWidth={3} />}
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
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
