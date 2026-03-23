import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import ContactModal from "./ContactModal";
import { useSiteImages } from "@/hooks/useSiteImages";

const FALLBACK_AVATAR = "https://placehold.co/40x40?text=SD";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();
  const siteImages = useSiteImages();
  const navAvatar = siteImages.navbar_avatar || siteImages.morph_portrait || FALLBACK_AVATAR;

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleContact = () => {
    setMobileOpen(false);
    setContactOpen(true);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        {/* Pill bar */}
        <div className="nav-pill flex items-center gap-4 md:gap-6 w-full md:w-auto">
          <Link to="/admin" title="Admin Panel">
            <img
              src={navAvatar}
              alt="Sumit Dangi"
              className="w-9 h-9 rounded-full object-cover cursor-pointer flex-shrink-0"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`transition-colors duration-200 nav-link-hover ${
                  isActive(link.to) ? "font-semibold nav-link-active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button className="btn-contact hidden md:inline-flex" onClick={handleContact}>
            Contact
          </button>

          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile: theme + hamburger */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] md:hidden"
            style={{ backgroundColor: "hsl(var(--background))" }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <Link to="/admin" onClick={() => setMobileOpen(false)}>
                <img
                  src={navAvatar}
                  alt="Sumit Dangi"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 pt-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-4 border-b border-border font-serif text-3xl font-bold uppercase tracking-tight transition-colors ${
                      isActive(link.to) ? "nav-link-active" : "text-foreground hover:nav-link-active"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute bottom-10 left-6 right-6 flex items-center justify-between"
            >
              <button
                className="btn-contact"
                onClick={handleContact}
              >
                Contact
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Navbar;
