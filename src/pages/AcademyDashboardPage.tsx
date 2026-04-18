import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId, getDeviceName } from "@/lib/deviceId";
import { Button } from "@/components/ui/button";
import { LogOut, GraduationCap, MonitorSmartphone, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";

const AcademyDashboardPage = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [deviceError, setDeviceError] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/academy/login", { replace: true });
      return;
    }

    const validate = async () => {
      const { data, error } = await supabase.rpc("register_device", {
        _device_id: getDeviceId(),
        _device_name: getDeviceName(),
      });
      if (error || data === "limit_reached" || data === "unauthenticated") {
        setDeviceError(
          data === "limit_reached"
            ? "הגעת למגבלת 2 מכשירים. פנה לאקדמיה כדי להסיר מכשיר ישן."
            : "שגיאה באימות המכשיר.",
        );
        await signOut();
        setTimeout(() => navigate("/academy/login", { replace: true }), 2500);
        return;
      }
      setChecking(false);
    };

    void validate();
  }, [loading, user, navigate, signOut]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/academy/login", { replace: true });
  };

  if (loading || checking) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center gap-4 p-4"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(25 35% 12%) 0%, hsl(25 40% 6%) 60%, hsl(0 0% 0%) 100%)",
        }}
      >
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "hsl(40 70% 55%)" }} />
        <p style={{ color: "hsl(40 40% 80%)" }}>{deviceError || "טוען..."}</p>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen p-4 md:p-8"
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(25 35% 12%) 0%, hsl(25 40% 6%) 60%, hsl(0 0% 0%) 100%)",
      }}
    >
      <Helmet>
        <title>אזור התלמידים | אקדמיית Macho</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header
          className="flex items-center justify-between rounded-2xl p-4 md:p-6 mb-8 border"
          style={{
            background: "hsl(25 30% 10% / 0.7)",
            borderColor: "hsl(40 50% 30%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3">
            <img src={logo} alt="Macho" className="h-12 w-auto mix-blend-screen" />
            <div>
              <h1
                className="text-xl md:text-2xl font-extrabold"
                style={{ color: "hsl(40 80% 65%)" }}
              >
                אזור התלמידים
              </h1>
              <p className="text-sm" style={{ color: "hsl(40 30% 70%)" }}>
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border"
            style={{
              borderColor: "hsl(40 50% 40%)",
              color: "hsl(40 70% 70%)",
              background: "transparent",
            }}
          >
            <LogOut className="w-4 h-4" />
            התנתק
          </Button>
        </header>

        {/* Welcome card */}
        <div
          className="rounded-2xl p-6 md:p-10 border-2 text-center"
          style={{
            background: "linear-gradient(180deg, hsl(25 30% 10% / 0.9), hsl(25 40% 6% / 0.95))",
            borderColor: "hsl(40 70% 50% / 0.4)",
            boxShadow: "0 25px 80px -10px hsl(40 80% 50% / 0.2)",
          }}
        >
          <GraduationCap
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "hsl(40 80% 60%)" }}
          />
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{
              background: "linear-gradient(135deg, hsl(40 90% 65%), hsl(40 70% 45%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ברוך הבא לאקדמיית Macho
          </h2>
          <p className="text-lg mb-6" style={{ color: "hsl(40 30% 80%)" }}>
            כאן יופיעו הקורסים, השיעורים והחומרים שלך. בקרוב.
          </p>

          <div
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
            style={{
              background: "hsl(40 30% 12% / 0.5)",
              border: "1px solid hsl(40 50% 30%)",
              color: "hsl(40 40% 80%)",
            }}
          >
            <MonitorSmartphone className="w-4 h-4" style={{ color: "hsl(40 70% 55%)" }} />
            המכשיר הזה רשום בחשבונך
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyDashboardPage;
