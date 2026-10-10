import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Bot, MessageCircle, Phone, Zap, Users,
  BookOpen, FileText, Cpu, Shield, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

// ── FAQ ──────────────────────────────────────────────────────
const AI_FAQ = [
  { q: "What is the difference between AI automation and a chatbot?", a: "A chatbot answers questions. AI automation actually executes workflows — it captures leads, updates your CRM, sends follow-up messages, qualifies prospects and routes tasks without manual work. We build systems that take action, not just respond." },
  { q: "How does WhatsApp automation work for Indian businesses?", a: "We integrate the WhatsApp Business Cloud API to set up automated replies, lead capture flows, appointment reminders, order notifications and CRM synchronization. Your team gets notified when human attention is needed." },
  { q: "Can AI automation integrate with our existing CRM and tools?", a: "Yes. We connect your automation with HubSpot, Zoho, Salesforce, Google Sheets, Notion, databases, payment systems and any platform that has an API — so data flows automatically between your tools." },
  { q: "What are AI agents and how are they different from simple automation?", a: "Simple automation follows fixed rules — if X happens, do Y. AI agents can understand context, make decisions, use tools, execute multi-step tasks and handle exceptions — making them useful for complex, variable workflows." },
  { q: "What is RAG and how does it help my business?", a: "RAG (Retrieval-Augmented Generation) lets you build AI assistants that answer questions using your own business documents, product catalogues, SOPs and knowledge bases — giving accurate, company-specific answers rather than generic AI responses." },
  { q: "Do AI agents always work without human involvement?", a: "No — and that's by design. We build human-in-the-loop workflows where important or sensitive actions require team approval. AI handles the routine; your team focuses on decisions that need judgment." },
  { q: "What workflows are good candidates for AI automation?", a: "Anything repetitive, rule-based and high-volume: lead follow-ups, customer FAQs, appointment booking, document processing, data entry, order notifications, internal approvals and report generation." },
  { q: "How do we get started?", a: "Book a discovery call. We'll map your existing workflows, identify what can be automated and propose a practical AI system around your business goals — starting with the highest-value opportunity." },
];

// ── USP ──────────────────────────────────────────────────────
const USP = [
  { icon: <Zap size={22} strokeWidth={1.5} />, title: "Action, Not Just Answers", desc: "Our AI systems connect conversations to real business actions — CRM updates, follow-ups, bookings and notifications." },
  { icon: <Bot size={22} strokeWidth={1.5} />, title: "Integrated With Your Stack", desc: "CRM, WhatsApp, email, databases, APIs and spreadsheets — automation that connects to the tools you already use." },
  { icon: <Shield size={22} strokeWidth={1.5} />, title: "Human-in-the-Loop", desc: "Important or uncertain actions are routed to your team. AI handles the routine; humans handle what matters." },
  { icon: <CheckCircle size={22} strokeWidth={1.5} />, title: "Measurable Automation", desc: "Track leads captured, tasks completed, response times and escalations — not just whether the AI replied." },
];

