import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Upload,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { STAGES } from "@/lib/academyStages";

const GOLD = "#C9A84C";
const PAGE_BG = "radial-gradient(ellipse at top, #141414 0%, #0a0a0a 60%, #000 100%)";

interface Lesson {
  id: string;
  stage_number: number;
  title: string;
  description: string | null;
  video_path: string | null;
  video_url: string | null;
  related_task_key: string | null;
  is_published: boolean;
  order_index: number | null;
}

interface FormState {
  id?: string;
  stage_number: number;
  title: string;
  description: string;
  related_task_key: string;
  is_published: boolean;
  order_index: number;
  video_path: string | null;
}

const emptyForm = (): FormState => ({
  stage_number: 1,
  title: "",
  description: "",
  related_task_key: "",
  is_published: true,
  order_index: 0,
  video_path: null,
});

const AcademyAdminLessonsPage = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/academy/login");
  }, [user, loading, isAdmin, navigate]);

  const load = useCallback(async () => {
    setDataLoading(true);
    const { data } = await (supabase as unknown as {
      from: (t: string) => {
        select: (s: string) => {
          order: (c: string, o: { ascending: boolean }) => {
            order: (c: string, o: { ascending: boolean }) => Promise<{ data: Lesson[] | null }>;
          };
        };
      };
    })
      .from("guides")
      .select("id, stage_number, title, description, video_path, video_url, related_task_key, is_published, order_index")
      .order("stage_number", { ascending: true })
      .order("order_index", { ascending: true });
    setLessons(data || []);
    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (user && isAdmin) void load();
  }, [user, isAdmin, load]);

  const openCreate = () => {
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (l: Lesson) => {
    setForm({
      id: l.id,
      stage_number: l.stage_number,
      title: l.title,
      description: l.description || "",
      related_task_key: l.related_task_key || "",
      is_published: l.is_published,
      order_index: l.order_index || 0,
      video_path: l.video_path,
    });
    setDialogOpen(true);
  };

  const handleVideoUpload = async (file: File) => {
    if (file.size > 500 * 1024 * 1024) {
      toast.error("קובץ גדול מדי (מקסימום 500MB)");
      return;
    }
    if (!file.type.startsWith("video/")) {
      toast.error("יש לבחור קובץ וידאו בלבד");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "mp4";
      const path = `stage-${form.stage_number}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("course-videos").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      // remove old file if any
      if (form.video_path) {
        await supabase.storage.from("course-videos").remove([form.video_path]);
      }
      setForm((f) => ({ ...f, video_path: path }));
      toast.success("הוידאו הועלה בהצלחה");
    } catch (e) {
      toast.error("שגיאה בהעלאת הוידאו");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.title.trim()) {
      toast.error("יש להזין כותרת");
      return;
    }
    setSaving(true);
    const payload = {
      stage_number: form.stage_number,
      title: form.title.trim(),
      description: form.description.trim() || null,
      related_task_key: form.related_task_key || null,
      is_published: form.is_published,
      order_index: form.order_index,
      video_path: form.video_path,
    };
    let result;
    if (form.id) {
      result = await (supabase as unknown as {
        from: (t: string) => {
          update: (p: unknown) => { eq: (c: string, v: unknown) => Promise<{ error: unknown }> };
        };
      }).from("guides").update(payload).eq("id", form.id);
    } else {
      result = await (supabase as unknown as {
        from: (t: string) => { insert: (p: unknown) => Promise<{ error: unknown }> };
      }).from("guides").insert(payload);
    }
    setSaving(false);
    if (result.error) {
      toast.error("שגיאה בשמירה");
      return;
    }
    toast.success("נשמר בהצלחה");
    setDialogOpen(false);
    void load();
  };

  const remove = async (l: Lesson) => {
    if (!confirm(`למחוק את "${l.title}"?`)) return;
    if (l.video_path) {
      await supabase.storage.from("course-videos").remove([l.video_path]);
    }
    const { error } = await (supabase as unknown as {
      from: (t: string) => {
        delete: () => { eq: (c: string, v: unknown) => Promise<{ error: unknown }> };
      };
    }).from("guides").delete().eq("id", l.id);
    if (error) {
      toast.error("שגיאה במחיקה");
      return;
    }
    toast.success("נמחק");
    void load();
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAGE_BG }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: GOLD }} />
      </div>
    );
  }

  const stageTasks = STAGES.find((s) => s.number === form.stage_number)?.tasks || [];

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: PAGE_BG, color: "#fff" }}>
      <div className="container-main py-6 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/academy/admin")}
            className="text-sm"
            style={{ color: GOLD }}
          >
            <ArrowRight className="w-4 h-4 ml-1" />
            חזרה לאדמין
          </Button>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: GOLD }}>
            🎬 ניהול שיעורים
          </h1>
        </div>

        <Button
          onClick={openCreate}
          className="w-full md:w-auto"
          style={{ background: GOLD, color: "#000", fontWeight: 800 }}
        >
          <Plus className="w-4 h-4 ml-1" />
          הוסף שיעור חדש
        </Button>

        {STAGES.map((s) => {
          const stageLessons = lessons.filter((l) => l.stage_number === s.number);
          return (
            <div
              key={s.number}
              className="rounded-xl p-4 space-y-3"
              style={{ background: "#0f0f0f", border: "1px solid #1f1f1f" }}
            >
              <h2 className="text-lg font-extrabold" style={{ color: GOLD }}>
                שלב {s.number} — {s.title}
              </h2>
              {stageLessons.length === 0 ? (
                <p className="text-sm" style={{ color: "#666" }}>אין שיעורים בשלב זה</p>
              ) : (
                <ul className="space-y-2">
                  {stageLessons.map((l) => (
                    <li
                      key={l.id}
                      className="flex items-start gap-3 p-3 rounded-lg"
                      style={{ background: "#0a0a0a", border: "1px solid #1f1f1f" }}
                    >
                      <PlayCircle
                        className="w-6 h-6 shrink-0 mt-0.5"
                        style={{ color: l.video_path ? GOLD : "#555" }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-base" style={{ color: "#fff" }}>{l.title}</h3>
                          {l.is_published ? (
                            <span className="text-xs flex items-center gap-1" style={{ color: "#27AE60" }}>
                              <CheckCircle2 className="w-3 h-3" /> פורסם
                            </span>
                          ) : (
                            <span className="text-xs flex items-center gap-1" style={{ color: "#888" }}>
                              <XCircle className="w-3 h-3" /> טיוטה
                            </span>
                          )}
                        </div>
                        {l.description && (
                          <p className="text-sm mt-1" style={{ color: "#999" }}>{l.description}</p>
                        )}
                        {l.related_task_key && (
                          <p className="text-xs mt-1" style={{ color: GOLD }}>
                            מקושר למשימה: {l.related_task_key}
                          </p>
                        )}
                        {!l.video_path && (
                          <p className="text-xs mt-1" style={{ color: "#E74C3C" }}>⚠ אין וידאו</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(l)} style={{ color: GOLD }}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(l)} style={{ color: "#E74C3C" }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          dir="rtl"
          className="max-w-lg"
          style={{ background: "#0a0a0a", color: "#fff", border: `2px solid ${GOLD}` }}
        >
          <DialogHeader>
            <DialogTitle className="text-right text-xl font-extrabold" style={{ color: GOLD }}>
              {form.id ? "עריכת שיעור" : "שיעור חדש"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-right block mb-1" style={{ color: GOLD }}>שלב</Label>
              <Select
                value={String(form.stage_number)}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, stage_number: Number(v), related_task_key: "" }))
                }
              >
                <SelectTrigger style={{ background: "#0f0f0f", borderColor: "#2a2a2a", color: "#fff" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((s) => (
                    <SelectItem key={s.number} value={String(s.number)}>
                      שלב {s.number} — {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-right block mb-1" style={{ color: GOLD }}>כותרת</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                style={{ background: "#0f0f0f", borderColor: "#2a2a2a", color: "#fff" }}
                dir="rtl"
              />
            </div>

            <div>
              <Label className="text-right block mb-1" style={{ color: GOLD }}>תיאור</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                style={{ background: "#0f0f0f", borderColor: "#2a2a2a", color: "#fff" }}
                dir="rtl"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-right block mb-1" style={{ color: GOLD }}>
                מקושר למשימה (אופציונלי)
              </Label>
              <Select
                value={form.related_task_key || "__none"}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, related_task_key: v === "__none" ? "" : v }))
                }
              >
                <SelectTrigger style={{ background: "#0f0f0f", borderColor: "#2a2a2a", color: "#fff" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none">— ללא קישור —</SelectItem>
                  {stageTasks.map((t) => (
                    <SelectItem key={t.key} value={t.key}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs mt-1" style={{ color: "#888" }}>
                כשמקושר למשימה — יופיע כפתור "צפה בשיעור" ליד אותה משימה
              </p>
            </div>

            <div>
              <Label className="text-right block mb-1" style={{ color: GOLD }}>וידאו</Label>
              {form.video_path ? (
                <div
                  className="p-3 rounded-lg flex items-center justify-between gap-2"
                  style={{ background: "#0f0f0f", border: "1px solid #2a2a2a" }}
                >
                  <span className="text-xs truncate" style={{ color: "#aaa" }}>
                    ✓ {form.video_path.split("/").pop()}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setForm((f) => ({ ...f, video_path: null }))}
                    style={{ color: "#E74C3C" }}
                  >
                    הסר
                  </Button>
                </div>
              ) : (
                <label
                  className="flex items-center justify-center gap-2 p-4 rounded-lg cursor-pointer transition-all hover:bg-white/5"
                  style={{ background: "#0f0f0f", border: `2px dashed ${GOLD}55`, color: GOLD }}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>מעלה...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>בחר קובץ וידאו (עד 500MB)</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) void handleVideoUpload(f);
                    }}
                  />
                </label>
              )}
            </div>

            <div>
              <Label className="text-right block mb-1" style={{ color: GOLD }}>סדר תצוגה</Label>
              <Input
                type="number"
                value={form.order_index}
                onChange={(e) => setForm((f) => ({ ...f, order_index: Number(e.target.value) || 0 }))}
                style={{ background: "#0f0f0f", borderColor: "#2a2a2a", color: "#fff" }}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#0f0f0f" }}>
              <Label style={{ color: "#fff" }}>פורסם (זמין לתלמידים)</Label>
              <Switch
                checked={form.is_published}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={save}
                disabled={saving || uploading}
                className="flex-1"
                style={{ background: GOLD, color: "#000", fontWeight: 800 }}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "שמור"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                style={{ color: "#fff" }}
              >
                ביטול
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcademyAdminLessonsPage;
