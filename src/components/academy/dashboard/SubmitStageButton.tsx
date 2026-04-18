import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  userId: string;
  stage: number;
  photos: string[];
  pendingRequest: boolean;
  approved: boolean;
  onSubmitted: () => void;
  disabled?: boolean;
}

const SubmitStageButton = ({
  userId,
  stage,
  photos,
  pendingRequest,
  approved,
  onSubmitted,
  disabled,
}: Props) => {
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (photos.length === 0) {
      toast.error("חובה להעלות לפחות תמונה אחת לפני שליחה");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("stage_requests").insert({
      user_id: userId,
      stage,
      photos_urls: photos,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast.error("שגיאה בשליחת הבקשה");
      return;
    }
    toast.success("הבקשה נשלחה! יהלי יאשר בקרוב 🔥");
    onSubmitted();
  };

  if (approved) {
    return (
      <div
        className="w-full rounded-xl p-4 text-center font-extrabold text-lg flex items-center justify-center gap-2"
        style={{
          background: "rgba(201, 168, 76, 0.1)",
          border: "2px solid #C9A84C",
          color: "#C9A84C",
        }}
      >
        <CheckCircle2 className="w-6 h-6" />
        השלב אושר על ידי יהלי 🔥
      </div>
    );
  }

  if (pendingRequest) {
    return (
      <div
        className="w-full rounded-xl p-4 text-center font-extrabold text-lg flex items-center justify-center gap-2"
        style={{
          background: "rgba(201, 168, 76, 0.06)",
          border: "2px dashed #C9A84C",
          color: "#C9A84C",
        }}
      >
        <Clock className="w-6 h-6" />
        הבקשה נשלחה — ממתינים לאישור יהלי
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={submit}
      disabled={disabled || submitting}
      className="w-full rounded-xl p-4 font-extrabold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
      style={{
        background: "linear-gradient(135deg, #C9A84C, #a88a3a)",
        color: "#000",
        opacity: disabled || submitting ? 0.6 : 1,
        cursor: disabled || submitting ? "not-allowed" : "pointer",
        boxShadow: "0 8px 30px -8px rgba(201, 168, 76, 0.5)",
      }}
    >
      {submitting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Send className="w-5 h-5" />
      )}
      שלח בקשת מעבר לשלב {stage + 1} ←
    </button>
  );
};

export default SubmitStageButton;
