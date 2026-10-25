import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Bot, Globe, Wrench, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const CHATBOT_FAQ = [
  { q: "What platforms can you build chatbots for?", a: "We build chatbots for websites, WhatsApp Business, Facebook Messenger, Instagram, Telegram, and custom internal business platforms via API." },
  { q: "Can the chatbot be trained on our own business data?", a: "Yes. We train chatbots on your product catalogue, FAQs, SOPs, knowledge base and other business documents so it answers accurately about your specific business." },
  { q: "How long does it take to build and deploy a chatbot?", a: "A simple FAQ chatbot can go live in 3–5 days. Complex chatbots with CRM integration, lead flows and multi-platform deployment typically take 2–4 weeks." },
  { q: "Can the chatbot hand over to a human agent?", a: "Yes. We build seamless human handoff flows — the bot handles common queries and automatically escalates to your team when complex conversations need a human." },
  { q: "Do you integrate chatbots with CRM systems?", a: "Yes. We integrate with HubSpot, Zoho, Salesforce, Freshdesk, Google Sheets, and any CRM or database via API to sync leads and conversation data automatically." },
  { q: "Can the chatbot support Hindi and regional languages?", a: "Yes. We build multilingual chatbots that support Hindi, English, and other regional languages with automatic language detection and language-aware conversation flows." },
  { q: "What happens after the chatbot is deployed?", a: "We provide ongoing monitoring, performance analytics, conversation analysis, and regular updates to improve accuracy and add new flows as your business evolves." },
  { q: "How do we get started?", a: "Book a free consultation via our Contact page. We'll understand your business, identify the best chatbot type for your needs, and provide a detailed proposal." },
];

const USP = [
  { icon: <Bot size={22} strokeWidth={1.5} />, title: "Business-Trained AI", desc: "Every chatbot is trained on your actual business data — products, FAQs, services — not generic responses." },
  { icon: <TrendingUp size={22} strokeWidth={1.5} />, title: "Lead-First Design", desc: "Our chatbots are built to capture, qualify and route leads — not just answer questions." },
  { icon: <Globe size={22} strokeWidth={1.5} />, title: "Multi-Platform", desc: "Website, WhatsApp, Instagram, Telegram — one chatbot brain deployed across all your customer touchpoints." },
  { icon: <Wrench size={22} strokeWidth={1.5} />, title: "Fully Integrated", desc: "Connected to your CRM, calendar, database and APIs so the chatbot can actually take actions, not just talk." },
];

