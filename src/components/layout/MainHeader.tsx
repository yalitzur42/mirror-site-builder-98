import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Instagram } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-border section-light">
      <div className="container-main py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Mac'ho" className="h-18 w-auto" style={{ height: '4.5rem' }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
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
                  "flex items-center gap-1.5 px-5 py-2.5 rounded-full text-base font-bold tracking-wide",
                  "bg-[hsl(25,50%,20%)] text-[hsl(60,56%,91%)] border-2 border-[hsl(25,50%,20%)]",
                  "hover:bg-transparent hover:text-[hsl(25,50%,20%)]",
                  "transition-all duration-300"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full right-0 pt-3">
                  <div className="bg-[hsl(25,50%,20%)] backdrop-blur-md border border-[hsl(25,50%,20%)] rounded-xl shadow-2xl py-2 min-w-[220px] z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-5 py-2.5 text-sm text-[hsl(60,56%,91%)] hover:bg-[hsl(60,56%,91%)] hover:text-[hsl(25,50%,20%)] transition-all duration-300"
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
        <div className="hidden lg:flex items-center gap-5">
          <a href="https://www.tiktok.com/@yali.tzur" target="_blank" rel="noopener noreferrer" className="text-[hsl(25,50%,20%)]/60 hover:text-[hsl(25,50%,20%)] transition-colors">
            <TikTokIcon className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/macho.afula" target="_blank" rel="noopener noreferrer" className="text-[hsl(25,50%,20%)]/60 hover:text-[hsl(25,50%,20%)] transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container-main py-4 space-y-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className="block py-2 text-foreground hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pr-4 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block py-1 text-muted-foreground hover:text-primary"
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
