import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, MessageCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

// ── FAQ Data ──────────────────────────────────────────────────

const FAQ_CATEGORIES = [
  {
    id: "working-with-us",
    label: "Working With Us",
    items: [
      {
        q: "What is Anni Web Solutions?",
        a: "Anni Web Solutions is a full-service digital agency based in India. We help startups, SMEs, and founders build web apps, mobile apps, SaaS products, AI solutions, and run digital marketing — all under one roof. Think of us as your on-demand tech team.",
      },
      {
        q: "Who do you typically work with?",
        a: "We work with early-stage startups moving from idea to MVP, growing businesses that need to scale their digital infrastructure, founders who need a reliable tech partner, and agencies that want white-label development support.",
      },
      {
        q: "Do you work with clients worldwide?",
        a: "Yes. Our clients are based across India, the Middle East, Southeast Asia, and beyond. We work fully remotely and are comfortable with async collaboration across time zones.",
      },
      {
        q: "Who will I actually work with?",
        a: "You'll work directly with Sumit Dangi (Founder) and a dedicated project lead. We keep communication direct — no account managers passing messages around. You get the actual people building your product.",
      },
      {
        q: "How do we communicate during a project?",
        a: "We use WhatsApp, email, or any tool your team prefers (Slack, Notion, Linear, etc.). You'll get regular updates, milestone reviews, and direct access to the team throughout the project.",
      },
      {
        q: "Can you work with our existing in-house team?",
        a: "Absolutely. We often plug into existing teams as an extension — handling overflow work, specific features, or specialized skills like AI integration or mobile development that your team doesn't have in-house.",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      {
        q: "What services do you offer?",
        a: "We offer end-to-end digital services: custom web development, mobile app development (Android, iOS, cross-platform), SaaS product development, AI/ML solutions, automation & integrations, e-commerce development, UI/UX design, digital marketing & SEO, and ongoing maintenance & support.",
      },
      {
        q: "Can multiple services be combined in one project?",
        a: "Yes — and that's actually how most of our best projects work. For example, a SaaS product might include web development, a mobile app, AI features, and ongoing SEO. We scope everything together and give you a unified price.",
      },
      {
        q: "Do you build AI-powered products?",
        a: "Yes. AI is a core part of what we do. We build LLM-powered features, custom chatbots, AI automation workflows, RAG systems, computer vision solutions, and integrate APIs like OpenAI, Gemini, and Anthropic into your products.",
      },
      {
        q: "Do you offer UI/UX design or just development?",
        a: "Both. We handle everything from wireframes and design systems to final development. You can come to us with just an idea — we'll design and build it end to end.",
      },
      {
        q: "Do you do digital marketing as well?",
        a: "Yes. We offer SEO, Google Ads, Meta Ads, social media management, email marketing, and content strategy. Our goal is to help you not just build a product but grow it.",
      },
    ],
  },
  {
    id: "projects-pricing",
    label: "Projects & Pricing",
    items: [
      {
        q: "How are projects priced?",
        a: "Every project is scoped and priced individually based on complexity, timeline, and deliverables. We provide a detailed proposal after a discovery call. We also offer monthly retainer plans for ongoing work.",
      },
      {
        q: "Do you have a minimum project budget?",
        a: "We don't have a hard minimum, but most custom projects start from ₹50,000 (or ~$600 USD). Small tasks and hourly consulting are available for existing clients or clearly scoped work.",
      },
      {
        q: "How long does a typical project take?",
        a: "It depends on scope. A landing page or simple website: 1–2 weeks. A full web application or MVP: 4–8 weeks. A complex SaaS product or mobile app: 8–16 weeks. We always give you a realistic timeline upfront.",
      },
      {
        q: "What's your payment structure?",
        a: "Typically 50% upfront to start the project, and 50% on delivery. For larger projects, we break it into milestone-based payments. Monthly retainers are billed at the start of each month.",
      },
      {
        q: "Can you work on an existing product or website?",
        a: "Yes. We regularly take over existing codebases to add features, fix bugs, refactor, or scale. We'll start with a technical audit to understand what we're working with before committing to a scope.",
      },
    ],
  },
  {
    id: "process",
    label: "Our Process",
    items: [
      {
        q: "What does the project process look like?",
        a: "It goes: Discovery call → Proposal & scope → Design (if needed) → Development sprints → QA & testing → Launch → Ongoing support. We keep you in the loop at every stage with regular updates and demos.",
      },
      {
        q: "Do you provide a project proposal before starting?",
        a: "Always. After our discovery call we send a written proposal with scope of work, deliverables, timeline, and pricing. Nothing starts without your sign-off.",
      },
      {
        q: "How do revisions work?",
        a: "Each project includes a defined number of revision rounds. We work iteratively — you give feedback at each milestone, so there are no big surprises at the end. Additional revisions beyond scope are billed at our hourly rate.",
      },
      {
        q: "Will I get the source code?",
        a: "Yes. On project completion and final payment, you receive full ownership of the source code, assets, and all project files. We typically hand off via a private GitHub repository.",
      },
      {
        q: "Do you handle deployment and hosting?",
        a: "Yes. We can handle full deployment to AWS, GCP, Azure, Vercel, or any platform you prefer. We also offer managed hosting and DevOps support as an add-on service.",
      },
    ],
  },
  {
    id: "ai-saas",
    label: "AI & SaaS",
    items: [
      {
        q: "Can you build a SaaS product from scratch?",
        a: "Yes — this is one of our specialities. We handle the full stack: architecture, backend APIs, frontend dashboard, database, auth, billing integration, and deployment. We can take you from zero to a live, paying-customer-ready product.",
      },
      {
        q: "What AI technologies do you work with?",
        a: "We work with OpenAI (GPT-4, Whisper, DALL-E), Google Gemini, Anthropic Claude, LangChain, LlamaIndex, Hugging Face, custom ML models (Scikit-learn, TensorFlow, PyTorch), and vector databases like Pinecone and Weaviate.",
      },
      {
        q: "Can you build a custom chatbot for my business?",
        a: "Yes. We build chatbots trained on your own data — for customer support, lead generation, internal knowledge bases, or product assistants. They can be embedded in your website, app, or messaging platforms like WhatsApp.",
      },
      {
        q: "Do you build automation workflows?",
        a: "Yes. We automate repetitive business processes using custom code, n8n, Make (Integromat), Zapier, and AI agents. Common use cases: lead routing, invoice processing, CRM sync, social media automation, and data pipelines.",
      },
      {
        q: "Can you integrate AI into our existing product?",
        a: "Absolutely. We can add AI features to any existing product — whether it's a recommendation engine, smart search, document processing, or a natural language interface layered on top of your existing system.",
      },
    ],
  },
  {
    id: "support",
    label: "Support & Maintenance",
    items: [
      {
        q: "Do you offer post-launch support?",
        a: "Yes. Every project includes a handover period with bug fixes at no extra cost. After that, we offer monthly maintenance retainers covering updates, security patches, performance monitoring, and small enhancements.",
      },
      {
        q: "What's included in a maintenance retainer?",
        a: "Depending on the plan: regular updates, uptime monitoring, security patches, database backups, small feature additions, and priority support. We'll scope the right retainer based on your product's needs.",
      },
      {
        q: "What if something breaks after launch?",
        a: "If it's a bug from our code, we fix it free of charge within the warranty period (30 days post-launch). After that, fixes are covered under a maintenance retainer or billed as ad-hoc work.",
      },
      {
        q: "Can you maintain a product built by another team?",
        a: "Yes. We take over maintenance for existing products regularly. We'll start with a code review and technical audit, then set up monitoring and a maintenance plan from there.",
      },
    ],
  },
  {
    id: "confidentiality",
    label: "Confidentiality & IP",
    items: [
      {
        q: "Will you sign an NDA?",
        a: "Yes, absolutely. We're happy to sign a mutual NDA before any project discussions. Your idea, data, and business details are kept strictly confidential.",
      },
      {
        q: "Who owns the final product and code?",
        a: "You do — 100%. Upon final payment, all intellectual property, source code, designs, and assets are transferred to you. We retain no rights to your product.",
      },
      {
        q: "Will you work with our competitors?",
        a: "We take confidentiality seriously. If you have concerns about conflicts of interest, raise it upfront and we'll discuss it honestly. We won't share anything you've told us with anyone else.",
      },
      {
        q: "Is our data safe with you?",
        a: "We follow industry-standard security practices — encrypted communications, limited access, no third-party sharing. For sensitive projects we can work under specific data handling agreements.",
      },
    ],
  },
];

// ── Accordion Item ────────────────────────────────────────────

const AccordionItem = ({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) => (
  <div style={{ borderBottom: "1px solid var(--border)" }}>
    <button
      onClick={onToggle}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "22px 0", background: "none", border: "none", cursor: "pointer",
        textAlign: "left", gap: "24px",
      }}
    >
      <span style={{ fontSize: "16px", fontWeight: 500, lineHeight: 1.4, color: "var(--foreground)" }}>{q}</span>
      <span style={{
        width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
        border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--muted-foreground)", transition: "all 0.2s",
        background: isOpen ? "var(--foreground)" : "transparent",
      }}>
        {isOpen
          ? <Minus size={13} color="var(--background)" />
          : <Plus size={13} />}
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <p style={{ fontSize: "16.5px", lineHeight: 1.8, color: "var(--muted-foreground)", paddingBottom: "22px", maxWidth: "680px" }}>
            {a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ── Category Block ────────────────────────────────────────────

const CategoryBlock = ({ category }: { category: typeof FAQ_CATEGORIES[0] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      id={category.id}
      style={{ paddingTop: "80px", paddingBottom: "80px", borderBottom: "1px solid var(--border)" }}
    >
      <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px" }}>
        {category.label}
      </h2>
      {category.items.map((item, i) => (
        <AccordionItem
          key={i}
          q={item.q}
          a={item.a}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
};

// ── Sticky Sidebar ────────────────────────────────────────────

const Sidebar = ({ activeId }: { activeId: string }) => (
  <div style={{ position: "sticky", top: "120px" }}>
    <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "20px" }}>
      FAQ
    </p>
    <h2 style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px" }}>
      Frequently<br />Asked<br />Questions
    </h2>
    <p style={{ fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "36px", maxWidth: "220px" }}>
      Everything you need to know about working with Anni Web Solutions — from services and pricing to process and support.
    </p>

    <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {FAQ_CATEGORIES.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{
            fontSize: "16px",
            fontWeight: activeId === cat.id ? 700 : 400,
            color: activeId === cat.id ? "var(--foreground)" : "var(--muted-foreground)",
            textDecoration: "none",
            padding: "6px 0",
            transition: "color 0.2s",
            borderLeft: activeId === cat.id ? "2px solid var(--foreground)" : "2px solid transparent",
            paddingLeft: "10px",
          }}
        >
          {cat.label}
        </a>
      ))}
    </nav>
  </div>
);

