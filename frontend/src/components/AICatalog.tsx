import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle } from "lucide-react";

const SERVICES = [
  {
    title: "AI Chatbot & Assistant Integration",
    desc: "Engage visitors, capture qualified leads, and answer support queries 24/7 with custom AI-powered chatbots integrated directly into your website.",
    points: [
      "Fully customizable chat interface matching your brand identity and website theme.",
      "Multi-turn conversation flows, context retention, and instant lead capture forms.",
      "Advanced API & CRM integrations to store chat histories and trigger follow-up tasks.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#e8f0ff 0%,#d0dfff 100%)",
    dark: false,
  },
  {
    title: "WhatsApp Business Automation",
    desc: "Optimize customer communication with automated WhatsApp flows. Set up smart auto-replies, bulk notifications, and interactive chat menus.",
    points: [
      "Official WhatsApp Cloud API integration and verified business setup support.",
      "Automated follow-up reminders, order updates, and customer nurturing funnels.",
      "Real-time lead synchronization with CRM platforms, Google Sheets, or internal databases.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#0a1a0a 0%,#102010 100%)",
    dark: true,
  },
  {
    title: "AI Voice Calling Agents",
    desc: "Deploy intelligent AI voice agents that handle inbound & outbound calls, qualify leads, book appointments, and respond to customer queries — without human intervention.",
    points: [
      "Natural language voice AI with human-like conversation flow and call scripting.",
      "Inbound support lines and outbound lead qualification campaigns with auto-dialing.",
      "Full call transcription, sentiment analysis, and CRM sync after every call.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true,
  },
  {
    title: "AI Workflow & Business Automation",
    desc: "Eliminate repetitive tasks by automating your entire business operations — from lead management and invoicing to employee onboarding and reporting.",
    points: [
      "Custom n8n / Zapier / Make automation workflows for any business process.",
      "Auto-trigger email, SMS, WhatsApp sequences based on user actions or data changes.",
      "End-to-end process automation connecting your CRM, ERP, spreadsheets, and apps.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e8e8e0 100%)",
    dark: false,
  },
  {
    title: "RAG Systems & Knowledge Base AI",
    desc: "Build AI systems that answer questions from your own documents, PDFs, SOPs, and databases — giving your team and customers instant intelligent answers.",
    points: [
      "Custom RAG (Retrieval-Augmented Generation) pipelines using your business documents.",
      "Internal knowledge base AI for employee support, HR queries, and product documentation.",
      "Secure document ingestion with vector search, semantic retrieval, and GPT-4 integration.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true,
  },
  {
    title: "AI Lead Generation & Outreach",
    desc: "Automate your entire lead generation pipeline — from scraping and enrichment to personalized AI-written outreach via email, LinkedIn, and WhatsApp.",
    points: [
      "AI-powered lead scraping, enrichment, and scoring from web sources and databases.",
      "Personalized outreach at scale with GPT-written emails and follow-up sequences.",
      "Real-time lead tracking, reply detection, and automated handoff to your sales team.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a1a0a 0%,#2a2a10 100%)",
    dark: true,
  },
];

const MockImg = ({ gradient, dark }: { gradient: string; dark: boolean }) => (
  <div style={{ width: "100%", height: "100%", background: gradient, borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", minHeight: "260px" }}>
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
        borderBottom: i < SERVICES.length - 1 ? "1px solid #f0f0f0" : "none",
      }}
    >
      <div style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        <MockImg gradient={s.gradient} dark={s.dark} />
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>
          {s.title}
        </h3>
        <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "24px" }}>
          {s.desc}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#4ade80", minWidth: "22px", paddingTop: "1px" }}>
                0{pi + 1}
              </span>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.65 }}>{pt}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 700, textDecoration: "none", transition: "background 0.2s" }} className="btn-fill btn-fill-dark"
          
        >
          <WhatsAppIcon size={15} />
          Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

const AICatalog = () => {
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
            <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0fdf4", border: "1px solid #bbf7d0", fontSize: "16px", fontWeight: 700, color: "#16a34a" }}>
              Our AI Catalog
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}
          >
            Explore Our AI Automations
          </motion.h2>
        </div>

        {/* Service rows */}
        {SERVICES.map((s, i) => (
          <ServiceRow key={i} s={s} i={i} />
        ))}

        {/* Dark pricing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: "60px", background: "linear-gradient(135deg,#0d1a0d 0%,#0a1a1a 50%,#0d0d1a 100%)", borderRadius: "20px", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}
        >
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "16px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", background: "rgba(74,222,128,0.15)", color: "#4ade80", marginBottom: "14px" }}>
              🤖 AI Automation Pricing
            </span>
            <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>
              Automate Your Business Workflows
              <br />
              at Predictable Costs
            </h3>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "20px" }}>
              Deploy AI Voice Agents, WhatsApp Bots, and RAG systems with transparent, ROI-driven pricing starting ₹999/mo.
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
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#4ade80", color: "#111", borderRadius: "12px", padding: "13px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#22c55e")}
              onMouseLeave={e => (e.currentTarget.style.background = "#4ade80")}
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

export default AICatalog;
