import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Brain, BarChart2, Sparkles, Cpu } from "lucide-react";
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

// ── FAQ ──────────────────────────────────────────────────────
const AIML_FAQ = [
  { q: "What AI/ML solutions does Anni Web Solutions build?", a: "We build AI chatbots, predictive analytics models, computer vision systems, NLP & document AI, recommendation engines, and AI integration & automation solutions for businesses." },
  { q: "Do I need a large dataset to get started with ML?", a: "Not always. We work with your existing data and advise on the minimum dataset needed. For smaller datasets, we use transfer learning and pre-trained models to deliver results faster." },
  { q: "How long does it take to build a custom AI/ML solution?", a: "Simple AI integrations take 1–2 weeks. Custom ML models typically take 3–8 weeks depending on data availability, model complexity, and integration requirements." },
  { q: "Can you integrate AI into our existing product or website?", a: "Yes. We specialize in integrating AI capabilities — chatbots, recommendation engines, prediction APIs — directly into your existing platforms via APIs and SDKs." },
  { q: "Is our business data secure during model training?", a: "Absolutely. We use secure, isolated environments for model training. Your data never trains public models and is fully encrypted. We can also sign NDAs before any data sharing." },
  { q: "What technologies do you use for AI/ML development?", a: "We use Python, TensorFlow, PyTorch, Scikit-learn, OpenAI, LangChain, Hugging Face, FastAPI, and cloud platforms like AWS, GCP and Azure for deployment." },
  { q: "Do you provide ongoing model maintenance?", a: "Yes. We offer model monitoring, retraining pipelines, performance dashboards, and ongoing optimization to ensure your AI system stays accurate over time." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll assess your data, understand your use case, and propose the most practical AI solution that fits your timeline and budget." },
];

// ── USP ──────────────────────────────────────────────────────
const USP = [
  { icon: <Brain size={22} strokeWidth={1.5} />, title: "Practical AI First", desc: "We build AI that solves real problems — not theoretical models. Every solution is tied to a measurable business outcome." },
  { icon: <BarChart2 size={22} strokeWidth={1.5} />, title: "Data-Driven Approach", desc: "From data audit to model deployment, we follow a rigorous, evidence-based process to ensure accuracy and reliability." },
  { icon: <Sparkles size={22} strokeWidth={1.5} />, title: "Custom Models", desc: "No one-size-fits-all tools. Every ML model we build is trained and optimized specifically for your business data and goals." },
  { icon: <Cpu size={22} strokeWidth={1.5} />, title: "Production Ready", desc: "We don't just build models — we deploy them as scalable, monitored APIs integrated into your real products and systems." },
];

// ── Service catalog ───────────────────────────────────────────
const SERVICES = [
  {
    title: "AI Chatbot & Assistant Integration",
    desc: "Engage visitors, automate customer support, capture qualified leads, and provide intelligent assistance 24/7 with AI-powered chatbots built around your business.",
    points: [
      "Custom AI chatbot matching your brand and business requirements.",
      "Context-aware multi-turn conversations with conversation memory.",
      "24/7 customer support, instant FAQ handling and lead qualification.",
      "CRM, database and API integrations with conversation analytics.",
      "Performance tracking, history logs and continuous improvement.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#e8f0ff 0%,#d0dfff 100%)",
    dark: false },
  {
    title: "Predictive Analytics & Machine Learning",
    desc: "Turn your business data into actionable predictions using custom machine learning models designed to identify patterns, forecast outcomes, and support smarter decisions.",
    points: [
      "Custom ML models for sales, demand and revenue forecasting.",
      "Customer behavior analysis, churn prediction and retention modeling.",
      "Classification, regression and recommendation models for your use case.",
      "Real-time prediction APIs with application integration.",
      "Model monitoring, evaluation and ongoing performance optimization.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "Computer Vision Solutions",
    desc: "Build intelligent vision systems that understand images and videos to automate inspection, detection, recognition, monitoring, and other visual business processes.",
    points: [
      "Image classification and intelligent visual analysis pipelines.",
      "Object detection, real-time tracking and anomaly detection.",
      "Face detection, recognition and identity verification systems.",
      "OCR and automated document/image data extraction.",
      "Video analytics, intelligent monitoring and camera integration.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "NLP & Document AI",
    desc: "Automate text-heavy and document-based workflows with AI that can understand, extract, classify, summarize, and retrieve information from large volumes of content.",
    points: [
      "Intelligent document processing and structured data extraction.",
      "OCR-based invoice, form and contract processing automation.",
      "Text classification, sentiment analysis and entity recognition.",
      "Document summarization and semantic search systems.",
      "Automated processing of large business document collections.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
  {
    title: "Recommendation & Personalization Systems",
    desc: "Deliver more relevant experiences with AI-powered recommendation engines that understand user behavior, preferences, and interactions to personalize products and content.",
    points: [
      "Personalized product and content recommendation engines.",
      "User behavior analysis and preference modeling.",
      "Similar-product and related-content recommendation APIs.",
      "Customer segmentation and behavioral profiling.",
      "Real-time recommendation APIs for web and mobile apps.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    dark: true },
  {
    title: "AI Integration & Intelligent Automation",
    desc: "Bring AI into your existing business systems and automate repetitive workflows by connecting intelligent models with your applications, APIs, databases, and internal tools.",
    points: [
      "Integrate AI models into existing websites and applications.",
      "Connect AI with CRM, databases, and business APIs seamlessly.",
      "Automate repetitive business processes using AI and ML.",
      "Build intelligent internal tools and decision-support systems.",
      "Deploy and monitor AI workflows across web, mobile and cloud.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    dark: false },
];

// ── Mock image ────────────────────────────────────────────────
const MockImg = ({ gradient, dark }: { gradient: string; dark: boolean }) => (
  <div style={{ width: "100%", height: "100%", background: gradient, borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", minHeight: "260px" }}>
    <div style={{ width: "55%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)" }} />
    <div style={{ width: "75%", height: "10px", borderRadius: "4px", background: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)" }} />
    <div style={{ flex: 1, borderRadius: "12px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", marginTop: "8px" }} />
    <div style={{ display: "flex", gap: "8px" }}>
      {[1, 2, 3].map(i => <div key={i} style={{ flex: 1, height: "40px", borderRadius: "8px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }} />)}
    </div>
  </div>
);

// ── Service row ───────────────────────────────────────────────
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
      <div style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        <MockImg gradient={s.gradient} dark={s.dark} />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>
          {s.title}
        </h3>
        <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", minWidth: "22px", paddingTop: "1px" }}>0{pi + 1}</span>
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
const AIMLSolutions = () => {
  useSEO({
    title: "AI / ML Solutions — Anni Web Solutions",
    description: "Custom AI chatbots, predictive analytics, computer vision, NLP and intelligent automation solutions for businesses." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null);
  const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const catRef = useRef(null);
  const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref}>

        {/* ── Hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            background: "transparent",
            minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "300px 300px" }} />

          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>
              OUR AI & ML SOLUTIONS
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Intelligent technology built
              <br />
              for real business problems.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "520px" }}>
              From AI assistants and predictive models to computer vision and intelligent automation, we build practical AI solutions that help businesses automate work, understand data, and make better decisions.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}
          >
            <img src={batchImg} alt="Top AI Solutions Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* ── USP ── */}
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

      <SelectedWorkSection label="SELECTED AI/ML WORK" heading="AI solutions built to solve real problems." />

      {/* Service catalog */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>
                Our AI Catalog
              </span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our AI/ML Solutions
            </motion.h2>
          </div>

          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}

          {/* Dark CTA card */}
          <div style={{ marginTop: "60px", background: "linear-gradient(135deg,#0a0a1a 0%,#1a1a2e 100%)", borderRadius: "20px", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "16px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", background: "rgba(107,114,255,0.2)", color: "#6b7eff", marginBottom: "14px" }}>
                🧠 AI & ML Project Pricing
              </span>
              <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>
                Build Intelligent Systems
                <br />
                at Predictable Costs
              </h3>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "20px" }}>
                Custom AI/ML solutions with transparent, milestone-based pricing. From quick chatbot integrations to full ML pipelines.
              </p>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {["Custom Project Scoping", "100% Zero Hidden Fees", "Free Discovery Call"].map(b => (
                  <span key={b} style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.72)" }}>✓ {b}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
              <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#6b7eff", color: "#fff", borderRadius: "12px", padding: "13px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#5a63e0")}
                onMouseLeave={e => (e.currentTarget.style.background = "#6b7eff")}
              >
                Explore Pricing Plans →
              </a>
              <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "12px", padding: "13px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                <WhatsAppIcon size={15} /> Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />

      <FAQSection
        faqs={AIML_FAQ}
        title={"Frequently\nAsked\nQuestions"}
        subtitle="Everything you need to know about our AI/ML solutions, model development, data requirements and integration process."
      />

      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default AIMLSolutions;
