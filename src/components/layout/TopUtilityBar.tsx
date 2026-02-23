import { Navigation, Phone, Sparkles, Car, Calendar } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";

const TopUtilityBar = () => {
  const address = "המחשלים 5, עפולה";
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

  return (
    <div className="relative overflow-hidden text-sm">
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
      <div className="container-main py-2 flex flex-wrap items-center justify-between gap-2 relative z-10">
        {/* Mobile: only navigate, phone, booking */}
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>נווטו אלינו</span>
          </a>
          <a
            href="tel:054-4744031"
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>054-4744031</span>
          </a>
          <a
            href="https://calmark.io/p/ZBfbx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:text-accent/80 hover:underline"
          >
            <Calendar className="w-4 h-4 md:hidden" />
            <span>לקביעת תור</span>
          </a>
        </div>
        {/* Desktop only extras */}
        <div className="hidden md:flex items-center gap-4 text-primary-foreground/70">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> 10% הנחה על הזמנה ראשונה של מוצרים באתר!</span>
          <span className="flex items-center gap-1"><Car className="w-3 h-3" /> חניה חינם ללקוחות "המספרה"</span>
        </div>
      </div>
    </div>
  );
};

export default TopUtilityBar;
