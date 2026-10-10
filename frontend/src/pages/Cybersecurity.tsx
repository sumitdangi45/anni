import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Shield, Lock, Search, Cloud, Eye, Cpu,
  Globe, Server, Smartphone, Database, AlertTriangle,
  MessageCircle, CheckCircle, Key, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const CYBER_FAQ = [
  { q: "What does a security assessment cover?", a: "A security assessment covers your web application, APIs, authentication mechanisms, access controls, security configurations and infrastructure exposure. You receive a prioritized report of vulnerabilities with severity ratings and remediation guidance." },
  { q: "What is VAPT and how is it different from a security audit?", a: "VAPT (Vulnerability Assessment & Penetration Testing) goes beyond identifying vulnerabilities — it validates whether they can actually be exploited. A security audit typically reviews configuration and compliance. VAPT provides evidence-based findings with business impact context." },
  { q: "Do you test APIs separately from web applications?", a: "Yes. APIs are a distinct attack surface with specific security risks — broken authorization, excessive data exposure, lack of rate limiting. We assess APIs separately using OWASP API Security Top 10 as a baseline." },
  { q: "Can you improve the security of an application you didn't build?", a: "Yes. We can perform a security assessment, identify issues and implement remediation on existing applications regardless of who built them. We'll conduct a brief technical review first." },
  { q: "What is the difference between Cloud Security and Cloud & DevOps?", a: "Cloud & DevOps covers deployment, CI/CD, automation and scaling. Cloud Security focuses on IAM configuration, secrets management, network exposure, hardening and access control — ensuring the infrastructure isn't misconfigured or exposed." },
  { q: "Do you implement MFA and role-based access control?", a: "Yes. We implement multi-factor authentication, role-based access control, secure session management and permission reviews for web applications, SaaS platforms, portals and admin systems." },
  { q: "What security standards do you follow?", a: "We use OWASP Top 10 (2025) for web application security and OWASP API Security Top 10 as baseline frameworks. We also incorporate CERT-In guidance for India-specific operational and incident-response considerations." },
  { q: "How do we get started?", a: "Contact us with details about your website, application or infrastructure. We'll conduct a brief scoping discussion to understand your environment and propose a practical security engagement." },
];

const USP = [
  { icon: <Search size={22} strokeWidth={1.5} />, title: "Developer + Security Mindset", desc: "We understand the application, API and infrastructure layer — not just surface-level checklists." },
  { icon: <Globe size={22} strokeWidth={1.5} />, title: "Web & API Focused", desc: "Strong fit for websites, SaaS, dashboards, portals and digital products — not generic enterprise security." },
  { icon: <Cpu size={22} strokeWidth={1.5} />, title: "AI Ready", desc: "Security considerations for AI applications, APIs, LLM credentials and intelligent workflows." },
  { icon: <CheckCircle size={22} strokeWidth={1.5} />, title: "Practical Remediation", desc: "Not just a vulnerability list — prioritized findings with clear guidance on what to fix and how." },
];