const SERVICES = [
  {
    title: "AI Website Chatbots",
    desc: "Turn your website into a 24/7 customer-support and lead-generation channel with an AI chatbot trained around your business, products and services.",
    points: [
      "Custom chatbot UI matching your website and brand identity.",
      "AI responses based on your business knowledge and content.",
      "Lead capture through conversational forms.",
      "Product, service, pricing and FAQ assistance.",
      "Conversation history, context retention and human-agent handoff.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#e8f0ff 0%,#d0dfff 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808972/anni/chatbot/ANNI_AI_Assistant_Workspace.png",
    dark: false },
  {
    title: "WhatsApp Chatbots",
    desc: "Meet customers where they already communicate. Build automated WhatsApp experiences for enquiries, sales, support, notifications and customer follow-ups.",
    points: [
      "WhatsApp Business Platform integration and verified setup.",
      "Automated customer replies, FAQ handling and lead capture.",
      "Product and service enquiry flows inside conversations.",
      "Automated follow-ups, notifications and reminders.",
      "CRM and database synchronization after every conversation.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#0a1a0a 0%,#102010 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808975/anni/chatbot/WhatsApp_Assistant_Product_Showcase.png",
    dark: true },
  {
    title: "Sales & Lead Generation Chatbots",
    desc: "Convert website visitors into qualified prospects by letting the chatbot understand their requirements, collect details and route valuable leads to your sales team.",
    points: [
      "Visitor qualification, lead scoring and requirement collection.",
      "Conversational enquiry forms and budget discovery flows.",
      "Automatic CRM lead creation with full conversation context.",
      "Sales-team notifications and instant follow-up triggers.",
      "Lead analytics and conversion tracking dashboards.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808977/anni/chatbot/ANNI_Lead_Assistant_Chat_Interface.png",
    dark: true },
  {
    title: "Customer Support Chatbots",
    desc: "Reduce repetitive support workload with intelligent bots that can instantly answer common questions while escalating complicated issues to your support team.",
    points: [
      "24/7 automated customer assistance and FAQ handling.",
      "Knowledge-base integration for accurate instant answers.",
      "Order status, service queries and ticket creation.",
      "Human-agent escalation with full conversation history.",
      "Support analytics, resolution tracking and performance reporting.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808979/anni/chatbot/ANNI_Assistant_Support_Flow.png",
    dark: false },
  {
    title: "E-commerce Chatbots",
    desc: "Help customers discover products, compare options, get answers and move toward purchase through conversational shopping experiences.",
    points: [
      "Product discovery, recommendations and comparison through conversation.",
      "Cart assistance, order tracking and delivery queries.",
      "Product FAQ handling and upsell/cross-sell flows.",
      "Payment guidance and checkout assistance.",
      "Customer follow-up, re-engagement and review collection.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808981/anni/chatbot/ANNI_Shopping_Assistant_Mockup.png",
    dark: true },
  {
    title: "Multilingual Chatbots",
    desc: "Serve a wider audience with conversational AI capable of communicating naturally across English, Hindi and other regional languages.",
    points: [
      "Multi-language conversation support with automatic detection.",
      "Hindi and English conversational flows out of the box.",
      "Regional-language customer assistance and support.",
      "Multilingual knowledge-base responses and lead flows.",
      "Language-aware routing, notifications and CRM tagging.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e8e8e0 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808984/anni/chatbot/Futuristic_Indian_AI_Robot_Assistant_Banner.png",
    dark: false },
  {
    title: "Custom Business Chatbots",
    desc: "Go beyond basic customer support with chatbots connected to your actual business systems and capable of performing useful actions.",
    points: [
      "CRM, database and business API integration.",
      "Appointment booking and calendar automation.",
      "Internal business-assistant chatbots for your team.",
      "Custom workflow and action execution via conversation.",
      "Analytics, monitoring, optimization and retraining.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792808986/anni/chatbot/ANNI_AI_Renewal_Assistant_Dashboard.png",
    dark: true },
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
      className="service-row" style={{ display: "flex", gap: "60px", alignItems: "center", flexDirection: imgLeft ? "row" : "row-reverse", padding: "60px 0", borderBottom: i < SERVICES.length - 1 ? "1px solid #f0f0f0" : "none" }}
    >
      <div className="service-row-img" style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        {(s as any).imageUrl
          ? <img src={(s as any).imageUrl} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "260px" }} />
          : <MockImg gradient={s.gradient} dark={s.dark} />
        }
      </div>
      <div style={{ flex: 1 }}>
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

const ChatbotDevelopment = () => {
  useSEO({
    title: "Chatbot Development — Anni Web Solutions",
    description: "Custom AI chatbots for websites, WhatsApp, sales, support and e-commerce. Multilingual, CRM-integrated and always-on." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null);
  const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const catRef = useRef(null);
  const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref} className="hero-outer-wrap">

        {/* ── Hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ background: "transparent", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "300px 300px" }} />

          <div className="hero-inner-pad" style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>
              CHATBOT DEVELOPMENT
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Chatbots that talk,
              <br />
              understand and take action.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "520px" }}>
              Build intelligent conversational experiences for your website, WhatsApp and business platforms. Our custom chatbots can answer questions, qualify leads, book appointments, connect with your systems and hand conversations to your team when human support is needed.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <a href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
                
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowRight size={13} color="#fff" />
                </span>
                Start a Project
              </a>
              <a href="#catalog"
                style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#333", border: "1.5px solid #ccc", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Solutions
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }} className="hero-badge"
          >
            <img src={batchImg} alt="Top Chatbot Development" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* ── USP ── */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }} className="usp-grid">
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
      <SelectedWorkSection label="SELECTED CHATBOT WORK" heading="Chatbots built to convert and support." />

      {/* Catalog */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>
                Our Chatbot Catalog
              </span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Chatbot Solutions
            </motion.h2>
          </div>

          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}

          {/* Bottom CTA */}
          <div style={{ marginTop: "60px", background: "linear-gradient(135deg,#0a0a1a 0%,#1a1a2e 100%)", borderRadius: "20px", padding: "48px", textAlign: "center" }}>
            <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "12px" }}>
              Have a chatbot idea?
            </h3>
            <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.75)", marginBottom: "32px", maxWidth: "440px", margin: "0 auto 32px" }}>
              Let's build a chatbot that actually works for your business.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <a href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#111", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowRight size={13} color="#fff" />
                </span>
                Start a Project
              </a>
              <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                <WhatsAppIcon size={15} /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />
      <FAQSection faqs={CHATBOT_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything you need to know about our chatbot development services, platforms, integrations and timelines." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default ChatbotDevelopment;
