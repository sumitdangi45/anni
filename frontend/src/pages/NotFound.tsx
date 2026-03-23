import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  const location = useLocation();

  useSEO({ title: "404 — Page Not Found" });

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="font-serif text-[10rem] font-bold leading-none text-foreground/10 select-none">
            404
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h1 className="text-2xl font-serif font-bold uppercase mb-3">Page not found</h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            The page <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{location.pathname}</span> doesn't exist or has been moved.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-semibold hover:border-foreground hover:text-foreground transition-all duration-200"
            >
              <ArrowLeft size={15} />
              Go back
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity duration-200"
            >
              <Home size={15} />
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
