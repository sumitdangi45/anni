import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ContactModal from "./ContactModal";
import logoImg from "@/assets/logow.png";
import logoBlack from "@/assets/Anni Web Solutions Logo.png";
import faalVideo from "@/assets/faal_ssspin.io_1791295537.mp4";

// ── CTA hover fill animation ───────────────────────────────────
const CTA_STYLE = `
  .nav-cta {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    color: #111;
    border-radius: 10px;
    padding: 9px 18px 9px 10px;
    font-size: 13.5px;
    font-weight: 700;
    text-decoration: none;
    isolation: isolate;
    transition: color 1.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  /* fill slab — starts scaled to 0 from right, slides left-to-right on hover */
  .nav-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #111;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 2s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 0;
  }
  .nav-cta:hover::before {
    transform: scaleX(1);
  }
  /* text turns white as fill covers */
  .nav-cta:hover {
    color: #fff;
  }
  /* icon box */
  .nav-cta-icon {
    position: relative;
    z-index: 1;
    width: 26px;
    height: 26px;
    border-radius: 7px;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 1.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .nav-cta:hover .nav-cta-icon {
    background: #fff;
  }
  /* arrow svg — lucide uses currentColor so this works */
  .nav-cta-icon svg {
    color: #fff;
    transition: color 1.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .nav-cta:hover .nav-cta-icon svg {
    color: #111;
  }
  .nav-cta-text {
    position: relative;
    z-index: 1;
  }
`;

// ── Services mega dropdown data ────────────────────────────────
const SERVICES_COLS = [
  {
    heading: "DEVELOPMENT",
    items: [
      { label: "Custom Web Development", to: "/services/web-development", desc: "Websites & digital products" },
      { label: "Web Applications", to: "/services/web-apps", desc: "SaaS, portals & business platforms" },
      { label: "Mobile App Development", to: "/services/mobile", desc: "Android, iOS & cross-platform apps" },
      { label: "SaaS Development", to: "/services/saas", desc: "Build, launch & scale software products" },
      { label: "E-commerce Development", to: "/services/ecommerce", desc: "Stores, marketplaces & commerce platforms" },
    ] },
  {
    heading: "AI & AUTOMATION",
    items: [
      { label: "AI / ML Solutions", to: "/services/ai-ml", desc: "Machine learning & AI models" },
      { label: "AI Agents & Automation", to: "/services/ai-agents", desc: "Intelligent workflow automation" },
      { label: "ChatBot Development", to: "/services/chatbot", desc: "Custom AI chatbots" },
    ] },
  {
    heading: "DESIGN & GROWTH",
    items: [
      { label: "UI / UX Design", to: "/services/design", desc: "Beautiful user experiences" },
      { label: "Digital Growth & SEO", to: "/services/seo", desc: "SEO, analytics & growth" },
      { label: "Branding & Identity", to: "/services/branding", desc: "Strategy, identity & brand systems" },
    ] },
  {
    heading: "INFRASTRUCTURE & SUPPORT",
    items: [
      { label: "Cybersecurity & Digital Security", to: "/services/cybersecurity", desc: "Security assessment, protection & monitoring" },
      { label: "Cloud & DevOps", to: "/services/cloud-devops", desc: "Deployment, automation & scalable infrastructure" },
      { label: "Maintenance & Support", to: "/services/maintenance", desc: "Website & app ongoing support" },
    ] },
];

// ── Simple dropdown items ──────────────────────────────────────
const WORK_ITEMS = [
  { label: "Prebuilt Solutions", to: "/work/prebuilt", desc: "Ready-to-launch products" },
  { label: "Custom Projects", to: "/work/custom", desc: "Tailored from scratch" },
  { label: "Case Studies", to: "/projects", desc: "Our highlighted work" },
];

const COMPANY_ITEMS = [
  { label: "About Us", to: "/about", desc: "Who we are" },
  { label: "FAQ", to: "/faq", desc: "Common questions" },
  { label: "Blog", to: "/blogs", desc: "Insights & updates" },
  { label: "Internship Catalyst", to: "/internship", desc: "Join our team", badge: "NEW" },
];

