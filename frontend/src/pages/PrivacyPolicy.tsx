import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const TOC_ITEMS = [
  { id: "overview",       label: "1. Overview" },
  { id: "data-collected", label: "2. Information We Collect" },
  { id: "how-we-use",     label: "3. How We Use Your Data" },
  { id: "sharing",        label: "4. Data Sharing" },
  { id: "cookies",        label: "5. Cookies" },
  { id: "security",       label: "6. Data Security" },
  { id: "retention",      label: "7. Data Retention" },
  { id: "rights",         label: "8. Your Rights" },
  { id: "third-party",    label: "9. Third-Party Links" },
  { id: "children",       label: "10. Children's Privacy" },
  { id: "changes",        label: "11. Changes to Policy" },
  { id: "contact",        label: "12. Contact Us" },
];

const PrivacyPolicy = () => {
  useSEO({
    title: "Privacy Policy — Anni Web Solutions",
    description: "Learn how Anni Web Solutions collects, uses, and protects your personal data." });

  return (
    <div className="min-h-screen bg-background text-foreground page-light">
      <Navbar />

      {/* Hero */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "140px 20px 60px" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "20px" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "24px" }}>
          Privacy<br />Policy
        </h1>
        <p style={{ fontSize: "16.5px", color: "var(--muted-foreground)", marginBottom: "8px" }}>
          Last updated: <strong>{LAST_UPDATED}</strong>
        </p>
        <p style={{ fontSize: "16px", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: "620px" }}>
          {COMPANY} is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how we use and protect it.
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

          <Section id="overview" title="1. Overview">
            <P>This Privacy Policy applies to the website at anniwebsolutions.com and all services provided by {COMPANY} ("we", "us", "our"). It explains how we collect, use, and safeguard personal information when you visit our website or engage our services.</P>
            <P>By using our website or services, you consent to the practices described in this policy.</P>
          </Section>

          <Section id="data-collected" title="2. Information We Collect">
            <P><strong style={{ color: "var(--foreground)" }}>Information you provide directly:</strong></P>
            <UL items={[
              "Name, email address, phone number when you fill out a contact or inquiry form.",
              "Business details, project requirements, and budgets shared during consultations.",
              "Payment information (processed securely via third-party payment gateways — we do not store card details).",
              "Messages and communications sent to us via email, WhatsApp, or web forms.",
            ]} />
            <P><strong style={{ color: "var(--foreground)" }}>Information collected automatically:</strong></P>
            <UL items={[
              "IP address, browser type, device type, and operating system.",
              "Pages visited, time spent on pages, and navigation paths.",
              "Referring URLs and search terms that brought you to our site.",
              "Cookies and similar tracking technologies (see Section 5).",
            ]} />
          </Section>

          <Section id="how-we-use" title="3. How We Use Your Data">
            <P>We use the information we collect to:</P>
            <UL items={[
              "Respond to your inquiries and provide the services you request.",
              "Send project updates, invoices, and relevant communications.",
              "Improve our website experience and service offerings.",
              "Send occasional marketing emails (you can opt out at any time).",
              "Comply with legal obligations.",
              "Prevent fraud and ensure security.",
            ]} />
            <P>We will never sell your personal data to third parties.</P>
          </Section>

          <Section id="sharing" title="4. Data Sharing">
            <P>We may share your data with trusted third parties only as necessary to deliver our services:</P>
            <UL items={[
              "Payment processors (e.g. Razorpay, Stripe) for billing.",
              "Email and communication platforms (e.g. Gmail, WhatsApp Business).",
              "Project management tools used internally (e.g. Notion, Linear).",
              "Cloud hosting providers (e.g. AWS, Vercel) for product deployments.",
            ]} />
            <P>All third-party partners are contractually required to protect your data and use it only for the stated purpose.</P>
            <P>We may disclose your information if required by law, court order, or government authority.</P>
          </Section>

          <Section id="cookies" title="5. Cookies">
            <P>Our website uses cookies to enhance your browsing experience. Cookies are small text files stored in your browser.</P>
            <P>We use:</P>
            <UL items={[
              "Essential cookies — required for the website to function correctly.",
              "Analytics cookies — to understand how visitors use the site (e.g. Google Analytics).",
              "Preference cookies — to remember your settings and preferences.",
            ]} />
            <P>You can disable cookies in your browser settings. Note that disabling cookies may affect some functionality of the website.</P>
          </Section>

          <Section id="security" title="6. Data Security">
            <P>We implement industry-standard security measures to protect your personal data, including:</P>
            <UL items={[
              "Encrypted data transmission via HTTPS/SSL.",
              "Access controls limiting who can view your data.",
              "Secure storage of any retained personal information.",
              "Regular security reviews of our systems.",
            ]} />
            <P>While we take all reasonable precautions, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</P>
          </Section>

          <Section id="retention" title="7. Data Retention">
            <P>We retain personal data only as long as necessary for the purposes it was collected:</P>
            <UL items={[
              "Client project data: retained for 3 years after project completion for legal and accounting purposes.",
              "Contact/inquiry data: retained for 12 months if no engagement follows.",
              "Marketing email subscribers: until you unsubscribe.",
              "Website analytics: as per the analytics provider's retention policy (typically 26 months).",
            ]} />
            <P>You may request deletion of your data at any time (see Section 8).</P>
          </Section>

          <Section id="rights" title="8. Your Rights">
            <P>You have the right to:</P>
            <UL items={[
              "Access the personal data we hold about you.",
              "Request correction of inaccurate data.",
              "Request deletion of your personal data.",
              "Withdraw consent for marketing communications at any time.",
              "Request a copy of your data in a portable format.",
            ]} />
            <P>To exercise any of these rights, contact us at <a href={`mailto:${EMAIL}`} style={{ color: "var(--foreground)" }}>{EMAIL}</a>. We will respond within 30 days.</P>
          </Section>

          <Section id="third-party" title="9. Third-Party Links">
            <P>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any external sites you visit.</P>
          </Section>

          <Section id="children" title="10. Children's Privacy">
            <P>Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.</P>
          </Section>

          <Section id="changes" title="11. Changes to This Policy">
            <P>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the revised policy.</P>
          </Section>

          <Section id="contact" title="12. Contact Us">
            <P>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact:</P>
            <UL items={[
              `${COMPANY}`,
              `Email: ${EMAIL}`,
              "Phone: +91 79741 35629",
              "Location: India",
            ]} />
          </Section>

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
