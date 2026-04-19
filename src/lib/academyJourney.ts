// Game-map journey definition. Visual layout for the winding path.
// Coordinates are normalized (0-100) inside an SVG/absolute container.

export interface JourneyTaskNode {
  type: "task";
  /** task_key in academyStages.ts (without stage prefix) */
  key: string;
  emoji: string;
  label: string;
  /** % from the left (0-100) */
  x: number;
}

export interface JourneyStageNode {
  type: "stage";
  stage: number;
  emoji: string;
  title: string;
  color: string; // hex
  glow: string; // rgba glow
  x: number; // % from left (0-100)
}

export interface JourneyDecor {
  emoji: string;
  x: number; // %
  yOffset: number; // px, applied relative to its row
  size: number; // rem
  delay: number; // s, animation delay
}

export interface JourneyRow {
  /** Y stride per row in px (mobile) */
  height: number;
  node: JourneyStageNode | JourneyTaskNode;
  decor?: JourneyDecor[];
}

const GOLD = "#C9A84C";
const PURPLE = "#9B59B6";
const RED = "#E74C3C";
const DEEP = "#6c3483";

// Bottom → top order. We'll render reversed (visual bottom is end of array).
// Rows render top-to-bottom in DOM, so order here is top-to-bottom too.
// We want stage 4 at top, stage 1 at bottom.
export const JOURNEY_ROWS: JourneyRow[] = [
  // ===== STAGE 4 (top, most mysterious) =====
  {
    height: 140,
    node: {
      type: "stage",
      stage: 4,
      emoji: "🚀",
      title: "שבירת תקרה",
      color: DEEP,
      glow: "rgba(108,52,131,0.5)",
      x: 50,
    },
    decor: [{ emoji: "✨", x: 15, yOffset: 30, size: 1.6, delay: 0.4 }],
  },
  {
    height: 100,
    node: { type: "task", key: "premium_pricing", emoji: "👑", label: "פרימיום", x: 28 },
  },
  {
    height: 100,
    node: { type: "task", key: "ads_campaign", emoji: "📣", label: "קמפיינים", x: 72 },
    decor: [{ emoji: "🌟", x: 18, yOffset: 20, size: 1.4, delay: 0.8 }],
  },

  // ===== STAGE 3 =====
  {
    height: 140,
    node: {
      type: "stage",
      stage: 3,
      emoji: "💰",
      title: "10K",
      color: RED,
      glow: "rgba(231,76,60,0.5)",
      x: 50,
    },
    decor: [
      { emoji: "💵", x: 12, yOffset: 30, size: 1.8, delay: 0.2 },
      { emoji: "💸", x: 86, yOffset: -10, size: 1.6, delay: 1.1 },
    ],
  },
  {
    height: 100,
    node: { type: "task", key: "google_business", emoji: "🗺", label: "גוגל ביזנס", x: 28 },
  },
  {
    height: 100,
    node: { type: "task", key: "100_reviews", emoji: "⭐", label: "100 ביקורות", x: 72 },
  },
  {
    height: 100,
    node: { type: "task", key: "reels_content", emoji: "🎥", label: "Reels", x: 30 },
    decor: [{ emoji: "📱", x: 80, yOffset: 10, size: 1.7, delay: 0.6 }],
  },

  // ===== STAGE 2 =====
  {
    height: 140,
    node: {
      type: "stage",
      stage: 2,
      emoji: "👑",
      title: "בניית מותג",
      color: PURPLE,
      glow: "rgba(155,89,182,0.5)",
      x: 50,
    },
    decor: [{ emoji: "📱", x: 14, yOffset: 25, size: 1.8, delay: 0.3 }],
  },
  {
    height: 100,
    node: { type: "task", key: "instagram", emoji: "📸", label: "אינסטגרם", x: 28 },
  },
  {
    height: 100,
    node: { type: "task", key: "story_hunt", emoji: "🎯", label: "ציד סטורי", x: 72 },
    decor: [{ emoji: "🤝", x: 18, yOffset: 15, size: 1.6, delay: 0.9 }],
  },
  {
    height: 100,
    node: { type: "task", key: "client_xp", emoji: "⭐", label: "חוויית לקוח", x: 30 },
  },

  // ===== STAGE 1 (bottom — start) =====
  {
    height: 100,
    node: { type: "task", key: "broadcast", emoji: "📱", label: "תפוצה", x: 72 },
  },
  {
    height: 100,
    node: { type: "task", key: "before_after", emoji: "📸", label: "לפני / אחרי", x: 28 },
    decor: [{ emoji: "✂️", x: 80, yOffset: 10, size: 1.6, delay: 0.5 }],
  },
  {
    height: 100,
    node: { type: "task", key: "ambassadors_list", emoji: "🤝", label: "10 שגרירים", x: 72 },
  },
  {
    height: 160,
    node: {
      type: "stage",
      stage: 1,
      emoji: "✂️",
      title: "בניית בסיס",
      color: GOLD,
      glow: "rgba(201,168,76,0.6)",
      x: 50,
    },
    decor: [
      { emoji: "💈", x: 14, yOffset: 20, size: 2, delay: 0 },
      { emoji: "✨", x: 86, yOffset: -10, size: 1.6, delay: 0.7 },
    ],
  },
];

export const STAGE_COLORS: Record<number, { color: string; glow: string }> = {
  1: { color: GOLD, glow: "rgba(201,168,76,0.6)" },
  2: { color: PURPLE, glow: "rgba(155,89,182,0.5)" },
  3: { color: RED, glow: "rgba(231,76,60,0.5)" },
  4: { color: DEEP, glow: "rgba(108,52,131,0.5)" },
};
