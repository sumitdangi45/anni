import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronUp } from "lucide-react";

const services = [
  {
    num: "1",
    title: "FRONTEND DEVELOPMENT",
    items: [
      "Responsive and modern UI development",
      "Building interfaces using React.js, Tailwind CSS & Bootstrap",
      "Interactive and dynamic user experiences",
      "Smooth animations using GSAP & Framer Motion",
    ],
  },
  {
    num: "2",
    title: "BACKEND DEVELOPMENT",
    items: [
      "REST API development using Node.js & Express",
      "Database management (MongoDB, SQL)",
      "Secure authentication using JWT",
      "Scalable and efficient server-side architecture",
    ],
  },
  {
    num: "3",
    title: "AI / MACHINE LEARNING",
    items: [
      "Machine learning algorithms (Regression, KNN, Decision Trees)",
      "Deep learning concepts (CNN, RNN, LSTM)",
      "Data analysis using NumPy, Pandas",
      "Integrating AI models and APIs into applications",
    ],
  },
  {
    num: "4",
    title: "INTERACTIVE WEB EXPERIENCES",
    items: [
      "Advanced animations using GSAP & Framer Motion",
      "Micro-interactions and smooth UI transitions",
      "Performance-optimized and responsive interfaces",
      "Modern and engaging user experiences",
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding section-alt relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <h2 className="heading-section leading-tight">what I can do for you</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-10 pl-5">
            As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity.
          </p>

          <div className="divide-y divide-border">
            {services.map((service, i) => (              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-7 text-left group"
                >
                  <span className="font-serif text-lg font-bold uppercase tracking-wide group-hover:text-primary transition-colors">
                    {service.num}. {service.title}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronUp size={18} className="text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      {service.items.map((item, j) => (
                        <li key={j} className="text-sm text-muted-foreground pb-2 pl-4 leading-relaxed">
                          — {item}
                        </li>
                      ))}
                      <div className="pb-4" />
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Invisible anchor for ScrollImageMorph — do not remove */}
        <div
          id="morph-service-img"
          className="hidden md:block"
          style={{
            position: "absolute",
            right: "8vw",
            top: "50%",
            width: "260px",
            height: "340px",
            borderRadius: "16px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
