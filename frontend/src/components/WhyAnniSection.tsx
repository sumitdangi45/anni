import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, CheckCircle } from "lucide-react";
import blueVideo from "@/assets/dd/dariiakosova_ssspin.io_1791305497.mp4";

const WhyAnniSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const f = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as const },
  });

  return (
    <section style={{ background: "#fff", padding: "100px 20px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={ref}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "40px", marginBottom: "48px", flexWrap: "wrap" }}>
          <div>
            <motion.p {...f(0)} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#aaa", marginBottom: "14px" }}>
              WHY BUSINESSES CHOOSE ANNI
            </motion.p>
            <motion.h2 {...f(0.08)} style={{ fontSize: "clamp(2rem,3.8vw,2.8rem)", fontWeight: 800, color: "#111", lineHeight: 1.1, letterSpacing: "-0.035em" }}>
              A better way to build digital products.
            </motion.h2>
          </div>
          <motion.p {...f(0.12)} style={{ fontSize: "15px", color: "#666", lineHeight: 1.75, maxWidth: "380px" }}>
            Senior thinking, powerful technology and AI to build digital solutions that{" "}
            <span style={{ color: "#6b7eff", fontWeight: 600 }}>solve real problems</span>{" "}
            and help businesses grow.
          </motion.p>
        </div>

        {/* ── BENTO GRID ──
            3 columns:
            [Col1: tall photo]  [Col2: 2 stats + purple]  [Col3: collage + dark tags]
        */}
        <div className="why-bento" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr 1.4fr",
          gridTemplateRows: "240px 300px",
          gap: "12px",
        }}>

          {/* ── Col 1: tall dark photo card — spans both rows ── */}
          <motion.div {...f(0.1)} style={{
            gridColumn: "1", gridRow: "1 / 3",
            borderRadius: "20px", overflow: "hidden",
            background: "#111", position: "relative",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#2a2a2a 0%,#0a0a0a 100%)" }} />
            <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
            {/* silhouette */}
            <div style={{ position: "absolute", bottom: "110px", left: "50%", transform: "translateX(-50%)", width: "170px", height: "240px", background: "linear-gradient(to bottom,rgba(255,255,255,0.18),rgba(255,255,255,0.03))", borderRadius: "50% 50% 0 0" }} />
            {/* twitter pill */}
            <div style={{ position: "relative", zIndex: 2, padding: "22px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "5px 12px 5px 8px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>@anniwebsolutions</span>
              </span>
            </div>
            <div style={{ position: "relative", zIndex: 2, marginTop: "auto", padding: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>Founder-led studio.</h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.68)", lineHeight: 1.65 }}>
                The person you talk to is the person building your product.
              </p>
            </div>
          </motion.div>

          {/* ── Col 2 Row 1: 2 stat cards side by side ── */}
          <motion.div {...f(0.14)} style={{
            gridColumn: "2", gridRow: "1",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px",
          }}>
            {/* Stat 1 */}
            <div style={{ borderRadius: "20px", background: "#f7f7f7", padding: "24px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Globe size={20} color="#bbb" />
              <div>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#111", lineHeight: 1, letterSpacing: "-0.04em" }}>50+</div>
                <p style={{ fontSize: "13px", color: "#888", marginTop: "5px", fontWeight: 500 }}>Projects delivered.</p>
              </div>
            </div>
            {/* Stat 2 */}
            <div style={{ borderRadius: "20px", background: "#f7f7f7", padding: "24px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <CheckCircle size={20} color="#bbb" />
              <div>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#111", lineHeight: 1, letterSpacing: "-0.04em" }}>30+</div>
                <p style={{ fontSize: "13px", color: "#888", marginTop: "5px", fontWeight: 500 }}>Clients served.</p>
              </div>
            </div>
          </motion.div>

          {/* ── Col 2 Row 2: video bg card ── */}
          <motion.div {...f(0.18)} style={{
            gridColumn: "2", gridRow: "2",
            borderRadius: "20px", overflow: "hidden",
            position: "relative",
            background: "#0a0a1a",
          }}>
            <video src={blueVideo} autoPlay loop muted playsInline
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.75 }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 20%,rgba(0,0,0,0.8) 100%)" }} />
            <div style={{ position:"relative", zIndex:2, height:"100%", padding:"28px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>Beyond the interface.</h3>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                We don't just build websites. We create complete digital experiences across web, mobile, AI and automation.
              </p>
            </div>
          </motion.div>

          {/* ── Col 3 Row 1: dashboard collage card ── */}
          <motion.div {...f(0.2)} style={{
            gridColumn: "3", gridRow: "1",
            borderRadius: "20px", overflow: "hidden",
            background: "#f0f0f0", position: "relative",
          }}>
            <div style={{ padding: "14px", height: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* top mock UI bar */}
              <div style={{ flex: 1, borderRadius: "12px", background: "linear-gradient(135deg,#e8e8ff,#d0d0ff)", padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ height: "7px", width: "55%", borderRadius: "4px", background: "rgba(100,80,255,0.35)" }} />
                <div style={{ height: "5px", width: "38%", borderRadius: "4px", background: "rgba(100,80,255,0.2)" }} />
                <div style={{ flex: 1, borderRadius: "8px", background: "rgba(100,80,255,0.12)", marginTop: "4px" }} />
              </div>
              {/* bottom dark mock */}
              <div style={{ flex: 1, borderRadius: "12px", background: "linear-gradient(135deg,#111,#1a1a2e)", padding: "14px", display: "flex", alignItems: "flex-end" }}>
                <div>
                  <div style={{ height: "6px", width: "65%", borderRadius: "4px", background: "rgba(255,255,255,0.22)", marginBottom: "5px" }} />
                  <div style={{ height: "5px", width: "45%", borderRadius: "4px", background: "rgba(255,255,255,0.1)" }} />
                </div>
              </div>
            </div>
            {/* overlay label */}
            <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px", background: "#111", borderRadius: "10px", padding: "10px 14px" }}>
              <p style={{ fontSize: "12.5px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>Built to perform.</p>
              <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Clean interfaces, scalable architecture and reliable technology.</p>
            </div>
          </motion.div>

          {/* ── Col 3 Row 2: dark tags card ── */}
          <motion.div {...f(0.24)} style={{
            gridColumn: "3", gridRow: "2",
            borderRadius: "20px", background: "#0d0d0d",
            padding: "24px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
              {["Web Development","AI & ML","Mobile Apps","SaaS","UI/UX","Automation","Cloud","Digital Growth"].map(tag => (
                <span key={tag} style={{ fontSize: "11.5px", fontWeight: 600, padding: "4px 11px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)" }}>{tag}</span>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: "6px" }}>
                One partner.<br />Multiple capabilities.
              </h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>Everything you need to build and scale.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyAnniSection;