// ── Services ──────────────────────────────────────────────────
const SERVICES = [
  {
    title: "AI Chatbot & Customer Support Agents",
    subtitle: "Turn customer conversations into automated workflows.",
    desc: "Build AI assistants that don't just answer questions — they understand your business, collect information and take the next action.",
    points: [
      "Custom AI chatbots trained on your business information, services and FAQs.",
      "Context-aware conversations with memory and intelligent response handling.",
      "Lead capture, qualification and requirement collection inside conversations.",
      "Integration with CRM, databases, APIs and internal business systems.",
      "Human handoff when a conversation requires your team's attention.",
      "Conversation analytics, history and performance monitoring.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#e8f0ff 0%,#d0dfff 100%)",
    dark: false },
  {
    title: "WhatsApp Business Automation",
    subtitle: "Turn WhatsApp into an automated sales and support channel.",
    desc: "For Indian businesses, WhatsApp is where customers already communicate. We automate the entire customer journey — from first message to booked appointment or completed sale.",
    points: [
      "WhatsApp Business Platform / Cloud API integration and setup.",
      "AI-powered customer replies and FAQ automation.",
      "Lead capture, qualification and automated follow-up sequences.",
      "Order updates, appointment reminders and customer notifications.",
      "CRM, Google Sheets, databases and business-system synchronization.",
      "Human handoff for conversations requiring manual support.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#0a1a0a 0%,#102010 100%)",
    dark: true },
  {
    title: "AI Voice Agents",
    subtitle: "Let AI handle calls, conversations and routine phone workflows.",
    desc: "Voice agents handle routine inbound calls and outbound qualification — AI takes the conversation, your team gets involved when judgment is needed.",
    points: [
      "Inbound AI voice agents for customer enquiries and support.",
      "Outbound lead qualification and follow-up call campaigns.",
      "Appointment booking, confirmations and reminders via voice.",
      "Natural-language conversation with business-specific call flows.",
      "Call transcription, summaries and conversation analytics.",
      "CRM updates and automated follow-up triggered after every call.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true },
  {
    title: "AI Workflow & Business Automation",
    subtitle: "Connect your tools and automate the work between them.",
    desc: "We build multi-step automation workflows that connect your business tools, trigger actions based on events and eliminate repetitive manual work across your operations.",
    points: [
      "Custom workflows using n8n, Make, Zapier and direct API integrations.",
      "Automatic lead routing, qualification and follow-up on any trigger.",
      "Email, WhatsApp and notification automation based on business events.",
      "CRM, ERP, spreadsheets, databases and SaaS platform integrations.",
      "Automated reporting, document processing and data synchronization.",
      "Multi-step AI workflows that make decisions and execute actions.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    title: "AI Lead Generation & Sales Automation",
    subtitle: "Find, qualify and follow up with leads automatically.",
    desc: "We automate the lead lifecycle — from first capture to qualified handoff — so your sales team spends time on prospects that are ready to buy, not manual follow-ups.",
    points: [
      "Lead capture from websites, landing pages, forms and inbound channels.",
      "AI-powered lead qualification and scoring based on your criteria.",
      "Enrichment using authorized data sources and business databases.",
      "Personalized email and WhatsApp messaging sequences.",
      "Automated follow-ups triggered by lead behaviour and responses.",
      "CRM updates, sales-team notifications and qualified lead handoff.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "RAG & Business Knowledge AI",
    subtitle: "Give your AI access to the information your business actually uses.",
    desc: "Build AI assistants that answer questions from your own documents — product catalogues, SOPs, policies, knowledge bases — giving accurate, company-specific answers.",
    points: [
      "Secure RAG pipelines for PDFs, documents, websites and knowledge bases.",
      "AI assistants grounded in your company-specific information.",
      "Internal knowledge assistants for employees and teams.",
      "Semantic search across business documents and databases.",
      "Document ingestion, chunking, embeddings and vector search setup.",
      "Source-aware responses and controlled access to business knowledge.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    dark: false },
  {
    title: "AI Document & Data Automation",
    subtitle: "Turn repetitive document work into an automated workflow.",
    desc: "We automate high-volume document processing — extraction, classification, validation and data entry — so your team stops doing the same thing manually every day.",
    points: [
      "Invoice, quotation and receipt data extraction.",
      "OCR and intelligent document processing pipelines.",
      "Contract, form and application information extraction.",
      "AI classification and automatic document routing.",
      "Automatic data entry into CRM, ERP or databases.",
      "Human review workflows for sensitive or uncertain outputs.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "AI Agents & Multi-Agent Systems",
    subtitle: "Build AI agents that plan, use tools and complete multi-step tasks.",
    desc: "For businesses ready to go beyond automation rules — we build AI agents that can understand goals, use tools, execute multi-step workflows and coordinate with other agents.",
    points: [
      "Task-specific AI agents for business operations.",
      "Tool-using agents connected to APIs and business systems.",
      "Multi-step planning and workflow execution.",
      "Multi-agent coordination for specialized, parallel tasks.",
      "Human approval gates for sensitive or high-value actions.",
      "Agent monitoring, evaluation and execution audit logs.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
];

// ── What we automate ──────────────────────────────────────────
const AUTOMATE = [
  { title: "Sales", desc: "Lead capture → Qualification → Follow-up → CRM" },
  { title: "Customer Support", desc: "Question → AI response → Resolution → Human escalation" },
  { title: "WhatsApp", desc: "Message → AI → Product info → Lead or Booking" },
  { title: "Voice", desc: "Call → Conversation → Qualification → CRM update" },
  { title: "Operations", desc: "Trigger → AI decision → Workflow → Action" },
  { title: "Documents", desc: "Upload → Extract → Validate → Store → Notify" },
  { title: "Knowledge", desc: "Question → Retrieve → AI answer → Source" },
  { title: "Reporting", desc: "Collect data → Analyse → Generate report → Deliver" },
];

// ── Industry use cases ────────────────────────────────────────
const USE_CASES = [
  { industry: "Real Estate", items: "Lead qualification · Property enquiries · Follow-ups · Site-visit booking" },
  { industry: "Healthcare", items: "Appointment booking · FAQs · Reminders · Patient communication" },
  { industry: "E-commerce", items: "Product assistance · Order updates · Recommendations · Support" },
  { industry: "Education", items: "Student enquiries · Admissions · Follow-ups · Course information" },
  { industry: "Finance", items: "Document processing · Customer queries · Internal workflows" },
  { industry: "SaaS", items: "Customer support · Onboarding · Lead qualification · Product assistance" },
];

// ── Safety ────────────────────────────────────────────────────
const SAFETY = [
  { title: "Human Approval", desc: "Require human confirmation before sensitive or high-value actions." },
  { title: "Access Control", desc: "Give agents only the permissions they actually need to complete their task." },
  { title: "Data Protection", desc: "Protect business and customer information throughout the workflow." },
  { title: "Monitoring", desc: "Track agent actions, decisions, failures and execution history." },
  { title: "Evaluation", desc: "Test AI responses and workflows thoroughly before production deployment." },
  { title: "Fallbacks", desc: "Human escalation and failure-handling paths built into every workflow." },
];

// ── Process ───────────────────────────────────────────────────
const PROCESS = [
  { num: "01", title: "Understand", desc: "Map the existing business process and identify repetitive, automatable work." },
  { num: "02", title: "Identify", desc: "Find tasks suitable for AI and those that should stay human-controlled." },
  { num: "03", title: "Design", desc: "Define the agent, tools, triggers, data sources and approval points." },
  { num: "04", title: "Integrate", desc: "Connect CRM, WhatsApp, email, databases, APIs and business systems." },
  { num: "05", title: "Test", desc: "Evaluate accuracy, edge cases, permissions, failures and human handoff." },
  { num: "06", title: "Deploy & Improve", desc: "Launch automation, monitor outcomes and continuously improve the workflow." },
];

// ── Pricing ───────────────────────────────────────────────────
const PRICING = [
  {
    name: "Starter Automation",
    price: "₹9,999+",
    desc: "For simple business automation.",
    features: ["1 automated workflow", "Basic AI integration", "WhatsApp / Email / Forms", "CRM or Sheets integration", "Basic testing", "Deployment support"],
    highlight: false,
    cta: "Get Started" },
  {
    name: "Business Automation",
    price: "₹24,999+",
    desc: "For businesses with multiple workflows.",
    features: ["2–4 automated workflows", "AI agent or chatbot", "CRM integration", "WhatsApp automation", "API integrations", "Analytics & logging", "Human handoff", "Deployment & support"],
    highlight: true,
    badge: "MOST POPULAR",
    cta: "Get Started" },
  {
    name: "Custom AI System",
    price: "Custom Quote",
    desc: "For complex AI automation needs.",
    features: ["Custom AI agents", "RAG / Knowledge Base", "Multi-step workflows", "Multi-agent architecture", "CRM / ERP / DB integrations", "Voice AI", "Advanced monitoring", "Custom security & deployment"],
    highlight: false,
    dark: true,
    cta: "Talk to Our Team" },
];

// ── Mock image ────────────────────────────────────────────────
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
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{s.subtitle}</p>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>{s.title}</h3>
        <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#4ade80", minWidth: "22px", paddingTop: "1px" }}>0{pi+1}</span>
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

// ── Page ──────────────────────────────────────────────────────
const AIAutomation = () => {
  useSEO({
    title: "AI Agents & Automation — Anni Web Solutions",
    description: "We build AI agents and automation workflows that handle repetitive tasks, communicate with customers and execute business processes — WhatsApp, voice, CRM, RAG and more." });

  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null); const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const automateRef = useRef(null); const automateInView = useInView(automateRef, { once: true, margin: "-60px" });
  const useCaseRef = useRef(null); const useCaseInView = useInView(useCaseRef, { once: true, margin: "-60px" });
  const safetyRef = useRef(null); const safetyInView = useInView(safetyRef, { once: true, margin: "-60px" });
  const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const pricingRef = useRef(null); const pricingInView = useInView(pricingRef, { once: true, margin: "-60px" });
  const catRef = useRef(null); const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref}>

        {/* Hero — dark green themed */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "linear-gradient(150deg,#0a1a0a 0%,#0d2a1a 60%,#0a0a0a 100%)", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div style={{ position: "absolute", top: "-40px", right: "15%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)" }} />

          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(74,222,128,0.7)", marginBottom: "20px" }}>AI AGENTS & AUTOMATION</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Automate the work.
              <br />Not just the conversation.
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We build AI agents and intelligent automation systems that handle repetitive tasks, communicate with customers, connect your business tools and execute complete workflows — helping your team save time and focus on higher-value work.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#4ade80", color: "#111", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#22c55e")} onMouseLeave={e => (e.currentTarget.style.background = "#4ade80")}
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowRight size={13} color="#111" />
                </span>
                Automate My Business
              </a>
              <a href="#catalog"
                style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}
          >
            <img src={batchImg} alt="Top AI Automation Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* USP */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }}>
          {USP.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={uspInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ color: "#4ade80", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <LogoMarquee />
      <SelectedWorkSection label="SELECTED AI AUTOMATION WORK" heading="AI workflows built to save time and drive business outcomes." />

      {/* What we automate */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={automateRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={automateInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#4ade80", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE AUTOMATE</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={automateInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From customer conversations to internal operations.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {AUTOMATE.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={automateInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.06 }}
                style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #ebebeb" }}
              >
                <h3 style={{ fontSize: "16.5px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "16.5px", color: "#999", lineHeight: 1.65 }}>{item.desc}</p>
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
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0fdf4", border: "1px solid #bbf7d0", fontSize: "16px", fontWeight: 700, color: "#16a34a" }}>Our AI Automation Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our AI Automation Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Use cases */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={useCaseRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={useCaseInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#4ade80", textTransform: "uppercase", marginBottom: "12px" }}>AI AUTOMATION USE CASES</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={useCaseInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Where automation creates real business value.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {USE_CASES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={useCaseInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "10px" }}>{item.industry}</h3>
                <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.7 }}>{item.items}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — dark */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#4ade80", textTransform: "uppercase", marginBottom: "12px" }}>AI AUTOMATION PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              We automate the workflow, not just add an AI model.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "28px 24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#4ade80", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Safety */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={safetyRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={safetyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#4ade80", textTransform: "uppercase", marginBottom: "12px" }}>AI SAFETY & CONTROL</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={safetyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Automation should be powerful — but controlled.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {SAFETY.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={safetyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <div style={{ color: "#4ade80", marginBottom: "12px" }}><Shield size={20} /></div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={pricingRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#4ade80", textTransform: "uppercase", marginBottom: "12px" }}>AI AUTOMATION PRICING</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Start with one workflow. Scale as you grow.
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}
          >
            {PRICING.map((plan, i) => (
              <div key={i} style={{
                borderRadius: "20px", padding: "32px", position: "relative", overflow: "hidden",
                background: plan.dark ? "#0d0d0d" : "#fff",
                border: plan.highlight ? "2px solid #4ade80" : plan.dark ? "1px solid hsl(0,0%,16%)" : "1.5px solid #ebebeb" }}>
                {plan.badge && (
                  <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "#4ade80", color: "#111", fontSize: "16px", fontWeight: 700, padding: "5px 16px", borderRadius: "0 0 10px 10px", letterSpacing: "0.08em" }}>
                    {plan.badge}
                  </div>
                )}
                <div style={{ marginTop: plan.badge ? "16px" : "0" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: plan.dark ? "#fff" : "#111", marginBottom: "6px" }}>{plan.name}</h3>
                  <p style={{ fontSize: "16.5px", color: plan.dark ? "rgba(255,255,255,0.4)" : "#aaa", marginBottom: "16px" }}>{plan.desc}</p>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: plan.dark ? "#fff" : "#111", letterSpacing: "-0.04em", marginBottom: "24px" }}>{plan.price}</div>
                  <a href="/contact"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: plan.dark ? "rgba(255,255,255,0.1)" : plan.highlight ? "#111" : "#f5f5f5", color: plan.dark ? "#fff" : plan.highlight ? "#fff" : "#111", borderRadius: "12px", padding: "13px", fontSize: "16px", fontWeight: 700, textDecoration: "none", marginBottom: "24px", transition: "background 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = plan.dark ? "rgba(255,255,255,0.18)" : plan.highlight ? "#333" : "#e8e8e8")}
                    onMouseLeave={e => (e.currentTarget.style.background = plan.dark ? "rgba(255,255,255,0.1)" : plan.highlight ? "#111" : "#f5f5f5")}
                  >
                    {plan.cta} →
                  </a>
                  <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                    {plan.features.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckCircle size={13} color="#4ade80" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: "16.5px", color: plan.dark ? "rgba(255,255,255,0.6)" : "#666" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#0a1a0a", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#4ade80", textTransform: "uppercase", marginBottom: "16px" }}>STILL DOING REPETITIVE WORK MANUALLY?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let AI handle the work your
            <br />team shouldn't have to.
          </h2>
          <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "32px" }}>
            Tell us what your team does repeatedly every day. We'll identify what can be automated and build an AI workflow around it.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#4ade80", color: "#111", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#22c55e")} onMouseLeave={e => (e.currentTarget.style.background = "#4ade80")}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRight size={13} color="#111" />
              </span>
              Automate My Business
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")} onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <WhatsAppIcon size={15} /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={AI_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our AI automation services, WhatsApp bots, voice agents, workflow automation and AI agents." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default AIAutomation;
