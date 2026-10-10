import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, MessageCircle, Eye, Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import { useLike } from "@/hooks/useLike";
import { useCommentCount } from "@/hooks/useCommentCount";
import { useSEO } from "@/hooks/useSEO";
import { apiFetch } from "@/lib/api";

interface Blog {
  _id: string; title: string; subtitle?: string; category: string;
  date: string; description: string; live?: boolean;
  images: string[]; likes?: number; views?: number;
}

const FALLBACK: Blog[] = [
  { _id: "f1", title: "How We Built a SaaS MVP in 6 Weeks", category: "Case Study", date: "Sep 10, 2026", description: "A behind-the-scenes look at how our team took a founder's rough idea and shipped a live, paying-customer-ready product in under six weeks.", images: [], live: true },
  { _id: "f2", title: "Why Most AI Chatbots Fail (And How to Build One That Doesn't)", category: "AI & Tech", date: "Aug 28, 2026", description: "We've built dozens of AI chatbots for clients. Here's what separates the ones that actually work from the ones that quietly get turned off.", images: [] },
  { _id: "f3", title: "The Hidden Cost of Building Your Own Tech Team", category: "Business", date: "Aug 15, 2026", description: "Hiring in-house looks cheaper on paper. We break down the real cost — and why an agency partnership often delivers more for less.", images: [] },
  { _id: "f4", title: "React vs Next.js in 2026: Which One for Your Project?", category: "Web Dev", date: "Jul 30, 2026", description: "Both are great. But choosing the wrong one for your use case adds complexity and slows you down. Here's our honest take.", images: [] },
  { _id: "f5", title: "Building a Scalable Node.js API: Lessons from Production", category: "Backend", date: "Jul 12, 2026", description: "We share architectural patterns and practical lessons from scaling real-world Node.js APIs that handle millions of requests.", images: [] },
  { _id: "f6", title: "SEO That Actually Moves the Needle in 2026", category: "Marketing", date: "Jun 25, 2026", description: "Generic SEO advice is everywhere. This is what we actually do for clients to get real organic growth.", images: [] },
  { _id: "f7", title: "Mobile App or Web App? How to Pick the Right One", category: "Mobile", date: "Jun 8, 2026", description: "The answer isn't always obvious. We walk through the decision framework we use with every new client.", images: [] },
  { _id: "f8", title: "Designing for Conversion: UI Principles That Actually Matter", category: "Design", date: "May 20, 2026", description: "Pretty interfaces don't pay the bills. Here's the design thinking behind the products we've built that convert.", images: [] },
];

const CATS = ["All", "Case Study", "AI & Tech", "Web Dev", "Mobile", "Backend", "Design", "Marketing", "Business"];

const S = {
  label: { fontSize: "16px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--muted-foreground)" },
  card: { borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer", display: "flex", flexDirection: "column" as const },
};

const StatRow = ({ blog }: { blog: Blog }) => {
  const { liked, likeCount, toggleLike } = useLike(blog._id, blog.likes ?? 0);
  const cc = useCommentCount(blog._id);
  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
      <button onClick={e => { e.stopPropagation(); toggleLike(); }} style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <Heart size={13} style={{ color: "#f87171", fill: liked ? "#f87171" : "none" }} />
        <span style={{ fontSize: "16.5px", color: "#f87171" }}>{likeCount}</span>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <MessageCircle size={13} style={{ color: "#4ade80" }} />
        <span style={{ fontSize: "16.5px", color: "#4ade80" }}>{cc}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Eye size={12} style={{ color: "var(--muted-foreground)" }} />
        <span style={{ fontSize: "16.5px", color: "var(--muted-foreground)" }}>{blog.views ?? 0}</span>
      </div>
    </div>
  );
};

const FeaturedCard = ({ blog }: { blog: Blog }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const nav = useNavigate();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      onClick={() => nav(`/blogs/${blog._id}`)}
      style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer", display: "grid", gridTemplateColumns: blog.images.length > 0 ? "1fr 1fr" : "1fr", minHeight: "320px" }}>
      {blog.images.length > 0 && (
        <div style={{ overflow: "hidden", position: "relative", minHeight: "280px" }}>
          <img src={blog.images[0]} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {blog.live && (
            <span style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.8)", color: "#fff", fontSize: "16px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} /> Latest
            </span>
          )}
        </div>
      )}
      <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <p style={{ ...S.label, marginBottom: 14 }}>{blog.category} · {blog.date}</p>
          <h2 style={{ fontSize: "clamp(1.3rem,2.4vw,1.9rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>{blog.title}</h2>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", lineHeight: 1.75, marginBottom: 24 }}>{blog.description}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <StatRow blog={blog} />
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700 }}>Read <ArrowRight size={13} /></span>
        </div>
      </div>
    </motion.div>
  );
};

