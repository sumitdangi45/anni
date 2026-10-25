import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Palette, MessageSquare, BookOpen, Package, RefreshCw, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const BRANDING_FAQ = [
  { q: "What does your branding service include?", a: "Our branding service covers brand strategy and positioning, logo and visual identity design, brand voice and messaging, brand guidelines, marketing collateral and digital brand assets — a complete brand system, not just a logo." },
  { q: "Do you only design logos or full brand systems?", a: "We build complete brand systems. A logo is one component — we also develop your color palette, typography, messaging, tone of voice, brand guidelines and all the assets needed to stay consistent across channels." },
  { q: "How long does a branding project take?", a: "A complete brand identity project typically takes 3–6 weeks. Logo-only or refresh projects are faster at 1–2 weeks. Timeline depends on scope, complexity and revision rounds." },
  { q: "What is the difference between a brand refresh and a full rebrand?", a: "A refresh modernizes and refines your existing identity — evolving elements like logo, colors and typography while preserving brand recognition. A full rebrand starts from strategy and builds a new identity from the ground up." },
  { q: "Do you create brand guidelines?", a: "Yes. Every full branding project includes brand guidelines covering logo usage, color palette, typography rules, photography style, brand voice and do's and don'ts — so your identity stays consistent across your team." },
  { q: "Can you apply the brand to our website and digital channels?", a: "Yes. We apply your brand identity across your website, social media templates, presentation decks, marketing materials and any other digital or physical touchpoints you need." },
  { q: "Do you help with brand messaging and copywriting direction?", a: "Yes. Brand voice, messaging framework, tagline direction and tone of voice guidelines are all part of our branding process — not just the visual side." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll understand your business, audience, goals and existing identity — and propose the right branding scope for your stage and budget." },
];

const USP = [
  { icon: <Target size={22} strokeWidth={1.5} />, title: "Strategy Before Design", desc: "We understand what the brand needs to communicate before we create a single visual." },
  { icon: <Palette size={22} strokeWidth={1.5} />, title: "Complete Brand Systems", desc: "Not just a logo. A full identity system covering visuals, messaging, guidelines and assets." },
  { icon: <BookOpen size={22} strokeWidth={1.5} />, title: "Built for Consistency", desc: "Your identity works across website, social media, marketing materials and business documents." },
  { icon: <RefreshCw size={22} strokeWidth={1.5} />, title: "Ready to Scale", desc: "Clear guidelines and reusable assets make it easy to maintain the brand as your team grows." },
];

const SERVICES = [
  {
    title: "Brand Strategy & Positioning",
    subtitle: "Define what your brand stands for before designing how it looks.",
    desc: "We start with your business, audience and market to build a clear foundation for your brand identity.",
    points: [
      "Target audience and customer research.",
      "Competitor and market positioning analysis.",
      "Brand positioning and value proposition development.",
      "Mission, vision and core brand values definition.",
      "Brand personality, archetype and differentiation direction.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792805915/anni/branding/ANNI_Brand_Strategy_Presentation.png",
    dark: true },
  {
    title: "Logo & Visual Identity",
    subtitle: "Create a visual identity people can recognize.",
    desc: "We design a distinctive visual system that gives your brand a clear and memorable presence across every touchpoint.",
    points: [
      "Primary and secondary logo concepts and variations.",
      "Custom color palette, color hierarchy and usage rules.",
      "Typography and font pairing system for brand consistency.",
      "Supporting icons, shapes and graphic elements.",
      "Visual direction for photography, imagery and illustration.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792805924/anni/branding/ANNI_Brand_Guidelines_Board.png",
    dark: false },
  {
    title: "Brand Voice & Messaging",
    subtitle: "Give your brand a voice people can recognize.",
    desc: "Your visual identity gets attention. Your messaging explains why people should care — and why they should choose you.",
    points: [
      "Brand voice, personality and communication style development.",
      "Tagline and core brand messaging.",
      "Value proposition and positioning statement.",
      "Tone of voice guidelines for different channels.",
      "Messaging framework for different audiences and platforms.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792805934/anni/branding/The_ANNI_Brand_Voice_Guide.png",
    dark: true },
  {
    title: "Brand Guidelines",
    subtitle: "Turn your identity into a system your whole team can follow.",
    desc: "We create practical brand guidelines so your identity stays consistent as your business grows across teams and channels.",
    points: [
      "Logo usage, clear-space and placement guidelines.",
      "Color palette rules and background usage.",
      "Typography hierarchy and usage guidelines.",
      "Photography, illustration and icon style guidance.",
      "Do's, don'ts and real-world brand application examples.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792805944/anni/branding/ANNI_Brand_Guidelines_Collage.png",
    dark: false },
  {
    title: "Brand Collateral & Marketing Assets",
    subtitle: "Take your brand from the style guide into the real world.",
    desc: "We create the everyday assets your business needs to present a consistent professional identity across all channels.",
    points: [
      "Business cards, letterheads and stationery design.",
      "Social media templates, cover designs and brand kits.",
      "Presentation and proposal template design.",
      "Marketing and promotional creatives.",
      "Digital banners, campaign assets and branded documents.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792805959/anni/branding/ANNI_Cybersecurity_Brand_Stationery_Mockup.png",
    dark: true },
  {
    title: "Rebranding & Brand Refresh",
    subtitle: "Evolve your brand without losing what makes it yours.",
    desc: "For businesses that have outgrown their existing identity, we modernize the brand while maintaining the right elements of its existing recognition.",
    points: [
      "Existing brand identity audit and perception review.",
      "Competitor and market context analysis.",
      "Logo and visual identity refresh and modernization.",
      "Updated colors, typography, imagery and messaging.",
      "New brand guidelines and rollout system.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792805970/anni/branding/ANNI_Brand_Redesign_Before_and_After.png",
    dark: false },
];

const WHAT_WE_BUILD = [
  { icon: <Target size={20} />, title: "Brand Strategy", desc: "Positioning, audience, values and differentiation." },
  { icon: <Palette size={20} />, title: "Visual Identity", desc: "Logo, colors, typography, imagery and graphic language." },
  { icon: <MessageSquare size={20} />, title: "Brand Voice", desc: "Messaging, personality, tone and communication direction." },
  { icon: <BookOpen size={20} />, title: "Brand Guidelines", desc: "A practical system for keeping everything consistent." },
  { icon: <Package size={20} />, title: "Brand Assets", desc: "Social media, presentations, stationery and marketing materials." },
  { icon: <RefreshCw size={20} />, title: "Digital Brand Experience", desc: "Applying your identity across websites, products and digital platforms." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Understand your business, audience, competitors and goals." },
  { num: "02", title: "Define", desc: "Establish positioning, personality, values and brand direction." },
  { num: "03", title: "Concept", desc: "Explore visual directions, creative concepts and messaging." },
  { num: "04", title: "Design", desc: "Develop the logo, colors, typography and complete visual identity." },
  { num: "05", title: "Systemize", desc: "Create guidelines and reusable brand assets." },
  { num: "06", title: "Launch", desc: "Apply the identity across website, digital channels and marketing." },
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

const BrandingIdentity = () => {
  useSEO({
    title: "Branding & Identity — Anni Web Solutions",
    description: "Complete brand systems — strategy, visual identity, messaging, brand guidelines and marketing assets for startups and growing businesses." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null);
  const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null);
  const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
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
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>BRANDING & IDENTITY</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Build a brand
              <br />
              people remember.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We create distinctive brand identities that communicate who you are, connect with your audience and stay consistent across every touchpoint — from your logo and visual system to your messaging, guidelines and marketing materials.
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
                View Services
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }} className="hero-badge"
          >
            <img src={batchImg} alt="Top Branding Partner" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
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
      <SelectedWorkSection label="SELECTED BRANDING WORK" heading="Brand systems built to last and grow." />

      {/* ── What we build ── */}
      <section className="service-section" style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>
              WHAT WE BUILD
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Everything your brand needs to show up consistently.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {WHAT_WE_BUILD.map((item, i) => (
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

      {/* ── Service catalog ── */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>
                Our Branding Services
              </span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Branding Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>
              OUR BRANDING PROCESS
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Strategy first. Design with purpose.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
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
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>READY TO BUILD YOUR BRAND</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's turn your business
            <br />
            into a brand.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            From strategy and positioning to visual identity and digital applications, we'll build a brand system that is distinctive, consistent and ready to grow.
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

      <FAQSection faqs={BRANDING_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our branding services, process, timelines and what's included in a complete brand system." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default BrandingIdentity;
