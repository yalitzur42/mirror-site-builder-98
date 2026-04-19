import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  video_path: string | null;
  video_url: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}

const LessonPlayerModal = ({ open, onClose, lesson }: Props) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !lesson) {
      setSignedUrl(null);
      setError(null);
      return;
    }
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        if (lesson.video_path) {
          const { data, error: err } = await supabase.storage
            .from("course-videos")
            .createSignedUrl(lesson.video_path, 3600);
          if (err) throw err;
          setSignedUrl(data?.signedUrl || null);
        } else if (lesson.video_url) {
          // legacy fallback
          setSignedUrl(lesson.video_url);
        } else {
          setError("השיעור עוד לא הועלה");
        }
      } catch (e) {
        setError("שגיאה בטעינת השיעור");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [open, lesson]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        dir="rtl"
        className="max-w-2xl p-0 border-0"
        style={{ background: "#0a0a0a", color: "#fff", border: "2px solid #C9A84C" }}
      >
        <DialogHeader className="p-5 pb-3">
          <DialogTitle className="text-right text-xl font-extrabold" style={{ color: "#C9A84C" }}>
            🎬 {lesson?.title || "שיעור"}
          </DialogTitle>
          {lesson?.description && (
            <p className="text-sm text-right mt-1" style={{ color: "#aaa" }}>{lesson.description}</p>
          )}
        </DialogHeader>
        <div className="px-5 pb-5">
          {loading && (
            <div className="aspect-video flex items-center justify-center" style={{ background: "#000" }}>
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#C9A84C" }} />
            </div>
          )}
          {error && !loading && (
            <div
              className="aspect-video flex flex-col items-center justify-center gap-2 rounded-lg"
              style={{ background: "#000", border: "1px solid #2a2a2a" }}
            >
              <AlertCircle className="w-8 h-8" style={{ color: "#E74C3C" }} />
              <p className="text-sm" style={{ color: "#ccc" }}>{error}</p>
            </div>
          )}
          {!loading && !error && signedUrl && (
            <video
              key={signedUrl}
              src={signedUrl}
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              className="w-full rounded-lg"
              style={{ background: "#000", maxHeight: "70vh" }}
            />
          )}
          <p className="text-xs text-center mt-3" style={{ color: "#666" }}>
            🔒 הגישה לשיעור פרטית ומוגנת
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonPlayerModal;