const BlogCard = ({ blog, i }: { blog: Blog; i: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const nav = useNavigate();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.05 }}
      onClick={() => nav(`/blogs/${blog._id}`)} style={S.card}>
      {blog.images.length > 0 ? (
        <div style={{ height: 200, overflow: "hidden", position: "relative", flexShrink: 0 }}>
          <img src={blog.images[0]} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", color: "#fff", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: "999px" }}>{blog.category}</span>
        </div>
      ) : (
        <div style={{ height: 200, background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ ...S.label }}>{blog.category}</span>
        </div>
      )}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <span style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 8, display: "block" }}>{blog.date}</span>
        <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, letterSpacing: "-0.01em", marginBottom: 8, flex: 1 }}>{blog.title}</h3>
        <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.65, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{blog.description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
          <StatRow blog={blog} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 4 }}>Read <ArrowRight size={10} /></span>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonCard = () => (
  <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", background: "var(--card)" }}>
    <div style={{ height: 200, background: "var(--muted)" }} />
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ height: 10, background: "var(--muted)", borderRadius: 6, width: "30%" }} />
      <div style={{ height: 16, background: "var(--muted)", borderRadius: 6, width: "80%" }} />
      <div style={{ height: 10, background: "var(--muted)", borderRadius: 6 }} />
      <div style={{ height: 10, background: "var(--muted)", borderRadius: 6, width: "60%" }} />
    </div>
  </div>
);

const Blogs = () => {
  useSEO({ title: "Blog — Anni Web Solutions", description: "Insights, case studies, tutorials and tech deep-dives from the Anni Web Solutions team." });

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    apiFetch("/api/blogs")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d: Blog[]) => setBlogs(d && d.length > 0 ? d : FALLBACK))
      .catch(() => setBlogs(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const filtered = blogs
    .filter(b => cat === "All" || b.category?.toLowerCase() === cat.toLowerCase())
    .filter(b => !q || b.title.toLowerCase().includes(q.toLowerCase()) || b.description.toLowerCase().includes(q.toLowerCase()));

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground page-light">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 20px 60px" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p style={{ ...S.label, marginBottom: 20 }}>Insights & Ideas</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <h1 style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", maxWidth: 700 }}>
              The Anni<br /><em style={{ fontStyle: "italic", opacity: 0.4 }}>Journal</em>
            </h1>
            <p style={{ fontSize: 15, color: "var(--muted-foreground)", maxWidth: 360, lineHeight: 1.7 }}>
              Case studies, technical deep-dives, and practical advice from the team building real digital products.
            </p>
          </div>
        </motion.div>

        {/* ── Search + filters ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 }}>
          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: 400, marginBottom: 24 }}>
            <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search articles..."
              style={{ width: "100%", paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 999, fontSize: 14, color: "var(--foreground)", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
                border: "1px solid",
                borderColor: cat === c ? "var(--foreground)" : "var(--border)",
                background: cat === c ? "var(--foreground)" : "transparent",
                color: cat === c ? "var(--background)" : "var(--muted-foreground)",
                transition: "all 0.15s",
              }}>
                {c}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 120px" }}>
        {loading && (
          <>
            <div style={{ marginBottom: 24 }}><SkeletonCard /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[0,1,2].map(i => <SkeletonCard key={i} />)}
            </div>
          </>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted-foreground)" }}>
            <p style={{ fontSize: 15 }}>No articles found{q ? ` for "${q}"` : ""}.</p>
            <button onClick={() => { setQ(""); setCat("All"); }} style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: "var(--foreground)", background: "none", border: "1px solid var(--border)", borderRadius: 999, padding: "8px 20px", cursor: "pointer" }}>
              Clear filters
            </button>
          </div>
        )}

        {!loading && featured && (
          <>
            <div style={{ marginBottom: 24 }}>
              <FeaturedCard blog={featured} />
            </div>
            {rest.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                {rest.map((b, i) => <BlogCard key={b._id} blog={b} i={i} />)}
              </div>
            )}
          </>
        )}
      </div>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default Blogs;
