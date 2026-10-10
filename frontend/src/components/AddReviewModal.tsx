import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Camera } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"
            className={`transition-colors duration-150 ${(hovered || value) >= star ? "text-yellow-400" : "text-border"}`}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const AddReviewModal = ({ open, onClose, onSubmitted }: Props) => {
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 0, photo: null as string | null });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 200;
        const ratio = Math.min(MAX / img.width, MAX / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        setForm(f => ({ ...f, photo: canvas.toDataURL("image/jpeg", 0.7) }));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rating || !form.name || !form.text) return;
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          role: form.role || "User",
          text: form.text,
          rating: form.rating,
          avatar_url: form.photo || null }) });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      setSubmitted(true);
      onSubmitted?.();
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", role: "", text: "", rating: 0, photo: null });
        onClose();
      }, 2000);
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground";

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal — slides up from bottom */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:inset-0 md:flex md:items-center md:justify-center md:pointer-events-none"
          >
            <div className="bg-background rounded-t-3xl md:rounded-3xl md:pointer-events-auto w-full md:max-w-lg shadow-2xl border border-border overflow-hidden">

              {/* Handle bar (mobile) */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Add Your Review</h2>
                    <p className="text-sm text-muted-foreground mt-1">Share your experience working with me</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="font-serif text-xl font-bold">Thank you!</p>
                    <p className="text-sm text-muted-foreground">Your review has been submitted.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Star rating */}
                    <div>
                      <label className="text-sm font-semibold text-primary mb-2 block">Your Rating</label>
                      <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
                    </div>

                    {/* Photo upload */}
                    <div>
                      <label className="text-sm font-semibold text-primary mb-2 block">Your Photo</label>
                      <label className="flex items-center gap-4 cursor-pointer group">
                        {/* Preview or placeholder with camera icon badge */}
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-border group-hover:border-primary transition-colors overflow-hidden flex items-center justify-center bg-muted">
                            {form.photo ? (
                              <img src={form.photo} alt="preview" className="w-full h-full object-cover" />
                            ) : (
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                              </svg>
                            )}
                          </div>
                          {/* Small camera badge */}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md border-2 border-background">
                            <Camera size={11} className="text-primary-foreground" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{form.photo ? "Change photo" : "Upload photo"}</p>
                          <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                      </label>
                    </div>

                    {/* Name + Role */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-semibold text-primary mb-1.5 block">Name</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputClass}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-primary mb-1.5 block">Role</label>
                        <input
                          type="text"
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className={inputClass}
                          placeholder="CEO, Developer..."
                        />
                      </div>
                    </div>

                    {/* Review text */}
                    <div>
                      <label className="text-sm font-semibold text-primary mb-1.5 block">Your Review</label>
                      <textarea
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Share your experience..."
                        required
                      />
                    </div>

                    <button type="submit" disabled={loading} className="btn-outline-indigo w-full mt-2 disabled:opacity-60">
                      {loading ? "Submitting..." : "Submit Review"}
                    </button>
                    {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddReviewModal;
