import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, GripVertical } from "lucide-react";

interface GalleryFieldEditorProps {
  value: string; // JSON array of URLs
  onChange: (value: string) => void;
  pageSlug: string;
  sectionKey: string;
  fieldKey: string;
}

const GalleryFieldEditor = ({ value, onChange, pageSlug, sectionKey, fieldKey }: GalleryFieldEditorProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

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

  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/heic", "image/heif", "image/avif"];
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
  const MAX_FILES = 20;

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (images.length + files.length > MAX_FILES) {
      toast({ title: "שגיאה", description: `ניתן להעלות עד ${MAX_FILES} תמונות`, variant: "destructive" });
      return;
    }
    setUploading(true);

    const newImages = [...images];
    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({ title: "שגיאה", description: `סוג קובץ לא נתמך: ${file.name}`, variant: "destructive" });
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({ title: "שגיאה", description: `${file.name} גדול מדי (מקסימום 20MB)`, variant: "destructive" });
        continue;
      }
      try {
        const fileBase64 = await fileToBase64(file);
        const { data, error } = await supabase.functions.invoke("admin-upload-asset", {
          body: {
            bucket: "site-assets",
            pageSlug,
            sectionKey,
            fieldKey,
            fileName: file.name,
            contentType: file.type,
            fileBase64,
          },
        });

        if (error) {
          throw new Error(error.message || "שגיאה לא ידועה בהעלאה");
        }

        if (!data?.publicUrl) {
          throw new Error(data?.error || "לא התקבלה כתובת לתמונה");
        }

        newImages.push(data.publicUrl);
      } catch (error) {
        const message = error instanceof Error ? error.message : "שגיאה לא ידועה בהעלאה";
        toast({ title: "שגיאה בהעלאת תמונה", description: message, variant: "destructive" });
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

  return (
    <div className="space-y-3">
      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted">
              <img src={url} alt={`תמונה ${index + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <label className="inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors text-xs md:text-sm">
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? "מעלה..." : "העלה תמונות"}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => handleUpload(e.target.files)}
        />
      </label>

      <p className="text-xs text-muted-foreground">
        {images.length} תמונות • ניתן להעלות מספר תמונות בבת אחת
      </p>
    </div>
  );
};

export default GalleryFieldEditor;
