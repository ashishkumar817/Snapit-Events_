import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only on home at top; otherwise solid
  const isTransparent = isHome && !scrolled;

  // In light mode scrolled: white bg with dark text
  // In dark mode scrolled: dark bg with light text
  // Transparent: always white text (over hero image)
  const solidBgClass =
    theme === "light"
      ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-black/5"
      : "bg-[hsl(30,10%,5%)]/95 backdrop-blur-md shadow-lg shadow-primary/5 border-b border-white/10";

  const linkColor = isTransparent
    ? "text-white/90 hover:text-[hsl(var(--gold-light))]"
    : theme === "light"
    ? "text-[#222] hover:text-[hsl(var(--gold))]"
    : "text-white/90 hover:text-[hsl(var(--gold-light))]";

  const activeLinkColor = "!text-[hsl(var(--gold))]";

  const logoTextColor = isTransparent
    ? "text-white"
    : theme === "light"
    ? "text-[#111]"
    : "text-white";

  const taglineColor = isTransparent
    ? "text-white/60"
    : theme === "light"
    ? "text-[#666]"
    : "text-white/50";

  const iconColor = isTransparent
    ? "text-white/80 hover:text-[hsl(var(--gold-light))] border-white/20"
    : theme === "light"
    ? "text-[#444] hover:text-[hsl(var(--gold))] border-[#ddd]"
    : "text-white/70 hover:text-[hsl(var(--gold-light))] border-white/20";

  const hamburgerColor = isTransparent
    ? "text-white"
    : theme === "light"
    ? "text-[#111]"
    : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent ? "bg-transparent" : solidBgClass
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="SnapIt Events Logo"
            width={56}
            height={56}
            className="h-10 md:h-14 w-10 md:w-14 object-contain"
          />
          <div className="flex flex-col">
            <span
              className={`text-xl font-heading font-bold leading-tight tracking-wider ${
                isTransparent ? "[text-shadow:0_1px_8px_rgba(0,0,0,0.5)]" : ""
              }`}
            >
              <span className={logoTextColor}>SnapIt</span>{" "}
              <span className="text-gold">Events</span>
            </span>
            <span
              className={`text-[10px] tracking-[0.15em] ${taglineColor}`}
            >
              Snap | Celebrate | Repeat
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`text-sm font-medium transition-colors duration-300 tracking-wide uppercase relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[hsl(var(--gold))] after:transition-all after:duration-300 hover:after:w-full ${linkColor} ${
                  location.pathname === link.href ? activeLinkColor + " after:w-full" : ""
                } ${isTransparent ? "[text-shadow:0_1px_4px_rgba(0,0,0,0.4)]" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 border ${iconColor}`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <Link
            to="/contact"
            className="bg-gold-gradient text-white px-6 py-2.5 rounded-sm text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-md"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${hamburgerColor}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`md:hidden backdrop-blur-md border-t animate-fade-in ${
            theme === "light"
              ? "bg-white/98 border-black/5"
              : "bg-[hsl(30,10%,5%)]/98 border-white/10"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors uppercase tracking-wider ${
                    theme === "light"
                      ? "text-[#222] hover:text-[hsl(var(--gold))]"
                      : "text-white/90 hover:text-[hsl(var(--gold-light))]"
                  } ${location.pathname === link.href ? activeLinkColor : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border ${
                  theme === "light"
                    ? "text-[#444] hover:text-[hsl(var(--gold))] border-[#ddd]"
                    : "text-white/70 hover:text-[hsl(var(--gold-light))] border-white/20"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-gold-gradient text-white px-8 py-3 rounded-sm text-sm font-semibold tracking-wide shadow-md"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
