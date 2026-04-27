import { useSiteContent } from "./useSiteContent";

export interface BusinessHourRow {
  day: string;
  time: string;
}

export function useBusinessHours(): { hours: BusinessHourRow[]; loading: boolean } {
  const { v, loading } = useSiteContent("global");

  const hours: BusinessHourRow[] = [
    { day: "ראשון, שלישי עד חמישי", time: v("hours", "sunday_thursday", "09:00 - 20:00") },
    { day: "שני", time: v("hours", "monday", "סגור") },
    { day: "שישי", time: v("hours", "friday", "08:30 - 14:00") },
    { day: "שבת", time: v("hours", "saturday", "סגור") },
  ];

  return { hours, loading };
}
