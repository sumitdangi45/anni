import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Review {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar_url?: string | null;
}

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
        className={i <= count ? "text-yellow-400" : "text-border"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

interface Props {
  open: boolean;
  onClose: () => void;
  refreshKey?: number;
}

const AllReviewsModal = ({ open, onClose, refreshKey = 0 }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    apiFetch("/api/testimonials")
      .then(r => r.json())
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [open, refreshKey]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
                <div>
                  <h2 className="font-serif text-xl font-bold">All Reviews</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{reviews.length} reviews</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* List */}
              <div className="overflow-y-auto flex-1 p-6 space-y-4">
                {loading && (
                  <div className="flex justify-center py-12">
                    <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                )}

                {!loading && reviews.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-12">No reviews yet. Be the first!</p>
                )}

                {!loading && reviews.map((r, i) => (
                  <motion.div
                    key={r._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex gap-4 p-4 rounded-xl border border-border bg-card"
                  >
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center border border-border">
                      {r.avatar_url ? (
                        <img src={r.avatar_url} alt={r.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={18} className="text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-sm font-semibold leading-none">{r.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{r.role}</p>
                        </div>
                        <Stars count={r.rating} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">"{r.text}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AllReviewsModal;
