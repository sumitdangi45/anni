import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSiteImages } from "@/hooks/useSiteImages";

const defaultCarousel: string[] = [];
const defaultBadges: string[] = [];

const ImageCarouselSection = () => {
  const siteImages = useSiteImages();
  const carouselRaw = [1,2,3,4,5].map(i => siteImages[`carousel_${i}`]).filter(Boolean);
  const badgesRaw = [1,2,3,4,5].map(i => siteImages[`badge_${i}`]).filter(Boolean);
  const carouselImages = carouselRaw.length > 0 ? carouselRaw : defaultCarousel;
  const badgeImages = badgesRaw.length > 0 ? badgesRaw : defaultBadges;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };

  const prev = () => go((idx - 1 + carouselImages.length) % carouselImages.length);
  const next = () => go((idx + 1) % carouselImages.length);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx(i => (i + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(t);
  }, [carouselImages.length]);

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
              <h2 className="heading-section leading-tight">Badges</h2>
            </div>
            {badgeImages.map((src, i) => (
              <div key={i} className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl border border-border overflow-hidden shadow-sm flex-shrink-0">
                <img src={src} alt={`badge-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative aspect-[16/7] sm:aspect-[16/5] rounded-2xl overflow-hidden bg-muted">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.img
              key={idx}
              src={carouselImages[idx]}
              alt={`Slide ${idx + 1}`}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.8 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0.8 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === idx ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
            {idx + 1} / {carouselImages.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarouselSection;
