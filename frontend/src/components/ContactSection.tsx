import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useSiteImages } from "@/hooks/useSiteImages";
import { apiFetch } from "@/lib/api";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const siteImages = useSiteImages();
  const contactImg = siteImages.contact_img || siteImages.navbar_avatar || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    try {
      const res = await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.fields || {});
        setStatus("error");
        return;
      }
      setStatus("success");
      setFormData({ name: "", email: "", service: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground";

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: image + Hi bubble */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative hidden md:flex justify-center"
          >
            <div className="w-[60%] aspect-[3/4] rounded-3xl overflow-hidden">
              <img
                src={contactImg}
                alt="Sumit Dangi"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Hi bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute bottom-0 left-12 w-20 h-20 rounded-full bg-primary flex flex-col items-center justify-center shadow-lg"
            >
              <span className="text-primary-foreground font-bold text-lg leading-none">Hi</span>
              <span className="text-primary-foreground text-xs mt-0.5">•••</span>
            </motion.div>
          </motion.div>

          {/* Right: heading + form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-4"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase leading-none mb-4">Let's work together</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm open to internships, collaborations, and opportunities in Full Stack Development and AI/ML. Feel free to reach out and connect.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    placeholder="johnsmith@gmail.com"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">👉 Opportunity Type</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select...</option>
                  <option value="internship">Internship</option>
                  <option value="job">Job</option>
                  <option value="project">Project Inquiry</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">What Can I Help You...</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={8}
                  className={`${inputClass} resize-none`}
                  placeholder="Hello, I'd like to enquire about..."
                />
              </div>

              {/* Submit — full width pill */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-outline-indigo w-full disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : status === "success" ? "✓ Message Sent!" : "Submit"}
              </button>

              {/* Field errors */}
              {Object.keys(errors).length > 0 && (
                <div className="text-xs text-red-500 space-y-1">
                  {Object.entries(errors).map(([field, msgs]) => (
                    <p key={field}><span className="capitalize font-semibold">{field}:</span> {(msgs as string[]).join(", ")}</p>
                  ))}
                </div>
              )}

              {status === "error" && Object.keys(errors).length === 0 && (
                <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
