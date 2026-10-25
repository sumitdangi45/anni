import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const LAST_UPDATED = "1 January 2025";
const COMPANY = "Anni Web Solutions";
const EMAIL = "contact@anniwebsolutions.com";

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: "56px", borderTop: "1px solid var(--border)" }}
    >
      <h2 style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "20px" }}>
        {title}
      </h2>
      <div style={{ fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.85 }}>
        {children}
      </div>
    </motion.section>
  );
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ marginBottom: "16px" }}>{children}</p>
);

const UL = ({ items }: { items: string[] }) => (
  <ul style={{ paddingLeft: "20px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
    {items.map((item, i) => <li key={i} style={{ listStyleType: "disc" }}>{item}</li>)}
  </ul>
);

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px",
    padding: "20px 24px", marginBottom: "20px", fontSize: "16.5px", lineHeight: 1.7,
    color: "var(--muted-foreground)" }}>
    {children}
  </div>
);

const TOC_ITEMS = [
  { id: "overview",         label: "1. Overview" },
  { id: "deposits",         label: "2. Deposits & Upfront Payments" },
  { id: "milestones",       label: "3. Milestone Payments" },
  { id: "eligible",         label: "4. When Refunds Apply" },
  { id: "not-eligible",     label: "5. Non-Refundable Situations" },
  { id: "retainers",        label: "6. Monthly Retainers" },
  { id: "digital-products", label: "7. Digital & Prebuilt Products" },
  { id: "process",          label: "8. How to Request a Refund" },
  { id: "resolution",       label: "9. Dispute Resolution" },
  { id: "contact",          label: "10. Contact Us" },
];

