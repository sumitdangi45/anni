import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Twitter, Instagram } from "lucide-react";
import { useSiteImages } from "@/hooks/useSiteImages";

const useAboutImage = () => {
  const siteImages = useSiteImages();
  return {
    morphSrc: siteImages.morph_portrait || siteImages.about || "",
  };
};

const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
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

  return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
  { value: 2, suffix: "", label: "Interships" },
  { value: 8, suffix: "", label: "hackathon" },
  { value: 7, suffix: "+", label: "Projects " },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { morphSrc } = useAboutImage();

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-4">About me</h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Hi, I'm <span className="font-semibold text-foreground">Sumit Dangi</span> — a Full Stack Developer with a strong foundation in AI and Machine Learning.
              I build modern web applications and integrate machine learning models to solve real-world problems.
              My focus is on scalable systems, intelligent applications, and practical AI solutions.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="stat-number text-primary">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-10 mb-8"
            >
              <div>
                <p className="text-sm text-muted-foreground">Call Today :</p>
                <a href="tel:+917974135629" className="font-medium hover:text-primary transition-colors">
                  +91 7974135629
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email :</p>
                <a href="mailto:sumitdangi8455@gmail.com" className="font-medium hover:text-primary transition-colors">
                  sumitdangi8455@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-5 mb-8"
            >
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/sumit-dangi-780aa5333/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com/sumitdangi45" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </motion.div>

            {/* My Story button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <a
                href="/about"
                className="inline-flex items-center px-6 py-2.5 rounded-full border border-foreground text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
              >
                My Story
              </a>
            </motion.div>
          </motion.div>

          {/* Right: portrait — hidden on mobile, morph animation covers on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex justify-center md:justify-start"
          >
            <div id="morph-about-img" className="w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-[420px] rounded-2xl overflow-hidden">
              <img
                src={morphSrc}
                alt="Sumit Dangi"
                className="w-full h-full object-cover md:opacity-0"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
