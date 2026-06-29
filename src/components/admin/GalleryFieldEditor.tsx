import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, Video, GripVertical } from "@/lib/icons";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface GalleryFieldEditorProps {
  value: string;
  onChange: (value: string) => void;
  pageSlug: string;
  sectionKey: string;
  fieldKey: string;
}

const isVideoUrl = (url: string) =>
  /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url) || url.includes("/site-videos/");

interface SortableItemProps {
  id: string;
  url: string;
  index: number;
  total: number;
  onRemove: () => void;
  onMove: (to: number) => void;
}

const SortableItem = ({ id, url, index, total, onRemove, onMove }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group aspect-square rounded-lg overflow-hidden border bg-muted touch-none ${
        isDragging ? "ring-2 ring-primary" : "border-border"
      }`}
    >
      {isVideoUrl(url) ? (
        <>
          <video
            src={`${url}#t=0.5`}
            className="w-full h-full object-cover pointer-events-none bg-black"
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              try { v.currentTime = 0.5; } catch {}
            }}
          />
          <span className="absolute top-1 left-1 bg-black/70 text-white rounded-full p-1 z-10">
            <Video className="w-3 h-3" />
          </span>
        </>
      ) : (
        <img src={url} alt={`פריט ${index + 1}`} className="w-full h-full object-cover pointer-events-none" />
      )}

      {/* Drag handle — covers most of the tile so dragging works on touch */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        aria-label="גרור לסידור"
      />

      {/* Grip indicator */}
      <span className="absolute top-1 left-1/2 -translate-x-1/2 bg-black/70 text-white rounded p-1 pointer-events-none z-10">
        <GripVertical className="w-3.5 h-3.5" />
      </span>

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 w-7 h-7 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-20 shadow"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="absolute bottom-1 right-1 flex gap-0.5 z-20">
        <button
          type="button"
          onClick={() => onMove(index - 1)}
          disabled={index === 0}
          className="w-7 h-7 bg-black/80 text-white rounded text-sm disabled:opacity-30 active:bg-primary"
          title="הזז אחורה"
        >
          →
        </button>
        <button
          type="button"
          onClick={() => onMove(index + 1)}
          disabled={index === total - 1}
          className="w-7 h-7 bg-black/80 text-white rounded text-sm disabled:opacity-30 active:bg-primary"
          title="הזז קדימה"
        >
          ←
        </button>
      </div>

      <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded font-bold z-10">
        {index + 1}
      </span>
    </div>
  );
};

const GalleryFieldEditor = ({ value, onChange, pageSlug, sectionKey, fieldKey }: GalleryFieldEditorProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result !== "string") {
          reject(new Error("קריאת הקובץ נכשלה"));
          return;
        }
        resolve(result.split(",")[1] || "");
      };
      reader.onerror = () => reject(new Error("קריאת הקובץ נכשלה"));
      reader.readAsDataURL(file);
    });

  let images: string[] = [];
  try {
    images = JSON.parse(value || "[]");
  } catch {
    images = [];
  }

  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/heic", "image/heif", "image/avif"];
  const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v", "video/ogg"];
  const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
  const MAX_FILES = 20;

  const uploadImage = async (file: File): Promise<string | null> => {
    if (file.size > MAX_IMAGE_SIZE) {
      toast({ title: "שגיאה", description: `${file.name} גדול מדי (מקסימום 20MB)`, variant: "destructive" });
      return null;
    }
    const fileBase64 = await fileToBase64(file);
    const { data, error } = await supabase.functions.invoke("admin-upload-asset", {
      body: { bucket: "site-assets", pageSlug, sectionKey, fieldKey, fileName: file.name, contentType: file.type, fileBase64 },
    });
    if (error) throw new Error(error.message || "שגיאה בהעלאה");
    if (!data?.publicUrl) throw new Error(data?.error || "לא התקבלה כתובת");
    return data.publicUrl;
  };

  const uploadVideo = async (file: File): Promise<string | null> => {
    if (file.size > MAX_VIDEO_SIZE) {
      toast({ title: "שגיאה", description: `${file.name} גדול מדי (מקסימום 100MB)`, variant: "destructive" });
      return null;
    }
    const { data: signed, error: signErr } = await supabase.functions.invoke("create-video-upload-url", {
      body: { pageSlug, sectionKey, fieldKey, fileName: file.name },
    });
    if (signErr || !signed?.signedUrl) throw new Error(signErr?.message || signed?.error || "לא הצלחנו לקבל קישור העלאה");
    const uploadRes = await fetch(signed.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "video/mp4", "x-upsert": "true" },
      body: file,
    });
    if (!uploadRes.ok) {
      const txt = await uploadRes.text();
      throw new Error(`העלאה נכשלה (${uploadRes.status}): ${txt.slice(0, 200)}`);
    }
    return signed.publicUrl as string;
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (images.length + files.length > MAX_FILES) {
      toast({ title: "שגיאה", description: `ניתן להעלות עד ${MAX_FILES} פריטים`, variant: "destructive" });
      return;
    }
    setUploading(true);

    const newImages = [...images];
    for (const file of Array.from(files)) {
      const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
      if (!isImage && !isVideo) {
        toast({ title: "שגיאה", description: `סוג קובץ לא נתמך: ${file.name}`, variant: "destructive" });
        continue;
      }
      try {
        const url = isVideo ? await uploadVideo(file) : await uploadImage(file);
        if (url) newImages.push(url);
      } catch (error) {
        const message = error instanceof Error ? error.message : "שגיאה לא ידועה בהעלאה";
        toast({ title: "שגיאה בהעלאה", description: message, variant: "destructive" });
        continue;
      }
    }

    onChange(JSON.stringify(newImages));
    setUploading(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(JSON.stringify(newImages));
  };

  const moveItem = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= images.length || to >= images.length) return;
    onChange(JSON.stringify(arrayMove(images, from, to)));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = images.findIndex((_, i) => `item-${i}` === active.id);
    const to = images.findIndex((_, i) => `item-${i}` === over.id);
    if (from === -1 || to === -1) return;
    onChange(JSON.stringify(arrayMove(images, from, to)));
  };

  const ids = images.map((_, i) => `item-${i}`);

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <>
          <p className="text-xs text-muted-foreground">
            💡 גרור פריטים כדי לשנות סדר (במובייל — לחץ והחזק ואז גרור). אפשר גם להשתמש בחצים.
          </p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={ids} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {images.map((url, index) => (
                  <SortableItem
                    key={ids[index]}
                    id={ids[index]}
                    url={url}
                    index={index}
                    total={images.length}
                    onRemove={() => removeImage(index)}
                    onMove={(to) => moveItem(index, to)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}

      <label className="inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors text-xs md:text-sm">
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? "מעלה..." : "העלה תמונות / סרטונים"}
        <input
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime,video/x-m4v,video/ogg"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => handleUpload(e.target.files)}
        />
      </label>

      <p className="text-xs text-muted-foreground">
        {images.length} פריטים • תמונות עד 20MB, סרטונים עד 100MB (MP4 / WebM)
      </p>
    </div>
  );
};

export default GalleryFieldEditor;
