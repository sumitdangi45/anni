import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

const fallbackProjects: Project[] = [
  { _id: "1", image_url: "", category: "Graphic Design", title: "Summer Vibes Festival Campaign", description: 'Created promotional materials for the "Summer Vibes Festival," including posters, flyers, and social media graphics.' },
  { _id: "2", image_url: "", category: "Branding", title: "Coral Spiral Abstract", description: "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves and a soft pink gradient background." },
  { _id: "3", image_url: "", category: "UI / UX Design", title: "ShopEase Redesign Sprint", description: 'Redesigned the "ShopEase" e-commerce app to enhance user experience. Focused on simplifying navigation and optimizing the checkout process.' },
  { _id: "4", image_url: "", category: "Branding", title: "Black Geometric Prisms", description: "A collection of sharp, angular black prisms floating against a gradient dark background, showcasing a modern approach to digital 3D geometric composition." },
];

const STICKY_TOP = 80;   // navbar offset

const StackCard = ({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

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
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
            <div className="px-4 md:px-8 py-4 md:py-6 text-center max-w-xl w-full">
              <div className="flex items-center justify-center gap-3 md:gap-6 mb-3 md:mb-4 flex-wrap">
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-80"
                    style={{ background: "hsl(120,60%,40%)", color: "#fff" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Live Now
                  </a>
                ) : (
                  <span
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider opacity-50 cursor-default"
                    style={{ background: "hsl(120,60%,40%)", color: "#fff" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Live Now
                  </span>
                )}
                {project.github_url ? (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition-all duration-200 border border-white/20"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    GitHub
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/10 text-white/50 border border-white/10 cursor-default">
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

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    apiFetch("/api/projects?featured=true")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="projects" className="section-padding section-alt" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="heading-section mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            These projects highlight my work in full-stack development and AI/ML, where I build scalable, high-performance applications focused on solving real-world problems with practical and efficient solutions.
          </p>
        </motion.div>

        {/* Stack scroll container — show latest 4 only */}
        <div>
          {projects.slice(0, 4).map((project, i) => (
            <StackCard
              key={project._id}
              project={project}
              index={i}
              total={Math.min(projects.length, 4)}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="/projects" className="btn-outline-indigo">
            Browse All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
