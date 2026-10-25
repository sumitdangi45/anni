import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { useSEO } from "@/hooks/useSEO";
import { apiFetch } from "@/lib/api";
import { useIsMobile } from "@/hooks/useIsMobile";

type Tab = "project" | "subscription" | "call";

const SERVICES = [
  "AI Automation & Bots","Web Development","Mobile App","Digital Marketing",
  "SaaS Development","UI/UX Design","AI/ML Solutions","Custom Software",
];

const BUDGETS = [
  "Under ₹25,000","₹25,000 – ₹75,000","₹75,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000","₹5,00,000+","Let's discuss",
];

const TIMELINES = ["ASAP","1–2 weeks","1 month","2–3 months","3–6 months","Flexible"];

const TABS: { key: Tab; label: string; desc: string; emoji: string }[] = [
  { key: "project",      label: "Start a Project",      desc: "One-off or defined scope",       emoji: "🚀" },
  { key: "subscription", label: "Subscription",         desc: "Ongoing dev partnership",        emoji: "🔄" },
  { key: "call",         label: "Book a Call",           desc: "Not sure? Let's talk first",    emoji: "📞" },
];

const inp: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: "12px",
  border: "1.5px solid #d0d0d0", fontSize: "15px", color: "#111",
  outline: "none", boxSizing: "border-box", background: "#fafafa",
  fontFamily: "inherit", transition: "border-color 0.2s",
};

