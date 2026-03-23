import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AddReviewModal from "./AddReviewModal";
import AllReviewsModal from "./AllReviewsModal";
import { useSiteImages } from "@/hooks/useSiteImages";
import { apiFetch } from "@/lib/api";

const defaultAvatars = ["", "", "", ""];

const Stars = () => (
  <div className="flex gap-1 mb-3">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const AnimatedPercent = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}%</span>;
};

interface DBTestimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar_url?: string;
}

const fallbackTestimonials: DBTestimonial[] = [
  { _id: "1", name: "John Harris",    role: "Marketing Director",   text: "Duncan truly understood my vision and turned it into impactful designs. The results went beyond my expectations!", rating: 5 },
  { _id: "2", name: "Michael Lee",    role: "Product Manager",      text: "He took the time to understand our goals and delivered a design that resonated perfectly with our audience.", rating: 5 },
  { _id: "3", name: "Sarah Johnson",  role: "CEO",                  text: "His design skills are unmatched. He transformed my ideas into a high-performing, visually striking website.", rating: 5 },
  { _id: "4", name: "Laura Bennett",  role: "Small Business Owner", text: "As a small business owner, I appreciated how stress-free Duncan made the process.", rating: 5 },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [reviewOpen, setReviewOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const siteImages = useSiteImages();
  const avatars = [1,2,3,4].map(i => siteImages[`reviewer_${i}`]).every(Boolean)
    ? [1,2,3,4].map(i => siteImages[`reviewer_${i}`])
    : defaultAvatars;
  const [featured, setFeatured] = useState<DBTestimonial[]>(fallbackTestimonials);

  useEffect(() => {
    apiFetch("/api/testimonials?featured=true")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setFeatured(data.slice(0, 4));
      })
      .catch(() => {});
  }, [refreshKey]);

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="heading-section mb-4">What People Say</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
           Suggestion & Feedback from users, peers, and mentors after exploring my projects and web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Row 1: testimonial 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-portfolio p-6 border border-border"
          >
            <Stars />
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">"{featured[0]?.text}"</p>
            <div className="flex items-center gap-3">
              <img src={featured[0]?.avatar_url || avatars[0]} alt={featured[0]?.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{featured[0]?.name}</p>
                <p className="text-xs text-muted-foreground">{featured[0]?.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Row 1: testimonial 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-portfolio p-6 border border-border"
          >
            <Stars />
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">"{featured[1]?.text}"</p>
            <div className="flex items-center gap-3">
              <img src={featured[1]?.avatar_url || avatars[1]} alt={featured[1]?.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{featured[1]?.name}</p>
                <p className="text-xs text-muted-foreground">{featured[1]?.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Row 1: dark stats card — 98% */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-zinc-900 dark:bg-white text-white dark:text-black p-6 border border-zinc-700 dark:border-white rounded-xl flex flex-col justify-between"
          >
            <p className="text-sm opacity-70">Participated in multiple hackathons and built innovative solutions</p>
            <div>
              <div className="stat-number">8</div>
              <p className="text-sm opacity-70 mt-1">Hackathons</p>
            </div>
          </motion.div>

          {/* Row 2: primary stats card — 200% */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-blue-900 dark:bg-[hsl(80,100%,72%)] text-white dark:text-black p-6 border border-zinc-700 dark:border-[hsl(80,100%,72%)] rounded-xl flex flex-col justify-between"
          >
            <p className="text-sm opacity-80">Built real-world full-stack & AI projects solving practical problems</p>
            <div>
              <div className="stat-number">8+</div>
              <p className="text-sm opacity-80 mt-1">Projects Completed</p>
            </div>
          </motion.div>

          {/* Row 2: testimonial 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card-portfolio p-6 border border-border"
          >
            <Stars />
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">"{featured[2]?.text}"</p>
            <div className="flex items-center gap-3">
              <img src={featured[2]?.avatar_url || avatars[2]} alt={featured[2]?.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{featured[2]?.name}</p>
                <p className="text-xs text-muted-foreground">{featured[2]?.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Row 2: testimonial 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="card-portfolio p-6 border border-border"
          >
            <Stars />
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">"{featured[3]?.text}"</p>
            <div className="flex items-center gap-3">
              <img src={featured[3]?.avatar_url || avatars[3]} alt={featured[3]?.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{featured[3]?.name}</p>
                <p className="text-xs text-muted-foreground">{featured[3]?.role}</p>
              </div>
            </div>
          </motion.div>

        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button type="button" className="btn-outline-indigo" onClick={() => setAllOpen(true)}>
            More Reviews
          </button>
          <button type="button" className="btn-outline-indigo" onClick={() => setReviewOpen(true)}>
            Add Review
          </button>
        </div>
      </div>

      <AddReviewModal open={reviewOpen} onClose={() => setReviewOpen(false)} onSubmitted={() => setRefreshKey(k => k + 1)} />
      <AllReviewsModal open={allOpen} onClose={() => setAllOpen(false)} refreshKey={refreshKey} />
    </section>
    
  );
};


export default TestimonialsSection;