const SERVICES = [
  {
    title: "Website & Web Application Security",
    subtitle: "Find and fix vulnerabilities before attackers do.",
    desc: "We assess websites and web applications for authentication, authorization, configuration and application-level vulnerabilities — and provide a prioritized remediation roadmap.",
    points: [
      "Website and web application security assessment.",
      "Authentication and authorization mechanism review.",
      "Access-control and permission testing.",
      "Security configuration and server-hardening review.",
      "Input validation and injection-risk assessment.",
      "Vulnerability report with prioritized remediation guidance.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#2a1010 100%)",
    dark: true },
  {
    title: "API Security",
    subtitle: "Secure the APIs connecting your digital products.",
    desc: "APIs are a distinct attack surface. We assess REST APIs using OWASP API Security Top 10 as a baseline — covering authorization, authentication and data exposure risks.",
    points: [
      "API endpoint security assessment.",
      "Authentication and authorization testing.",
      "Role-based access control validation.",
      "Rate limiting and abuse protection review.",
      "Sensitive data exposure assessment.",
      "API security recommendations and remediation guidance.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    title: "VAPT & Security Assessment",
    subtitle: "Know exactly where your security weaknesses are.",
    desc: "Vulnerability Assessment & Penetration Testing goes beyond identifying issues — it validates whether vulnerabilities can actually be exploited and provides evidence-based findings.",
    points: [
      "Vulnerability discovery and systematic assessment.",
      "Web application penetration testing (authorized).",
      "API security testing and validation.",
      "Authentication and access-control testing.",
      "Risk classification and severity prioritization.",
      "Detailed security findings with remediation report.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "Cloud & Infrastructure Security",
    subtitle: "Protect the infrastructure behind your applications.",
    desc: "We review cloud infrastructure for misconfiguration, excessive permissions, exposed secrets and hardening gaps — distinct from deployment and DevOps work.",
    points: [
      "Cloud infrastructure security assessment.",
      "Server and container security configuration review.",
      "IAM, roles and access-permission review.",
      "Network, ports and firewall configuration review.",
      "Secrets, credentials and API-key protection.",
      "Backup, logging and monitoring recommendations.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
  {
    title: "Identity, Access & Data Security",
    subtitle: "Make sure the right people access the right data.",
    desc: "We implement and review authentication, MFA, RBAC and access controls — especially important for SaaS, web applications, admin panels and customer portals.",
    points: [
      "Multi-factor authentication (MFA) implementation.",
      "Role-based access control (RBAC) design and review.",
      "User permission and privilege review.",
      "Secure session and authentication configuration.",
      "Sensitive data access controls and encryption review.",
      "API keys, credentials and secrets management.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "Security Monitoring & Incident Readiness",
    subtitle: "Detect suspicious activity and respond before damage spreads.",
    desc: "Security isn't just about fixing vulnerabilities — detection and response matter. We set up monitoring and help you prepare for incidents before they happen.",
    points: [
      "Security log collection and activity monitoring.",
      "Suspicious login and access detection alerts.",
      "Security alert and notification workflows.",
      "Backup and recovery readiness review.",
      "Incident response planning and documentation.",
      "Post-incident security review and remediation.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    title: "Security for AI & SaaS",
    subtitle: "Secure the AI and SaaS systems powering your business.",
    desc: "AI adoption introduces new security surfaces — LLM credentials, prompt injection, data exposure and third-party AI service risks. We assess AI and SaaS products specifically.",
    points: [
      "AI application security assessment.",
      "LLM and AI API credential protection review.",
      "Sensitive data exposure in AI workflows.",
      "SaaS tenant and access-control security review.",
      "Third-party AI and service integration risk assessment.",
      "AI security recommendations and governance guidance.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1a2e 0%,#1a2a44 100%)",
    dark: true },
];

const WHAT_WE_SECURE = [
  { icon: <Globe size={20} />, title: "Websites", desc: "Business websites, CMS platforms and online presences." },
  { icon: <Server size={20} />, title: "Web Applications", desc: "Dashboards, portals, SaaS platforms and business systems." },
  { icon: <Key size={20} />, title: "APIs", desc: "REST APIs, third-party integrations and backend services." },
  { icon: <Smartphone size={20} />, title: "Mobile Backends", desc: "Authentication, APIs and data accessed by mobile apps." },
  { icon: <Cloud size={20} />, title: "Cloud Infrastructure", desc: "Servers, containers, databases and cloud environments." },
  { icon: <Cpu size={20} />, title: "AI Applications", desc: "AI APIs, assistants, agents and data-processing systems." },
];

const SECURITY_AREAS = [
  { label: "Application Security", items: ["Authentication", "Authorization", "Injection", "Session Security"] },
  { label: "API Security", items: ["Access Control", "Rate Limiting", "Data Exposure", "Authentication"] },
  { label: "Infrastructure", items: ["Servers", "Containers", "Cloud Config", "Network"] },
  { label: "Identity", items: ["MFA", "RBAC", "Permissions", "Privileged Access"] },
  { label: "Data", items: ["Encryption", "Sensitive Data", "Backups", "Access Controls"] },
  { label: "Operations", items: ["Logging", "Monitoring", "Patching", "Incident Response"] },
];

const PROCESS_STEPS = [
  { num: "01", title: "Assess", desc: "Understand your applications, infrastructure, data and attack surface." },
  { num: "02", title: "Identify", desc: "Find vulnerabilities, misconfigurations and access-control weaknesses." },
  { num: "03", title: "Prioritize", desc: "Classify issues by severity and business impact." },
  { num: "04", title: "Fix", desc: "Implement or recommend practical, prioritized remediation." },
  { num: "05", title: "Validate", desc: "Retest important fixes and verify improvements." },
  { num: "06", title: "Monitor", desc: "Continue monitoring and improving security as the system evolves." },
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
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{s.subtitle}</p>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>{s.title}</h3>
        <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#ef4444", minWidth: "22px", paddingTop: "1px" }}>0{pi+1}</span>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.65 }}>{pt}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
          
        >
          <WhatsAppIcon size={15} /> Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

const Cybersecurity = () => {
  useSEO({
    title: "Cybersecurity & Digital Security — Anni Web Solutions",
    description: "Website security, API security, VAPT, cloud security, MFA/RBAC implementation, security monitoring and AI application security for startups and growing businesses." });

  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null); const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null); const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const areasRef = useRef(null); const areasInView = useInView(areasRef, { once: true, margin: "-60px" });
  const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const catRef = useRef(null); const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref}>

        {/* Hero — dark red/security themed */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "linear-gradient(150deg,#1a0505 0%,#2a0a0a 50%,#0d0d0d 100%)", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div style={{ position: "absolute", top: "-40px", right: "15%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)" }} />

          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(239,68,68,0.7)", marginBottom: "20px" }}>CYBERSECURITY & DIGITAL SECURITY</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Secure your digital business
              <br />before threats become problems.
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We help businesses protect websites, web applications, APIs, cloud systems and digital data through practical security assessments, vulnerability testing, access controls, monitoring and security improvements.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ef4444", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#dc2626")} onMouseLeave={e => (e.currentTarget.style.background = "#ef4444")}
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Request Security Assessment
              </a>
              <a href="#catalog" style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}
          >
            <img src={batchImg} alt="Top Cybersecurity Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* USP */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }}>
          {USP.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={uspInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ color: "#ef4444", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <LogoMarquee />

      {/* What we secure */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#ef4444", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE SECURE</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Protect every layer of your digital product.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHAT_WE_SECURE.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <div style={{ color: "#ef4444", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service catalog */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#fff0f0", border: "1px solid #fecaca", fontSize: "16px", fontWeight: 700, color: "#dc2626" }}>Our Security Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Security Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Security areas — dark */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={areasRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={areasInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#ef4444", textTransform: "uppercase", marginBottom: "12px" }}>SECURITY AREAS WE CHECK</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={areasInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              A practical security checklist.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {SECURITY_AREAS.map((area, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={areasInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#ef4444", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>{area.label}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {area.items.map(item => (
                    <span key={item} style={{ fontSize: "16.5px", padding: "3px 8px", borderRadius: "999px", background: "hsl(0,0%,15%)", color: "rgba(255,255,255,0.78)", border: "1px solid hsl(0,0%,18%)" }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#ef4444", textTransform: "uppercase", marginBottom: "12px" }}>SECURITY FRAMEWORK</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Assess. Fix. Protect. Monitor.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#ef4444", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#0a0505", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#ef4444", textTransform: "uppercase", marginBottom: "16px" }}>IS YOUR APPLICATION ACTUALLY SECURE?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Find the weak points
            <br />before someone else does.
          </h2>
          <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "32px" }}>
            Get a practical security assessment of your website, web application, API or digital product and understand what needs to be fixed — with clear, prioritized guidance.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ef4444", color: "#fff", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#dc2626")} onMouseLeave={e => (e.currentTarget.style.background = "#ef4444")}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
              Request Security Assessment
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")} onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <WhatsAppIcon size={15} /> Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={CYBER_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our cybersecurity services, security assessments, VAPT, API security and cloud security." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Cybersecurity;
