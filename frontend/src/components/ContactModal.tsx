import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground";

const ContactModal = ({ open, onClose }: Props) => {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [modalAvatar, setModalAvatar] = useState("");

  useEffect(() => {
    apiFetch("/api/site-images")
      .then(r => r.json())
      .then(data => { if (data.modal_avatar || data.navbar_avatar) setModalAvatar(data.modal_avatar || data.navbar_avatar); })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    try {
      const res = await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.fields || {});
        setStatus("error");
        return;
      }
      setStatus("success");
      setFormData({ name: "", email: "", service: "", message: "" });
      setTimeout(() => { setStatus("idle"); onClose(); }, 2500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <img src={modalAvatar} alt="Sumit" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm leading-none">Let's work together</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Sumit Dangi</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-primary mb-1.5 block">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                        placeholder="John Smith"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name[0]}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-primary mb-1.5 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                        placeholder="johnsmith@gmail.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email[0]}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-primary mb-1.5 block">👉 Opportunity Type</label>
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

                  <div>
                    <label className="text-xs font-medium text-primary mb-1.5 block">What Can I Help You...</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Hello, I'd like to enquire about..."
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message[0]}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-outline-indigo w-full disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending..." : status === "success" ? "✓ Message Sent!" : "Submit"}
                  </button>

                  {status === "error" && Object.keys(errors).length === 0 && (
                    <p className="text-xs text-red-500 text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
