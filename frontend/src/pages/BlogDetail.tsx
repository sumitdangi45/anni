import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Heart, MessageCircle, Eye, ArrowLeft, MapPin, Zap, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLike } from "@/hooks/useLike";
import { useCommentCount } from "@/hooks/useCommentCount";
import { useSEO } from "@/hooks/useSEO";
import { useSiteImages } from "@/hooks/useSiteImages";
import { apiFetch } from "@/lib/api";

interface BlogLink {
  label: string;
  url: string;
  icon: string;
}

interface BlogPost {
  _id: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  description: string;
  fullContent?: string;
  xp?: string;
  location?: string;
  tag?: string;
  live?: boolean;
  images: string[];
  pptSlides?: string[];
  links?: BlogLink[];
  likes?: number;
  views?: number;
}

// Moved outside component to avoid React treating it as new type each render
const LinkIcon = ({ icon }: { icon: string }) => {
  if (icon === "linkedin") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
  if (icon === "github") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
  return <ExternalLink size={14} />;
};

// Image carousel component
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx(prev => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-muted">
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.img
          key={idx}
          src={images[idx]}
          alt=""
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
            center: { x: 0 },
            exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => go((idx - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => go((idx + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${i === idx ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

// PPT slide preview
const SlidePreview = ({ slides }: { slides: string[] }) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border mb-4">
        <img src={slides[active]} alt={`Slide ${active + 1}`} className="w-full h-full object-cover" />
      </div>
      <div className="flex gap-3">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative flex-1 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all ${active === i ? "border-primary" : "border-border opacity-60 hover:opacity-100"}`}
          >
            <img src={slide} alt={`Page ${i + 1}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-1 left-1 w-5 h-5 rounded-full bg-black/70 text-white text-[10px] font-bold flex items-center justify-center">
              {i + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Comment Section
interface Comment { _id: string; name: string; message: string; createdAt: string }

const CommentSection = ({ blogId }: { blogId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/${blogId}`);
      const data = await res.json();
      setComments(data);
    } catch {}
  };

  useEffect(() => { fetchComments(); }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await apiFetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, name, message }),
      });
      setName(""); setMessage("");
      fetchComments();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-16" id="comments">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-5 rounded-full bg-primary" />
        <h2 className="text-lg font-serif font-bold uppercase tracking-wide">Comments ({comments.length})</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors"
        />
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 rounded-full border border-foreground text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet. Be the first!</p>
        )}
        {comments.map(c => (
          <div key={c._id} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
              {c.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">{c.name}</span>
                <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blog_author, navbar_avatar } = useSiteImages();
  const authorAvatar = blog_author || navbar_avatar || "";

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { liked, likeCount, toggleLike } = useLike(id ?? "", blog?.likes ?? 0);
  const commentCount = useCommentCount(id ?? "");

  useSEO({
    title: blog?.title ?? "Blog",
    description: blog?.description,
    ogImage: blog?.images?.[0],
  });

  // Scroll to #comments anchor after page loads
  useEffect(() => {
    if (!loading && window.location.hash === "#comments") {
      setTimeout(() => {
        document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [loading]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setNotFound(false);
    fetch(`/api/blogs/${id}`)
      .then(async res => {
        if (res.status === 404) { setNotFound(true); return null; }
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(data => { if (data) setBlog(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    apiFetch("/api/blogs")
      .then(res => res.json())
      .then((data: BlogPost[]) => setRelated(data.filter(b => b._id !== id).slice(0, 2)))
      .catch(() => {});
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Blog not found</p>
          <Link to="/blogs" className="btn-outline-indigo">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="section-padding pt-28">
        <div className="max-w-3xl mx-auto">

          {/* Back */}
          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </button>

          {/* Category + Live */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {blog.category}
            </span>
            {blog.live && (
              <span className="flex items-center gap-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Live
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="heading-section mb-2">{blog.title}</h1>

          {/* Subtitle */}
          {blog.subtitle && (
            <p className="text-lg font-serif font-semibold border border-border rounded-full inline-block px-4 py-1 text-muted-foreground mb-4">
              {blog.subtitle}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {blog.xp && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                <Zap size={12} /> {blog.xp}
              </span>
            )}
            {blog.location && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin size={12} /> {blog.location}
              </span>
            )}
            {blog.tag && (
              <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
                #{blog.tag}
              </span>
            )}
            <span className="text-xs text-muted-foreground">{blog.date}</span>
          </div>

          {/* Author + links */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                  <img src={authorAvatar} alt="Sumit Dangi" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Sumit Dangi</p>
                <p className="text-xs text-muted-foreground">Full Stack Developer</p>
              </div>
            </div>
            {blog.links && blog.links.length > 0 && (
              <div className="flex items-center gap-2">
                {blog.links.map(link => (
                  <a key={link.label} href={link.url} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-all">
                    <LinkIcon icon={link.icon} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Image Carousel */}
          {blog.images && blog.images.length > 0 && (
            <div className="mb-8">
              <ImageCarousel images={blog.images} />
            </div>
          )}

          {/* Stats bar */}
          <div className="flex items-center gap-5 py-4 border-y border-border mb-8">
            <button onClick={toggleLike} className="flex items-center gap-1.5 group/like">
              <Heart size={18} className={`transition-all duration-200 ${liked ? "fill-red-500 text-red-500 scale-110" : "text-red-400 group-hover/like:scale-110"}`} />
              <span className="text-sm font-medium text-red-400">{likeCount}</span>
            </button>
            <a href="#comments" className="flex items-center gap-1.5">
              <MessageCircle size={18} className="text-green-500" />
              <span className="text-sm font-medium text-green-500">{commentCount}</span>
            </a>
            <div className="flex items-center gap-1.5">
              <Eye size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{blog.views ?? 0}</span>
            </div>
          </div>

          {/* Content */}
          <div className="mb-12">
            <p className="text-muted-foreground leading-relaxed mb-4">{blog.description}</p>
            {blog.fullContent && (
              <div>
                {blog.fullContent.split("\n\n").map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* PPT Slides */}
          {blog.pptSlides && blog.pptSlides.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full bg-primary" />
                <h2 className="text-lg font-serif font-bold uppercase tracking-wide">PPT / Slides</h2>
              </div>
              <SlidePreview slides={blog.pptSlides} />
            </div>
          )}

          {/* Comments */}
          <CommentSection blogId={blog._id} />

          {/* Related blogs */}
          {related.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-5 rounded-full bg-primary" />
                <h2 className="text-lg font-serif font-bold uppercase tracking-wide">More Blogs</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link key={r._id} to={`/blogs/${r._id}`} className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-md transition-shadow">
                    {r.images && r.images.length > 0 && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={r.images[0]} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{r.category}</span>
                      <h3 className="font-serif text-sm font-bold mt-1 line-clamp-2">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;
