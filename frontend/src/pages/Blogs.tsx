import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, MessageCircle, Eye, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useLike } from "@/hooks/useLike";
import { useCommentCount } from "@/hooks/useCommentCount";
import { useSEO } from "@/hooks/useSEO";
import { useSiteImages } from "@/hooks/useSiteImages";
import { apiFetch } from "@/lib/api";

interface Blog {
  _id: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  description: string;
  live?: boolean;
  images: string[];
  likes?: number;
  views?: number;
}

const fallbackBlogs: Blog[] = [
  { _id: "1", title: "How to Streamline Your Design Workflow", category: "Tutorials", date: "Apr 27, 2025", description: "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.", images: [], live: true },
  { _id: "2", title: "5 Design Trends That Will Define 2024", category: "Insights", date: "Apr 30, 2025", description: "Explore the top design trends for 2024 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.", images: [] },
  { _id: "3", title: "The Power of Typography in Web Design", category: "Insights", date: "May 2, 2025", description: "Learn how typography can make or break your website and discover tips for choosing the right fonts to create impact and readability.", images: [] },
  { _id: "4", title: "The Role of Color Psychology in Branding", category: "Insights", date: "Apr 22, 2025", description: "Understand how colors evoke emotions and influence brand perception to create designs that connect with your audience.", images: [] },
  { _id: "5", title: "Mastering UI/UX Design: Key Principles for Success", category: "Resources", date: "Mar 30, 2025", description: "Explore the foundational principles of UI/UX design that create seamless and enjoyable experiences for users.", images: [] },
  { _id: "6", title: "Balancing Creativity and Functionality in Design", category: "Insights", date: "Apr 5, 2025", description: "Learn how to create visually stunning designs that remain functional, ensuring user needs are met without compromising aesthetics.", images: [] },
];

const BlogCardSkeleton = ({ featured = false }: { featured?: boolean }) => (
  <div className="rounded-2xl overflow-hidden border border-border bg-card animate-pulse">
    <div className={`${featured ? "aspect-[16/7]" : "aspect-square"} bg-muted`} />
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-muted" />
        <div className="space-y-1 flex-1">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-2 bg-muted rounded w-16" />
        </div>
      </div>
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-2/3" />
    </div>
  </div>
);

const BlogCard = ({ blog, index, featured = false }: { blog: Blog; index: number; featured?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { liked, likeCount, toggleLike } = useLike(blog._id, blog.likes ?? 0);
  const commentCount = useCommentCount(blog._id);
  const [showHeart, setShowHeart] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const lastTap = useRef(0);
  const navigate = useNavigate();
  const { blog_author, navbar_avatar } = useSiteImages();
  const authorAvatar = blog_author || navbar_avatar || "";

  // Auto-slide every 3s
  useEffect(() => {
    if (!blog.images || blog.images.length === 0) return;
    const timer = setInterval(() => {
      setImgIndex(prev => (prev + 1) % blog.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [blog.images]);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!liked) { toggleLike(); }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 900);
    }
    lastTap.current = now;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image carousel */}
      {blog.images && blog.images.length > 0 && (
        <div
          className={`${featured ? "aspect-[16/7]" : "aspect-square"} overflow-hidden relative select-none`}
          onClick={handleDoubleTap}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={imgIndex}
              src={blog.images[imgIndex]}
              alt={blog.title}
              loading="lazy"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* dark gradient bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Latest badge */}
          {blog.live && (
            <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Latest
            </span>
          )}

          {/* Category top-right */}
          <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
            {blog.category}
          </span>

          {/* Dot indicators */}
          {blog.images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
              {blog.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                  className={`rounded-full transition-all duration-300 ${i === imgIndex ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
                />
              ))}
            </div>
          )}

          {/* Double-tap heart burst */}
          {showHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <Heart size={80} className="fill-red-500 text-red-500 drop-shadow-lg" />
            </motion.div>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="p-4">
        {/* Avatar row */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
      <img src={authorAvatar} alt="Sumit Dangi" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold leading-none truncate">Sumit Dangi</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{blog.date}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-serif font-bold leading-snug mb-1.5 ${featured ? "text-xl md:text-2xl" : "text-sm"}`}>
          {blog.title}
        </h3>
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">{blog.description}</p>

        {/* Bottom: stats + view more */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            <button onClick={toggleLike} className="flex items-center gap-1 group/like">
              <Heart size={14} className={`transition-all duration-200 ${liked ? "fill-red-500 text-red-500 scale-110" : "text-red-400 group-hover/like:scale-110"}`} />
              <span className="text-[11px] font-medium text-red-400">{likeCount}</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(`/blogs/${blog._id}#comments`); }} className="flex items-center gap-1 group/comment">
              <MessageCircle size={14} className="text-green-500 group-hover/comment:scale-110 transition-transform" />
              <span className="text-[11px] font-medium text-green-500">{commentCount}</span>
            </button>
            <div className="flex items-center gap-1">
              <Eye size={13} className="text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">{blog.views ?? 0}</span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-400 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
          >
            View More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BLOG_CATEGORIES = ["All", "Hackathon", "Certification", "Meetup", "Workshop", "Visit", "Others"];

const Blogs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useSEO({ title: "Blogs", description: "Latest updates, achievements, certifications, and insights from Sumit Dangi." });

  const fetchBlogs = () => {
    setLoading(true);
    setError(false);
    apiFetch("/api/blogs")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setBlogs(data && data.length > 0 ? data : fallbackBlogs))
      .catch(() => setBlogs(fallbackBlogs))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBlogs(); }, []);

  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter(b => b.category?.toLowerCase() === activeCategory.toLowerCase());

  const featured = filteredBlogs[0];
  const rest = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="section-padding pt-32" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="heading-section leading-none mb-4">Latest Updates & Achievements</h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              A collection of my recent work, certifications, hackathons, and experiences as I grow as a Full Stack Developer with AI/ML.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {BLOG_CATEGORIES.map(cat => (
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

          {/* Error state */}
          {error && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <p className="text-muted-foreground">Failed to load blogs.</p>
              <button
                onClick={fetchBlogs}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-all"
              >
                <RefreshCw size={14} />
                Retry
              </button>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <>
              <div className="mb-8">
                <BlogCardSkeleton featured />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map(i => <BlogCardSkeleton key={i} />)}
              </div>
            </>
          )}

          {/* Blog content */}
          {!loading && !error && blogs.length > 0 && (
            <>
              {/* Featured Blog */}
              <div className="mb-8">
                <BlogCard blog={featured} index={0} featured />
              </div>

              {/* Blog Grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((blog, i) => (
                    <BlogCard key={blog._id} blog={blog} index={i + 1} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!loading && !error && blogs.length === 0 && (
            <div className="flex items-center justify-center py-24">
              <p className="text-muted-foreground">No blogs yet.</p>
            </div>
          )}
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Blogs;
