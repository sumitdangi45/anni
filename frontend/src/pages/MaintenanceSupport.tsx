import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Globe, Server, Bell, RefreshCw, Clock, Zap, Lock, BarChart2, MessageCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const MAINTENANCE_FAQ = [
  { q: "What does website and app maintenance include?", a: "Our maintenance service covers security patches, dependency updates, bug fixes, performance optimization, uptime monitoring, backups, content updates, compatibility checks and technical support — everything needed to keep your product healthy after launch." },
  { q: "Why do deployed websites and apps still need maintenance?", a: "Software dependencies, frameworks, plugins and third-party services are updated regularly. Newly discovered vulnerabilities can affect already-deployed software. Without ongoing maintenance, your product becomes slower, less secure and increasingly unreliable over time." },
  { q: "How often do you perform maintenance updates?", a: "Routine checks and monitoring happen continuously. Dependency and security updates are applied as they become available. Bug fixes and performance improvements are addressed based on priority and your plan." },
  { q: "Do you provide emergency support for critical issues?", a: "Yes. All our maintenance plans include incident response for critical issues — server outages, security incidents, broken functionality and other production emergencies." },
  { q: "Can you maintain a product you didn't build?", a: "Yes. We can take over maintenance of existing websites and applications built by any team or agency. We'll conduct a technical audit first to understand the codebase and infrastructure." },
  { q: "Do you handle backups?", a: "Yes. Regular automated backups of your website files, database and configurations are part of our maintenance service, with tested restoration procedures." },
  { q: "Is maintenance available as a monthly subscription?", a: "Yes. We offer monthly maintenance plans tailored to the size and complexity of your product — from simple websites to complex web applications and mobile apps." },
  { q: "How do we get started?", a: "Contact us with details about your website or application. We'll conduct a quick technical review and recommend the right maintenance plan for your product." },
];

const USP = [
  { icon: <Shield size={22} strokeWidth={1.5} />, title: "Security First", desc: "Ongoing vulnerability monitoring, security patches and dependency updates — because threats don't stop after launch." },
  { icon: <Clock size={22} strokeWidth={1.5} />, title: "Reliable Uptime", desc: "Proactive monitoring catches issues before they impact your users or business operations." },
  { icon: <RefreshCw size={22} strokeWidth={1.5} />, title: "Always Updated", desc: "Framework, plugin, SDK and dependency updates applied regularly to keep your product current and compatible." },
  { icon: <Zap size={22} strokeWidth={1.5} />, title: "Fast Response", desc: "Dedicated technical support and incident response when something needs immediate attention." },
];

