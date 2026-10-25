import WhatsAppIcon from "@/components/WhatsAppIcon";
import whiteVideo from "@/assets/white animated.mp4";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Smartphone, ShoppingCart, MapPin, Users, Radio, Cpu, Lock, Bell, Map, Sparkles, Layers, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useSEO } from "@/hooks/useSEO";
import batchImg from "@/assets/batch.png";

const MOBILE_FAQ = [
  { q: "Do you build both Android and iOS apps?", a: "Yes. We build cross-platform apps using React Native that run on both Android and iOS from a single codebase — delivering a consistent experience on both platforms with native-like performance." },
  { q: "What is the difference between a native app and a cross-platform app?", a: "Native apps are built separately for Android (Kotlin/Java) and iOS (Swift). Cross-platform apps like React Native use one codebase for both platforms. For most business use cases, React Native delivers the performance and experience needed while being more cost-effective." },
  { q: "How long does it take to build a mobile app?", a: "A standard mobile app takes 6–12 weeks. Complex apps with real-time features, integrations and multiple user roles may take 3–6 months. We'll define a clear timeline after scoping your requirements." },
  { q: "Do you handle both the mobile app and the backend?", a: "Yes. We build the complete product — mobile application, REST API backend, database, authentication, third-party integrations and cloud deployment — as one integrated project." },
  { q: "Can you integrate payment gateways into the app?", a: "Yes. We integrate Razorpay, Stripe, PayU and other payment gateways for in-app purchases, subscriptions, order payments and transaction management." },
  { q: "Do you prepare the app for App Store and Play Store submission?", a: "Yes. We handle app build preparation, testing, metadata, screenshots, privacy policy requirements and submission to both Google Play Store and Apple App Store." },
  { q: "Can you add AI features to a mobile app?", a: "Yes. We integrate AI assistants, recommendations, image analysis, intelligent search and other AI capabilities into mobile apps where they create real value for your users." },
  { q: "How do we get started?", a: "Book a free discovery call. We'll understand your users, business model and app requirements — and provide a detailed proposal with architecture, timeline and investment." },
];

const USP = [
  { icon: <Smartphone size={22} strokeWidth={1.5} />, title: "User-Focused", desc: "Every screen and interaction starts with the user's actual journey and what they need to accomplish." },
  { icon: <Layers size={22} strokeWidth={1.5} />, title: "Design + Development", desc: "UI/UX and engineering work together from the beginning — not disconnected handoffs." },
  { icon: <Zap size={22} strokeWidth={1.5} />, title: "Cross-Platform Expertise", desc: "Build Android and iOS experiences without maintaining two disconnected product teams." },
  { icon: <Sparkles size={22} strokeWidth={1.5} />, title: "AI Ready", desc: "Add intelligent features — recommendations, assistants, automation — when they create genuine value." },
];

