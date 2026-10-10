import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FillButton from "@/components/FillButton";

const WorksHeader = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: "100px 24px 80px",
        textAlign: "center" }}
    >
      {/* label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#6b7eff",
          marginBottom: "20px" }}
      >
        WORKS
      </motion.p>

      {/* headline */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "#111",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          marginBottom: "20px" }}
      >
        Highlighted Projects
        <br />
        That Made a Real Impact
      </motion.h2>

      {/* subtext */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          fontSize: "15px",
          color: "#666",
          lineHeight: 1.75,
          maxWidth: "480px",
          margin: "0 auto 36px" }}
      >
        From web apps to AI solutions and mobile development,{" "}
        <span style={{ color: "#6b7eff" }}>we help ambitious teams</span>{" "}
        design, build, and launch digital products fast.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FillButton href="/projects" variant="dark" size="lg">
          All Projects
        </FillButton>
      </motion.div>
    </section>
  );
};

export default WorksHeader;
