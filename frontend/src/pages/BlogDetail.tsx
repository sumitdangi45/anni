import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Heart, MessageCircle, Eye, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Loader2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { useLike } from "@/hooks/useLike";
import { useCommentCount } from "@/hooks/useCommentCount";
import { useSEO } from "@/hooks/useSEO";
import { apiFetch, API_BASE } from "@/lib/api";

interface BlogLink { label: string; url: string; icon: string }
interface Blog {
  _id: string; title: string; subtitle?: string; category: string;
  date: string; description: string; fullContent?: string;
  tag?: string; live?: boolean; images: string[];
  pptSlides?: string[]; links?: BlogLink[]; likes?: number; views?: number;
}
interface Comment { _id: string; name: string; message: string; createdAt: string }

const readTime = (t: string) => Math.max(1, Math.ceil(t.split(/\s+/).length / 200));

// ── Image Carousel ──────────────────────────────────────────
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (n: number) => { setDir(n > idx ? 1 : -1); setIdx(n); };
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => { setDir(1); setIdx(p => (p + 1) % images.length); }, 4000);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "16/7", background: "var(--muted)" }}>
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.img key={idx} src={images[idx]} alt="" custom={dir}
          variants={{ enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }), center: { x: 0 }, exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }) }}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={() => go((idx - 1 + images.length) % images.length)} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}><ChevronLeft size={18} /></button>
          <button onClick={() => go((idx + 1) % images.length)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}><ChevronRight size={18} /></button>
          <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6, zIndex: 2 }}>
            {images.map((_, i) => <button key={i} onClick={() => go(i)} style={{ borderRadius: 999, border: "none", cursor: "pointer", padding: 0, background: "#fff", width: i === idx ? 18 : 6, height: 6, opacity: i === idx ? 1 : 0.4, transition: "all 0.25s" }} />)}
          </div>
        </>
      )}
    </div>
  );
};

