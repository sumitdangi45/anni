import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, Users, Video, Target, BarChart2, Zap, Globe } from "lucide-react";
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

// ── FAQs ─────────────────────────────────────────────────────
const DM_FAQ = [
  { q: "What does your Digital Marketing service include?", a: "We offer SEO, Google Business Profile optimization, social media management, content and video marketing, paid ads (Google, Meta, YouTube), WhatsApp marketing automation and brand growth — as a connected digital growth system." },
  { q: "Can you guarantee top Google rankings?", a: "No — and any agency claiming guaranteed rankings should be questioned. Google explicitly states third-party services cannot guarantee ranking performance. We focus on sustainable SEO improvements backed by data and best practices." },
  { q: "Does SEO still work with AI Search (Google AI Overviews)?", a: "Yes. Google's own guidance confirms that traditional SEO fundamentals — useful, original, people-first content and good technical foundations — remain the basis for visibility in AI-powered search experiences." },
  { q: "How long does SEO take to show results?", a: "Technical improvements can impact visibility within 4–8 weeks. Ranking growth from content and authority building typically builds over 3–6 months. Paid ads deliver traffic from day one." },
  { q: "Do you manage WhatsApp Business marketing?", a: "Yes. We set up WhatsApp Business API, automated reply flows, lead qualification sequences, appointment reminders and CRM integrations — turning WhatsApp conversations into a complete customer journey." },
  { q: "What social media platforms do you manage?", a: "We manage Instagram, Facebook, LinkedIn, YouTube and X — with monthly content calendars, custom graphics, reels concepts, captions, scheduling and community management." },
  { q: "Do you run Google and Meta paid ad campaigns?", a: "Yes. We manage Google Search, Display, YouTube, Meta (Instagram/Facebook) and LinkedIn campaigns — including audience research, ad creative, A/B testing, conversion tracking and ongoing optimization." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll audit your current digital presence, understand your business objectives and build a channel-specific growth strategy around your goals." },
];

// ── USP ──────────────────────────────────────────────────────
const USP = [
  { icon: <Target size={22} strokeWidth={1.5} />, title: "Strategy Before Posting", desc: "We don't start with random posts. Every activity starts with your business objective and target audience." },
  { icon: <BarChart2 size={22} strokeWidth={1.5} />, title: "Performance Focused", desc: "We track meaningful metrics — leads, conversions, search visibility — not just likes and follower counts." },
  { icon: <Zap size={22} strokeWidth={1.5} />, title: "SEO + Social + Ads", desc: "Your channels work together as one connected growth system instead of disconnected marketing activities." },
  { icon: <Globe size={22} strokeWidth={1.5} />, title: "AI-Ready Marketing", desc: "We account for how customers increasingly discover through AI-powered search, messaging and social discovery." },
];

// ── Services ──────────────────────────────────────────────────
const SERVICES = [
  {
    title: "SEO & Google Visibility",
    subtitle: "Get discovered when customers are actively searching.",
    desc: "We combine technical SEO, content, local search and search performance tracking to build sustainable visibility across Google — including AI-powered search experiences.",
    points: [
      "Website SEO audit, keyword research, competitor analysis and search-intent mapping.",
      "Technical and on-page optimization — titles, internal linking, structured data, content and page experience.",
      "Local SEO, Google Business Profile optimization and city-level visibility strategies.",
      "Content strategy built around useful, original, people-first topics — not mass-produced pages.",
      "Google Search Console and analytics setup for impressions, clicks, rankings and conversions.",
      "Optimization for modern Google Search including AI Overviews, using Google's core SEO fundamentals.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "Social Media Management & Account Handling",
    subtitle: "Build a consistent social presence that keeps your brand active.",
    desc: "End-to-end management of your social media channels — from content strategy and creative production to publishing, community management and performance analytics.",
    points: [
      "Complete management for Instagram, Facebook, LinkedIn, YouTube and X.",
      "Monthly content calendars based on your business goals, audience and campaigns.",
      "Custom posts, carousels, infographics, reels concepts and branded visual content.",
      "Caption writing, hashtag strategy, publishing and content scheduling.",
      "Community management — comments, DMs and customer interactions.",
      "Monthly analytics covering reach, engagement, audience growth and content performance.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    title: "Content & Video Marketing",
    subtitle: "Turn your expertise into content people watch, read and share.",
    desc: "We build content strategies and produce the content that supports awareness, trust and conversion — across short-form video, blogs, brand content and more.",
    points: [
      "Short-form content strategy for Instagram Reels, YouTube Shorts and vertical formats.",
      "Professional video editing with hooks, transitions, captions, pacing and visual storytelling.",
      "Brand and product videos for awareness, education, trust and conversion.",
      "Content scripts, voiceover integration and sound design for maximum engagement.",
      "Blog and website content aligned with customer questions and search intent.",
      "Content repurposing — one idea turned into blogs, reels, carousels and short videos.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "Paid Ads & Performance Marketing",
    subtitle: "Put your budget behind campaigns designed around business goals.",
    desc: "We set up and manage paid advertising across Google, Meta and LinkedIn — focused on measurable outcomes like leads, sales and customer acquisition.",
    points: [
      "Google Search, Display, YouTube, Meta and LinkedIn campaign setup.",
      "Audience research, targeting, campaign structure and conversion-focused ad copy.",
      "Creative variations and A/B testing for ads, landing pages and offers.",
      "Conversion tracking via Google Ads, Meta Pixel and analytics platforms.",
      "Campaign optimization around leads, sales, CPA, ROAS and agreed business KPIs.",
      "Remarketing campaigns to reconnect with visitors who didn't convert.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    dark: false },
  {
    title: "WhatsApp Marketing & Customer Automation",
    subtitle: "Turn WhatsApp conversations into a complete customer journey.",
    desc: "We set up WhatsApp Business API, automated messaging flows and CRM integrations — so every conversation becomes an opportunity to capture, qualify and convert leads.",
    points: [
      "WhatsApp Business Platform/API setup and business messaging workflows.",
      "Automated replies for FAQs, products, services, pricing and common questions.",
      "Lead capture, qualification and automated follow-up sequences.",
      "Appointment reminders, order updates and customer notifications.",
      "CRM, forms, databases and internal systems integration.",
      "Human handoff flows for conversations that need personal attention.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1a0a 0%,#102010 100%)",
    dark: true },
  {
    title: "Brand Growth & Digital Presence",
    subtitle: "Create a consistent digital identity people recognize and trust.",
    desc: "We help businesses build a consistent, recognizable presence across all digital channels — so your brand communicates the same message wherever customers find you.",
    points: [
      "Digital brand positioning and audience definition.",
      "Social media visual identity and reusable branded templates.",
      "Campaign creatives, promotional graphics and marketing collateral.",
      "Brand messaging, tone of voice and content direction.",
      "Landing page and campaign visual direction aligned with your brand.",
      "Consistent brand experience across website, social, advertising and messaging.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
];

// ── What we do grid ───────────────────────────────────────────
const WHAT_WE_DO = [
  { icon: <Search size={20} />, title: "Search", desc: "SEO · Local SEO · Google Business Profile · Search Visibility" },
  { icon: <Users size={20} />, title: "Social", desc: "Instagram · Facebook · LinkedIn · YouTube · X" },
  { icon: <Video size={20} />, title: "Content", desc: "Blogs · Reels · Carousels · Video · Brand Content" },
  { icon: <Target size={20} />, title: "Advertising", desc: "Google Ads · Meta Ads · YouTube Ads · LinkedIn Ads" },
  { icon: <WhatsAppIcon size={20} />, title: "Messaging", desc: "WhatsApp Marketing · Lead Follow-ups · Automation" },
  { icon: <BarChart2 size={20} />, title: "Analytics", desc: "Search Console · Analytics · Campaign Tracking · Conversions" },
];

// ── Process ───────────────────────────────────────────────────
const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Understand your business, audience, competitors and current digital presence." },
  { num: "02", title: "Research", desc: "Identify search opportunities, audience behaviour, content gaps and acquisition channels." },
  { num: "03", title: "Strategy", desc: "Build a channel-specific growth plan around your business objectives." },
  { num: "04", title: "Create", desc: "Produce SEO content, social creatives, videos, ads and campaigns." },
  { num: "05", title: "Launch", desc: "Publish, optimize and activate campaigns across selected channels." },
  { num: "06", title: "Measure & Improve", desc: "Track performance, identify what's working and continuously optimize." },
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

// ── Service row ───────────────────────────────────────────────
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

// ── Page ──────────────────────────────────────────────────────
const DigitalMarketing = () => {
  useSEO({
    title: "Digital Marketing — Anni Web Solutions",
    description: "SEO, social media, content marketing, paid ads, WhatsApp automation and brand growth — one connected digital growth system for startups and businesses." });

  const ref = useRef(null); const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null); const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const whatRef = useRef(null); const whatInView = useInView(whatRef, { once: true, margin: "-60px" });
  const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const catRef = useRef(null); const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref}>

        {/* Hero card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "transparent", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "300px 300px" }} />

          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>DIGITAL MARKETING</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Grow your visibility.
              <br />Reach the right customers.
              <br />Turn attention into business.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We build data-driven digital marketing strategies that help businesses get discovered, build trust and generate qualified leads — combining SEO, social media, content, paid advertising, video and WhatsApp marketing into one connected growth system.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
                
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowRight size={13} color="#fff" />
                </span>
                Build My Growth Strategy
              </a>
              <a href="#catalog"
                style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#333", border: "1.5px solid #ccc", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}
          >
            <img src={batchImg} alt="Top Digital Marketing Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
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
      <SelectedWorkSection label="SELECTED DIGITAL MARKETING WORK" heading="Campaigns and strategies built to drive real growth." />

      {/* What we do */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={whatRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={whatInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE DO</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={whatInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              One digital growth system. Multiple channels.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHAT_WE_DO.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={whatInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
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
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>
                Our Digital Marketing Services
              </span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Digital Marketing Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Growth process */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>OUR DIGITAL GROWTH PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              From discovery to measurable growth.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "28px 24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>READY TO GROW?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Don't just get more traffic.
            <br />Get discovered by the right people.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            Tell us what you're trying to grow — visibility, leads, sales or your brand — and we'll help you build the digital strategy around it.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
              
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRight size={13} color="#fff" />
              </span>
              Build My Growth Strategy
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

      <FAQSection
        faqs={DM_FAQ}
        title={"Frequently\nAsked\nQuestions"}
        subtitle="Everything about our digital marketing services, SEO, paid ads, WhatsApp automation and social media management."
      />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default DigitalMarketing;
