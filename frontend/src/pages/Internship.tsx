import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Users, Rocket, BookOpen, Briefcase, Globe, Cpu, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

// ── FAQ ────────────────────────────────────────────────────────
const INTERN_FAQ = [
  { q: "What is the Anni Web Solutions Internship Catalyst?", a: "It's a hands-on internship programme where you work on real client projects alongside our team. You don't just learn theory — you build actual products, contribute to live codebases and develop professional skills that matter." },
  { q: "Who can apply for the internship?", a: "Anyone with a genuine interest in web development, mobile apps, AI, UI/UX design or digital marketing. Whether you're a student, a recent graduate or self-taught — if you're motivated and willing to learn, we want to hear from you." },
  { q: "Is this a paid internship?", a: "Selected interns receive a stipend based on their role, performance and contribution. We believe in rewarding real work — so the more you contribute, the more you earn." },
  { q: "How long is the internship?", a: "The standard duration is 2–3 months, with an option to extend based on performance and availability. High-performing interns are considered for part-time or full-time roles." },
  { q: "What will I actually work on?", a: "Real projects. You'll contribute to live client work — building features, designing interfaces, writing APIs, setting up automations or running marketing campaigns. This isn't a sandbox environment." },
  { q: "What roles are available?", a: "We hire interns for: Full Stack Development, Frontend Development, Mobile App Development, AI/ML Engineering, UI/UX Design, and Digital Marketing & SEO." },
  { q: "Will I receive a certificate and letter of recommendation?", a: "Yes. All interns who complete the programme receive a certificate of completion and a personalised letter of recommendation from the founder." },
  { q: "How do I apply?", a: "Email us at contact@anniwebsolutions.com with the subject line 'Internship Application — [Your Role]', attach your resume or portfolio link, and tell us in 2–3 sentences why you want to work with us." },
];

// ── USP ────────────────────────────────────────────────────────
const USP = [
  { icon: <Briefcase size={22} strokeWidth={1.5} />, title: "Real Work, Real Clients", desc: "You'll contribute to actual live projects — not dummy tasks or meaningless tutorials." },
  { icon: <Sparkles size={22} strokeWidth={1.5} />, title: "Mentorship from Builders", desc: "Learn directly from our senior engineers, designers and marketers who ship every day." },
  { icon: <Rocket size={22} strokeWidth={1.5} />, title: "Fast Career Growth", desc: "Top performers get extended contracts, part-time roles and strong referrals from our founder." },
  { icon: <Users size={22} strokeWidth={1.5} />, title: "Small Team, Big Impact", desc: "We're lean — so your contributions are visible, valued and make a real difference." },
];

