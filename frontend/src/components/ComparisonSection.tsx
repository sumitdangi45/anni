import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";

const ROWS = [
  { label: "Fast project start",          freelancer: "y", agency: "n", inhouse: "n", anni: "y" },
  { label: "Dedicated development team",  freelancer: "n", agency: "y", inhouse: "y", anni: "y" },
  { label: "Web + Mobile + AI",           freelancer: "?", agency: "y", inhouse: "?", anni: "y" },
  { label: "Custom solutions",            freelancer: "y", agency: "y", inhouse: "y", anni: "y" },
  { label: "Modern technology stack",     freelancer: "?", agency: "y", inhouse: "?", anni: "y" },
  { label: "Direct communication",        freelancer: "y", agency: "n", inhouse: "y", anni: "y" },
  { label: "Flexible project scope",      freelancer: "y", agency: "n", inhouse: "n", anni: "y" },
  { label: "Post-launch support",         freelancer: "?", agency: "y", inhouse: "y", anni: "y" },
  { label: "Transparent pricing",         freelancer: "y", agency: "n", inhouse: "y", anni: "y" },
];

const CELL = "#1c1c1e";
const ANNI_CELL = "#0f1539";
const ANNI_BORDER = "#1e2a6e";

const Icon = ({ val, isAnni }: { val: string; isAnni: boolean }) => {
  if (val === "y") return <Check size={16} color={isAnni ? "#6b7eff" : "rgba(255,255,255,0.85)"} strokeWidth={2.5} />;
  if (val === "n") return <X size={15} color="rgba(255,255,255,0.22)" strokeWidth={2} />;
  return <HelpCircle size={14} color="rgba(255,255,255,0.22)" strokeWidth={1.5} />;
};

const ComparisonSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const COL_HEADERS = ["Freelancer", "Traditional Agency", "In-house Team"];

  return (
    <section style={{ background: "hsl(0,0%,6%)", padding: "100px 20px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }} ref={ref}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", marginBottom: "56px", flexWrap: "wrap" }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#555", marginBottom: "16px" }}
            >
              SERVICE COMPARISON
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.035em" }}
            >
              Why choose Anni over<br />other options?
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "280px", textAlign: "right" }}
          >
            Up to <span style={{ color: "#fff", fontWeight: 700 }}>three active projects</span> at once.
          </motion.p>
        </div>

        {/* ── Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}
          style={{ overflowX: "auto" }}
          className="comparison-scroll-wrap"
        >
          <div style={{ minWidth: "680px" }}>

            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "6px", marginBottom: "8px", paddingLeft: "0" }}>
              <div />
              {COL_HEADERS.map(col => (
                <div key={col} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.55)", textAlign: "center" }}>{col}</span>
                </div>
              ))}
              {/* Anni header pill */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "6px 0" }}>
                <span style={{
                  display: "inline-block", background: "#1c1c2e", border: "1px solid #2a2a5a",
                  borderRadius: "999px", padding: "7px 16px",
                  fontSize: "13px", fontWeight: 700, color: "#6b7eff" }}>
                  Anni Web Solutions
                </span>
              </div>
            </div>

            {/* Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {ROWS.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "6px" }}>
                  {/* Feature label */}
                  <div style={{ display: "flex", alignItems: "center", height: "52px", background: CELL, borderRadius: "10px", padding: "0 18px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{row.label}</span>
                  </div>

                  {/* Freelancer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "52px", background: CELL, borderRadius: "10px" }}>
                    <Icon val={row.freelancer} isAnni={false} />
                  </div>

                  {/* Traditional Agency */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "52px", background: CELL, borderRadius: "10px" }}>
                    <Icon val={row.agency} isAnni={false} />
                  </div>

                  {/* In-house Team */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "52px", background: CELL, borderRadius: "10px" }}>
                    <Icon val={row.inhouse} isAnni={false} />
                  </div>

                  {/* Anni — highlighted */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "52px", background: ANNI_CELL, borderRadius: "10px", border: `1px solid ${ANNI_BORDER}` }}>
                    <Icon val={row.anni} isAnni={true} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ComparisonSection;
