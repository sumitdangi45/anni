import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, TrendingUp, BarChart2, Sparkles, MapPin, FileText, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const SEO_FAQ = [
  { q: "How long does SEO take to show results?", a: "Technical fixes and on-page improvements can show impact within 4–8 weeks. Organic ranking improvements typically build over 3–6 months as your authority grows and content gets indexed." },
  { q: "What is the difference between SEO and GEO?", a: "SEO optimizes for traditional search engines like Google. GEO (Generative Engine Optimization) optimizes for AI-powered search tools like ChatGPT, Perplexity and Google's AI Overviews. We build strategies that cover both." },
  { q: "Do you do keyword research as part of the service?", a: "Yes. Keyword and search-intent research is foundational to every project — we identify what your potential customers actually search for and build your strategy around those opportunities." },
  { q: "Can you help with local SEO for my business?", a: "Yes. We handle Google Business Profile optimization, local citation building, location-based landing pages and review strategies to help you rank in local and near-me searches." },
  { q: "Do you write the SEO content or just optimize existing pages?", a: "Both. We can optimize your existing pages and also produce SEO blogs, service pages and long-form content as part of a content and topical authority strategy." },
  { q: "What technical SEO issues do you fix?", a: "We fix crawl errors, broken links, duplicate content, slow page speed, Core Web Vitals issues, missing schema markup, sitemap problems and indexing issues — everything that affects how search engines see your site." },
  { q: "How do you track SEO performance?", a: "We set up and use Google Search Console, Google Analytics, and rank tracking tools to monitor keyword visibility, organic traffic, landing page performance and conversion events." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll audit your current search visibility, identify the biggest opportunities, and propose a tailored growth strategy for your business." },
];

const USP = [
  { icon: <Search size={22} strokeWidth={1.5} />, title: "Technical + Creative", desc: "SEO combined with development, design and content expertise — covering every layer of search performance." },
  { icon: <BarChart2 size={22} strokeWidth={1.5} />, title: "Data-Driven", desc: "Every decision is backed by search data, audience analysis and performance metrics — not guesswork." },
  { icon: <Sparkles size={22} strokeWidth={1.5} />, title: "AI-Ready", desc: "We prepare your brand for both traditional organic search and evolving AI-powered discovery engines." },
  { icon: <Target size={22} strokeWidth={1.5} />, title: "Conversion Focused", desc: "Traffic is only valuable when it turns into leads and customers. We optimize for outcomes, not just rankings." },
];

const SERVICES = [
  {
    title: "Technical SEO",
    subtitle: "Build a stronger foundation for search visibility.",
    desc: "We optimize your website's technical structure so search engines can crawl, understand and index your content efficiently.",
    points: [
      "Website crawl and technical SEO audit.",
      "Site structure, URLs and internal linking optimization.",
      "Core Web Vitals and page performance improvements.",
      "XML sitemap, robots.txt and indexing optimization.",
      "Schema markup and structured data implementation.",
      "Technical issue monitoring and ongoing optimization.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "On-Page SEO",
    subtitle: "Make every important page easier to discover.",
    desc: "We optimize your website around search intent, content structure and the queries your potential customers actually use.",
    points: [
      "Keyword and search-intent research for your business.",
      "SEO titles, meta descriptions and heading optimization.",
      "Content structure and keyword placement strategy.",
      "Internal linking and page authority flow.",
      "Image, URL and content technical optimization.",
      "Existing page performance improvement and refresh.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e8e8e0 100%)",
    dark: false },
  {
    title: "Content & SEO Strategy",
    subtitle: "Create content that attracts the right audience.",
    desc: "We develop search-focused content strategies designed around real customer questions, business goals and long-term organic visibility.",
    points: [
      "Content gap analysis and competitor research.",
      "Topic and keyword opportunity mapping.",
      "SEO blogs, long-form content and service pages.",
      "Content clusters and topical authority strategy.",
      "Content calendar planning and production.",
      "Content performance tracking and optimization.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "Local SEO",
    subtitle: "Get discovered by customers searching in your area.",
    desc: "We improve your local search presence so nearby customers can find your business when they're ready to take action.",
    points: [
      "Google Business Profile setup and optimization.",
      "Local keyword and search-intent research.",
      "Location-based landing pages for city-level ranking.",
      "Business information and citation consistency.",
      "Review and reputation strategy for local authority.",
      "Local search performance tracking and reporting.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
    dark: false },
  {
    title: "AI Search & GEO",
    subtitle: "Prepare your brand for the next generation of search.",
    desc: "Search is expanding beyond traditional results. We optimize your digital presence to improve how your business is discovered across AI-powered search experiences.",
    points: [
      "AI search visibility analysis and GEO audit.",
      "Generative Engine Optimization (GEO) strategy.",
      "Content structured around real user questions and intent.",
      "Entity, brand and topical authority optimization.",
      "Structured data and machine-readable content.",
      "AI-search citation monitoring and visibility tracking.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true },
  {
    title: "SEO Analytics & Growth",
    subtitle: "Turn search data into measurable business growth.",
    desc: "We track the metrics that matter — not just rankings — and use performance data to continuously improve your acquisition funnel.",
    points: [
      "Google Search Console and Analytics setup and configuration.",
      "Keyword ranking and organic visibility tracking.",
      "Organic traffic and landing-page performance analysis.",
      "Lead and conversion tracking from organic search.",
      "Monthly SEO performance reporting and insights.",
      "Continuous strategy refinement based on data.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
];

const GROWTH_OUTCOMES = [
  { icon: <Search size={20} />, title: "Search Visibility", desc: "Improve your presence across relevant search queries." },
  { icon: <TrendingUp size={20} />, title: "Organic Traffic", desc: "Bring qualified visitors actively looking for your services." },
  { icon: <MapPin size={20} />, title: "Local Discovery", desc: "Reach customers searching for businesses near them." },
  { icon: <FileText size={20} />, title: "Content Visibility", desc: "Build content around questions your audience searches for." },
  { icon: <Sparkles size={20} />, title: "AI Discovery", desc: "Prepare your brand for AI-powered search and answer engines." },
  { icon: <Target size={20} />, title: "Conversions", desc: "Turn website visitors into enquiries, leads and customers." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Audit", desc: "Understand your website, search visibility and growth opportunities." },
  { num: "02", title: "Research", desc: "Analyse keywords, competitors, audience intent and market gaps." },
  { num: "03", title: "Strategy", desc: "Build a customized SEO and digital growth roadmap." },
  { num: "04", title: "Optimize", desc: "Improve technical SEO, pages, content and search signals." },
  { num: "05", title: "Grow", desc: "Publish strategic content and expand your organic visibility." },
  { num: "06", title: "Measure", desc: "Track traffic, rankings, leads and continuously improve." },
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

const DigitalGrowthSEO = () => {
  useSEO({
    title: "Digital Growth & SEO — Anni Web Solutions",
    description: "Technical SEO, content strategy, local SEO, AI search optimization and growth analytics to improve search visibility and drive real business results." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null);
  const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const outcomesRef = useRef(null);
  const outcomesInView = useInView(outcomesRef, { once: true, margin: "-60px" });
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
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
          style={{ background: "transparent", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "300px 300px" }} />

          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>DIGITAL GROWTH & SEO</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Get found. Get noticed.
              <br />
              Get more customers.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We build data-driven digital growth strategies that improve search visibility, attract the right audience and turn website traffic into measurable business results — from technical SEO and content to local search and AI-powered discovery.
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
                View Services
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}
          >
            <img src={batchImg} alt="Top SEO Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
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
      <SelectedWorkSection label="SELECTED SEO WORK" heading="Growth strategies built to drive real results." />

      {/* ── What we help you grow ── */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={outcomesRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={outcomesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>
              WHAT WE HELP YOU GROW
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={outcomesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              More visibility. Better traffic. Stronger business outcomes.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {GROWTH_OUTCOMES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={outcomesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
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

      {/* ── Service catalog ── */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>
                Our SEO Services
              </span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Growth Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* ── Our Growth Process ── */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>
              OUR GROWTH PROCESS
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Strategy first. Optimization always.
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

      {/* ── Final CTA ── */}
      <section style={{ background: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>READY TO GROW</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's turn search visibility into
            <br />
            real business growth.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            Whether you're launching a new website or growing an existing one, we'll build a strategy around your business, audience and goals.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
              
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRight size={13} color="#fff" />
              </span>
              Start a Project
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f5f5f5", color: "#111", borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#ebebeb")}
              onMouseLeave={e => (e.currentTarget.style.background = "#f5f5f5")}
            >
              <WhatsAppIcon size={15} /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={SEO_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our SEO, content strategy, local search, GEO and digital growth services." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default DigitalGrowthSEO;
