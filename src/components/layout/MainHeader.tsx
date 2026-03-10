import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Instagram, Navigation, Phone, Calendar } from "lucide-react";
import TikTokIcon from "@/components/ui/TikTokIcon";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { TIKTOK_URL, INSTAGRAM_URL, WAZE_URL, PHONE_DISPLAY, BOOKING_URL } from "@/lib/constants";

const navItems = [
{ label: "אודות", href: "/about" },
{ label: "מספרת גברים", href: "/barbershop" },
{ label: "פרם לגבר", href: "/perm" },
{ label: "האקדמיה", href: "/academy" },
{ label: "פרטי העסק", href: "/business" },
{ label: "עבדו איתנו", href: "/contact" }];


const MainHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border" style={{ backgroundColor: 'hsl(60, 56%, 91%)', backgroundImage: "url('/images/marble-bg.png')", backgroundSize: '100% auto', backgroundPosition: 'top center', backgroundRepeat: 'repeat-y', color: 'hsl(25, 50%, 20%)' }}>
      <div className="container-main flex items-center justify-between py-[4px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Mac'ho" className="w-auto mix-blend-multiply" style={{ height: '9rem' }} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-full text-base font-extrabold tracking-wide",
              "bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)]",
              "hover:bg-transparent hover:text-[hsl(25,50%,20%)]",
              "transition-all duration-300"
            )}>
            
              {item.label}
            </Link>
          )}
        </nav>

        {/* Social Icons */}
        <div className="hidden lg:flex items-center gap-3">
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)] hover:bg-transparent hover:text-[hsl(25,50%,20%)] transition-all duration-300">
            
            <TikTokIcon className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/macho.afula" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)] hover:bg-transparent hover:text-[hsl(25,50%,20%)] transition-all duration-300">
            
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Action Buttons + Menu */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            href="https://waze.com/ul?q=%D7%94%D7%9E%D7%97%D7%A9%D7%9C%D7%99%D7%9D%205%2C%20%D7%A2%D7%A4%D7%95%D7%9C%D7%94&navigate=yes"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center justify-center w-11 h-11 rounded-full bg-[#33ccff] text-white"
            title="נווטו אלינו">
            
            <Navigation className="w-5 h-5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] text-xs font-bold whitespace-nowrap opacity-0 group-active:opacity-100 transition-opacity pointer-events-none shadow-lg">נווטו אלינו</span>
          </a>
          <a
            href="tel:054-4744031"
            className="relative group flex items-center justify-center w-11 h-11 rounded-full bg-[#25D366] text-white"
            title="חייגו אלינו">
            
            <Phone className="w-5 h-5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] text-xs font-bold whitespace-nowrap opacity-0 group-active:opacity-100 transition-opacity pointer-events-none shadow-lg">חייגו אלינו</span>
          </a>
          <a
            href="https://calmark.io/p/ZBfbx"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center justify-center w-11 h-11 rounded-full bg-[#7C3AED] text-white"
            title="לקביעת תור">
            
            <Calendar className="w-5 h-5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] text-xs font-bold whitespace-nowrap opacity-0 group-active:opacity-100 transition-opacity pointer-events-none shadow-lg">לקביעת תור</span>
          </a>
          <button
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)]"
            onClick={() => setMobileOpen(!mobileOpen)}>
            
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen &&
      <div className="lg:hidden section-light border-t border-[hsl(25,50%,20%)]/20 max-h-[calc(100vh-180px)] overflow-y-auto">
          <nav className="container-main py-4 space-y-2">
            {navItems.map((item) =>
          <Link
            key={item.label}
            to={item.href}
            className="flex items-center justify-between px-5 py-3 rounded-xl text-lg font-extrabold bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] hover:opacity-90 transition-all duration-300"
            onClick={() => setMobileOpen(false)}>
            
                {item.label}
              </Link>
          )}
          </nav>
        </div>
      }
    </header>);

};

export default MainHeader;