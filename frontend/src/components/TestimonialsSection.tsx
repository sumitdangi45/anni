import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiFetch } from "@/lib/api";
import heroTeam from "@/assets/hero1.png";

interface T {
  _id: string; name: string; role: string;
  company?: string; text: string; rating: number; avatar_url?: string;
}

const FALLBACK: T[] = [
  { _id:"1", name:"Rahul Sharma",  role:"Co-Founder / CEO",  company:"TechStart AI",  text:"Anni Web Solutions delivered beyond expectations. Their team understood our vision from day one and built a product that our users love. Exceptional technical skills.", rating:5 },
  { _id:"2", name:"Priya Mehta",   role:"Product Manager",   company:"FinEdge",       text:"Working with Anni was a seamless experience. Clear communication, fast turnaround, and the quality of their work on our fintech platform was outstanding.", rating:5 },
  { _id:"3", name:"Arjun Patel",   role:"CTO",               company:"ScaleUp SaaS",  text:"The AI automation solution they built for us reduced our manual workload by 70%. These guys really know what they're doing with modern technology.", rating:5 },
  { _id:"4", name:"Sneha Kapoor",  role:"Founder",           company:"GrowthLab",     text:"From the initial discovery call to the final launch, every step was handled professionally. Our website conversions increased by 3x after the redesign.", rating:5 },
  { _id:"5", name:"Dev Malhotra",  role:"CEO",               company:"Uptech",        text:"Working with Anni was a great experience. Clear communication, fast turnaround on feedback, and clean execution throughout. Professional handover process.", rating:5 },
  { _id:"6", name:"Aisha Khan",    role:"Co-Founder",        company:"MentionAI",     text:"Phenomenal work. It was great working with Anni! We have big projects coming and will definitely be interested in working again. Highly recommended.", rating:5 },
];

const COLORS = ["#6b7eff","#4ade80","#f59e0b","#e11d48","#8b5cf6","#06b6d4"];

const Avatar = ({ name, url }: { name: string; url?: string }) => {
  const c = COLORS[name.charCodeAt(0) % COLORS.length];
  if (url) return <img src={url} alt={name} style={{ width:"42px", height:"42px", borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />;
  return (
    <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:c, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <span style={{ fontSize:"16px", fontWeight:800, color:"#fff" }}>{name[0]}</span>
    </div>
  );
};

const Card = ({ t }: { t: T }) => (
  <div style={{ background:"#fff", borderRadius:"16px", padding:"28px 24px", border:"1px solid #e8e8e8", flexShrink:0, width:"300px", height:"520px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
        <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"#f0f0ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:"14px", fontWeight:900, color:"#6b7eff" }}>{(t.company||t.name)[0]}</span>
        </div>
        <span style={{ fontSize:"14px", fontWeight:700, color:"#111" }}>{t.company||"Client"}</span>
      </div>
      <p style={{ fontSize:"14px", color:"#555", lineHeight:1.7, marginBottom:"14px" }}>{t.text}</p>
      <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", padding:"3px 10px", borderRadius:"999px", background:"#f0f0ff", fontSize:"12px", fontWeight:700, color:"#6b7eff" }}>
        ★ 5.0 RATING
      </span>
    </div>
    <div style={{ display:"flex", alignItems:"center", gap:"10px", paddingTop:"16px", borderTop:"1px solid #f0f0f0", marginTop:"16px" }}>
      <Avatar name={t.name} url={t.avatar_url} />
      <div>
        <p style={{ fontSize:"14px", fontWeight:700, color:"#111", marginBottom:"2px" }}>{t.name}</p>
        <p style={{ fontSize:"12.5px", color:"#888" }}>{t.role} @ {t.company||"Client"}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [items, setItems] = useState<T[]>(FALLBACK);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    apiFetch("/api/testimonials?featured=true")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setItems(d.slice(0,8)); })
      .catch(() => {});
  }, []);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir: "left"|"right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
    setTimeout(updateArrows, 350);
  };

  return (
    <section style={{ background:"#f5f5f3", padding:"100px 20px" }}>
      <div style={{ maxWidth:"1320px", margin:"0 auto" }} ref={ref}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"40px", marginBottom:"52px", flexWrap:"wrap" }}>
          <div>
            <motion.p initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
              style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase" as const, color:"#aaa", marginBottom:"14px" }}>
              100% SATISFACTION
            </motion.p>
            <motion.h2 initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.1 }}
              style={{ fontSize:"clamp(2rem,3.8vw,2.8rem)", fontWeight:800, color:"#111", lineHeight:1.1, letterSpacing:"-0.035em" }}>
              Stories From Clients<br />We've Built With
            </motion.h2>
          </div>
          <motion.p initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.2 }}
            style={{ fontSize:"15px", color:"#666", lineHeight:1.75, maxWidth:"360px" }}>
            From web apps to AI solutions, we help{" "}
            <span style={{ color:"#6b7eff", fontWeight:600 }}>visionary teams</span>{" "}
            design, build, and launch digital products — fast.
          </motion.p>
        </div>

        {/* Body */}
        <div style={{ display:"flex", gap:"16px", alignItems:"stretch" }} className="testimonials-layout">

          {/* Left photo card */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.6, delay:0.1 }}
            style={{ width:"380px", flexShrink:0, borderRadius:"20px", overflow:"hidden", position:"relative", height:"520px" }}
            className="testimonials-photo-card">
            <img src={heroTeam} alt="Team" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.1) 60%,transparent 100%)" }} />
            <div style={{ position:"relative", zIndex:2, height:"100%", minHeight:"520px", padding:"32px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <div style={{ fontSize:"3.2rem", fontWeight:900, color:"#fff", lineHeight:1, letterSpacing:"-0.04em" }}>$2.1M</div>
              <p style={{ fontSize:"15px", fontWeight:600, color:"rgba(255,255,255,0.9)", marginTop:"8px" }}>Combined client revenue generated</p>
              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.6)", marginTop:"4px" }}>Across web, mobile and AI projects.</p>
            </div>
          </motion.div>

          {/* Right — carousel */}
          <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:0.5, delay:0.2 }}
            style={{ flex:1, minWidth:0, position:"relative", display:"flex", flexDirection:"column" }}>

            {/* Scroll track */}
            <div
              ref={scrollRef}
              onScroll={updateArrows}
              style={{ display:"flex", gap:"12px", overflowX:"auto", scrollbarWidth:"none", flex:1, scrollSnapType:"x mandatory" } as React.CSSProperties}
            >
              {items.map(t => (
                <div key={t._id} style={{ scrollSnapAlign:"start", flexShrink:0 }}>
                  <Card t={t} />
                </div>
              ))}
            </div>

            {/* Arrow buttons */}
            <div style={{ display:"flex", justifyContent:"flex-end", gap:"8px", marginTop:"20px" }}>
              <button onClick={() => scroll("left")} disabled={!canLeft}
                style={{ width:"40px", height:"40px", borderRadius:"50%", border:"1.5px solid #ddd", background:"#fff", cursor:canLeft?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", opacity:canLeft?1:0.35, transition:"opacity 0.2s" }}>
                <ChevronLeft size={18} color="#111" />
              </button>
              <button onClick={() => scroll("right")} disabled={!canRight}
                style={{ width:"40px", height:"40px", borderRadius:"50%", border:"1.5px solid #ddd", background:"#fff", cursor:canRight?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", opacity:canRight?1:0.35, transition:"opacity 0.2s" }}>
                <ChevronRight size={18} color="#111" />
              </button>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
