import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Star } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar_url: string;
  featured?: boolean;
}

const emptyForm = (): Omit<Testimonial, "_id"> => ({
  name: "",
  role: "",
  text: "",
  rating: 5,
  avatar_url: "",
});

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError(null);
    setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditingId(t._id);
    setForm({
      name: t.name,
      role: t.role,
      text: t.text,
      rating: t.rating ?? 5,
      avatar_url: t.avatar_url ?? "",
    });
    setError(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    setDeleteError(null);
    try {
      const res = await adminFetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setDeleteError("Failed to delete testimonial. Please try again.");
    }
  };

  const handleFeature = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/testimonials/${id}/feature`, { method: "PATCH" });
      if (!res.ok) return;
      const data = await res.json();
      setTestimonials(prev => prev.map(t => t._id === id ? { ...t, featured: data.featured } : t));
    } catch {}
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/admin/testimonials/${editingId}`
        : "/api/admin/testimonials";
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      await fetchTestimonials();
      setDialogOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-xs text-muted-foreground mt-1">Star a review to feature it on the homepage (max 4 shown).</p>
        </div>
        <Button onClick={openNew} size="sm">
          <Plus size={16} className="mr-1" /> New Testimonial
        </Button>
      </div>

      {deleteError && (
        <p className="text-sm text-red-500 mb-4">{deleteError}</p>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-20" />
            </Card>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <p className="text-gray-500 text-sm">No testimonials yet. Create one!</p>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <Card key={t._id}>
              <CardContent className="flex items-center justify-between py-4 px-5">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {t.avatar_url && (
                    <img
                      src={t.avatar_url}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover shrink-0 border border-gray-200"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium truncate">{t.name}</span>
                      {t.role && (
                        <span className="text-xs text-gray-400">{t.role}</span>
                      )}
                      {t.featured && (
                        <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-full px-2 py-0.5">Featured</span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < t.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{t.text}</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFeature(t._id)}
                    title={t.featured ? "Unfeature" : "Feature on homepage"}
                    className={t.featured ? "text-yellow-500 hover:text-yellow-600" : "text-gray-300 hover:text-yellow-400"}
                  >
                    <Star size={16} className={t.featured ? "fill-yellow-400" : ""} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(t)}
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(t._id)}
                    title="Delete"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </p>
            )}

            <div>
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Full name"
              />
            </div>

            <div>
              <Label>Role</Label>
              <Input
                value={form.role}
                onChange={(e) => setField("role", e.target.value)}
                placeholder="e.g. CEO at Acme"
              />
            </div>

            <div>
              <Label>Testimonial *</Label>
              <textarea
                value={form.text}
                onChange={(e) => setField("text", e.target.value)}
                placeholder="What they said..."
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>

            <div>
              <Label className="mb-2 block">Rating</Label>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setField("rating", i + 1)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={22}
                      className={
                        i < form.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-500">{form.rating} / 5</span>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Avatar</Label>
              {form.avatar_url && (
                <img
                  src={form.avatar_url}
                  alt="Avatar preview"
                  className="mb-2 h-16 w-16 rounded-full object-cover border border-gray-200"
                />
              )}
              <ImageUploader
                label={form.avatar_url ? "Replace Avatar" : "Upload Avatar"}
                onUpload={(url) => setField("avatar_url", url)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
