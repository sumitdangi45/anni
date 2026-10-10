import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Cloud, GitBranch, Box, BarChart2, Shield, DollarSign,
  Cpu, Server, Zap, Lock, RefreshCw, MessageCircle, Activity, Database } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const CLOUD_FAQ = [
  { q: "Which cloud providers do you work with?", a: "We work primarily with AWS, Google Cloud Platform and DigitalOcean. We choose the cloud provider that best fits your workload, budget and operational requirements." },
  { q: "Can you migrate our existing application to the cloud?", a: "Yes. We handle application and database migration, environment setup, domain and SSL configuration, and deployment architecture — including moving from shared hosting, VPS or on-premise to cloud infrastructure." },
  { q: "What is CI/CD and why does it matter?", a: "CI/CD (Continuous Integration / Continuous Deployment) automates the process of testing code and deploying it to production. It reduces manual effort, catches issues early and makes releases repeatable and consistent." },
  { q: "Do you work with Docker and Kubernetes?", a: "Yes. We containerize applications using Docker and deploy on Kubernetes where orchestration is appropriate. We also work with managed Kubernetes services like EKS, GKE and DigitalOcean Kubernetes." },
  { q: "What is FinOps and do I need it?", a: "FinOps is the practice of understanding and optimizing your cloud spending. As applications grow — especially those with AI workloads — cloud costs can increase significantly. We help identify waste, right-size resources and set up cost monitoring." },
  { q: "Can you build infrastructure for AI and ML applications?", a: "Yes. We set up deployment environments for AI APIs, LLM integrations, inference services and GPU-enabled workloads — including monitoring and cost tracking for AI infrastructure." },
  { q: "Do you set up monitoring and alerting?", a: "Yes. We set up application monitoring, centralized logging, error tracking, infrastructure metrics and alert configurations so your team knows what's happening in production." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll review your current infrastructure, application requirements and goals — and recommend a practical cloud and DevOps setup for your situation." },
];

const USP = [
  { icon: <GitBranch size={22} strokeWidth={1.5} />, title: "Development + DevOps", desc: "The team building your application understands the infrastructure running it — no disconnect between dev and ops." },
  { icon: <Zap size={22} strokeWidth={1.5} />, title: "Automation First", desc: "Reduce repetitive deployment and operational work with automated pipelines, testing and release workflows." },
  { icon: <DollarSign size={22} strokeWidth={1.5} />, title: "Cost Conscious", desc: "Infrastructure decisions consider performance and ongoing operating costs — not just technical capability." },
  { icon: <Cpu size={22} strokeWidth={1.5} />, title: "AI Ready", desc: "Architecture designed to support LLM APIs, AI inference, GPU workloads and AI-powered applications." },
];

const SERVICES = [
  {
    title: "Cloud Deployment & Migration",
    subtitle: "Move your applications to the cloud without unnecessary complexity.",
    desc: "We help businesses deploy new products and modernize existing applications with cloud infrastructure designed around their actual workloads.",
    points: [
      "Cloud deployment for websites, APIs and applications.",
      "Application and database migration to cloud infrastructure.",
      "Production and staging environment setup.",
      "Domain, SSL, DNS and networking configuration.",
      "Cloud storage, compute and server configuration.",
      "Deployment architecture designed for future scaling.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "CI/CD & DevOps Automation",
    subtitle: "Ship new features without turning every release into manual work.",
    desc: "We automate the path from code to production so development teams can release software faster, more consistently and with less risk.",
    points: [
      "Automated build and deployment pipelines.",
      "Git-based CI/CD workflows (GitHub Actions, etc.).",
      "Automated testing integration before deployment.",
      "Staging and production environment management.",
      "Automated rollback and release management.",
      "Deployment approvals and environment controls.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    title: "Docker & Kubernetes",
    subtitle: "Package, deploy and scale applications consistently.",
    desc: "We use containers and orchestration where they make sense for your application's workload and operational requirements.",
    points: [
      "Application containerization with Docker.",
      "Production-ready container configuration and optimization.",
      "Kubernetes application deployment and configuration.",
      "Container scaling and resource management.",
      "Service configuration and environment management.",
      "Managed Kubernetes (EKS, GKE, DigitalOcean K8s) deployment.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "Monitoring, Observability & Reliability",
    subtitle: "Know what's happening in production before your users tell you.",
    desc: "We build monitoring and observability systems that help teams understand application health, performance and failures in real time.",
    points: [
      "Application and server performance monitoring.",
      "Centralized logging and error tracking.",
      "Infrastructure and resource utilization monitoring.",
      "Performance and availability metrics dashboards.",
      "Alerts for critical failures and production incidents.",
      "Health checks and production diagnostics.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    dark: false },
  {
    title: "Cloud Security, Backup & Disaster Recovery",
    subtitle: "Build infrastructure that can handle failures, not just normal days.",
    desc: "Cloud infrastructure needs security and recovery planning built alongside deployment — not added after an incident.",
    points: [
      "IAM and cloud access configuration and hardening.",
      "Secure secrets and credential management.",
      "Network and infrastructure security configuration.",
      "Automated application and database backups.",
      "Disaster recovery planning and documentation.",
      "Recovery testing and operational runbooks.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a0a 0%,#2a1010 100%)",
    dark: true },
  {
    title: "Cloud Cost Optimization & FinOps",
    subtitle: "Control infrastructure costs as your product grows.",
    desc: "Cloud costs can become a significant business problem — especially with AI and GPU workloads. We help identify waste and build sustainable infrastructure spend.",
    points: [
      "Cloud infrastructure cost analysis and reporting.",
      "Resource right-sizing and compute optimization.",
      "Unused resource identification and cleanup.",
      "Storage, compute and database cost optimization.",
      "Usage and cost monitoring and alerting.",
      "AI and GPU workload cost optimization.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    title: "AI Cloud Infrastructure",
    subtitle: "Build infrastructure ready for modern AI workloads.",
    desc: "As AI becomes core to business applications, the infrastructure supporting it needs specific design — for deployment, scaling, reliability and cost.",
    points: [
      "AI application deployment and infrastructure setup.",
      "LLM, AI API and inference environment configuration.",
      "GPU-enabled workload planning and deployment.",
      "Scalable AI inference infrastructure.",
      "AI workload monitoring and cost tracking.",
      "Production deployment for AI-powered applications.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
];

const WHAT_WE_MANAGE = [
  { icon: <Cloud size={20} />, title: "Cloud Infrastructure", desc: "Deploy and manage applications, databases, storage and infrastructure." },
  { icon: <GitBranch size={20} />, title: "CI/CD Pipelines", desc: "Automate testing, builds and production releases." },
  { icon: <Box size={20} />, title: "Containers", desc: "Docker and Kubernetes-based application environments." },
  { icon: <Activity size={20} />, title: "Observability", desc: "Logs, metrics, alerts and production monitoring." },
  { icon: <Shield size={20} />, title: "Cloud Security", desc: "Access controls, secrets, hardening and disaster recovery." },
  { icon: <DollarSign size={20} />, title: "Cloud Costs", desc: "Resource optimization and FinOps practices." },
];

const DEVOPS_STACK = [
  { category: "Source Control", items: ["Git", "GitHub", "Branching Workflows"] },
  { category: "CI/CD", items: ["Automated Build", "Test", "Deploy", "Rollback"] },
  { category: "Containers", items: ["Docker", "Container Registries"] },
  { category: "Orchestration", items: ["Kubernetes", "EKS", "GKE", "Managed K8s"] },
  { category: "Infrastructure", items: ["AWS", "GCP", "DigitalOcean", "Networking", "Storage"] },
  { category: "Observability", items: ["Logs", "Metrics", "Alerts", "Health Checks"] },
  { category: "AI Infrastructure", items: ["LLM APIs", "GPU Workloads", "Inference"] },
  { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Managed DBs"] },
];

const PROCESS_STEPS = [
  { num: "01", title: "Assess", desc: "Understand your application, traffic, infrastructure and business requirements." },
  { num: "02", title: "Architect", desc: "Design cloud architecture, environments, networking and deployment strategy." },
  { num: "03", title: "Containerize", desc: "Package applications and dependencies consistently where appropriate." },
  { num: "04", title: "Automate", desc: "Build CI/CD pipelines for repeatable testing and deployment." },
  { num: "05", title: "Monitor", desc: "Set up logs, metrics, alerts and production visibility." },
  { num: "06", title: "Optimize", desc: "Continuously improve reliability, performance, security and costs." },
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
          <WhatsAppIcon size={15} /> Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

const CloudDevOps = () => {
  useSEO({
    title: "Cloud & DevOps — Anni Web Solutions",
    description: "Cloud deployment, CI/CD automation, Docker, Kubernetes, monitoring, cloud security, FinOps and AI cloud infrastructure for startups and growing businesses." });

  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null); const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null); const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const stackRef = useRef(null); const stackInView = useInView(stackRef, { once: true, margin: "-60px" });
  const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const catRef = useRef(null); const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref}>

        {/* Hero — dark blue */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "linear-gradient(150deg,#0a1628 0%,#1a2744 60%,#0d0d1a 100%)", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(107,114,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(107,114,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div style={{ position: "absolute", top: "-40px", right: "15%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(107,114,255,0.12) 0%, transparent 70%)" }} />

          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(107,114,255,0.8)", marginBottom: "20px" }}>CLOUD & DEVOPS</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Deploy faster. Scale smarter.
              <br />Run with confidence.
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We build reliable cloud infrastructure and automated DevOps workflows that help businesses launch faster, improve application reliability, control infrastructure costs and scale digital products with confidence.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#6b7eff", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#5a63e0")} onMouseLeave={e => (e.currentTarget.style.background = "#6b7eff")}
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Start a Project
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
            <img src={batchImg} alt="Top Cloud & DevOps Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
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
      <SelectedWorkSection label="SELECTED CLOUD WORK" heading="Infrastructure that ships products and scales businesses." />

      {/* What we manage */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE MANAGE</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From application deployment to production operations.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHAT_WE_MANAGE.map((item, i) => (
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

      {/* Service catalog */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>Our Cloud & DevOps Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Cloud & DevOps Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* DevOps stack — dark */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={stackRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={stackInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>DEVOPS CAPABILITIES</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={stackInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Build once. Automate the path to production.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {DEVOPS_STACK.map((group, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={stackInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.06 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "22px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>{group.category}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.items.map(item => (
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
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>OUR CLOUD & DEVOPS PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From infrastructure planning to reliable production.
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
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>IS YOUR INFRASTRUCTURE SLOWING YOU DOWN?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's build a cloud setup
            <br />that can grow with you.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            From your first production deployment to scalable cloud infrastructure, automated releases and ongoing optimization — we'll help you build a reliable path from code to production.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
              
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
              Start a Project
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

      <FAQSection faqs={CLOUD_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our cloud deployment, CI/CD, Kubernetes, monitoring, FinOps and AI infrastructure services." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default CloudDevOps;
