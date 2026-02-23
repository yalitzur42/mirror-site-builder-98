import { Navigation, Phone, Calendar } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";

const TopUtilityBar = () => {
  const address = "המחשלים 5, עפולה";
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

  return (
    <div className="relative overflow-hidden">
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
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#33ccff] text-white text-sm font-bold border border-[#33ccff]/50 hover:bg-[#28b8e8] transition-all"
        >
          <Navigation className="w-4 h-4" />
          <span>נווטו אלינו</span>
        </a>
        <a
          href="tel:054-4744031"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#25D366] text-white text-sm font-bold border border-[#25D366]/50 hover:bg-[#20bd5a] transition-all"
        >
          <Phone className="w-4 h-4" />
          <span>054-4744031</span>
        </a>
        <a
          href="https://calmark.io/p/ZBfbx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-accent-foreground text-sm font-bold hover:bg-accent/90 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>לקביעת תור</span>
        </a>
      </div>
    </div>
  );
};

export default TopUtilityBar;
