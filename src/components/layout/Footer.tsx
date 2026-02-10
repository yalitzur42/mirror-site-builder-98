import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Phone, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Mac'ho" className="h-10" />
            </Link>
            <p className="text-muted-foreground mb-4">
              מובילים את סצנת טיפוח השיער לגברים בישראל. מאקדמיה ללימודי ספרות גברים, דרך מספרה ברמה אחרת.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-lg font-bold mb-4">🧭 ניווט</h4>
            <nav className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                אודות
              </Link>
              <a href="https://calmark.io/p/ZBfbx" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                קביעת תור
              </a>
              <Link to="/academy" className="block text-muted-foreground hover:text-foreground transition-colors">
                קורסים
              </Link>
              <Link to="/business" className="block text-muted-foreground hover:text-foreground transition-colors">
                פרטי העסק
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                צור קשר
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-bold mb-4">📞 פרטי קשר</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>תל חי 37, כפר סבא</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                <span>054-4744031</span>
              </div>
            </div>
          </div>

          {/* Hours Column */}
          <div>
            <h4 className="text-lg font-bold mb-4">🕐 שעות פעילות</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" />
                <span>ראשון - חמישי: 09:00 - 20:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" />
                <span>שישי: 09:00 - 14:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" />
                <span>שבת: סגור</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-main py-4 flex flex-wrap items-center justify-between gap-4 text-sm text-foreground/70">
          <span>© 2024 Mac'ho. כל הזכויות שמורות.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              מדיניות פרטיות
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              תקנון
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
