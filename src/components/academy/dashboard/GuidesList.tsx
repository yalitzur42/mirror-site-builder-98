import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock, PlayCircle } from "lucide-react";
import { STAGE_COLORS } from "@/lib/academyJourney";
import LessonPlayerModal from "./LessonPlayerModal";

interface Guide {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  video_path: string | null;
  order_index: number | null;
}

interface Props {
  stage: number;
}

const GuidesList = ({ stage }: Props) => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [openGuide, setOpenGuide] = useState<Guide | null>(null);
  const colors = STAGE_COLORS[stage] || STAGE_COLORS[1];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await (supabase as unknown as {
        from: (t: string) => {
          select: (s: string) => {
            eq: (c: string, v: unknown) => {
              eq: (c: string, v: unknown) => {
                order: (c: string, o: { ascending: boolean }) => Promise<{ data: Guide[] | null }>;
              };
            };
          };
        };
      })
        .from("guides")
        .select("id, title, description, video_url, video_path, order_index")
        .eq("stage_number", stage)
        .eq("is_published", true)
        .order("order_index", { ascending: true });
      setGuides(data || []);
      setLoading(false);
    };
    void load();
  }, [stage]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: colors.color }} />
      </div>
    );
  }

  if (guides.length === 0) {
    return (
      <div
        className="rounded-xl p-6 text-center space-y-3"
        style={{
          background: "linear-gradient(180deg, #0f0f0f, #060606)",
          border: "2px dashed #2a2a2a",
        }}
      >
        <div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl"
          style={{ background: "#0a0a0a", border: `2px solid ${colors.color}55` }}
        >
          <span style={{ filter: "grayscale(0.6)" }}>🎬</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm font-bold" style={{ color: colors.color }}>
          <Lock className="w-4 h-4" />
          המדריך יתווסף בקרוב
        </div>
        <p className="text-sm" style={{ color: "#888" }}>
          בקרוב תוכל לצפות כאן בסרטוני הדרכה לשלב זה
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-3">
        {guides.map((g) => (
          <li key={g.id}>
            <button
              type="button"
              onClick={() => setOpenGuide(g)}
              className="w-full flex items-start gap-3 p-3 rounded-xl transition-all hover:scale-[1.01] text-right"
              style={{ background: "#0f0f0f", border: `1px solid ${colors.color}55` }}
            >
              <PlayCircle className="w-8 h-8 shrink-0 mt-0.5" style={{ color: colors.color }} />
              <div className="flex-1">
                <h5 className="font-extrabold text-base" style={{ color: "#fff" }}>{g.title}</h5>
                {g.description && (
                  <p className="text-xs mt-1" style={{ color: "#999" }}>{g.description}</p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
      <LessonPlayerModal open={!!openGuide} onClose={() => setOpenGuide(null)} lesson={openGuide} />
    </>
  );
};

export default GuidesList;