const Contact = () => {
  useSEO({ title: "Contact — Anni Web Solutions", description: "Tell us what you're building. We'll recommend the best way to work together." });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();

  const [tab, setTab]     = useState<Tab>("project");
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm]   = useState({ name:"", email:"", phone:"", subject:"", message:"", budget:"", timeline:"" });
  const [busy, setBusy]   = useState(false);
  const [done, setDone]   = useState(false);
  const [err, setErr]     = useState("");

  const toggle = (s: string) =>
    setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services: selected, type: tab }),
      });
      setDone(true);
    } catch {
      setErr("Something went wrong. Please email us directly.");
    } finally { setBusy(false); }
  };

  return (
    <div style={{ background: "#f8f8f8", minHeight: "100vh" }} className="page-light">
      <Navbar />

      {/* ── Page wrapper ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "100px 16px 60px" : "120px 20px 80px" }} ref={ref}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
          style={{ textAlign:"center", marginBottom: isMobile ? "40px" : "56px" }}>
          <span style={{ display:"inline-block", background:"#fff0f0", border:"1px solid #fecaca", borderRadius:"999px", padding:"4px 16px", fontSize:"12px", fontWeight:700, color:"#ef4444", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"16px" }}>
            Get In Touch
          </span>
          <h1 style={{ fontSize: isMobile ? "2rem" : "clamp(2.2rem,5vw,3.2rem)", fontWeight:800, color:"#111", letterSpacing:"-0.04em", lineHeight:1.1, marginBottom:"14px" }}>
            Tell us what you're building.
          </h1>
          <p style={{ fontSize:"15px", color:"#777", lineHeight:1.75, maxWidth:"480px", margin:"0 auto" }}>
            We respond within <strong style={{color:"#111"}}>24 hours</strong>. Fill in your details and we'll send you a tailored proposal.
          </p>
        </motion.div>

        {/* ── 2-col layout ── */}
        <div style={{ display:"flex", gap:"24px", alignItems:"flex-start", flexDirection: isMobile ? "column" : "row" }}>

          {/* ══ LEFT: info panel ══ */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.6, delay:0.1 }}
            style={{ width: isMobile ? "100%" : "320px", flexShrink:0 }}>

            {/* Dark hero card */}
            <div style={{ background:"linear-gradient(135deg,#111 0%,#1a1a2e 100%)", borderRadius:"20px", padding:"28px 24px", marginBottom:"16px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"180px", height:"180px", borderRadius:"50%", background:"radial-gradient(circle,rgba(107,114,255,0.3) 0%,transparent 70%)", pointerEvents:"none" }} />
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.4)", marginBottom:"14px" }}>Response Time</p>
              <div style={{ fontSize:"2.4rem", fontWeight:900, color:"#fff", letterSpacing:"-0.04em", lineHeight:1 }}>24h</div>
              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.6)", marginTop:"6px" }}>Average reply time</p>
              <div style={{ marginTop:"20px", display:"flex", flexDirection:"column" as const, gap:"10px" }}>
                {["No commitment required","Free project assessment","Direct founder access"].map(item => (
                  <div key={item} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <CheckCircle2 size={14} color="#4ade80" />
                    <span style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact cards */}
            {[
              { icon:<Mail size={16}/>,         label:"Email",      value:"contact@anniwebsolutions.com", href:"mailto:contact@anniwebsolutions.com", color:"#ef4444" },
              { icon:<WhatsAppIcon size={16}/>,  label:"WhatsApp",   value:"+91 79741 35629",             href:"https://wa.me/917974135629",          color:"#22c55e" },
              { icon:<Phone size={16}/>,         label:"Call",       value:"+91 79741 35629",             href:"tel:+917974135629",                   color:"#3b82f6" },
              { icon:<MapPin size={16}/>,        label:"Location",   value:"India — Serving worldwide",   href:"#",                                   color:"#6b7eff" },
            ].map((c,i) => (
              <motion.a key={i} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.4, delay:0.2+i*0.07 }}
                style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", borderRadius:"14px", background:"#fff", border:"1.5px solid #ebebeb", textDecoration:"none", marginBottom:"8px", transition:"box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow="0 4px 20px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow="none"; (e.currentTarget as HTMLElement).style.transform="none"; }}
              >
                <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:c.color+"18", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:c.color }}>
                  {c.icon}
                </div>
                <div style={{ minWidth:0 }}>
                  <p style={{ fontSize:"11px", fontWeight:700, color:"#aaa", textTransform:"uppercase" as const, letterSpacing:"0.1em", marginBottom:"2px" }}>{c.label}</p>
                  <p style={{ fontSize:"13.5px", fontWeight:600, color:"#111", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.value}</p>
                </div>
                <ArrowRight size={14} color="#ccc" style={{ marginLeft:"auto", flexShrink:0 }} />
              </motion.a>
            ))}
          </motion.div>

          {/* ══ RIGHT: form ══ */}
          <motion.div initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.6, delay:0.15 }}
            style={{ flex:1, minWidth:0, background:"#fff", borderRadius:"24px", border:"1.5px solid #ebebeb", padding: isMobile ? "24px 16px" : "36px", boxShadow:"0 8px 48px rgba(0,0,0,0.06)" }}>

            {done ? (
              /* ── Success state ── */
              <div style={{ textAlign:"center", padding:"60px 20px" }}>
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:200 }}
                  style={{ width:"72px", height:"72px", borderRadius:"50%", background:"#f0fdf4", border:"2px solid #22c55e", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                  <CheckCircle2 size={32} color="#22c55e" />
                </motion.div>
                <h3 style={{ fontSize:"1.5rem", fontWeight:800, color:"#111", marginBottom:"10px" }}>Message Sent!</h3>
                <p style={{ fontSize:"15px", color:"#777", marginBottom:"28px" }}>We'll get back to you within 24 hours with a personalized response.</p>
                <button onClick={() => { setDone(false); setForm({name:"",email:"",phone:"",subject:"",message:"",budget:"",timeline:""}); setSelected([]); }}
                  style={{ padding:"10px 24px", borderRadius:"999px", background:"#111", color:"#fff", border:"none", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">

                {/* ── Tab selector ── */}
                <div style={{ display:"flex", background:"#f5f5f5", borderRadius:"14px", padding:"4px", gap:"4px", marginBottom:"24px" }}>
                  {TABS.map(t => (
                    <button key={t.key} type="button" onClick={() => setTab(t.key)}
                      style={{ flex:1, padding:"10px 6px", borderRadius:"11px", border:"none", cursor:"pointer", background: tab===t.key ? "#fff" : "transparent", boxShadow: tab===t.key ? "0 1px 8px rgba(0,0,0,0.1)" : "none", transition:"all 0.2s" }}>
                      <div style={{ fontSize:"16px", marginBottom:"2px" }}>{t.emoji}</div>
                      <p style={{ fontSize:"12.5px", fontWeight:700, color: tab===t.key ? "#111" : "#888", marginBottom:"2px", lineHeight:1.2 }}>{t.label}</p>
                      {!isMobile && <p style={{ fontSize:"11px", color: tab===t.key ? "#666" : "#bbb", lineHeight:1.2 }}>{t.desc}</p>}
                    </button>
                  ))}
                </div>

                {/* ── Service pills ── */}
                <div style={{ marginBottom:"20px" }}>
                  <p style={{ fontSize:"13px", fontWeight:700, color:"#222", marginBottom:"10px", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>What do you need?</p>
                  <div style={{ display:"flex", flexWrap:"wrap" as const, gap:"7px" }}>
                    {SERVICES.map(s => (
                      <button key={s} type="button" onClick={() => toggle(s)} style={{
                        fontSize:"13px", fontWeight:600, padding:"6px 14px", borderRadius:"999px", cursor:"pointer", transition:"all 0.15s",
                        background: selected.includes(s) ? "#111" : "#f5f5f5",
                        color:       selected.includes(s) ? "#fff" : "#555",
                        border:      selected.includes(s) ? "1.5px solid #111" : "1.5px solid #e8e8e8",
                      }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Divider ── */}
                <div style={{ height:"1px", background:"#f0f0f0", margin:"20px 0" }} />

                {/* ── Name + Email ── */}
                <div className="contact-field-grid" style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"12px", marginBottom:"12px" }}>
                  <div>
                    <label style={{ fontSize:"12px", fontWeight:700, color:"#333", display:"block", marginBottom:"6px", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Full Name *</label>
                    <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Rahul Sharma" style={inp}
                      onFocus={e=>(e.target.style.borderColor="#111")} onBlur={e=>(e.target.style.borderColor="#e8e8e8")} />
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", fontWeight:700, color:"#333", display:"block", marginBottom:"6px", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Email Address *</label>
                    <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="name@company.com" style={inp}
                      onFocus={e=>(e.target.style.borderColor="#111")} onBlur={e=>(e.target.style.borderColor="#e8e8e8")} />
                  </div>
                </div>

                {/* ── Phone + Subject ── */}
                <div className="contact-field-grid" style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"12px", marginBottom:"12px" }}>
                  <div>
                    <label style={{ fontSize:"12px", fontWeight:700, color:"#333", display:"block", marginBottom:"6px", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Phone / WhatsApp</label>
                    <input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+91 79741 35629" style={inp}
                      onFocus={e=>(e.target.style.borderColor="#111")} onBlur={e=>(e.target.style.borderColor="#e8e8e8")} />
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", fontWeight:700, color:"#333", display:"block", marginBottom:"6px", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Subject</label>
                    <input value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="e.g. AI Automation Project" style={inp}
                      onFocus={e=>(e.target.style.borderColor="#111")} onBlur={e=>(e.target.style.borderColor="#e8e8e8")} />
                  </div>
                </div>

                {/* ── Budget + Timeline ── */}
                <div className="contact-field-grid" style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"12px", marginBottom:"12px" }}>
                  <div>
                    <label style={{ fontSize:"12px", fontWeight:700, color:"#333", display:"block", marginBottom:"6px", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Budget Range</label>
                    <select value={form.budget} onChange={e=>setForm(f=>({...f,budget:e.target.value}))} style={{...inp, cursor:"pointer", color:form.budget?"#111":"#aaa"}}>
                      <option value="">Select Budget Range</option>
                      {BUDGETS.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", fontWeight:700, color:"#333", display:"block", marginBottom:"6px", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Timeline</label>
                    <select value={form.timeline} onChange={e=>setForm(f=>({...f,timeline:e.target.value}))} style={{...inp, cursor:"pointer", color:form.timeline?"#111":"#aaa"}}>
                      <option value="">Select Timeline</option>
                      {TIMELINES.map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* ── Message ── */}
                <div style={{ marginBottom:"20px" }}>
                  <label style={{ fontSize:"12px", fontWeight:700, color:"#333", display:"block", marginBottom:"6px", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Project Details *</label>
                  <textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                    rows={4} placeholder="Tell us about your project goals, timeline and any specific requirements..."
                    style={{...inp, resize:"vertical", lineHeight:1.7}}
                    onFocus={e=>(e.target.style.borderColor="#111")} onBlur={e=>(e.target.style.borderColor="#e8e8e8")} />
                </div>

                {err && <p style={{ fontSize:"13px", color:"#ef4444", marginBottom:"12px", padding:"10px 14px", background:"#fff0f0", borderRadius:"8px", border:"1px solid #fecaca" }}>{err}</p>}

                {/* ── Submit ── */}
                <button type="submit" disabled={busy} style={{
                  width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                  background: busy ? "#999" : "#111", color:"#fff",
                  borderRadius:"14px", padding:"15px", fontSize:"15px", fontWeight:700,
                  border:"none", cursor: busy ? "not-allowed" : "pointer", transition:"background 0.2s",
                  letterSpacing:"-0.01em",
                }}
                  onMouseEnter={e=>{ if(!busy)(e.currentTarget as HTMLElement).style.background="#333"; }}
                  onMouseLeave={e=>{ if(!busy)(e.currentTarget as HTMLElement).style.background="#111"; }}
                >
                  {busy ? (
                    <span style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <span style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.8s linear infinite", display:"inline-block" }} />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <span style={{ width:"28px", height:"28px", borderRadius:"8px", background:"#333", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <ArrowRight size={14} />
                      </span>
                      Send Message
                    </>
                  )}
                </button>

                <p style={{ textAlign:"center", fontSize:"12px", color:"#bbb", marginTop:"12px" }}>
                  🔒 Your information is safe. We never share your data.
                </p>

              </form>
            )}
          </motion.div>
        </div>
      </div>

      <CTABanner />
      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-label { font-size: 12px !important; font-weight: 700 !important; color: #222 !important; }
        .contact-form input::placeholder,
        .contact-form textarea::placeholder { color: #999 !important; }
        .contact-form input,
        .contact-form textarea,
        .contact-form select { color: #111 !important; }
      `}</style>
    </div>
  );
};

export default Contact;