const RefundPolicy = () => {
  useSEO({
    title: "Refund Policy — Anni Web Solutions",
    description: "Understand Anni Web Solutions' refund and cancellation policy for custom development, retainers, and digital products." });

  return (
    <div className="min-h-screen bg-background text-foreground page-light">
      <Navbar />

      {/* Hero */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 20px 40px" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "20px" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "24px" }}>
          Refund<br />Policy
        </h1>
        <p style={{ fontSize: "16.5px", color: "var(--muted-foreground)", marginBottom: "8px" }}>
          Last updated: <strong>{LAST_UPDATED}</strong>
        </p>
        <p style={{ fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: "620px" }}>
          We want every engagement to result in a product you're proud of. This policy outlines when refunds apply, what isn't refundable, and how we handle disputes fairly.
        </p>
      </section>

      {/* Body */}
      <div className="legal-body-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 120px", display: "grid", gridTemplateColumns: "220px 1fr", gap: "80px", alignItems: "start" }}>

        {/* TOC sidebar */}
        <div className="legal-sidebar" style={{ position: "sticky", top: "120px" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "16px" }}>
            Contents
          </p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {TOC_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                style={{ fontSize: "16.5px", color: "var(--muted-foreground)", textDecoration: "none", padding: "5px 0 5px 10px", borderLeft: "2px solid transparent", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--foreground)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)"; (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent"; }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Sections */}
        <main style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

          <Section id="overview" title="1. Overview">
            <InfoBox>
              <strong style={{ color: "var(--foreground)" }}>Short version:</strong> Deposits are non-refundable once work begins. Completed milestones are non-refundable. If we fail to deliver what was agreed, we'll make it right — with a redo or a fair partial refund.
            </InfoBox>
            <P>{COMPANY} provides custom, service-based engagements. Because our work involves dedicated time and skilled resources from the moment a project starts, our refund policy reflects the nature of professional services rather than product purchases.</P>
            <P>We are committed to fair dealing. If something goes wrong on our end, we will always work with you to find a resolution.</P>
          </Section>

          <Section id="deposits" title="2. Deposits & Upfront Payments">
            <P>Most projects require a 50% deposit before work begins. This deposit:</P>
            <UL items={[
              "Reserves dedicated time and resources for your project.",
              "Is non-refundable once project work has commenced.",
              "Is fully refundable if {COMPANY} cancels the project before starting.",
              "Is fully refundable if work has not yet begun and the Client cancels within 48 hours of payment.",
            ]} />
            <P>If you cancel after work has started but before any milestones are completed, the deposit covers the cost of work completed to that point. Any unused portion may be refunded at our discretion.</P>
          </Section>

          <Section id="milestones" title="3. Milestone Payments">
            <P>For multi-milestone projects, each milestone payment covers the work delivered in that phase. Once a milestone has been:</P>
            <UL items={[
              "Delivered to the Client for review, and",
              "Approved (or deemed approved after the review window expires),",
            ]} />
            <P>— that milestone payment is non-refundable, as the work has been completed and accepted.</P>
            <P>Milestone payments for future, unstarted phases are refundable if the project is cancelled before that phase begins.</P>
          </Section>

          <Section id="eligible" title="4. When Refunds Apply">
            <P>You may be eligible for a full or partial refund in the following circumstances:</P>
            <UL items={[
              "{COMPANY} fails to start work within an agreed timeline without notice.",
              "The final deliverable materially fails to meet the written agreed specification and we are unable to rectify it within a reasonable time.",
              "We cancel the project due to our own inability to complete it.",
              "A payment was made in error and no work has begun.",
            ]} />
            <P>In these cases, we will assess the situation in good faith and issue a refund for the portion of work not completed or not meeting spec.</P>
          </Section>

          <Section id="not-eligible" title="5. Non-Refundable Situations">
            <P>Refunds will not be issued in the following situations:</P>
            <UL items={[
              "The Client changes their mind after work has begun.",
              "The Client delays the project by failing to provide required content, approvals, or feedback.",
              "The deliverable meets the agreed specification but the Client decides they no longer want it.",
              "Dissatisfaction with outcomes of SEO, marketing, or advertising campaigns (these depend on many factors outside our control).",
              "Third-party service failures (hosting, APIs, payment gateways) outside our control.",
              "Scope creep — work performed beyond the original spec at the Client's request.",
              "A project is paused by the Client for more than 30 days.",
            ]} />
          </Section>

          <Section id="retainers" title="6. Monthly Retainers">
            <P>For monthly retainer plans (maintenance, marketing, or ongoing development):</P>
            <UL items={[
              "Retainers are billed monthly in advance and cover a defined scope of hours or deliverables.",
              "Unused hours/capacity from one month do not roll over to the next.",
              "You may cancel a retainer with 14 days written notice before the next billing date.",
              "Payments already made for a current retainer month are non-refundable.",
              "If you cancel mid-month, we will complete work until the end of the paid period.",
            ]} />
          </Section>

          <Section id="digital-products" title="7. Digital & Prebuilt Products">
            <P>For prebuilt SaaS products, templates, or digital downloads sold by {COMPANY}:</P>
            <UL items={[
              "All sales are final once access or the product has been delivered.",
              "No refunds are issued for digital products after download or access has been granted.",
              "If a product is materially defective or misrepresented, contact us and we'll make it right.",
            ]} />
          </Section>

          <Section id="process" title="8. How to Request a Refund">
            <P>To request a refund:</P>
            <UL items={[
              `Email us at ${EMAIL} with the subject line "Refund Request — [Your Project Name]".`,
              "Include your project details, invoice number, reason for the request, and any supporting information.",
              "We will acknowledge your request within 2 business days.",
              "We will review and respond with our decision within 7 business days.",
            ]} />
            <P>If approved, refunds are processed to the original payment method within 10–14 business days.</P>
          </Section>

          <Section id="resolution" title="9. Dispute Resolution">
            <P>We genuinely want every client to be happy with our work. If you feel something is wrong:</P>
            <UL items={[
              "Reach out to us directly — most issues can be resolved through honest conversation.",
              "We will always offer to redo work that doesn't meet spec before issuing a refund.",
              "If we can't agree, we'll engage a mutually agreed independent mediator.",
            ]} />
            <P>For more detail on our broader legal terms, please see our <Link to="/terms" style={{ color: "var(--foreground)", textDecoration: "underline" }}>Terms & Conditions</Link>.</P>
          </Section>

          <Section id="contact" title="10. Contact Us">
            <P>Questions about this policy? Get in touch:</P>
            <UL items={[
              `${COMPANY}`,
              `Email: ${EMAIL}`,
              "Phone: +91 79741 35629",
              "WhatsApp: +91 79741 35629",
            ]} />
          </Section>

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
