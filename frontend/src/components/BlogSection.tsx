import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, MessageCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLike } from "@/hooks/useLike";
import { useCommentCount } from "@/hooks/useCommentCount";
import { useSiteImages } from "@/hooks/useSiteImages";
import { apiFetch } from "@/lib/api";

interface Blog {
  _id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  live?: boolean;
  images: string[];
  likes?: number;
}

const fallbackBlogs: Blog[] = [
  { _id: "1", title: "How We Built a SaaS MVP in 6 Weeks", category: "Case Study", date: "Sep 10, 2026", description: "A behind-the-scenes look at how our team took a founder's rough idea and shipped a live, paying-customer-ready product in under six weeks.", images: [], live: true },
  { _id: "2", title: "Why Most AI Chatbots Fail (And How to Build One That Doesn't)", category: "AI & Tech", date: "Aug 28, 2026", description: "We've built dozens of AI chatbots for clients. Here's what separates the ones that actually work from the ones that quietly get turned off.", images: [] },
];

const BlogCard = ({ blog, index, authorAvatar }: { blog: Blog; index: number; authorAvatar: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { liked, likeCount, toggleLike } = useLike(blog._id, blog.likes ?? 0);
  const commentCount = useCommentCount(blog._id);
  const [showHeart, setShowHeart] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const lastTap = useRef(0);
  const navigate = useNavigate();

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
          className="aspect-[16/10] overflow-hidden relative select-none"
          onClick={handleDoubleTap}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={imgIndex}
              src={blog.images[imgIndex]}
              alt={blog.title}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {blog.live && (
            <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Live
            </span>
          )}

          <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
            {blog.category}
          </span>

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
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
              <img src={authorAvatar} alt="Anni Web Solutions" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold leading-none truncate">Anni Web Solutions</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{blog.date}</p>
          </div>
        </div>

        <h3 className="font-serif font-bold leading-snug mb-1.5 text-base">{blog.title}</h3>
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">{blog.description}</p>

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
              <span className="text-[11px] text-muted-foreground">0</span>
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

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const siteImages = useSiteImages();
  const authorAvatar = siteImages.blog_author || siteImages.navbar_avatar || "";

  useEffect(() => {
    apiFetch("/api/blogs")
      .then(res => res.json())
      .then((data: Blog[]) => setBlogs(data && data.length > 0 ? data.slice(0, 2) : fallbackBlogs))
      .catch(() => setBlogs(fallbackBlogs));
  }, []);

  return (
    <section id="blogs" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="heading-section mb-4">Insights & Ideas</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Case studies, technical deep-dives and practical advice from the team building real digital products.
          </p>
        </motion.div>

        {blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog, i) => (
              <BlogCard key={blog._id} blog={blog} index={i} authorAvatar={authorAvatar} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="/blogs" className="btn-outline-indigo">
            Browse the Journal
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
