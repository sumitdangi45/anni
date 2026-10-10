import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { apiFetch } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  github_url?: string;
  live_url?: string;
}

const fallbackAll: Project[] = [
  { _id: "1", image_url: "", category: "Graphic Design", title: "Summer Vibes Festival Campaign", description: 'Created promotional materials for the "Summer Vibes Festival," including posters, flyers, and social media graphics.' },
  { _id: "2", image_url: "", category: "Branding", title: "Coral Spiral Abstract", description: "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves and a soft pink gradient background." },
  { _id: "3", image_url: "", category: "UI / UX Design", title: "ShopEase Redesign Sprint", description: 'Redesigned the "ShopEase" e-commerce app to enhance user experience. Focused on simplifying navigation and optimizing the checkout process.' },
  { _id: "4", image_url: "", category: "Branding", title: "Black Geometric Prisms", description: "A collection of sharp, angular black prisms floating against a gradient dark background, showcasing a modern approach to digital 3D geometric composition." },
  { _id: "5", image_url: "", category: "Graphic Design", title: "Pantone Very Peri Poster Design", description: "A minimalist poster design inspired by Pantone's Color of the Year 2022, Very Peri, combining clean typography and a soft periwinkle background." },
  { _id: "6", image_url: "", category: "Graphic Design", title: "Intenza Brand Boutique E-Gift Card Design", description: "Created a modern and elegant e-gift card for Intenza Brand Boutique with minimalism and premium aesthetics." },
  { _id: "7", image_url: "", category: "Web Design", title: "VistaHaven", description: "VistaHaven is a sleek and modern real estate template designed to showcase luxury properties with elegance and sophistication." },
  { _id: "8", image_url: "", category: "Branding", title: "InnovateTech Identity Rollout", description: 'Developed a brand identity for "InnovateTech," including logo design, color palette, and visual style guide.' },
];

const STICKY_TOP = 80;

const FeaturedProjectCard = ({ project, index, total }: { project: Project; index: number; total: number }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.88]);
  const y = useTransform(scrollYProgress, [0, 1], [0, index === total - 1 ? 0 : -40]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [16, 24]);

  return (
    <div
      ref={ref}
      style={{ position: "sticky", top: STICKY_TOP + index * 8, zIndex: index + 1 }}
      className="mb-6"
    >
      <motion.div style={{ scale, y, borderRadius }} className="cursor-pointer group shadow-2xl overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden group" style={{ borderRadius: "inherit" }}>
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
            <div className="px-4 md:px-8 py-4 md:py-6 text-center max-w-xl w-full">
              <div className="flex items-center justify-center gap-3 md:gap-6 mb-3 md:mb-4 flex-wrap">
                {project.live_url ? (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-80"
                    style={{ background: "hsl(120,60%,40%)", color: "#fff" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Live Now
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-40 cursor-default"
                    style={{ background: "hsl(120,60%,40%)", color: "#fff" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Live Now
                  </span>
                )}
                {project.github_url ? (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition-all duration-200 border border-white/20">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    GitHub
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/10 text-white/40 border border-white/10 cursor-default">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    GitHub
                  </span>
                )}
              </div>
              <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-white uppercase">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed mt-2 hidden sm:block">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MoreProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-4">
        <img
          src={project.image_url}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold border border-border rounded-full px-3 py-1 text-green-600 dark:text-green-400 hover:opacity-80 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Now
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold border border-border rounded-full px-3 py-1 text-muted-foreground opacity-40 cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Live Now
            </span>
          )}
          {project.github_url ? (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold border border-border rounded-full px-3 py-1 text-muted-foreground hover:text-foreground transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold border border-border rounded-full px-3 py-1 text-muted-foreground opacity-40 cursor-default">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </span>
          )}
        </div>
        <h3 className="font-serif text-xl font-bold uppercase mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
};

const CATEGORIES = ["All", "Frontend", "Full Stack", "MERN", "AI/ML", "UI/UX"];

const Projects = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const moreRef = useRef(null);
  const moreInView = useInView(moreRef, { once: true, margin: "-100px" });
  const [allProjects, setAllProjects] = useState<Project[]>(fallbackAll);
  const [activeCategory, setActiveCategory] = useState("All");

  useSEO({ title: "Projects", description: "Full-stack and AI/ML projects by Sumit Dangi — scalable, high-performance applications." });

  useEffect(() => {
    apiFetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAllProjects(data);
      })
      .catch(() => {});
  }, []);

  const categories = CATEGORIES;
  const filtered = activeCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
  const featuredProjects = filtered.slice(0, 4);
  const moreProjects = filtered.slice(4);

  return (
    <div className="min-h-screen bg-background text-foreground page-light">
      <Navbar />

      {/* Hero / Header */}
      <section className="section-padding pt-32" ref={heroRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="heading-section leading-none mb-6">Featured Projects</h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
             These projects highlight my work in full-stack development and AI/ML, where I build scalable, high-performance applications focused on solving real-world problems with practical and efficient solutions.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Projects - stack scroll animation */}
          <div>
            {featuredProjects.map((project, i) => (
              <FeaturedProjectCard key={project._id} project={project} index={i} total={featuredProjects.length} />
            ))}
          </div>
        </div>
      </section>

      {/* More Projects */}
      {moreProjects.length > 0 && (
        <section className="section-padding section-alt" ref={moreRef}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={moreInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="heading-section mb-4">More Projects</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {moreProjects.map((project, i) => (
                <MoreProjectCard key={project._id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Projects;
