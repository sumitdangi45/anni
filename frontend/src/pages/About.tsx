import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Twitter, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSiteImages } from "@/hooks/useSiteImages";
import { useSEO } from "@/hooks/useSEO";

// ── Scroll Image IDs ──────────────────────────────────────
const IMG_1 = "about-img-1";
const IMG_2 = "about-img-2";
const IMG_3 = "about-img-3";
const IMG_4 = "about-img-4";
const IMG_4_END = "about-img-4-end";

interface Rect { top: number; left: number; width: number; height: number; borderRadius: number }
const getRect = (id: string): Rect | null => {
  const el = document.getElementById(id);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    top: r.top + window.scrollY,
    left: r.left,
    width: r.width,
    height: r.height,
    borderRadius: parseFloat(window.getComputedStyle(el).borderRadius) || 16,
  };
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ── Floating Morph Card ───────────────────────────────────
const AboutScrollMorph = () => {
  const siteImages = useSiteImages();
  const [rects, setRects] = useState<{ r1: Rect|null; r2: Rect|null; r3: Rect|null; r4: Rect|null; r4end: Rect|null }>({ r1:null, r2:null, r3:null, r4:null, r4end:null });
  const [pos, setPos] = useState({ top:0, left:0, width:0, height:0, borderRadius:16, opacity:0 });
  const [imgIdx, setImgIdx] = useState(0);
  const [fadeImg, setFadeImg] = useState(0);
  const [crossfade, setCrossfade] = useState(0);

  const morphImages = [
    siteImages.about_img1 || "",
    siteImages.about_img2 || "",
    siteImages.about_img3 || "",
    siteImages.about_img4 || "",
  ];

  useEffect(() => {
    const measure = () => setRects({
      r1: getRect(IMG_1), r2: getRect(IMG_2), r3: getRect(IMG_3), r4: getRect(IMG_4),
      r4end: getRect(IMG_4_END),
    });
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    const { r1, r2, r3, r4, r4end } = rects;
    if (!r1 || !r2 || !r3 || !r4 || !r4end) return;

    setPos({ top: r1.top, left: r1.left, width: r1.width, height: r1.height, borderRadius: r1.borderRadius, opacity: 1 });

    const onScroll = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;

      const t1s = r1.top + r1.height - vh * 0.6;
      const t1e = r2.top - vh * 0.2;
      const t2s = r2.top + r2.height - vh * 0.6;
      const t2e = r3.top - vh * 0.2;
      const t3s = r3.top + r3.height - vh * 0.6;
      const t3e = r4.top - vh * 0.2;
      // section 4 end: image travels down with the section until r4end
      const t4end = r4end.top - r4.height;

      if (sy <= t1s) {
        setImgIdx(0); setFadeImg(0); setCrossfade(0);
        setPos({ top: r1.top, left: r1.left, width: r1.width, height: r1.height, borderRadius: r1.borderRadius, opacity: 1 });
      } else if (sy <= t1e) {
        const t = Math.max(0, Math.min(1, (sy - t1s) / (t1e - t1s)));
        setImgIdx(0); setFadeImg(1); setCrossfade(t);
        setPos({ top: lerp(r1.top, r2.top, t), left: lerp(r1.left, r2.left, t), width: lerp(r1.width, r2.width, t), height: lerp(r1.height, r2.height, t), borderRadius: lerp(r1.borderRadius, r2.borderRadius, t), opacity: 1 });
      } else if (sy <= t2s) {
        setImgIdx(1); setFadeImg(1); setCrossfade(1);
        setPos({ top: r2.top, left: r2.left, width: r2.width, height: r2.height, borderRadius: r2.borderRadius, opacity: 1 });
      } else if (sy <= t2e) {
        const t = Math.max(0, Math.min(1, (sy - t2s) / (t2e - t2s)));
        setImgIdx(1); setFadeImg(2); setCrossfade(t);
        setPos({ top: lerp(r2.top, r3.top, t), left: lerp(r2.left, r3.left, t), width: lerp(r2.width, r3.width, t), height: lerp(r2.height, r3.height, t), borderRadius: lerp(r2.borderRadius, r3.borderRadius, t), opacity: 1 });
      } else if (sy <= t3s) {
        setImgIdx(2); setFadeImg(2); setCrossfade(1);
        setPos({ top: r3.top, left: r3.left, width: r3.width, height: r3.height, borderRadius: r3.borderRadius, opacity: 1 });
      } else if (sy <= t3e) {
        const t = Math.max(0, Math.min(1, (sy - t3s) / (t3e - t3s)));
        setImgIdx(2); setFadeImg(3); setCrossfade(t);
        setPos({ top: lerp(r3.top, r4.top, t), left: lerp(r3.left, r4.left, t), width: lerp(r3.width, r4.width, t), height: lerp(r3.height, r4.height, t), borderRadius: lerp(r3.borderRadius, r4.borderRadius, t), opacity: 1 });
      } else if (sy <= t4end) {
        // sticky-scroll: image travels down with section 4
        const t = Math.max(0, Math.min(1, (sy - t3e) / (t4end - t3e)));
        setImgIdx(3); setFadeImg(3); setCrossfade(1);
        setPos({ top: lerp(r4.top, t4end, t), left: r4.left, width: r4.width, height: r4.height, borderRadius: r4.borderRadius, opacity: 1 });
      } else {
        setImgIdx(3); setFadeImg(3); setCrossfade(1);
        setPos({ top: t4end, left: r4.left, width: r4.width, height: r4.height, borderRadius: r4.borderRadius, opacity: 1 });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [rects]);

  if (pos.opacity === 0) return null;

  return (
    <div style={{ position: "absolute", top: pos.top, left: pos.left, width: pos.width, height: pos.height, borderRadius: pos.borderRadius, overflow: "hidden", pointerEvents: "none", zIndex: 50 }}>
      <img src={morphImages[imgIdx]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <img src={morphImages[fadeImg]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: crossfade, transition: "opacity 0.05s linear" }} />
    </div>
  );
};

// ── About Hero ────────────────────────────────────────────
const AboutHero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const siteImages = useSiteImages();

  return (
    <section className="section-padding pt-32" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-display leading-none mb-6">About me</h1>
            <h3 className="text-sm uppercase tracking-[0.3em] font-semibold text-muted-foreground mb-4">
              <b>SUMIT DANGI</b>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A Full Stack Developer with a strong foundation in AI and Machine Learning.
              I build modern web applications using the MERN stack and integrate intelligent features to solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I have experience working with REST APIs, real-time systems, and interactive user interfaces using tools like GSAP and Framer Motion. My focus is on creating scalable, efficient, and user-friendly applications.
              I'm continuously learning and improving my skills in AI/ML, deep learning, and modern web technologies.
            </p>
            <div className="flex items-center gap-5">
              <a href="https://x.com/sumitdangi8455" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/sumit45___/?hl=en" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/sumit-dangi-780aa5333/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/sumitdangi45" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex justify-center md:justify-start"
          >
            <div id={IMG_1} className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden">
              <img src={siteImages.about_img1 || ""} alt="Sumit Dangi" className="w-full h-full object-cover opacity-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Services ──────────────────────────────────────────────
const services = [
  { num: "1", title: "Frontend Development", items: ["Responsive and modern UI development", "React.js, Tailwind CSS & Bootstrap interfaces", "Interactive and dynamic user experiences", "Smooth animations using GSAP & Framer Motion"] },
  { num: "2", title: "Backend Development", items: ["REST API development using Node.js & Express", "Database management (MongoDB, SQL)", "Secure authentication using JWT", "Scalable and efficient server-side architecture"] },
  { num: "3", title: "AI / Machine Learning", items: ["Machine learning algorithms (Regression, KNN, Decision Trees)", "Deep learning concepts (CNN, RNN, LSTM)", "Data analysis using Python (NumPy, Pandas)", "Integrated AI models and APIs into real-world applications"] },
  { num: "4", title: "Interactive Web Experiences", items: ["Smooth animations using GSAP & Framer Motion", "Advanced UI interactions and micro-interactions", "Performance-optimized and responsive interfaces", "Modern, engaging and user-focused experiences"] },
];

const ServicesBlock = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const siteImages = useSiteImages();
  const img2 = siteImages.about_img2 || "";

  return (
    <section className="section-padding section-alt" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-start gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <h2 className="heading-section leading-tight">what I can do for you</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-10 pl-5">
              I develop high-performance web applications integrating AI & Machine Learning to solve real-world problems.
            </p>
            <div className="divide-y divide-border">
              {services.map((service, i) => (
                <motion.div key={service.num} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}>
                  <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left group">
                    <span className={`font-serif text-base font-bold uppercase tracking-wide transition-colors ${openIndex === i ? "text-primary" : "group-hover:text-primary"}`}>
                      {service.num}. {service.title}
                    </span>
                    <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        {service.items.map((item, j) => (
                          <li key={j} className="text-sm text-muted-foreground pb-2 pl-4 leading-relaxed">— {item}</li>
                        ))}
                        <div className="pb-4" />
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="hidden md:block sticky top-32">
            <div id={IMG_2} className="aspect-[3/4] rounded-2xl overflow-hidden max-h-[460px]">
              <img src={img2} alt="Services" className="w-full h-full object-cover opacity-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Journey ───────────────────────────────────────────────
const timeline = [
  { role: "Foundation", company: "Started my journey with programming basics, learning Python, problem-solving, and core computer science concepts.", period: "1st Year" },
  { role: "Web Development", company: "Learned HTML, CSS, and JavaScript, and built multiple frontend projects. Explored backend development using Node.js and Express.", period: "2nd Year" },
  { role: "Full Stack + AI/ML", company: "Built full-stack applications using the MERN stack and started working on AI/ML projects.", period: "3rd Year" },
  { role: "Current Focus", company: "Improving skills in AI/ML, deep learning, and building scalable full-stack applications with modern technologies.", period: "Pursuing" },
];

const JourneySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const siteImages3 = useSiteImages();
  const img3 = siteImages3.about_img3 || "";

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase leading-tight mb-6">
              Full-Stack & AI Developer Journey
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              From a beginner exploring coding to building full-stack and AI-powered applications, my journey has been driven by curiosity, consistency, and real-world projects.
            </p>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="flex flex-col py-5 border-b border-border gap-1">
                  <h3 className="font-serif text-base font-bold uppercase tracking-wide">{item.role}</h3>
                  <p className="text-sm font-semibold text-primary leading-relaxed">{item.company}</p>
                  <p className="text-xs text-muted-foreground">{item.period}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="hidden md:block sticky top-32">
            <div id={IMG_3} className="aspect-[3/4] rounded-2xl overflow-hidden max-h-[460px]">
              <img src={img3} alt="Journey" className="w-full h-full object-cover opacity-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Tech Stack ────────────────────────────────────────────
const techStack = [
  { emoji: "🔹", name: "Frontend Development", tech: "React.js, HTML, CSS, JavaScript, Tailwind CSS, Bootstrap", desc: "Building responsive, interactive, and high-performance user interfaces." },
  { emoji: "🔹", name: "Backend Development", tech: "Node.js, Express.js, Django", desc: "Developing scalable server-side applications and REST APIs." },
  { emoji: "🔹", name: "Database Management", tech: "MongoDB, SQL", desc: "Designing and managing efficient, scalable databases." },
  { emoji: "🔹", name: "AI / Machine Learning", tech: "Python, NumPy, Pandas, Scikit-learn", desc: "Building intelligent systems using ML algorithms and data processing." },
  { emoji: "🔹", name: "Tools & DevOps", tech: "GitHub, Docker, CI/CD", desc: "Managing version control, containerization, and deployment workflows." },
  { emoji: "🔹", name: "Advanced Skills", tech: "WebSockets, JWT Authentication, REST APIs, GSAP, Framer Motion", desc: "Real-time systems, secure authentication, and advanced UI interactions." },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const siteImages4 = useSiteImages();
  const img4 = siteImages4.about_img4 || "";

  return (
    <section className="section-padding section-alt" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase leading-tight mb-6">My Tech Stack</h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Building scalable full-stack applications and AI-powered systems using modern technologies.
            </p>
            <div className="divide-y divide-border">
              {techStack.map((tech, i) => (
                <motion.div key={tech.name} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }} className="flex items-start gap-4 py-5">
                  <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0 text-lg">{tech.emoji}</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-0.5">{tech.name}</h4>
                    <p className="text-xs text-primary font-medium mb-1">{tech.tech}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tech.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="hidden md:block sticky top-32">
            <div id={IMG_4} className="aspect-[3/4] rounded-2xl overflow-hidden max-h-[460px]">
              <img src={img4} alt="Tech Stack" className="w-full h-full object-cover opacity-0" />
            </div>
          </motion.div>
        </div>
        {/* end anchor for section 4 — floating image travels down to here */}
        <div id={IMG_4_END} className="h-0 w-0" />
      </div>
    </section>
  );
};

// ── Design Process ────────────────────────────────────────
const steps = [
  { num: "01.", title: "Research & Problem Understanding", desc: "I start with in-depth research, analyzing user needs, data, and requirements to clearly define the problem.", image: null },
  { num: "02.", title: "System Design", desc: "I design scalable and efficient system architecture, including frontend, backend, and database structure.", image: null },
  { num: "03.", title: "Full Stack Development", desc: "I develop complete web applications using modern technologies like React, Node.js, and databases.", image: null },
  { num: "04.", title: "AI / ML Integration", desc: "I integrate AI and machine learning models into applications to build intelligent features.", image: null },
  { num: "05.", title: "Optimization & Deployment", desc: "I optimize applications for speed, scalability, and performance, followed by deployment.", image: null },
];

const DesignProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const siteImagesDP = useSiteImages();
  const imgs = {
    research: siteImagesDP.process_research || "",
    concept:  siteImagesDP.process_concept  || "",
    launch:   siteImagesDP.process_launch   || "",
  };

  return (
    <section className="section-padding section-alt" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase leading-tight mb-6">How I Build Scalable & Intelligent Systems</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            My development approach combines full-stack engineering with AI/ML concepts, focusing on problem-solving, scalable system design, and efficient implementation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl p-8 bg-foreground text-background flex flex-col justify-between min-h-[280px]">
            <span className="font-serif text-4xl font-bold opacity-80">{steps[0].num}</span>
            <div><h3 className="font-serif text-xl font-bold uppercase mb-3">{steps[0].title}</h3><p className="text-sm opacity-70 leading-relaxed">{steps[0].desc}</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl overflow-hidden min-h-[280px]">
            <img src={imgs.research} alt="Research" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-2xl p-8 bg-primary text-primary-foreground flex flex-col justify-between min-h-[280px]">
            <span className="font-serif text-4xl font-bold opacity-80">{steps[1].num}</span>
            <div><h3 className="font-serif text-xl font-bold uppercase mb-3">{steps[1].title}</h3><p className="text-sm opacity-80 leading-relaxed">{steps[1].desc}</p></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="rounded-2xl overflow-hidden h-[280px]">
            <img src={imgs.concept} alt="Concept" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="rounded-2xl p-8 bg-card border border-border flex flex-col justify-between h-[280px]">
            <span className="font-serif text-4xl font-bold text-muted-foreground/20">{steps[2].num}</span>
            <div><h3 className="font-serif text-xl font-bold uppercase mb-3">{steps[2].title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{steps[2].desc}</p></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }} className="rounded-2xl p-8 bg-primary text-primary-foreground flex flex-col justify-between min-h-[280px]">
            <span className="font-serif text-4xl font-bold opacity-80">{steps[3].num}</span>
            <div><h3 className="font-serif text-xl font-bold uppercase mb-3">{steps[3].title}</h3><p className="text-sm opacity-80 leading-relaxed">{steps[3].desc}</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 }} className="rounded-2xl p-8 bg-foreground text-background flex flex-col justify-between min-h-[280px]">
            <span className="font-serif text-4xl font-bold opacity-80">{steps[4].num}</span>
            <div><h3 className="font-serif text-xl font-bold uppercase mb-3">{steps[4].title}</h3><p className="text-sm opacity-70 leading-relaxed">{steps[4].desc}</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.8 }} className="rounded-2xl overflow-hidden min-h-[280px]">
            <img src={imgs.launch} alt="Launch" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Main ──────────────────────────────────────────────────
const About = () => {
  useSEO({ title: "About", description: "Full Stack Developer & AI/ML Engineer. Learn about Sumit Dangi's journey, skills, and tech stack." });
  return (
  <div className="relative min-h-screen bg-background text-foreground">
    <AboutScrollMorph />
    <Navbar />
    <AboutHero />
    <ServicesBlock />
    <JourneySection />
    <TechStackSection />
    <DesignProcessSection />
    <ContactSection />
    <Footer />
  </div>
  );
};

export default About;
