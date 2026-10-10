import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    title: "SEO & Google Visibility",
    desc: "Rank higher on Google and get discovered by customers actively searching for your services. We handle on-page, off-page and technical SEO.",
    points: [
      "Full website SEO audit, keyword research and competitor analysis.",
      "On-page optimization, meta tags, schema markup and content strategy.",
      "Google Business Profile (GMB) optimization and local SEO for city-level ranking.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "Social Media Management & Account Handling",
    desc: "Complete end-to-end management of your social media profiles. We handle monthly content planning, graphic post creation, scheduling, caption writing, and active audience engagement.",
    points: [
      "Full account management across Instagram, Facebook, LinkedIn, YouTube, and X (Twitter).",
      "Monthly content calendars, custom graphic post designs, carousel infographics, and copywriting.",
      "Active community management, DM/comment responses, hashtag strategy, and growth analytics.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    title: "Video Shooting & Professional Editing",
    desc: "High-quality brand video shoots, cinematic product shoots, trending reel editing, color grading, sound design, and viral short-form content production.",
    points: [
      "Professional product & brand video shoots with studio-grade lighting and camera gear.",
      "Cinematic video editing, trending Instagram Reel & YouTube Shorts hooks, transitions, and color grading.",
      "High-engagement video scripts, voiceover integration, and sound design tailored for viral reach.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#2a1010 100%)",
    dark: true },
  {
    title: "Brand Creation & Visual Identity",
    desc: "Build a premium, memorable brand identity. We craft custom logos, brand guidelines, visual templates, and storytelling that make your business stand out.",
    points: [
      "Custom logo design, brand color palettes, typography specifications, and brand style guides.",
      "High-quality graphic templates for social media, marketing collateral, brochures, and digital banners.",
      "Strategic brand positioning and narrative development to build customer trust and strong brand recall.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    dark: false },
  {
    title: "Paid Ads Setup & Performance Marketing",
    desc: "Launch high-converting advertising campaigns. We build, write, and manage ad funnels on Meta (Facebook & Instagram), Google Ads, YouTube, and LinkedIn.",
    points: [
      "Targeted audience setup, custom ad copy writing, and A/B tested creative variations.",
      "Daily bid & budget management, negative keyword filtering, and conversion funnel tuning.",
      "Meta Pixel & Google Conversion tracking integration to measure exact Return on Ad Spend (ROAS).",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "WhatsApp Marketing & Automation",
    desc: "Reach your customers directly on WhatsApp with automated messages, broadcast campaigns, and intelligent chatbot flows that drive sales 24/7.",
    points: [
      "WhatsApp Business API setup with bulk broadcast campaigns and personalized messaging.",
      "Automated follow-up sequences, appointment reminders, and lead nurturing flows.",
      "Chatbot integration for instant replies, product showcases, and order confirmations.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e8e8e0 100%)",
    dark: false },
];

// Mock image placeholder
const MockImg = ({ gradient, dark }: { gradient: string; dark: boolean }) => (
  <div style={{
    width: "100%", height: "100%", borderRadius: "16px",
    background: gradient, padding: "24px",
    display: "flex", flexDirection: "column", gap: "10px",
    justifyContent: "center", minHeight: "260px" }}>
    <div style={{ width: "55%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)" }} />
    <div style={{ width: "75%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)" }} />
    <div style={{ flex: 1, borderRadius: "12px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", marginTop: "8px" }} />
    <div style={{ display: "flex", gap: "8px" }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ flex: 1, height: "40px", borderRadius: "8px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }} />
      ))}
    </div>
  </div>
);

const ServiceRow = ({ s, i }: { s: typeof SERVICES[0]; i: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgLeft = s.img === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 }}
      style={{
        display: "flex", gap: "60px", alignItems: "center",
        flexDirection: imgLeft ? "row" : "row-reverse",
        padding: "60px 0",
        borderBottom: i < SERVICES.length - 1 ? "1px solid #f0f0f0" : "none" }}
    >
      {/* Image side */}
      <div style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        <MockImg gradient={s.gradient} dark={s.dark} />
      </div>

      {/* Text side */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>
          {s.title}
        </h3>
        <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "24px" }}>
          {s.desc}
        </p>

        {/* Numbered points */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{
                fontSize: "16px", fontWeight: 800, color: "#6b7eff",
                minWidth: "22px", paddingTop: "1px" }}>
                0{pi + 1}
              </span>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.65 }}>{pt}</p>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/917974135629"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#111", color: "#fff",
            borderRadius: "999px", padding: "11px 22px",
            fontSize: "16px", fontWeight: 700, textDecoration: "none",
            transition: "background 0.2s" }}
          
        >
          <WhatsAppIcon size={15} />
          Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

const MarketingCatalog = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#fff", padding: "80px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div ref={ref} style={{ textAlign: "center", marginBottom: "20px" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "14px" }}
          >
            <span style={{
              display: "inline-block", padding: "5px 14px", borderRadius: "999px",
              background: "#fff0f5", border: "1px solid #fecdd3",
              fontSize: "16px", fontWeight: 700, color: "#e11d48" }}>
              Our Marketing Catalog
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}
          >
            Explore Our Marketing Solutions
          </motion.h2>
        </div>

        {/* Service rows */}
        {SERVICES.map((s, i) => (
          <ServiceRow key={i} s={s} i={i} />
        ))}

        {/* Dark pricing CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: "60px",
            background: "linear-gradient(135deg,#0d0d1a 0%,#1a1a2e 100%)",
            borderRadius: "20px", padding: "40px 48px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}
        >
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "16px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", background: "rgba(107,114,255,0.2)", color: "#6b7eff", marginBottom: "14px" }}>
              🚀 Marketing & Growth Packages
            </span>
            <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>
              Scale Your Brand Reach with
              <br />
              High-ROI Marketing Plans
            </h3>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "20px" }}>
              Transparent pricing for social media handling, video reel production, SEO and high-converting Meta & Google ad campaigns.
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {["Plans from ₹999/month", "100% Zero Hidden Fees", "Custom Quote Available"].map(badge => (
                <span key={badge} style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)", display: "flex", alignItems: "center", gap: "5px" }}>
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
            <a href="/pricing"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#6b7eff", color: "#fff", borderRadius: "12px", padding: "13px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#5a63e0")}
              onMouseLeave={e => (e.currentTarget.style.background = "#6b7eff")}
            >
              Explore All Pricing Plans →
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "12px", padding: "13px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <WhatsAppIcon size={15} /> Get Custom Quote
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MarketingCatalog;
