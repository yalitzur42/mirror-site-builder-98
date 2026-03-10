import { Navigation, Phone, Calendar } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";
import { WAZE_URL, PHONE_DISPLAY, BOOKING_URL } from "@/lib/constants";

const TopUtilityBar = () => {
  const wazeUrl = WAZE_URL;

  return (
    <div className="relative overflow-hidden hidden lg:block">
      {/* Warp Shader Background */}
      <Warp
        colors={["#3d2310", "#5a351a", "#4B2E1A", "#2a1a0d", "#6b4226"]}
        speed={3.5}
        scale={1.5}
        distortion={0.6}
        swirl={0.3}
        swirlIterations={6}
        softness={0.7}
        shape="edge"
        shapeScale={0.5}
        proportion={0.5}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <div className="container-main py-2.5 flex items-center justify-center gap-3 relative z-10">
        <a
          href={wazeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-waze text-white text-sm font-bold border border-brand-waze/50 hover:bg-brand-waze-hover transition-all"
        >
          <Navigation className="w-4 h-4" />
          <span>נווטו אלינו</span>
        </a>
        <a
          href={`tel:${PHONE_DISPLAY}`}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-whatsapp text-white text-sm font-bold border border-brand-whatsapp/50 hover:bg-brand-whatsapp-hover transition-all"
        >
          <Phone className="w-4 h-4" />
          <span>חייגו אלינו</span>
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-booking text-white text-sm font-bold hover:bg-brand-booking-hover transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>לקביעת תור</span>
        </a>
      </div>
    </div>
  );
};

export default TopUtilityBar;
