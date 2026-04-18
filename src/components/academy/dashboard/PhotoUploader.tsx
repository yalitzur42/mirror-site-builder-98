import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Loader2, ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface PhotoUploaderProps {
  userId: string;
  stage: number;
  photos: string[];
  onChange: (photos: string[]) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const PhotoUploader = ({ userId, stage, photos, onChange, disabled }: PhotoUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    if (disabled) return;
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      if (!ALLOWED.includes(file.type)) {
        toast.error(`${file.name}: סוג קובץ לא נתמך`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: חורג מ-5MB`);
        continue;
      }
      const ext = file.name.split(".").pop();
      const path = `${userId}/stage-${stage}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("stage-photos").upload(path, file);
      if (error) {
        toast.error(`שגיאה בהעלאה: ${file.name}`);
        continue;
      }
      const { data } = supabase.storage.from("stage-photos").getPublicUrl(path);
      newUrls.push(data.publicUrl);
    }
    if (newUrls.length) {
      onChange([...photos, ...newUrls]);
      toast.success(`הועלו ${newUrls.length} תמונות`);
    }
    setUploading(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) void handleFiles(e.dataTransfer.files);
  };

  const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) void handleFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (url: string) => {
    onChange(photos.filter((p) => p !== url));
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        className="rounded-xl p-6 text-center cursor-pointer transition-all"
        style={{
          border: `2px dashed ${dragOver ? "#C9A84C" : "#3a3a3a"}`,
          background: dragOver ? "rgba(201, 168, 76, 0.05)" : "#0a0a0a",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {uploading ? (
          <Loader2 className="w-8 h-8 mx-auto animate-spin" style={{ color: "#C9A84C" }} />
        ) : (
          <Upload className="w-8 h-8 mx-auto" style={{ color: "#C9A84C" }} />
        )}
        <p className="mt-2 text-base font-bold" style={{ color: "#fff" }}>
          {uploading ? "מעלה..." : "גרור תמונות לפני/אחרי או לחץ לבחירה"}
        </p>
        <p className="text-xs mt-1" style={{ color: "#666" }}>
          JPG / PNG / WEBP · עד 5MB לתמונה
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onSelect}
        />
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {photos.map((url) => (
            <div
              key={url}
              className="relative aspect-square rounded-lg overflow-hidden group"
              style={{ border: "2px solid #2a2a2a" }}
            >
              <img src={url} alt="upload" className="w-full h-full object-cover" />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => remove(url)}
                  className="absolute top-1 left-1 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.85)", border: "1px solid #C9A84C" }}
                >
                  <X className="w-4 h-4" style={{ color: "#C9A84C" }} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {photos.length === 0 && !uploading && (
        <div className="flex items-center gap-2 text-sm" style={{ color: "#666" }}>
          <ImagePlus className="w-4 h-4" />
          <span>טרם הועלו תמונות</span>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