// ── Slide Preview ────────────────────────────────────────────
const SlidePreview = ({ slides }: { slides: string[] }) => {
  const [active, setActive] = useState(0);
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 12 }}>
        <img src={slides[active]} alt={`Slide ${active + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {slides.map((s, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ flex: 1, aspectRatio: "16/9", borderRadius: 8, overflow: "hidden", border: `2px solid ${active === i ? "var(--foreground)" : "var(--border)"}`, opacity: active === i ? 1 : 0.5, cursor: "pointer", padding: 0, background: "none" }}>
            <img src={s} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Comments ─────────────────────────────────────────────────
const CommentSection = ({ blogId }: { blogId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const load = async () => { try { const r = await fetch(`${API_BASE}/api/comments/${blogId}`); setComments(await r.json()); } catch {} };
  useEffect(() => { load(); }, [blogId]);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setBusy(true);
    try { await apiFetch("/api/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ blogId, name, message: msg }) }); setName(""); setMsg(""); load(); }
    finally { setBusy(false); }
  };
  const inp: React.CSSProperties = { width: "100%", padding: "11px 16px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, color: "var(--foreground)", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
  return (
    <div id="comments" style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 24 }}>Comments ({comments.length})</h2>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inp} />
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Share your thoughts…" rows={3} style={{ ...inp, resize: "none" }} />
        <button type="submit" disabled={busy} style={{ alignSelf: "flex-start", padding: "10px 24px", background: "var(--foreground)", color: "var(--background)", border: "none", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: busy ? 0.6 : 1 }}>
          {busy ? "Posting…" : "Post Comment"}
        </button>
      </form>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {comments.length === 0 && <p style={{ fontSize: 14, color: "var(--muted-foreground)" }}>No comments yet — be the first!</p>}
        {comments.map(c => (
          <div key={c._id} style={{ display: "flex", gap: 12, padding: "16px 18px", border: "1px solid var(--border)", borderRadius: 12, background: "var(--card)" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
              {c.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
                <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--muted-foreground)", lineHeight: 1.65 }}>{c.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Related Card ─────────────────────────────────────────────
const RelatedCard = ({ blog }: { blog: Blog }) => (
  <Link to={`/blogs/${blog._id}`} style={{ textDecoration: "none", color: "inherit", display: "block", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", background: "var(--card)" }}>
    {blog.images[0]
      ? <div style={{ height: 160, overflow: "hidden" }}><img src={blog.images[0]} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
      : <div style={{ height: 100, background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>{blog.category}</span></div>
    }
    <div style={{ padding: "16px 18px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: 8 }}>{blog.category}</p>
      <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35 }}>{blog.title}</p>
    </div>
  </Link>
);

// ── Main ──────────────────────────────────────────────────────
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { liked, likeCount, toggleLike } = useLike(id ?? "", blog?.likes ?? 0);
  const commentCount = useCommentCount(id ?? "");

  useSEO({ title: blog?.title ?? "Blog", description: blog?.description, ogImage: blog?.images?.[0] });

  useEffect(() => {
    if (!loading && window.location.hash === "#comments") {
      setTimeout(() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [loading]);

  useEffect(() => {
    if (!id) return;
    setLoading(true); setNotFound(false);
    fetch(`${API_BASE}/api/blogs/${id}`)
      .then(async r => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then(d => { if (d) setBlog(d); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    apiFetch("/api/blogs").then(r => r.json()).then((d: Blog[]) => setRelated(d.filter(b => b._id !== id).slice(0, 3))).catch(() => {});
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} />
    </div>
  );

  if (notFound || !blog) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <p style={{ color: "var(--muted-foreground)" }}>Article not found.</p>
      <Link to="/blogs" style={{ padding: "10px 24px", border: "1px solid var(--border)", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", color: "var(--foreground)" }}>Back to Blog</Link>
    </div>
  );

  const fullText = [blog.description, blog.fullContent].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen bg-background text-foreground page-light">
      <Navbar />

      <article style={{ maxWidth: 780, margin: "0 auto", padding: "120px 20px 80px" }}>

        {/* Back */}
        <button onClick={() => navigate("/blogs")} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 36 }}>
          <ArrowLeft size={15} /> Back to Blog
        </button>

        {/* Category + date */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999, border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
            {blog.category}
          </span>
          {blog.live && (
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: "#111", color: "#fff", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} /> Latest
            </span>
          )}
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 20 }}>
          {blog.title}
        </h1>
        {blog.subtitle && (
          <p style={{ fontSize: 16, color: "var(--muted-foreground)", marginBottom: 16, lineHeight: 1.5, fontStyle: "italic" }}>{blog.subtitle}</p>
        )}

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 14, paddingBottom: 24, borderBottom: "1px solid var(--border)", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "var(--background)", flexShrink: 0 }}>A</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1 }}>Anni Web Solutions</p>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", marginTop: 3 }}>Team</p>
            </div>
          </div>
          <span style={{ color: "var(--border)" }}>·</span>
          <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{blog.date}</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--muted-foreground)" }}>
            <Clock size={13} /> {readTime(fullText)} min read
          </span>
          {blog.tag && <span style={{ fontSize: 12, color: "var(--muted-foreground)", padding: "2px 10px", border: "1px solid var(--border)", borderRadius: 999 }}>#{blog.tag}</span>}
          {blog.links && blog.links.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, padding: "4px 12px", border: "1px solid var(--border)", borderRadius: 999, textDecoration: "none", color: "var(--foreground)" }}>
              {l.icon === "github" ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> : <ExternalLink size={12} />}
              {l.label}
            </a>
          ))}
        </div>

        {/* Like / comment / views bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
          <button onClick={toggleLike} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Heart size={18} style={{ color: "#f87171", fill: liked ? "#f87171" : "none", transition: "all 0.2s" }} />
            <span style={{ fontSize: 14, color: "#f87171", fontWeight: 600 }}>{likeCount}</span>
          </button>
          <a href="#comments" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
            <MessageCircle size={18} style={{ color: "#4ade80" }} />
            <span style={{ fontSize: 14, color: "#4ade80", fontWeight: 600 }}>{commentCount}</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Eye size={16} style={{ color: "var(--muted-foreground)" }} />
            <span style={{ fontSize: 14, color: "var(--muted-foreground)" }}>{blog.views ?? 0}</span>
          </div>
        </div>

        {/* Cover image / carousel */}
        {blog.images && blog.images.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <ImageCarousel images={blog.images} />
          </div>
        )}

        {/* Body */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 16, color: "var(--muted-foreground)", lineHeight: 1.85, marginBottom: 20 }}>{blog.description}</p>
          {blog.fullContent && blog.fullContent.split("\n\n").map((para, i) => (
            <p key={i} style={{ fontSize: 15.5, color: "var(--muted-foreground)", lineHeight: 1.85, marginBottom: 20, whiteSpace: "pre-line" }}>{para}</p>
          ))}
        </div>

        {/* PPT Slides */}
        {blog.pptSlides && blog.pptSlides.length > 0 && (
          <>
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Slides</h2>
            <SlidePreview slides={blog.pptSlides} />
          </>
        )}

        {/* Comments */}
        <CommentSection blogId={blog._id} />

      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700 }}>More Articles</h2>
            <Link to="/blogs" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, textDecoration: "none", color: "var(--muted-foreground)" }}>
              All articles <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {related.map(r => <RelatedCard key={r._id} blog={r} />)}
          </div>
        </section>
      )}

      <CTABanner />
      <Footer />
    </div>
  );
};

export default BlogDetail;
