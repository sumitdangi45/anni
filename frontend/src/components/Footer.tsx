import { Link } from "react-router-dom";
import logoImg from "@/assets/logow.png";

const Footer = () => {
  return (
    <footer style={{ background: "#0a0a0a", color: "#fff" }}>

      {/* ── Top section — 4 columns ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "80px 20px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "60px" }}>

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" style={{ display: "inline-block", marginBottom: "20px" }}>
              <img src={logoImg} alt="Anni Web Solutions" style={{ height: "44px", width: "auto", objectFit: "contain" }} />
            </Link>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: 1.8, marginBottom: "36px", maxWidth: "280px" }}>
              Anni Web Solutions is a founder-friendly tech agency helping startups build digital products, web apps, mobile apps and AI solutions through custom development and project partnerships.
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "#fff", color: "#111",
                borderRadius: "12px", padding: "11px 20px 11px 11px",
                fontSize: "16px", fontWeight: 700, textDecoration: "none",
                transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
              Start a Project
            </a>
          </div>

          {/* Col 2 — Anni Web Solutions */}
          <div>
            <p style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "20px" }}>Anni Web Solutions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "About Us", to: "/about" },
                { label: "Our Work", to: "/projects" },
                { label: "Case Studies", to: "/projects" },
                { label: "Testimonials", to: "/#testimonials" },
                { label: "Blog", to: "/blogs" },
                { label: "Internship Catalyst", to: "/internship", badge: "NEW" },
                { label: "Contact", to: "/contact" },
              ].map(({ label, to, badge }) => (
                <Link key={label} to={to}
                  style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {label}
                  {badge && (
                    <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "999px", background: "#6b7eff", color: "#fff", letterSpacing: "0.06em" }}>
                      {badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "20px" }}>Services</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Web Development", to: "/services/web-development" },
                { label: "Mobile App Development", to: "/services/mobile" },
                { label: "AI / ML Solutions", to: "/services/ai" },
                { label: "SaaS Development", to: "/services/saas" },
                { label: "UI/UX Design", to: "/services/design" },
                { label: "AI Automation", to: "/ai-automation" },
                { label: "Digital Growth & SEO", to: "/digital-marketing" },
              ].map(({ label, to }) => (
                <Link key={label} to={to}
                  style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 — More Services */}
          <div>
            <p style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "20px" }}>Solutions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Prebuilt SaaS Products", to: "/work/prebuilt", badge: "NEW" },
                { label: "Custom Web Apps", to: "/work/custom" },
                { label: "Business Automation", to: "/ai-automation" },
                { label: "E-Commerce Platforms", to: "/services/web-development" },
                { label: "Enterprise Solutions", to: "/services/saas" },
                { label: "Startup MVP Build", to: "/contact" },
                { label: "Pricing Plans", to: "/pricing" },
              ].map(({ label, to, badge }) => (
                <Link key={label} to={to}
                  style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {label}
                  {badge && (
                    <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "999px", background: "#4ade80", color: "#000", letterSpacing: "0.06em" }}>
                      {badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", maxWidth: "1320px", margin: "0 auto" }} />

      {/* ── Middle section — We Build For + Case Studies + Resources ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr", gap: "60px" }}>

          {/* We Build For */}
          <div>
            <p style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>We Build For</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Startups", "Scale-ups", "SaaS", "B2B", "Fintech", "EdTech", "E-Commerce", "AI Companies", "Healthcare", "IT"].map(tag => (
                <span key={tag} style={{
                  fontSize: "16px", fontWeight: 600, padding: "5px 12px", borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.04em", textTransform: "uppercase" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div>
            <p style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Recent Projects</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { text: "AI Dashboard — SaaS Platform for Freight Teams", link: "/projects" },
                { text: "FinTech Mobile App — Cross-platform Trading App", link: "/projects" },
                { text: "Enterprise Messenger — Encrypted B2B Communication", link: "/projects" },
                { text: "E-Commerce Platform — AI-powered Product Recommendations", link: "/projects" },
                { text: "Blockchain AI Agent — Web3 Automation Platform", link: "/projects" },
              ].map(({ text, link }) => (
                <a key={text} href={link}
                  style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", textDecoration: "none", lineHeight: 1.5, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#6b7eff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Resources</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Blog & Insights", to: "/blogs" },
                { label: "FAQ", to: "/faq" },
                { label: "Pricing Guide", to: "/pricing" },
                { label: "Tech Stack", to: "/about" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms & Conditions", to: "/terms" },
                { label: "Refund Policy", to: "/refund-policy" },
              ].map(({ label, to }) => (
                <Link key={label} to={to}
                  style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", maxWidth: "1320px", margin: "0 auto" }} />

      {/* ── Social pills row ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { label: "X.COM", href: "https://x.com" },
            { label: "LINKEDIN", href: "https://linkedin.com" },
            { label: "INSTAGRAM", href: "https://instagram.com" },
            { label: "GITHUB", href: "https://github.com/sumitdangi45" },
            { label: "DRIBBBLE", href: "https://dribbble.com" },
            { label: "BEHANCE", href: "https://behance.net" },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: "16px", fontWeight: 700, padding: "6px 14px", borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)",
                textDecoration: "none", letterSpacing: "0.06em", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", maxWidth: "1320px", margin: "0 auto" }} />

      {/* ── Bottom copyright row ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.65)" }}>
              © 2025 Anni Web Solutions Pvt. Ltd. | All rights reserved.
            </p>
            <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>
              India — Building digital products for the world.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.65)" }}>
              Built with precision & pixel love 💙
            </span>
            <div style={{ display: "flex", gap: "16px" }}>
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(item => (
                <a key={item} href="#"
                  style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Giant brand name at bottom ── */}
      <div style={{ overflow: "hidden", paddingBottom: "0", lineHeight: 0.85, userSelect: "none" }}>
        <p style={{
          fontSize: "clamp(5rem, 14vw, 14rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.04)",
          letterSpacing: "-0.04em",
          textAlign: "center",
          whiteSpace: "nowrap",
          margin: 0,
          lineHeight: 0.85 }}>
          anni web solutions
        </p>
      </div>

    </footer>
  );
};

export default Footer;