// ── Hero Banner ───────────────────────────────────────────────

const HeroBanner = () => (
  <section style={{
    margin: "100px 20px 0",
    borderRadius: "24px",
    background: "var(--card)",
    border: "1px solid var(--border)",
    padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 80px)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "32px",
    position: "relative" as const,
    overflow: "hidden" as const,
  }}>
    {/* subtle gradient blob */}
    <div style={{
      position: "absolute", top: "-60px", right: "-60px",
      width: "300px", height: "300px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />

    <div>
      <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "20px" }}>
        FAQ
      </p>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", maxWidth: "720px" }}>
        Everything you need to know<br />before working with us.
      </h1>
    </div>

    <p style={{ fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: "520px" }}>
      From services and custom projects to timelines, pricing, AI, confidentiality and support — here's how working with Anni Web Solutions actually works.
    </p>

    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
      <a
        href="/contact"
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "var(--foreground)", color: "var(--background)",
          borderRadius: "999px", padding: "12px 22px",
          fontSize: "16px", fontWeight: 700, textDecoration: "none",
        }}
      >
        <span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ArrowRight size={13} color="var(--foreground)" />
        </span>
        Start a Project
      </a>
      <a
        href="https://wa.me/917974135629"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "transparent", color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "999px", padding: "12px 22px",
          fontSize: "16px", fontWeight: 600, textDecoration: "none",
        }}
      >
        <WhatsAppIcon size={14} />
        Chat on WhatsApp
      </a>
    </div>
  </section>
);

