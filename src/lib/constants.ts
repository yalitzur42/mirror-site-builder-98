// ===== External URLs & Contact Info =====
// Centralized constants — edit here to update across the entire site.

// Address
export const BUSINESS_ADDRESS = "המחשלים 5, עפולה";
export const BUSINESS_ADDRESS_NOTE = "אזור התעשייה עפולה";

// Phone
export const PHONE_DISPLAY = "054-4744031";
export const PHONE_TEL = "0544744031";

// WhatsApp numbers (different per department)
export const WA_GENERAL = "972544744031";    // General / Barbershop / Jobs
export const WA_PERM = "972552938579";       // Perm inquiries
export const WA_ACADEMY = "972552935987";    // Academy inquiries

// Social
export const INSTAGRAM_URL = "https://www.instagram.com/macho.afula";
export const TIKTOK_URL = "https://www.tiktok.com/@yali.tzur";

// Booking
export const BOOKING_URL = "https://calmark.io/p/ZBfbx";

// Navigation
export const WAZE_URL = `https://waze.com/ul?q=${encodeURIComponent(BUSINESS_ADDRESS)}&navigate=yes`;
export const GMAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`;

// Hours
export const BUSINESS_HOURS = [
  { day: "ראשון - חמישי", time: "09:00 - 20:00" },
  { day: "שישי", time: "08:00 - 14:00" },
  { day: "שבת", time: "סגור" },
];

// Helpers
export function waLink(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