const SERVICES = [
  {
    title: "Website Maintenance",
    subtitle: "Keep your website fresh, secure and running smoothly.",
    desc: "We handle the ongoing technical work required to keep business websites healthy, secure and performing well after launch.",
    points: [
      "Website updates, content changes and page additions.",
      "Bug fixes and technical troubleshooting.",
      "Plugin, framework and dependency updates.",
      "Broken links, forms and functionality checks.",
      "Performance and loading-speed optimization.",
      "Regular website health monitoring and reporting.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false,
  },
  {
    title: "Web Application Maintenance",
    subtitle: "Keep your business application reliable as requirements grow.",
    desc: "We maintain existing web applications and continuously improve their functionality, performance and stability for growing user bases.",
    points: [
      "Application bug fixing and technical troubleshooting.",
      "Backend, API and database maintenance.",
      "Feature improvements and incremental enhancements.",
      "Third-party API and integration maintenance.",
      "Performance improvements and scalability work.",
      "Production issue investigation and resolution.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true,
  },
  {
    title: "Mobile App Maintenance",
    subtitle: "Keep your Android and iOS apps working as platforms evolve.",
    desc: "Mobile applications depend on OS updates, SDKs, libraries and third-party services — all of which change regularly and require ongoing maintenance.",
    points: [
      "Android and iOS compatibility updates.",
      "Framework, React Native and SDK updates.",
      "Third-party library and dependency updates.",
      "Crash reporting, diagnosis and performance fixes.",
      "API and backend compatibility maintenance.",
      "App Store and Play Store update support.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true,
  },
  {
    title: "Security & Vulnerability Management",
    subtitle: "Protect your deployed product from newly discovered threats.",
    desc: "Newly discovered vulnerabilities can affect already-deployed software. We continuously monitor and address security risks across your technology stack.",
    points: [
      "Dependency vulnerability monitoring and patching.",
      "Security update implementation as patches are released.",
      "SSL/TLS certificate management and renewal.",
      "Security configuration reviews and hardening.",
      "Incident response for security-related issues.",
      "Security monitoring and anomaly alerting.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#2a1010 100%)",
    dark: true,
  },
  {
    title: "Performance & Uptime Monitoring",
    subtitle: "Catch issues before your users do.",
    desc: "Continuous monitoring ensures your website and applications stay fast, available and performing well — with alerts and rapid response when something needs attention.",
    points: [
      "Uptime monitoring with automated alerting.",
      "Page speed and Core Web Vitals tracking.",
      "Server performance and resource monitoring.",
      "Error tracking and anomaly detection.",
      "Monthly performance reports and insights.",
      "Proactive identification of performance regressions.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    dark: false,
  },
  {
    title: "Backup & Disaster Recovery",
    subtitle: "Protect your data and recover quickly when things go wrong.",
    desc: "Regular automated backups with tested restoration procedures ensure your business data and application state can be recovered quickly from any incident.",
    points: [
      "Automated regular backups of files and database.",
      "Offsite and redundant backup storage.",
      "Tested backup restoration procedures.",
      "Application state and configuration backups.",
      "Rapid recovery support for production incidents.",
      "Backup monitoring and failure alerting.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false,
  },
];

const WHAT_WE_MAINTAIN = [
  { icon: <Globe size={20} />, title: "Business Websites", desc: "Company sites, landing pages and marketing websites." },
  { icon: <Server size={20} />, title: "Web Applications", desc: "Custom platforms, dashboards, portals and SaaS products." },
  { icon: <Smartphone size={20} />, title: "Mobile Apps", desc: "Android and iOS applications built on any stack." },
  { icon: <Shield size={20} />, title: "E-commerce Stores", desc: "Online stores, product catalogs and checkout systems." },
  { icon: <Bell size={20} />, title: "APIs & Backends", desc: "REST APIs, microservices and backend infrastructure." },
  { icon: <Lock size={20} />, title: "Third-Party Integrations", desc: "CRMs, payment gateways and connected services." },
];

const PLAN_INCLUDES = [
  { icon: <CheckCircle size={16} />, text: "Security & dependency updates" },
  { icon: <CheckCircle size={16} />, text: "Bug fixes & troubleshooting" },
  { icon: <CheckCircle size={16} />, text: "Uptime & performance monitoring" },
  { icon: <CheckCircle size={16} />, text: "Automated backups" },
  { icon: <CheckCircle size={16} />, text: "Content & page updates" },
  { icon: <CheckCircle size={16} />, text: "Technical support & incident response" },
  { icon: <CheckCircle size={16} />, text: "Monthly health report" },
  { icon: <CheckCircle size={16} />, text: "SSL & certificate management" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Audit", desc: "Review your existing product, codebase, infrastructure and current issues." },
  { num: "02", title: "Onboard", desc: "Set up monitoring, backups, access and our maintenance workflows." },
  { num: "03", title: "Stabilize", desc: "Address any existing issues, security gaps or performance problems." },
  { num: "04", title: "Monitor", desc: "Continuous uptime, performance and security monitoring begins." },
  { num: "05", title: "Maintain", desc: "Regular updates, fixes and improvements on an ongoing basis." },
  { num: "06", title: "Report", desc: "Monthly reports on health, updates applied and actions taken." },
];

const MockImg = ({ gradient, dark }: { gradient: string; dark: boolean }) => (
  <div style={{ width: "100%", height: "100%", background: gradient, borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", minHeight: "260px" }}>
    <div style={{ width: "55%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)" }} />
    <div style={{ width: "75%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)" }} />
    <div style={{ flex: 1, borderRadius: "12px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", marginTop: "8px" }} />
    <div style={{ display: "flex", gap: "8px" }}>
      {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: "40px", borderRadius: "8px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }} />)}
    </div>
  </div>
);

const ServiceRow = ({ s, i }: { s: typeof SERVICES[0]; i: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgLeft = s.img === "left";
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
      style={{ display: "flex", gap: "60px", alignItems: "center", flexDirection: imgLeft ? "row" : "row-reverse", padding: "60px 0", borderBottom: i < SERVICES.length - 1 ? "1px solid #f0f0f0" : "none" }}
    >
      <div style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        <MockImg gradient={s.gradient} dark={s.dark} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{s.subtitle}</p>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>{s.title}</h3>
        <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", minWidth: "22px", paddingTop: "1px" }}>0{pi+1}</span>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.65 }}>{pt}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
          
        >
          <WhatsAppIcon size={15} /> Get Maintenance Support
        </a>
      </div>
    </motion.div>
  );
};

const MaintenanceSupport = () => {
  useSEO({
    title: "Website & App Maintenance — Anni Web Solutions",
    description: "Ongoing website and app maintenance — security updates, bug fixes, performance monitoring, backups and technical support as a monthly subscription.",
  });

  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null); const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null); const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const planRef = useRef(null); const planInView = useInView(planRef, { once: true, margin: "-60px" });
  const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const catRef = useRef(null); const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref}>
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "transparent", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "300px 300px" }} />
          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>WEBSITE & APP MAINTENANCE</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Your digital product shouldn't
              <br />stop after launch.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We keep your websites and applications secure, updated, fast and reliable with ongoing maintenance, monitoring, technical support and continuous improvements — so your team can focus on the business while we take care of the technology.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
                
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Get a Maintenance Plan
              </a>
              <a href="#catalog" style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#333", border: "1.5px solid #ccc", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}
          >
            <img src={batchImg} alt="Trusted Maintenance Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* USP */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }}>
          {USP.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={uspInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ color: "#6b7eff", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <LogoMarquee />

      {/* What we maintain */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE MAINTAIN</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Any product. Any stack. Ongoing.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHAT_WE_MAINTAIN.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan includes — dark */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={planRef}>
          <div style={{ display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={planInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
                style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>EVERY PLAN INCLUDES</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 14 }} animate={planInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: "16px" }}>
                Everything needed to keep your product healthy.
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={planInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
                style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "32px" }}>
                A single monthly plan covers everything your product needs to stay secure, reliable and performing — without managing multiple vendors.
              </motion.p>
              <motion.a href="/contact" initial={{ opacity: 0, y: 10 }} animate={planInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#111", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")} onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Get a Plan
              </motion.a>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={planInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ flex: 1, minWidth: "280px", background: "hsl(0,0%,10%)", borderRadius: "20px", padding: "32px", border: "1px solid hsl(0,0%,15%)" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {PLAN_INCLUDES.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ color: "#4ade80", flexShrink: 0 }}>{item.icon}</div>
                    <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service catalog */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>Our Maintenance Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Maintenance Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>HOW WE ONBOARD</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From handover to ongoing support.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>READY TO HAND IT OVER?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let us handle the technical side
            <br />so you can focus on the business.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            Whether you have a website, web application or mobile app, we'll take care of the ongoing maintenance, monitoring and support so it stays healthy.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
              
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
              Get a Maintenance Plan
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f5f5f5", color: "#111", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#ebebeb")} onMouseLeave={e => (e.currentTarget.style.background = "#f5f5f5")}
            >
              <WhatsAppIcon size={15} /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={MAINTENANCE_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our website and app maintenance service, what's included and how it works." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default MaintenanceSupport;
