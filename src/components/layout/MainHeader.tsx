import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Instagram, Navigation, Phone, Calendar } from "lucide-react";
import TikTokIcon from "@/components/ui/TikTokIcon";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "אודות", href: "/about" },
  {
    label: "מספרת גברים",
    href: "/barbershop",
    children: [
      { label: "תספורות גברים", href: "/barbershop" },
      { label: "פרם לגבר", href: "/perm" },
    ],
  },
  {
    label: "האקדמיה",
    href: "/academy",
    children: [
      { label: "קורס למתחילים", href: "/academy/beginner" },
      { label: "קורס למתקדמים", href: "/academy/advanced" },
      { label: "קורס כימיה וצבע", href: "/academy/chemistry" },
      { label: "קורס פרם", href: "/academy/perm-course" },
      
    ],
  },
  { label: "פרטי העסק", href: "/business" },
  { label: "עבדו איתנו", href: "/contact" },
];

const MainHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border" style={{ backgroundColor: 'hsl(60, 56%, 91%)', backgroundImage: "url('/images/marble-bg.png')", backgroundSize: '100% auto', backgroundPosition: 'top center', backgroundRepeat: 'repeat-y', color: 'hsl(25, 50%, 20%)' }}>
      <div className="container-main py-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Mac'ho" className="w-auto mix-blend-multiply" style={{ height: '9rem' }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-full text-base font-extrabold tracking-wide",
                  "bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)]",
                  "hover:bg-transparent hover:text-[hsl(25,50%,20%)]",
                  "transition-all duration-300"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full right-0 pt-3">
                  <div className="bg-[hsl(25,50%,20%)] backdrop-blur-md border border-[hsl(25,50%,20%)] rounded-xl shadow-2xl py-2 min-w-[220px] z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-5 py-2.5 text-base text-[hsl(60,56%,91%)] hover:bg-[hsl(60,56%,91%)] hover:text-[hsl(25,50%,20%)] transition-all duration-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="https://www.tiktok.com/@yali.tzur" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)] hover:bg-transparent hover:text-[hsl(25,50%,20%)] transition-all duration-300"
          >
            <TikTokIcon className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/macho.afula" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)] hover:bg-transparent hover:text-[hsl(25,50%,20%)] transition-all duration-300"
          >
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
            title="נווטו אלינו"
          >
            <Navigation className="w-5 h-5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] text-xs font-bold whitespace-nowrap opacity-0 group-active:opacity-100 transition-opacity pointer-events-none shadow-lg">נווטו אלינו</span>
          </a>
          <a
            href="tel:054-4744031"
            className="relative group flex items-center justify-center w-11 h-11 rounded-full bg-[#25D366] text-white"
            title="חייגו אלינו"
          >
            <Phone className="w-5 h-5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] text-xs font-bold whitespace-nowrap opacity-0 group-active:opacity-100 transition-opacity pointer-events-none shadow-lg">חייגו אלינו</span>
          </a>
          <a
            href="https://calmark.io/p/ZBfbx"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center justify-center w-11 h-11 rounded-full bg-[#7C3AED] text-white"
            title="לקביעת תור"
          >
            <Calendar className="w-5 h-5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] text-xs font-bold whitespace-nowrap opacity-0 group-active:opacity-100 transition-opacity pointer-events-none shadow-lg">לקביעת תור</span>
          </a>
          <button
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden section-light border-t border-[hsl(25,50%,20%)]/20 max-h-[calc(100vh-180px)] overflow-y-auto">
          <nav className="container-main py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className="flex items-center justify-between px-5 py-3 rounded-xl text-lg font-extrabold bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] hover:opacity-90 transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-5 h-5 opacity-60" />}
                </Link>
                {item.children && (
                  <div className="mr-6 mt-1 mb-2 space-y-1 border-r-2 border-[hsl(25,50%,20%)]/30 pr-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2.5 rounded-lg text-base font-semibold text-[hsl(25,50%,20%)] bg-[hsl(25,50%,20%)]/10 hover:bg-[hsl(25,50%,20%)]/20 transition-all duration-300"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
