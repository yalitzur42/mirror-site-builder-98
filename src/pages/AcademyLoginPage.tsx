import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId, getDeviceName } from "@/lib/deviceId";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, LogIn, ShieldAlert, MonitorSmartphone } from "lucide-react";
import logo from "@/assets/logo.png";

const AcademyLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signOut, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "כניסת תלמידים | אקדמיית Macho";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "כניסה לאזור התלמידים של אקדמיית Macho. עד 2 מכשירים לתלמיד.");
  }, []);

  // If already logged in, validate device and forward to dashboard
  useEffect(() => {
    if (loading || !user) return;
    void validateDeviceAndRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  const validateDeviceAndRedirect = async () => {
    try {
      const { data, error: rpcError } = await supabase.rpc("register_device", {
        p_device_id: getDeviceId(),
        p_device_name: getDeviceName(),
      });
      if (data === "limit_reached") {
        setError("הגעת למגבלת 2 מכשירים. פנה לאקדמיה כדי להסיר מכשיר ישן.");
        await signOut();
        return;
      }
      if (rpcError) {
        console.error("register_device error:", rpcError);
      }
      navigate("/academy/dashboard");
    } catch {
      setError("שגיאה לא צפויה. נסה שוב.");
      await signOut();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError("אימייל או סיסמה שגויים");
        setSubmitting(false);
        return;
      }
      // Auth state effect will handle device validation + redirect
    } catch {
      setError("שגיאה בהתחברות, נסה שוב");
      setSubmitting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center p-4 text-base relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(25 35% 12%) 0%, hsl(25 40% 6%) 60%, hsl(0 0% 0%) 100%)",
      }}
    >
      {/* Decorative gold glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, hsl(40 80% 55% / 0.35), transparent 50%)",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div
          className="rounded-2xl p-6 md:p-10 shadow-2xl border-2"
          style={{
            background: "linear-gradient(180deg, hsl(25 30% 10% / 0.9), hsl(25 40% 6% / 0.95))",
            borderColor: "hsl(40 70% 50% / 0.5)",
            boxShadow:
              "0 25px 80px -10px hsl(40 80% 50% / 0.25), inset 0 1px 0 hsl(40 80% 60% / 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <img
                src={logo}
                alt="Macho"
                className="h-24 w-auto mix-blend-screen"
                style={{ filter: "drop-shadow(0 4px 20px hsl(40 80% 50% / 0.4))" }}
              />
            </div>
            <h1
              className="text-3xl md:text-4xl font-extrabold mb-2"
              style={{
                background: "linear-gradient(135deg, hsl(40 90% 65%), hsl(40 70% 45%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              אקדמיית Macho
            </h1>
            <p className="text-sm md:text-base" style={{ color: "hsl(40 30% 75%)" }}>
              כניסת תלמידים לאזור הקורסים
            </p>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(40 70% 50% / 0.5), transparent)",
            }}
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base" style={{ color: "hsl(40 50% 85%)" }}>
                אימייל
              </Label>
              <div className="relative">
                <Mail
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "hsl(40 70% 55%)" }}
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10 text-base h-11"
                  style={{
                    background: "hsl(25 25% 8%)",
                    borderColor: "hsl(40 40% 30%)",
                    color: "hsl(40 30% 95%)",
                  }}
                  placeholder="student@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base" style={{ color: "hsl(40 50% 85%)" }}>
                סיסמה
              </Label>
              <div className="relative">
                <Lock
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "hsl(40 70% 55%)" }}
                />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 text-base h-11"
                  style={{
                    background: "hsl(25 25% 8%)",
                    borderColor: "hsl(40 40% 30%)",
                    color: "hsl(40 30% 95%)",
                  }}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg p-3 text-sm"
                style={{
                  background: "hsl(0 60% 20% / 0.4)",
                  borderInline: "2px solid hsl(0 70% 50%)",
                  color: "hsl(0 80% 85%)",
                }}
              >
                <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={submitting || loading}
              className="w-full h-12 font-bold text-base border-0"
              style={{
                background:
                  "linear-gradient(135deg, hsl(40 85% 55%) 0%, hsl(35 80% 45%) 100%)",
                color: "hsl(25 50% 10%)",
                boxShadow: "0 8px 24px -8px hsl(40 80% 50% / 0.6)",
              }}
            >
              <LogIn className="w-5 h-5" />
              {submitting ? "מתחבר..." : "התחבר"}
            </Button>
          </form>

          {/* Devices note */}
          <div
            className="mt-6 flex items-start gap-2 rounded-lg p-3 text-sm"
            style={{
              background: "hsl(40 30% 12% / 0.5)",
              border: "1px solid hsl(40 50% 30%)",
              color: "hsl(40 40% 80%)",
            }}
          >
            <MonitorSmartphone
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{ color: "hsl(40 70% 55%)" }}
            />
            <span>
              <strong style={{ color: "hsl(40 70% 70%)" }}>כניסה לתלמידים בלבד</strong>
              {" — "}
              עד 2 מכשירים לתלמיד.
            </span>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/academy"
            className="text-sm hover:underline transition-colors"
            style={{ color: "hsl(40 40% 60%)" }}
          >
            ← חזרה לדף האקדמיה
          </a>
        </div>
      </div>
    </div>
  );
};

export default AcademyLoginPage;
