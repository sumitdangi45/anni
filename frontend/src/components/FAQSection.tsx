import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useSiteImages } from "@/hooks/useSiteImages";

const defaultFaqImages: string[] = [];

const faqs = [
  { num: "01", question: "WHAT SERVICES DO YOU OFFER?",                          answer: "I offer UI/UX design, graphic design, web design, and branding services. Each service is tailored to meet your specific needs and goals." },
  { num: "02", question: "HOW DOES THE DESIGN PROCESS WORK?",                    answer: "My design process involves discovery, research, wireframing, prototyping, and final design delivery with iterative feedback at each stage." },
  { num: "03", question: "HOW LONG DOES A PROJECT USUALLY TAKE?",                answer: "Project timelines vary based on scope and complexity. A typical project takes 2-6 weeks from kickoff to final delivery." },
  { num: "04", question: "WHAT DO I NEED TO PROVIDE BEFORE STARTING A PROJECT?", answer: "I'll need a brief overview of your goals, any brand guidelines, content/copy, and references or inspiration you have in mind." },
  { num: "05", question: "DO YOU OFFER REVISIONS?",                              answer: "Yes! I include multiple rounds of revisions in every project to ensure the final result aligns perfectly with your vision." },
  { num: "06", question: "HOW DO I GET STARTED?",                                answer: "Simply reach out through the contact form or email me. We'll schedule a discovery call to discuss your project needs." },
];

// Tracks which FAQ row is in the center of viewport while scrolling
const useScrollActive = (refs: React.RefObject<HTMLDivElement>[]) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      let closest: number | null = null;
      let closestDist = Infinity;

      refs.forEach((ref, i) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vh / 2);
        if (dist < closestDist && rect.top < vh * 0.75 && rect.bottom > vh * 0.25) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [refs]);

  return activeIndex;
};

const FAQItem = ({
  faq,
  index,
  openIndex,
  setOpenIndex,
  isInView,
  scrollActive,
  rowRef,
  image,
}: {
  faq: typeof faqs[0];
  index: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
  isInView: boolean;
  scrollActive: boolean;
  rowRef: React.RefObject<HTMLDivElement>;
  image: string;
}) => {
  const isOpen = openIndex === index;
  const showImage = scrollActive;
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="relative border-b border-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex items-center gap-6 py-6 text-left group"
      >
        <span className="text-xs font-mono text-muted-foreground/40 w-6 flex-shrink-0">
          {faq.num}
        </span>
        <span
          className={`flex-1 font-serif font-bold text-base md:text-lg uppercase tracking-wide transition-colors duration-200 ${
            showImage ? "text-primary" : ""
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            showImage ? "border-primary text-primary" : "border-border text-foreground"
          }`}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-6 md:pl-12 text-sm text-muted-foreground leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image — only on desktop: hover follows mouse, scroll = fixed right-center */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.82, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            exit={{ opacity: 0, scale: 0.82, rotate: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={
              hovered
                ? {
                    position: "fixed",
                    left: mousePos.x + 24,
                    top: mousePos.y - 80,
                    pointerEvents: "none",
                    zIndex: 999,
                  }
                : {
                    position: "fixed",
                    right: "6vw",
                    top: "50%",
                    transform: "translateY(-50%) rotate(-6deg)",
                    pointerEvents: "none",
                    zIndex: 999,
                  }
            }
            className="hidden lg:block w-52 h-36 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img src={image} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const siteImages = useSiteImages();
  const faqImgsRaw = [1,2,3,4,5,6].map(i => siteImages[`faq_img_${i}`]).filter(Boolean);
  const faqImages = faqImgsRaw.length === 6 ? faqImgsRaw : defaultFaqImages;

  // Create refs for each row
  const rowRefs = useRef(faqs.map(() => ({ current: null } as React.RefObject<HTMLDivElement>)));
  const scrollActiveIndex = useScrollActive(rowRefs.current);

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="heading-section mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Answers to the most common questions I receive. Can't find what you're looking for? Feel free to reach out directly.
          </p>
        </motion.div>

        <div className="border-t border-border">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              isInView={isInView}
              scrollActive={scrollActiveIndex === i}
              rowRef={rowRefs.current[i]}
              image={faqImages[i]}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
