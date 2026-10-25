import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const FAQS = [
  { q: "What services does Anni Web Solutions offer?",       a: "We offer end-to-end digital solutions including custom web development, mobile app development, AI/ML solutions, SaaS development, UI/UX design, AI automation, and digital growth & SEO." },
  { q: "How does the project process work?",                 a: "We follow a simple 4-step process: Discovery → Design → Development → Deploy. You stay involved at every step with regular updates and milestone reviews." },
  { q: "How fast can you start on a project?",               a: "We can typically onboard a new project within 3–5 business days. For urgent requirements, we offer fast-track onboarding. Reach out and we'll plan accordingly." },
  { q: "What is included in a custom web development project?", a: "A typical project includes discovery & planning, UI/UX design, frontend & backend development, database setup, third-party integrations, testing, deployment, and 30 days of post-launch support." },
  { q: "Do you work with startups and early-stage teams?",   a: "Absolutely. We specialize in working with startups and founder-led teams. We understand tight budgets and fast timelines — we'll work with you to deliver maximum value." },
  { q: "Can you integrate AI into my existing product?",     a: "Yes. We can integrate AI capabilities — like intelligent search, chatbots, recommendation engines, workflow automation, or custom ML models — into your existing product or platform." },
  { q: "What technologies do you use?",                      a: "We work with React, Next.js, Node.js, Python, React Native, Flutter, MongoDB, PostgreSQL, AWS, and more. For AI, we use OpenAI, LangChain, TensorFlow, and other modern ML frameworks." },
  { q: "Do you offer post-launch support?",                  a: "Yes. All projects include 30 days of free post-launch support. We also offer ongoing maintenance and support packages if you need continued assistance after launch." },
  { q: "Can you sign an NDA?",                               a: "Yes. We are happy to sign a Non-Disclosure Agreement before any project discussions. Your ideas and business information are always kept confidential." },
  { q: "How do we get started?",                             a: "Simply reach out via our Contact page or email us at contact@anniwebsolutions.com. We'll schedule a free discovery call to understand your needs and provide a project proposal." },
];

// ── Row ───────────────────────────────────────────────────────
const FAQRow = ({ faq, isOpen, onToggle }: { faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) => (
  <div style={{ borderBottom: "1px solid #e8e8e8" }}>
    <button onClick={onToggle} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px", padding:"22px 0", background:"transparent", border:"none", cursor:"pointer", textAlign:"left" as const }}>
      <span style={{ fontSize:"15px", fontWeight:500, color:"#111", lineHeight:1.4 }}>{faq.q}</span>
      <div style={{ width:"30px", height:"30px", borderRadius:"50%", flexShrink:0, border:"1.5px solid #e0e0e0", display:"flex", alignItems:"center", justifyContent:"center", background: isOpen ? "#111" : "transparent", transition:"background 0.2s, border-color 0.2s" }}>
        {isOpen ? <Minus size={13} color="#fff" /> : <Plus size={13} color="#888" />}
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3, ease:[0.4,0,0.2,1] }} style={{ overflow:"hidden" }}>
          <p style={{ fontSize:"14.5px", color:"#666", lineHeight:1.75, paddingBottom:"20px", maxWidth:"680px" }}>{faq.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ── Main ──────────────────────────────────────────────────────
const FAQSection = ({ faqs, title, subtitle }: { faqs?: { q: string; a: string }[]; title?: string; subtitle?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const items = faqs ?? FAQS;
  const heading = title ?? "Frequently\nAsked\nQuestions";
  const desc = subtitle ?? "Everything you need to know about working with Anni, from project timelines and pricing to AI solutions and collaboration.";
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#fff", padding: "100px 20px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={ref}>
        <div style={{ display: "flex", gap: isMobile ? "0" : "80px", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }} className="faq-layout">

          {/* Left sticky sidebar */}
          <div style={{ width: isMobile ? "100%" : "220px", flexShrink: 0, position: isMobile ? "static" : "sticky", top: "100px" }} className="faq-sidebar">
            <motion.p initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
              style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"#aaa", marginBottom:"16px" }}>
              FAQ
            </motion.p>
            <motion.h2 initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.1 }}
              style={{ fontSize:"2.2rem", fontWeight:800, color:"#111", lineHeight:1.1, letterSpacing:"-0.035em", marginBottom:"20px" }}>
              {heading.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
            </motion.h2>
            <motion.p initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.2 }}
              style={{ fontSize:"13.5px", color:"#666", lineHeight:1.7, marginBottom:"28px" }}>
              {desc}
            </motion.p>

            {/* CTA */}
            <motion.a initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.25 }}
              href="/faq"
              style={{ display:"flex", alignItems:"center", gap:"10px", background:"#111", color:"#fff", borderRadius:"12px", padding:"11px 16px", fontSize:"14px", fontWeight:600, textDecoration:"none", marginBottom:"28px", transition:"background 0.2s" }}
              
            >
              <span style={{ width:"26px", height:"26px", borderRadius:"8px", background:"#333", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <ArrowRight size={12} color="#fff" />
              </span>
              View All FAQs
            </motion.a>

            {/* Contact card */}
            <motion.div initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.3 }}
              style={{ background:"#f7f7f7", borderRadius:"14px", padding:"18px", border:"1px solid #ebebeb" }}>
              <p style={{ fontSize:"13.5px", fontWeight:700, color:"#111", marginBottom:"14px" }}>Have a different question?</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                <a href="https://x.com/anniwebsolutions" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:"8px", textDecoration:"none" }}>
                  <span style={{ width:"26px", height:"26px", borderRadius:"6px", background:"#000", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </span>
                  <span style={{ fontSize:"13px", color:"#555" }}>@anniwebsolutions</span>
                </a>
                <a href="mailto:contact@anniwebsolutions.com" style={{ display:"flex", alignItems:"center", gap:"8px", textDecoration:"none" }}>
                  <span style={{ width:"26px", height:"26px", borderRadius:"6px", background:"#e8e8e8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <span style={{ fontSize:"13px", color:"#555" }}>contact@anniwebsolutions.com</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right accordion */}
          <div style={{ flex: 1 }}>
            <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:0.5, delay:0.15 }}
              style={{ borderTop:"1px solid #e8e8e8" }}>
              {items.map((faq, i) => (
                <FAQRow key={i} faq={faq} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