// ── Simple Dropdown ────────────────────────────────────────────
const SimpleDropdown = ({ items, onClose }: {
  items: { label: string; to: string; desc?: string; badge?: string }[];
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.97 }}
    transition={{ duration: 0.15 }}
    style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0,
      minWidth: "220px", background: "hsl(0,0%,10%)",
      border: "1px solid hsl(0,0%,16%)", borderRadius: "16px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)", overflow: "hidden", zIndex: 50 }}
  >
    {items.map((item) => (
      <Link key={item.to} to={item.to} onClick={onClose}
        style={{ display: "flex", flexDirection: "column", padding: "12px 16px", textDecoration: "none", transition: "background 0.15s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "hsl(0,0%,14%)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#fff" }}>
          {item.label}
          {item.badge && (
            <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "999px", background: "#4ade80", color: "#000" }}>{item.badge}</span>
          )}
        </span>
        {item.desc && <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)", marginTop: "2px" }}>{item.desc}</span>}
      </Link>
    ))}
  </motion.div>
);

// ── Mega Dropdown (Services) ───────────────────────────────────
const MegaDropdown = ({ onClose }: { onClose: () => void }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const bg       = isHome ? "hsl(0,0%,9%)"  : "#fff";
  const bdr      = isHome ? "1px solid hsl(0,0%,15%)" : "1px solid #e8e8e8";
  const shadow   = isHome ? "0 24px 80px rgba(0,0,0,0.6)" : "0 24px 80px rgba(0,0,0,0.12)";
  const headClr  = isHome ? "rgba(255,255,255,0.4)"  : "rgba(0,0,0,0.35)";
  const lblClr   = isHome ? "#fff"                    : "#111";
  const descClr  = isHome ? "rgba(255,255,255,0.72)"  : "#666";
  const hoverBg  = isHome ? "hsl(0,0%,13%)"           : "#f5f5f5";
  const divider  = isHome ? "hsl(0,0%,14%)"           : "#e8e8e8";
  const notSureC = isHome ? "rgba(255,255,255,0.3)"   : "#aaa";
  const notSureL = isHome ? "#6b7eff"                 : "#6b7eff";
  const subBotBg = isHome ? "hsl(0,0%,12%)"           : "#f5f5f5";
  const subBotBdr= isHome ? "1px solid hsl(0,0%,16%)" : "1px solid #e8e8e8";
  const subBotHov= isHome ? "hsl(0,0%,16%)"           : "#eaeaea";
  const subLblC  = isHome ? "rgba(255,255,255,0.78)"  : "#666";
  const subTxtC  = isHome ? "#fff"                    : "#111";
  const subSubC  = isHome ? "rgba(255,255,255,0.35)"  : "#999";
  const priceC   = isHome ? "#fff"                    : "#111";
  const leftBdr  = isHome ? "1px solid hsl(0,0%,14%)" : "1px solid #e8e8e8";

  return (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.18 }}
    style={{
      position: "fixed", top: "68px", left: "20px", right: "20px",
      maxWidth: "1080px", margin: "0 auto",
      background: bg, border: bdr, borderRadius: "20px",
      boxShadow: shadow, overflow: "hidden", zIndex: 50, display: "flex" }}
  >
    {/* Left — 4 service columns + bottom row */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "28px 28px 0" }}>
      {/* 4 columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0", flex: 1 }}>
        {SERVICES_COLS.map((col) => (
          <div key={col.heading} style={{ paddingRight: "24px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: headClr, textTransform: "uppercase", marginBottom: "14px" }}>
              {col.heading}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {col.items.map((item) => (
                <Link key={item.to} to={item.to} onClick={onClose}
                  style={{ display: "flex", flexDirection: "column", padding: "10px 10px", borderRadius: "10px", textDecoration: "none", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontSize: "13px", fontWeight: 600, color: lblClr, lineHeight: 1.3 }}>{item.label}</span>
                  <span style={{ fontSize: "11px", color: descClr, marginTop: "3px" }}>{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom row */}
        <div style={{ gridColumn: "1 / 5", borderTop: `1px solid ${divider}`, marginTop: "16px", padding: "14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/services" onClick={onClose}
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 700, color: isHome ? "#fff" : "#111", textDecoration: "none", background: isHome ? "hsl(0,0%,14%)" : "#f0f0f0", padding: "10px 18px", borderRadius: "10px", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = isHome ? "hsl(0,0%,18%)" : "#e4e4e4")}
            onMouseLeave={e => (e.currentTarget.style.background = isHome ? "hsl(0,0%,14%)" : "#f0f0f0")}
          >
            <ArrowRight size={14} /> Explore All Services
          </Link>
          <span style={{ fontSize: "13px", color: notSureC }}>
            Not sure? <Link to="/contact" onClick={onClose} style={{ color: notSureL, textDecoration: "none", fontWeight: 600 }}>Tell us what you need →</Link>
          </span>
        </div>
      </div>
    </div>

    {/* Right — pricing cards */}
    <div style={{ width: "220px", flexShrink: 0, borderLeft: leftBdr, display: "flex", flexDirection: "column" }}>
      {/* Subscription card */}
      <Link to="/pricing" onClick={onClose}
        style={{ flex: 1, padding: "28px 22px", textDecoration: "none", background: "linear-gradient(160deg,#7c3ff0 0%,#4b23a8 60%,#120a2e 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "opacity 0.2s", minHeight: "180px", position: "relative", overflow: "hidden" }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        <video src={faalVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.72)", textTransform: "uppercase", marginBottom: "8px" }}>Subscription</p>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: "10px" }}>Monthly dev support for your team</p>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>₹2,499</p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "4px" }}>starting from</p>
        </div>
      </Link>

      {/* Custom project card */}
      <Link to="/contact" onClick={onClose}
        style={{ flex: 1, padding: "28px 22px", textDecoration: "none", background: subBotBg, display: "flex", flexDirection: "column", justifyContent: "space-between", borderTop: subBotBdr, transition: "background 0.2s", minHeight: "180px" }}
        onMouseEnter={e => (e.currentTarget.style.background = subBotHov)}
        onMouseLeave={e => (e.currentTarget.style.background = subBotBg)}
      >
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: subLblC, textTransform: "uppercase", marginBottom: "8px" }}>Custom Project</p>
          <p style={{ fontSize: "13px", fontWeight: 700, color: subTxtC, lineHeight: 1.4, marginBottom: "10px" }}>Well-defined scope &amp; deadline</p>
        </div>
        <div>
          <p style={{ fontSize: "1.4rem", fontWeight: 900, color: priceC, letterSpacing: "-0.03em", lineHeight: 1 }}>₹8,499</p>
          <p style={{ fontSize: "11px", color: subSubC, marginTop: "4px" }}>starting from</p>
        </div>
      </Link>
    </div>
  </motion.div>
  );
};
// ── Main Navbar ────────────────────────────────────────────────
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();

  const isHome   = pathname === "/";
  const navBg    = isHome ? "hsl(0,0%,7%)"  : "#fff";
  const navBdr   = isHome ? "1px solid hsl(0,0%,12%)" : "1px solid #e8e8e8";
  const linkClr  = (active: boolean) => active ? (isHome ? "#fff" : "#111") : (isHome ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)");
  const linkActBg= (active: boolean) => active ? (isHome ? "hsl(0,0%,14%)" : "#f0f0f0") : "transparent";
  const hamClr   = isHome ? "#fff" : "#111";
  const hamBdr   = isHome ? "1px solid hsl(0,0%,20%)" : "1px solid #ddd";
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) setHidden(true);
      else setHidden(false);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggle = (label: string) => setActiveDropdown(prev => prev === label ? null : label);

  const NavBtn = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => toggle(label)}
        style={{
          display: "flex", alignItems: "center", gap: "4px",
          padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
          fontSize: "13.5px", fontWeight: 500,
          background: activeDropdown === label ? linkActBg(true) : "transparent",
          color: linkClr(activeDropdown === label),
          transition: "all 0.15s" }}
        onMouseEnter={e => { if (activeDropdown !== label) (e.currentTarget as HTMLElement).style.color = isHome ? "#fff" : "#111"; }}
        onMouseLeave={e => { if (activeDropdown !== label) (e.currentTarget as HTMLElement).style.color = isHome ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"; }}
      >
        {label}
        <ChevronDown size={13} style={{ transition: "transform 0.2s", transform: activeDropdown === label ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      <AnimatePresence>{activeDropdown === label && children}</AnimatePresence>
    </div>
  );

  const NavLink = ({ label, to }: { label: string; to: string }) => (
    <Link to={to}
      style={{
        padding: "8px 12px", borderRadius: "8px", fontSize: "13.5px", fontWeight: 500,
        color: linkClr(pathname === to),
        textDecoration: "none", transition: "color 0.15s",
        background: linkActBg(pathname === to) }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = isHome ? "#fff" : "#111"; }}
      onMouseLeave={e => { if (pathname !== to) (e.currentTarget as HTMLElement).style.color = isHome ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"; }}
    >
      {label}
    </Link>
  );

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px", height: "68px",
          background: navBg, borderBottom: navBdr }}
      >
        {/* inject CTA styles */}
        <style>{CTA_STYLE}</style>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img src={isHome ? logoImg : logoBlack} alt="Anni Web Solutions" style={{ height: "52px", width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          <NavBtn label="Work">
            <SimpleDropdown items={WORK_ITEMS} onClose={() => setActiveDropdown(null)} />
          </NavBtn>

          <NavBtn label="Services">
            <MegaDropdown onClose={() => setActiveDropdown(null)} />
          </NavBtn>

          <NavLink label="AI Automation" to="/ai-automation" />
          <NavLink label="Digital Marketing" to="/digital-marketing" />

          <NavBtn label="Company">
            <SimpleDropdown items={COMPANY_ITEMS} onClose={() => setActiveDropdown(null)} />
          </NavBtn>

          <NavLink label="Pricing" to="/pricing" />
        </div>

        {/* CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/contact"
            className="nav-cta hidden lg:inline-flex"
          >
            <span className="nav-cta-icon">
              <ArrowRight size={13} />
            </span>
            <span className="nav-cta-text">Let's Talk</span>
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            style={{ width: "36px", height: "36px", borderRadius: "8px", border: hamBdr, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Menu size={18} color={hamClr} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "hsl(0,0%,7%)", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "68px", borderBottom: "1px solid hsl(0,0%,12%)" }}>
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <img src={logoImg} alt="Anni" style={{ height: "44px", objectFit: "contain" }} />
              </Link>
              <button onClick={() => setMobileOpen(false)} style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid hsl(0,0%,20%)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={18} color="#fff" />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {/* Work */}
              <MobileGroup label="Work" items={WORK_ITEMS} expanded={mobileExpanded} onToggle={setMobileExpanded} onClose={() => setMobileOpen(false)} />

              {/* Services */}
              <div style={{ borderBottom: "1px solid hsl(0,0%,14%)" }}>
                <button onClick={() => setMobileExpanded(prev => prev === "Services" ? null : "Services")}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", background: "transparent", border: "none", cursor: "pointer" }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>Services</span>
                  <ChevronDown size={16} color="rgba(255,255,255,0.4)" style={{ transform: mobileExpanded === "Services" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "Services" && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} style={{ overflow: "hidden" }}>
                      {SERVICES_COLS.map(col => (
                        <div key={col.heading} style={{ paddingBottom: "12px" }}>
                          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", padding: "8px 12px 4px" }}>{col.heading}</p>
                          {col.items.map(item => (
                            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                              style={{ display: "block", padding: "8px 12px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileLink label="AI Automation" to="/ai-automation" onClose={() => setMobileOpen(false)} />
              <MobileLink label="Digital Marketing" to="/digital-marketing" onClose={() => setMobileOpen(false)} />
              <MobileGroup label="Company" items={COMPANY_ITEMS} expanded={mobileExpanded} onToggle={setMobileExpanded} onClose={() => setMobileOpen(false)} />
              <MobileLink label="Pricing" to="/pricing" onClose={() => setMobileOpen(false)} />
            </div>

            <div style={{ padding: "20px 24px", borderTop: "1px solid hsl(0,0%,12%)" }}>
              <button onClick={() => { setMobileOpen(false); setContactOpen(true); }}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#fff", color: "#111", borderRadius: "12px", padding: "14px", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer" }}>
                <ArrowRight size={16} /> Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

// ── Mobile helpers ─────────────────────────────────────────────
const MobileLink = ({ label, to, onClose }: { label: string; to: string; onClose: () => void }) => (
  <div style={{ borderBottom: "1px solid hsl(0,0%,14%)" }}>
    <Link to={to} onClick={onClose}
      style={{ display: "block", padding: "14px 0", fontSize: "16px", fontWeight: 600, color: "#fff", textDecoration: "none" }}>
      {label}
    </Link>
  </div>
);

const MobileGroup = ({ label, items, expanded, onToggle, onClose }: {
  label: string;
  items: { label: string; to: string; desc?: string; badge?: string }[];
  expanded: string | null;
  onToggle: (v: string | null) => void;
  onClose: () => void;
}) => (
  <div style={{ borderBottom: "1px solid hsl(0,0%,14%)" }}>
    <button onClick={() => onToggle(expanded === label ? null : label)}
      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", background: "transparent", border: "none", cursor: "pointer" }}>
      <span style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>{label}</span>
      <ChevronDown size={16} color="rgba(255,255,255,0.4)" style={{ transform: expanded === label ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
    </button>
    <AnimatePresence>
      {expanded === label && (
        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} style={{ overflow: "hidden" }}>
          <div style={{ paddingBottom: "8px" }}>
            {items.map(item => (
              <Link key={item.to} to={item.to} onClick={onClose}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                {item.label}
                {item.badge && <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "999px", background: "#4ade80", color: "#000" }}>{item.badge}</span>}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Navbar;
