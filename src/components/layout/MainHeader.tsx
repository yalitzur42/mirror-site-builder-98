import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Facebook, Instagram, Youtube } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container-main py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Mac'ho" className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full right-0 pt-2">
                <div className="bg-popover border border-border rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block px-4 py-2 hover:bg-muted transition-colors"
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
        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Youtube className="w-5 h-5" />
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
