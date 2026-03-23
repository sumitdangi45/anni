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

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  github_url: string;
  live_url: string;
  featured?: boolean;
}

const emptyForm = (): Omit<Project, "_id"> => ({
  title: "",
  category: "",
  description: "",
  image_url: "",
  github_url: "",
  live_url: "",
});

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError(null);
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image_url: project.image_url ?? "",
      github_url: project.github_url ?? "",
      live_url: project.live_url ?? "",
    });
    setError(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setDeleteError(null);
    try {
      const res = await adminFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setDeleteError("Failed to delete project. Please try again.");
    }
  };

  const handleFeature = async (id: string) => {
    try {
      const res = await adminFetch(`/api/admin/projects/${id}/feature`, { method: "PATCH" });
      if (!res.ok) return;
      const data = await res.json();
      setProjects(prev => prev.map(p => p._id === id ? { ...p, featured: data.featured } : p));
    } catch {}
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/admin/projects/${editingId}`
        : "/api/admin/projects";
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      await fetchProjects();
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
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-xs text-muted-foreground mt-1">Star a project to feature it on the homepage (max 4 shown).</p>
        </div>
        <Button onClick={openNew} size="sm">
          <Plus size={16} className="mr-1" /> New Project
        </Button>
      </div>

      {deleteError && (
        <p className="text-sm text-red-500 mb-4">{deleteError}</p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-40" />
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-gray-500 text-sm">No projects yet. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden">
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <CardContent className="py-4 px-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium truncate">{project.title}</p>
                      {project.featured && (
                        <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-full px-2 py-0.5">Featured</span>
                      )}
                    </div>
                    {project.category && (
                      <p className="text-xs text-gray-400 mt-0.5">{project.category}</p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFeature(project._id)}
                      title={project.featured ? "Unfeature" : "Feature on homepage"}
                      className={project.featured ? "text-yellow-500 hover:text-yellow-600" : "text-gray-300 hover:text-yellow-400"}
                    >
                      <Star size={15} className={project.featured ? "fill-yellow-400" : ""} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(project)}
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project._id)}
                      title="Delete"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </div>
                {project.description && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {project.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Project" : "New Project"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </p>
            )}

            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="Project title"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                placeholder="e.g. Branding"
              />
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Short description"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>

            <div>
              <Label>GitHub URL</Label>
              <Input
                value={form.github_url}
                onChange={(e) => setField("github_url", e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <Label>Live URL</Label>
              <Input
                value={form.live_url}
                onChange={(e) => setField("live_url", e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label className="mb-2 block">Image</Label>
              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="mb-2 h-32 w-full rounded-md object-cover border border-gray-200"
                />
              )}
              <ImageUploader
                label={form.image_url ? "Replace Image" : "Upload Image"}
                onUpload={(url) => setField("image_url", url)}
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

export default AdminProjects;