// ── Tracks ─────────────────────────────────────────────────────
const TRACKS = [
  {
    title: "Full Stack Development",
    subtitle: "Build complete web products from frontend to backend.",
    desc: "Work with React, Node.js, MongoDB and REST APIs on real client projects. Understand how production applications are architected, built and deployed.",
    points: [
      "Build and ship features using React.js and Node.js.",
      "Develop and consume REST APIs.",
      "Work with MongoDB and relational databases.",
      "Understand deployment, CI/CD and production environments.",
      "Collaborate on real client codebases with code reviews.",
      "Learn industry-standard git workflows and best practices.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    dark: true },
  {
    title: "Frontend Development",
    subtitle: "Create fast, beautiful and responsive web interfaces.",
    desc: "Build modern user interfaces using React and Tailwind CSS. Work on real designs and learn how to translate Figma to pixel-perfect responsive code.",
    points: [
      "Build responsive UI components in React.js and Tailwind CSS.",
      "Implement animations and interactions with Framer Motion.",
      "Translate Figma designs into production-ready code.",
      "Optimize web performance and Core Web Vitals.",
      "Work across multiple live client projects.",
      "Learn component structure, state management and best practices.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    dark: false },
  {
    title: "Mobile App Development",
    subtitle: "Build cross-platform mobile apps that work on iOS and Android.",
    desc: "Develop real mobile applications using React Native or Flutter. Understand mobile UX patterns, API integration and app deployment workflows.",
    points: [
      "Build cross-platform apps using React Native or Flutter.",
      "Integrate REST APIs and third-party SDKs.",
      "Work on real screen architectures and user flows.",
      "Implement navigation, forms and device features.",
      "Test on real iOS and Android devices.",
      "Understand the app store submission process.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    dark: true },
  {
    title: "AI / ML Engineering",
    subtitle: "Build intelligent features and automation using AI.",
    desc: "Work with OpenAI, LangChain and modern ML frameworks on real product features. Build chatbots, automation pipelines and AI-powered workflows.",
    points: [
      "Integrate OpenAI and LLM APIs into real products.",
      "Build RAG systems and intelligent knowledge retrieval.",
      "Create automation workflows and AI agents.",
      "Work with Python, LangChain and vector databases.",
      "Implement AI-powered features in web applications.",
      "Explore prompt engineering and fine-tuning concepts.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    dark: true },
  {
    title: "UI / UX Design",
    subtitle: "Design real interfaces for real products and clients.",
    desc: "Work in Figma on actual client projects. Design everything from landing pages and SaaS dashboards to mobile apps — with feedback from senior designers.",
    points: [
      "Design client interfaces in Figma.",
      "Create wireframes, user flows and high-fidelity screens.",
      "Build and maintain UI component libraries.",
      "Work with real briefs and actual product requirements.",
      "Receive structured design feedback and mentorship.",
      "Deliver developer-ready design files and specifications.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#f0f0ff 0%,#dde0ff 100%)",
    dark: false },
  {
    title: "Digital Marketing & SEO",
    subtitle: "Run real campaigns and grow real businesses.",
    desc: "Work on SEO, content strategy and paid campaigns for actual client accounts. Learn what it takes to drive traffic, leads and conversions.",
    points: [
      "Execute on-page and off-page SEO strategies.",
      "Run and manage Google Ads and Meta Ads campaigns.",
      "Create and publish content for real client accounts.",
      "Analyse performance data and generate reports.",
      "Manage social media presence and engagement.",
      "Learn conversion optimization and growth tactics.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f5f0e8 0%,#ede8d8 100%)",
    dark: false },
];

// ── What you get ───────────────────────────────────────────────
const BENEFITS = [
  { icon: <Briefcase size={20} />, title: "Real Project Experience", desc: "Contribute to live client projects — not toy examples or coursework." },
  { icon: <Users size={20} />, title: "Direct Mentorship", desc: "Learn directly from engineers and designers who build every day." },
  { icon: <Star size={20} />, title: "Stipend & Performance Pay", desc: "Get paid for your work and rewarded for exceptional contribution." },
  { icon: <BookOpen size={20} />, title: "Certificate & Recommendation", desc: "Receive a formal certificate and a personal letter of recommendation." },
  { icon: <Globe size={20} />, title: "Portfolio That Stands Out", desc: "Graduate with real shipped work you can proudly show to any employer." },
  { icon: <Rocket size={20} />, title: "Full-Time Opportunities", desc: "Top performers are considered for extended contracts and permanent roles." },
];

// ── Process ────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { num: "01", title: "Apply", desc: "Email your resume and a short note about why you want to join. No lengthy forms — just honesty." },
  { num: "02", title: "Short Task", desc: "We'll send a small practical task relevant to your track. It takes 2–4 hours and shows us how you think." },
  { num: "03", title: "Brief Chat", desc: "A 20-minute call with our founder or tech lead to understand your goals and answer your questions." },
  { num: "04", title: "Onboard", desc: "We set you up with tools, access and a real task from day one. No wasted time on unnecessary orientation." },
  { num: "05", title: "Build & Learn", desc: "Work on real projects, get structured feedback and grow your skills across the 2–3 month programme." },
  { num: "06", title: "Graduate", desc: "Complete the programme with a certificate, a recommendation letter and a portfolio of real shipped work." },
];

// ── MockImg ────────────────────────────────────────────────────
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

// ── Track Row ──────────────────────────────────────────────────
const TrackRow = ({ s, i }: { s: typeof TRACKS[0]; i: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgLeft = s.img === "left";
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
      style={{ display: "flex", gap: "60px", alignItems: "center", flexDirection: imgLeft ? "row" : "row-reverse", padding: "60px 0", borderBottom: i < TRACKS.length - 1 ? "1px solid #f0f0f0" : "none" }}
    >
      <div style={{ flex: "0 0 42%", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb" }}>
        <MockImg gradient={s.gradient} dark={s.dark} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "8px" }}>{s.subtitle}</p>
        <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#111", lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px" }}>{s.title}</h3>
        <p style={{ fontSize: "14.5px", color: "#777", lineHeight: 1.75, marginBottom: "24px" }}>{s.desc}</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px", marginBottom: "28px" }}>
          {s.points.map((pt, pi) => (
            <div key={pi} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#6b7eff", minWidth: "22px", paddingTop: "2px" }}>0{pi+1}</span>
              <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.65, margin: 0 }}>{pt}</p>
            </div>
          ))}
        </div>
        <a href="mailto:contact@anniwebsolutions.com"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
          
        >
          <ArrowRight size={14} /> Apply for This Track
        </a>
      </div>
    </motion.div>
  );
};

// ── Page ───────────────────────────────────────────────────────
const Internship = () => {
  useSEO({
    title: "Internship Catalyst — Anni Web Solutions",
    description: "Join the Anni Web Solutions Internship Catalyst — work on real client projects, get mentored by senior builders and grow your career in tech." });

  const heroRef   = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const uspRef    = useRef(null);
  const uspInView  = useInView(uspRef, { once: true, margin: "-60px" });
  const benRef    = useRef(null);
  const benInView  = useInView(benRef, { once: true, margin: "-60px" });
  const procRef   = useRef(null);
  const procInView = useInView(procRef, { once: true, margin: "-60px" });
  const tracksRef = useRef(null);
  const tracksInView = useInView(tracksRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "linear-gradient(150deg,#0d0d1a 0%,#1a0a3e 50%,#0a0a2e 100%)", minHeight: "440px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          {/* grid dots */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "radial-gradient(circle, rgba(107,114,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          {/* glow */}
          <div style={{ position: "absolute", top: "-80px", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(107,114,255,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "720px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(107,114,255,0.15)", border: "1px solid rgba(107,114,255,0.3)", borderRadius: "999px", padding: "5px 14px", marginBottom: "24px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Now Accepting Applications</span>
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Build real products.
              <br />
              <span style={{ color: "#6b7eff" }}>Launch your career</span> in tech.
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "36px", maxWidth: "540px" }}>
              The Anni Web Solutions Internship Catalyst is a hands-on programme where you work on real client projects, get mentored by senior builders and graduate with a portfolio that actually proves what you can do.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" as const }}>
              <a href="mailto:contact@anniwebsolutions.com"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#111", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f0f0")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Apply Now
              </a>
              <a href="#tracks"
                style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "12px 24px", fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.75)", border: "1.5px solid rgba(255,255,255,0.2)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Tracks
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }}>
            <img src={batchImg} alt="Anni Web Solutions" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* ── USP grid ── */}
        <div ref={uspRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", padding: "64px 0 80px" }}>
          {USP.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={uspInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ color: "#6b7eff", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── What you get ── */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={benRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={benInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase" as const, marginBottom: "12px" }}>WHAT YOU GET</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={benInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              More than an internship. A career launchpad.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {BENEFITS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={benInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracks ── */}
      <section id="tracks" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={tracksRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={tracksInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "13px", fontWeight: 700, color: "#4f46e5" }}>Internship Tracks</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={tracksInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Choose your track. Build for real.
            </motion.h2>
          </div>
          {TRACKS.map((t, i) => <TrackRow key={i} s={t} i={i} />)}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={procRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={procInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase" as const, marginBottom: "12px" }}>HOW IT WORKS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={procInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From application to graduation.
            </motion.h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={procInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "13px", fontWeight: 800, color: "#6b7eff", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: "#777", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase" as const, marginBottom: "16px" }}>READY TO BUILD?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Apply now. Start building
            <br />
            from day one.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "32px" }}>
            Email us your resume and a short note about yourself. We respond within 48 hours and get started quickly.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" as const }}>
            <a href="mailto:contact@anniwebsolutions.com"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#111", borderRadius: "999px", padding: "12px 24px 12px 12px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f0f0f0")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
              Send Your Application
            </a>
            <a href="https://wa.me/917974135629" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "999px", padding: "12px 24px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <WhatsAppIcon size={15} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={INTERN_FAQ} title={"Internship\nFAQs"} subtitle="Everything about the Anni Web Solutions Internship Catalyst — eligibility, tracks, stipends and how to apply." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Internship;
