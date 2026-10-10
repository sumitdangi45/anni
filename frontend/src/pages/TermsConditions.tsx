import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const LAST_UPDATED = "1 January 2025";
const COMPANY = "Anni Web Solutions";
const EMAIL = "contact@anniwebsolutions.com";
const WEBSITE = "https://anniwebsolutions.com";

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

const TOC_ITEMS = [
  { id: "acceptance",       label: "1. Acceptance of Terms" },
  { id: "services",         label: "2. Services" },
  { id: "client-obligations", label: "3. Client Obligations" },
  { id: "payment",          label: "4. Payment Terms" },
  { id: "ip",               label: "5. Intellectual Property" },
  { id: "confidentiality",  label: "6. Confidentiality" },
  { id: "liability",        label: "7. Limitation of Liability" },
  { id: "termination",      label: "8. Termination" },
  { id: "warranties",       label: "9. Warranties & Disclaimers" },
  { id: "governing",        label: "10. Governing Law" },
  { id: "changes",          label: "11. Changes to Terms" },
  { id: "contact",          label: "12. Contact Us" },
];

const TermsConditions = () => {
  useSEO({
    title: "Terms & Conditions — Anni Web Solutions",
    description: "Read the Terms and Conditions for engaging Anni Web Solutions for web, mobile, AI, and digital services." });

  return (
    <div className="min-h-screen bg-background text-foreground page-light">
      <Navbar />

      {/* Hero */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "140px 20px 60px" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "20px" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "24px" }}>
          Terms &amp;<br />Conditions
        </h1>
        <p style={{ fontSize: "16.5px", color: "var(--muted-foreground)", marginBottom: "8px" }}>
          Last updated: <strong>{LAST_UPDATED}</strong>
        </p>
        <p style={{ fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: "620px" }}>
          Please read these Terms and Conditions carefully before engaging {COMPANY} for any services. By using our services or signing a proposal, you agree to these terms.
        </p>
      </section>

      {/* Body */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 120px", display: "grid", gridTemplateColumns: "220px 1fr", gap: "80px", alignItems: "start" }}>

        {/* TOC sidebar */}
        <div style={{ position: "sticky", top: "120px" }}>
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

          <Section id="acceptance" title="1. Acceptance of Terms">
            <P>By requesting services from {COMPANY} ("we", "us", "our"), signing a proposal, making a payment, or otherwise engaging with us, you ("Client", "you") agree to be bound by these Terms and Conditions. If you do not agree, do not use our services.</P>
            <P>These terms apply to all services including web development, mobile app development, SaaS development, AI/ML solutions, digital marketing, design, automation, and any other services provided by {COMPANY}.</P>
          </Section>

          <Section id="services" title="2. Services">
            <P>{COMPANY} provides custom digital services as agreed in individual project proposals. Each engagement will be scoped via a written proposal or Statement of Work (SOW) that details deliverables, timelines, and pricing.</P>
            <P>We reserve the right to:</P>
            <UL items={[
              "Subcontract portions of work to trusted partners while maintaining overall responsibility.",
              "Modify or discontinue any service offering with reasonable notice.",
              "Decline any project at our discretion without obligation to provide a reason.",
            ]} />
            <P>Services begin only after receipt of the agreed deposit payment and written approval of the project scope.</P>
          </Section>

          <Section id="client-obligations" title="3. Client Obligations">
            <P>To enable timely delivery, the Client agrees to:</P>
            <UL items={[
              "Provide all required content, assets, credentials, and information in a timely manner.",
              "Assign a single point of contact who has authority to approve deliverables.",
              "Provide feedback within agreed review windows (typically 5 business days per milestone).",
              "Ensure all content and materials provided do not infringe any third-party rights.",
              "Not share project credentials, access, or confidential information without prior consent.",
            ]} />
            <P>Delays caused by the Client's failure to provide required materials may result in revised timelines and may attract additional costs.</P>
          </Section>

          <Section id="payment" title="4. Payment Terms">
            <P>Standard payment structure is 50% upfront before work begins and 50% upon project completion before final handover. For larger projects, milestone-based payments will be agreed in the proposal.</P>
            <P>Additional terms:</P>
            <UL items={[
              "All prices are in INR or USD as stated in the proposal.",
              "Invoices are due within 7 days of issue unless otherwise agreed.",
              "Late payments beyond 14 days may incur a 2% monthly interest charge.",
              "Work may be paused if payments are overdue by more than 14 days.",
              "GST/taxes will be applied as per applicable Indian tax law.",
            ]} />
            <P>For refund terms, please refer to our <Link to="/refund-policy" style={{ color: "var(--foreground)", textDecoration: "underline" }}>Refund Policy</Link>.</P>
          </Section>

          <Section id="ip" title="5. Intellectual Property">
            <P>Upon receipt of full and final payment, the Client receives full ownership of all custom deliverables created specifically for their project, including source code, designs, and written content.</P>
            <P>{COMPANY} retains the right to:</P>
            <UL items={[
              "Use the project in our portfolio, case studies, and marketing (unless the Client requests confidentiality in writing).",
              "Retain ownership of any pre-existing tools, libraries, frameworks, or proprietary code used in the project.",
              "Retain ownership of any general-purpose components or utilities developed during the project.",
            ]} />
            <P>Third-party libraries and open-source components used in the project remain under their respective licenses.</P>
          </Section>

          <Section id="confidentiality" title="6. Confidentiality">
            <P>Both parties agree to keep confidential all proprietary information shared during the project. This includes business ideas, product concepts, technical architecture, user data, and financial information.</P>
            <P>{COMPANY} will not disclose any Client confidential information to third parties without written consent, except where required by law.</P>
            <P>We are happy to sign a mutual Non-Disclosure Agreement (NDA) before any project discussions upon request.</P>
          </Section>

          <Section id="liability" title="7. Limitation of Liability">
            <P>{COMPANY}'s total liability to the Client for any claim arising out of or in connection with a project shall not exceed the total fees paid by the Client for that specific project.</P>
            <P>We are not liable for:</P>
            <UL items={[
              "Indirect, consequential, or incidental damages.",
              "Loss of profits, revenue, data, or business opportunities.",
              "Downtime, data loss, or security breaches caused by third-party services.",
              "Delays caused by Client-side factors including late content delivery or approval.",
              "Any damages arising from the Client's misuse of the delivered product.",
            ]} />
          </Section>

          <Section id="termination" title="8. Termination">
            <P>Either party may terminate a project engagement with 14 days written notice.</P>
            <P>Upon termination:</P>
            <UL items={[
              "The Client is liable for payment for all work completed up to the termination date.",
              "If the Client terminates after work has begun, the deposit is non-refundable.",
              "Completed deliverables will be handed over upon receipt of payment for work completed.",
              "If {COMPANY} terminates due to Client breach, all outstanding amounts become immediately payable.",
            ]} />
          </Section>

          <Section id="warranties" title="9. Warranties & Disclaimers">
            <P>{COMPANY} warrants that services will be performed with reasonable skill and care, and that deliverables will substantially conform to the agreed specification.</P>
            <P>We do not warrant that:</P>
            <UL items={[
              "Delivered products will be entirely free of bugs (a reasonable bug-fix period is included post-launch).",
              "Products will be compatible with all future browser versions or operating system updates.",
              "SEO or marketing work will achieve specific ranking positions or revenue targets.",
              "AI features will produce 100% accurate outputs at all times.",
            ]} />
          </Section>

          <Section id="governing" title="10. Governing Law">
            <P>These Terms are governed by the laws of India. Any disputes arising from these Terms or any project engagement shall be subject to the exclusive jurisdiction of the courts of Madhya Pradesh, India.</P>
            <P>We encourage good-faith resolution of any disputes before formal proceedings. Please contact us at <a href={`mailto:${EMAIL}`} style={{ color: "var(--foreground)" }}>{EMAIL}</a> to resolve any issues.</P>
          </Section>

          <Section id="changes" title="11. Changes to Terms">
            <P>{COMPANY} reserves the right to update these Terms at any time. The updated version will be posted on our website with a revised "Last Updated" date. Continued use of our services after changes constitutes acceptance of the new terms.</P>
          </Section>

          <Section id="contact" title="12. Contact Us">
            <P>If you have any questions about these Terms and Conditions, please contact us:</P>
            <UL items={[
              `Email: ${EMAIL}`,
              "Phone: +91 79741 35629",
              `Website: ${WEBSITE}`,
            ]} />
          </Section>

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