// ── Main Page ─────────────────────────────────────────────────

const FAQ = () => {
  useSEO({
    title: "FAQ — Anni Web Solutions",
    description: "Frequently asked questions about working with Anni Web Solutions — services, pricing, process, AI, SaaS, support and more.",
  });

  const [activeId, setActiveId] = useState(FAQ_CATEGORIES[0].id);

  // Update active sidebar item on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offsets = FAQ_CATEGORIES.map((cat) => {
        const el = document.getElementById(cat.id);
        return { id: cat.id, top: el ? el.getBoundingClientRect().top : Infinity };
      });
      const visible = offsets.filter((o) => o.top <= 180);
      if (visible.length > 0) {
        setActiveId(visible[visible.length - 1].id);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground page-light">
      <Navbar />
      <HeroBanner />

      {/* Main content: sidebar + accordion */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 120px", display: "grid", gridTemplateColumns: "260px 1fr", gap: "80px", alignItems: "start" }}>
        <Sidebar activeId={activeId} />

        <main>
          {FAQ_CATEGORIES.map((cat) => (
            <CategoryBlock key={cat.id} category={cat} />
          ))}
        </main>
      </div>

      {/* Bottom CTA */}
      <section style={{ background: "#111", color: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.45, marginBottom: "20px" }}>
          Still have questions?
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "16px" }}>
          Let's just talk.
        </h2>
        <p style={{ fontSize: "16px", opacity: 0.6, lineHeight: 1.7, marginBottom: "40px", maxWidth: "400px", margin: "0 auto 40px" }}>
          Drop us a message and we'll get back to you within a few hours.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="mailto:contact@anniwebsolutions.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "var(--background)", color: "var(--foreground)",
              borderRadius: "999px", padding: "13px 26px",
              fontSize: "16.5px", fontWeight: 700, textDecoration: "none",
            }}
          >
            <ArrowRight size={14} />
            Email Us
          </a>
          <a
            href="https://wa.me/917974135629"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.1)", color: "var(--background)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "999px", padding: "13px 26px",
              fontSize: "16.5px", fontWeight: 600, textDecoration: "none",
            }}
          >
            <WhatsAppIcon size={14} />
            WhatsApp
          </a>
          <a
            href="tel:+917974135629"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.1)", color: "var(--background)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "999px", padding: "13px 26px",
              fontSize: "16.5px", fontWeight: 600, textDecoration: "none",
            }}
          >
            <Phone size={14} />
            +91 79741 35629
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