const SERVICES = [
  {
    title: "Business & Customer Apps",
    subtitle: "Turn your business idea into a mobile experience.",
    desc: "We build custom mobile applications that help businesses connect with customers, deliver services and create better digital experiences.",
    points: [
      "Custom Android and iOS application development.",
      "User-friendly onboarding and secure authentication.",
      "Customer profiles and personalized experiences.",
      "Push notifications and in-app communication.",
      "API and backend integration.",
      "Analytics and user activity tracking.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#f5f5f3 0%,#e2e2dc 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792818501/anni/mobile/ANNI_Business_Customer_Apps.png",
    dark: false },
  {
    title: "E-commerce & Shopping Apps",
    subtitle: "Give your customers a faster way to discover and buy.",
    desc: "Build mobile shopping experiences with smooth product discovery, checkout and order management.",
    points: [
      "Product catalog, category browsing and search.",
      "Filters, product discovery and wishlist.",
      "Shopping cart and seamless checkout.",
      "Secure payment gateway integration.",
      "Order tracking and customer notifications.",
      "Offers, recommendations and promotional campaigns.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792818504/anni/mobile/ANNI_SHOP_E-Commerce_App_Mockup.png",
    dark: true },
  {
    title: "On-Demand & Service Apps",
    subtitle: "Connect customers with the services they need.",
    desc: "We build apps for booking, delivery, home services, transportation and other on-demand business models.",
    points: [
      "Customer and service-provider applications.",
      "Booking, appointment and scheduling management.",
      "Real-time location and map integration.",
      "Availability management and service slots.",
      "Online payments and transaction tracking.",
      "Push notifications and real-time status updates.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#0a1628 0%,#1a2744 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792818508/anni/mobile/ANNI_Mobility_App_Showcase.png",
    dark: true },
  {
    title: "Business & Employee Apps",
    subtitle: "Put your business workflows in your team's pocket.",
    desc: "Build internal mobile applications that help employees manage tasks, information and operations from anywhere.",
    points: [
      "Employee and team management features.",
      "Task assignment and workflow management.",
      "Attendance, field activity and reporting.",
      "Role-based access and permission systems.",
      "Real-time notifications and updates.",
      "Admin dashboard and business-system integration.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#f0f4ff 0%,#dde8ff 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792818511/anni/mobile/ANNI_Workforce_App_Showcase.png",
    dark: false },
  {
    title: "Real-Time & Social Applications",
    subtitle: "Build mobile experiences where people connect instantly.",
    desc: "For communication, collaboration and community-driven products, we create real-time mobile experiences.",
    points: [
      "Real-time chat, messaging and communication.",
      "User profiles, social interactions and feeds.",
      "Notifications and activity tracking.",
      "Media, image and video sharing features.",
      "Real-time data synchronization.",
      "Scalable backend and WebSocket integration.",
    ],
    img: "left",
    gradient: "linear-gradient(135deg,#1a0a2e 0%,#0d0520 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792818514/anni/mobile/ANNI_Chat_iPhone_UI_Showcase.png",
    dark: true },
  {
    title: "AI-Powered Mobile Apps",
    subtitle: "Bring intelligent experiences directly to your users.",
    desc: "We integrate AI into mobile applications where it can improve personalization, automation and user interaction.",
    points: [
      "AI assistants and conversational interfaces.",
      "AI-powered recommendations and personalization.",
      "Image and document analysis on mobile.",
      "Voice-based AI features and search.",
      "Intelligent search and knowledge retrieval (RAG).",
      "Custom AI APIs and automation workflows.",
    ],
    img: "right",
    gradient: "linear-gradient(135deg,#0d1a0d 0%,#102010 100%)",
    imageUrl: "https://res.cloudinary.com/w3bsruq6/image/upload/v1792818519/anni/mobile/ANNI_AI_Assistant__Futuristic_Mobile_Experience.png",
    dark: true },
];

const WHAT_WE_BUILD = [
  { icon: <Smartphone size={20} />, title: "Business Apps", desc: "Customer-facing applications for startups and businesses." },
  { icon: <ShoppingCart size={20} />, title: "E-commerce Apps", desc: "Shopping, payments, orders and personalized experiences." },
  { icon: <MapPin size={20} />, title: "On-Demand Apps", desc: "Booking, delivery, transportation and service platforms." },
  { icon: <Users size={20} />, title: "Employee Apps", desc: "Internal tools for teams, field workers and business operations." },
  { icon: <Radio size={20} />, title: "Social & Real-Time Apps", desc: "Chat, community, collaboration and live experiences." },
  { icon: <Cpu size={20} />, title: "AI-Powered Apps", desc: "Mobile products enhanced with AI, automation and intelligent features." },
];

const CORE_FEATURES = [
  { icon: <Lock size={18} />, title: "Authentication & Security", desc: "Secure login, authorization, sessions and protected user data." },
  { icon: <ShoppingCart size={18} />, title: "Payments", desc: "Payment gateways, subscriptions and transaction management." },
  { icon: <Bell size={18} />, title: "Push Notifications", desc: "Real-time updates, reminders, offers and important alerts." },
  { icon: <Map size={18} />, title: "Maps & Location", desc: "Maps, live location, distance and location-based functionality." },
  { icon: <Radio size={18} />, title: "Real-Time Communication", desc: "Chat, live status updates and synchronized data." },
  { icon: <Sparkles size={18} />, title: "AI Integration", desc: "AI assistants, recommendations and intelligent workflows." },
];

const TECH_STACK = [
  { category: "Mobile Development", items: ["React Native", "Android", "iOS"] },
  { category: "Frontend", items: ["TypeScript", "JavaScript", "React Native"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Python", "Flask"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL"] },
  { category: "Real-Time", items: ["WebSockets", "REST APIs", "Push Notifications"] },
  { category: "Infrastructure", items: ["Docker", "Cloud Deployment", "CI/CD"] },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Understand your users, business model, features and technical requirements." },
  { num: "02", title: "Plan", desc: "Define app architecture, user flows, technology and development roadmap." },
  { num: "03", title: "Design", desc: "Create the mobile UX, UI screens and interactive prototype." },
  { num: "04", title: "Develop", desc: "Build the mobile application, backend, database and integrations." },
  { num: "05", title: "Test", desc: "Test functionality, performance, security, accessibility and real devices." },
  { num: "06", title: "Launch & Scale", desc: "Prepare for store submission, launch and continuously improve the product." },
];

const QUALITY_ITEMS = [
  { icon: <Zap size={18} />, title: "Fast & Responsive", desc: "Optimized app startup, interactions and resource usage." },
  { icon: <Shield size={18} />, title: "Secure by Design", desc: "Security considerations built into the application architecture." },
  { icon: <Users size={18} />, title: "Accessible Experience", desc: "Interfaces tested with accessibility settings and assistive technologies." },
  { icon: <Smartphone size={18} />, title: "Cross-Device Ready", desc: "Designed and tested across supported device sizes and form factors." },
  { icon: <Sparkles size={18} />, title: "App Store Ready", desc: "Testing, metadata and submission preparation for production release." },
  { icon: <Layers size={18} />, title: "Scalable Backend", desc: "Architecture designed to support growing users, data and traffic." },
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

const MobileAppDevelopment = () => {
  useSEO({
    title: "Mobile App Development — Anni Web Solutions",
    description: "Custom Android and iOS mobile app development for startups and businesses — cross-platform apps, e-commerce, on-demand, real-time and AI-powered mobile experiences." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const uspRef = useRef(null); const uspInView = useInView(uspRef, { once: true, margin: "-60px" });
  const buildRef = useRef(null); const buildInView = useInView(buildRef, { once: true, margin: "-60px" });
  const featRef = useRef(null); const featInView = useInView(featRef, { once: true, margin: "-60px" });
  const techRef = useRef(null); const techInView = useInView(techRef, { once: true, margin: "-60px" });
  const processRef = useRef(null); const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const qualRef = useRef(null); const qualInView = useInView(qualRef, { once: true, margin: "-60px" });
  const catRef = useRef(null); const catInView = useInView(catRef, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} className="page-light">
      <Navbar />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "100px 20px 0" }} ref={ref} className="hero-outer-wrap">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ background: "transparent", minHeight: "420px", position: "relative", overflow: "hidden", borderRadius: "20px" }}
        >
          <video src={whiteVideo} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")", backgroundSize: "300px 300px" }} />
          <div className="hero-inner-pad" style={{ position: "relative", zIndex: 2, padding: "52px 56px", maxWidth: "700px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", marginBottom: "20px" }}>MOBILE APP DEVELOPMENT</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em", marginBottom: "20px" }}>
              Mobile apps built for real users
              <br />and real business needs.
            </h1>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>
              We design and develop fast, secure and scalable mobile applications for startups and growing businesses — from customer-facing apps and e-commerce platforms to business tools, real-time applications and AI-powered mobile experiences.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#111", color: "#fff", borderRadius: "999px", padding: "11px 22px 11px 11px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }} className="btn-fill btn-fill-dark"
                
              >
                <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={13} color="#fff" /></span>
                Start a Project
              </a>
              <a href="#catalog" style={{ display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "11px 22px", fontSize: "16px", fontWeight: 600, color: "#333", border: "1.5px solid #ccc", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View Services
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 10 }} className="hero-badge"
          >
            <img src={batchImg} alt="Top Mobile App Development" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          </motion.div>
        </motion.div>

        {/* USP */}
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
      <SelectedWorkSection label="SELECTED MOBILE WORK" heading="Mobile apps built for real users and real business results." />

      {/* What we build */}
      <section className="service-section" style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={buildRef}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>WHAT WE BUILD</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={buildInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From simple mobile products to complete app ecosystems.
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

      {/* Catalog */}
      <section id="catalog" style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div ref={catRef} style={{ textAlign: "center", marginBottom: "20px" }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "14px" }}>
              <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "999px", background: "#f0f0ff", border: "1px solid #c7d2fe", fontSize: "16px", fontWeight: 700, color: "#4f46e5" }}>Our Mobile App Services</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Explore Our Mobile Development Services
            </motion.h2>
          </div>
          {SERVICES.map((s, i) => <ServiceRow key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* Core features — dark */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={featRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>CORE FEATURES</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Everything your app needs beyond the interface.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {CORE_FEATURES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "28px 24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="service-section" style={{ background: "#f8f8f8", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={techRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>PLATFORM & TECHNOLOGY</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              Build once. Deliver across platforms.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {TECH_STACK.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={techInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#6b7eff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>{tech.category}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {tech.items.map(item => (
                    <span key={item} style={{ fontSize: "16.5px", fontWeight: 500, padding: "4px 10px", borderRadius: "999px", background: "#f5f5f5", color: "#555", border: "1px solid #e8e8e8" }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={processRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>OUR APP DEVELOPMENT PROCESS</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>
              From idea to App Store and Play Store.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: "#f8f8f8", borderRadius: "16px", padding: "28px 24px", border: "1px solid #ebebeb" }}
              >
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#6b7eff", marginBottom: "10px" }}>{step.num}</p>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section style={{ background: "#0a0a0a", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={qualRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={qualInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "12px" }}>QUALITY & PERFORMANCE</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={qualInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
              Built for real devices, not just development screens.
            </motion.h2>
          </div>
          <div className="triple-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {QUALITY_ITEMS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={qualInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{ background: "hsl(0,0%,10%)", borderRadius: "16px", padding: "24px", border: "1px solid hsl(0,0%,15%)" }}
              >
                <div style={{ color: "#6b7eff", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "16.5px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{item.title}</h3>
                <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7eff", textTransform: "uppercase", marginBottom: "16px" }}>HAVE A MOBILE APP IDEA?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: "16px" }}>
            Let's turn it into an app
            <br />people want to use.
          </h2>
          <p style={{ fontSize: "16.5px", color: "#888", lineHeight: 1.75, marginBottom: "32px" }}>
            From product strategy and UI/UX to development, testing and launch, we'll help you build a mobile experience around your users and business goals.
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

      <FAQSection faqs={MOBILE_FAQ} title={"Frequently\nAsked\nQuestions"} subtitle="Everything about our mobile app development services, platforms, technology and timelines." />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default MobileAppDevelopment;
