import { useEffect, useRef, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { API_BASE } from "@/lib/api";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, X, Upload, FileText } from "lucide-react";

interface BlogLink {
  label: string;
  url: string;
  icon: string;
}

interface Blog {
  _id: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  description: string;
  fullContent?: string;
  xp?: string;
  location?: string;
  tag?: string;
  live: boolean;
  images: string[];
  pptSlides: string[];
  links: BlogLink[];
}

const emptyForm = (): Omit<Blog, "_id"> => ({
  title: "",
  subtitle: "",
  category: "",
  date: "",
  description: "",
  fullContent: "",
  xp: "",
  location: "",
  tag: "",
  live: false,
  images: [],
  pptSlides: [],
  links: [] });

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<string | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/blogs");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError(null);
    setPdfStatus(null);
    setDialogOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      subtitle: blog.subtitle ?? "",
      category: blog.category,
      date: blog.date,
      description: blog.description,
      fullContent: blog.fullContent ?? "",
      xp: blog.xp ?? "",
      location: blog.location ?? "",
      tag: blog.tag ?? "",
      live: blog.live,
      images: blog.images ?? [],
      pptSlides: blog.pptSlides ?? [],
      links: blog.links ?? [] });
    setError(null);
    setPdfStatus(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    setDeleteError(null);
    try {
      const res = await adminFetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      setDeleteError("Failed to delete blog. Please try again.");
    }
  };

  const handleSave = async (closeAfter = true) => {
    setError(null);
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/blogs/${editingId}` : "/api/admin/blogs";
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(form) });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      const saved = await res.json();
      await fetchBlogs();
      if (closeAfter) {
        setDialogOpen(false);
      } else {
        // Stay open — update editingId so PPT upload works immediately
        setEditingId(saved._id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addLink = () =>
    setField("links", [...form.links, { label: "", url: "", icon: "" }]);

  const updateLink = (i: number, field: keyof BlogLink, value: string) => {
    const updated = form.links.map((l, idx) =>
      idx === i ? { ...l, [field]: value } : l
    );
    setField("links", updated);
  };

  const removeLink = (i: number) =>
    setField("links", form.links.filter((_, idx) => idx !== i));

  const handlePdfUpload = async (file: File) => {
    // If new blog (not yet saved), save it first then upload
    let blogId = editingId;
    if (!blogId) {
      if (!form.title || !form.category || !form.date || !form.description) {
        setPdfStatus("Fill in Title, Category, Date and Description first.");
        return;
      }
      setPdfStatus("Saving blog first...");
      setSaving(true);
      try {
        const res = await adminFetch("/api/admin/blogs", {
          method: "POST",
          body: JSON.stringify(form) });
        if (!res.ok) throw new Error("Could not save blog");
        const saved = await res.json();
        blogId = saved._id;
        setEditingId(saved._id);
        await fetchBlogs();
      } catch (err) {
        setPdfStatus(err instanceof Error ? err.message : "Save failed");
        setSaving(false);
        return;
      } finally {
        setSaving(false);
      }
    }

    setPdfUploading(true);
    setPdfStatus("Converting PDF to slides...");
    try {
      const token = localStorage.getItem("admin_token");
      const fd = new FormData();
      fd.append("pdf", file);
      const res = await fetch(`${API_BASE}/api/admin/blogs/${blogId}/ppt`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setField("pptSlides", data.pptSlides);
      setPdfStatus(`Done — ${data.pptSlides.length} slides extracted.`);
    } catch (err) {
      setPdfStatus(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setPdfUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button onClick={openNew} size="sm">
          <Plus size={16} className="mr-1" /> New Blog
        </Button>
      </div>

      {deleteError && (
        <p className="text-sm text-red-500 mb-4">{deleteError}</p>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-16" />
            </Card>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500 text-sm">No blogs yet. Create one!</p>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <Card key={blog._id}>
              <CardContent className="flex items-center justify-between py-4 px-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium truncate">{blog.title}</span>
                    {blog.category && (
                      <Badge variant="secondary" className="text-xs">
                        {blog.category}
                      </Badge>
                    )}
                    {blog.live ? (
                      <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                        Live
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs text-gray-400">
                        Draft
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{blog.date}</p>
                </div>
                <div className="flex gap-2 ml-4 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(blog)}
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(blog._id)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Blog" : "New Blog"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </p>
            )}

            {/* Basic fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="Blog title"
                />
              </div>
              <div className="col-span-2">
                <Label>Subtitle</Label>
                <Input
                  value={form.subtitle}
                  onChange={(e) => setField("subtitle", e.target.value)}
                  placeholder="Subtitle"
                />
              </div>
              <div>
                <Label>Category *</Label>
                <Input
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value)}
                  placeholder="e.g. Design"
                />
              </div>
              <div>
                <Label>Date *</Label>
                <Input
                  value={form.date}
                  onChange={(e) => setField("date", e.target.value)}
                  placeholder="e.g. Jan 2025"
                />
              </div>
              <div>
                <Label>XP</Label>
                <Input
                  value={form.xp}
                  onChange={(e) => setField("xp", e.target.value)}
                  placeholder="e.g. 3 years"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                  placeholder="e.g. Remote"
                />
              </div>
              <div>
                <Label>Tag</Label>
                <Input
                  value={form.tag}
                  onChange={(e) => setField("tag", e.target.value)}
                  placeholder="e.g. UX"
                />
              </div>
              <div className="flex items-center gap-3 pt-5">
                <input
                  id="live-toggle"
                  type="checkbox"
                  checked={form.live}
                  onChange={(e) => setField("live", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="live-toggle" className="cursor-pointer">
                  Live (published)
                </Label>
              </div>
            </div>

            <div>
              <Label>Description *</Label>
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Short description"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>

            <div>
              <Label>Full Content</Label>
              <textarea
                value={form.fullContent}
                onChange={(e) => setField("fullContent", e.target.value)}
                placeholder="Full blog content (markdown or plain text)"
                rows={6}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>

            {/* Images */}
            <div>
              <Label className="mb-2 block">Images</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.images.map((url, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={url}
                      alt=""
                      className="h-16 w-16 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setField("images", form.images.filter((_, idx) => idx !== i))
                      }
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <ImageUploader
                label="Add Image"
                onUpload={(url) => setField("images", [...form.images, url])}
              />
            </div>

            {/* PPT Slides */}
            <div>
              <Label className="mb-2 block">PPT Slides (upload PDF)</Label>

              {/* PDF upload button */}
              <div className="flex items-center gap-3 mb-3">
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePdfUpload(file);
                    e.target.value = "";
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={pdfUploading}
                  onClick={() => pdfInputRef.current?.click()}
                >
                  {pdfUploading ? (
                    <span className="flex items-center gap-1.5">
                      <Upload size={14} className="animate-bounce" /> Converting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <FileText size={14} /> Upload PDF
                    </span>
                  )}
                </Button>
                {pdfStatus && (
                  <span className={`text-xs ${pdfStatus.startsWith("Done") ? "text-green-600" : "text-gray-500"}`}>
                    {pdfStatus}
                  </span>
                )}
              </div>

              {/* Slide previews */}
              {form.pptSlides.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.pptSlides.map((url, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={url}
                        alt={`Slide ${i + 1}`}
                        className="h-16 w-24 object-cover rounded border"
                      />
                      <span className="absolute bottom-0 left-0 right-0 text-center text-[10px] bg-black/50 text-white rounded-b">
                        {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setField(
                            "pptSlides",
                            form.pptSlides.filter((_, idx) => idx !== i)
                          )
                        }
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {form.pptSlides.length === 0 && !pdfUploading && (
                <p className="text-xs text-gray-400">No slides yet. Upload a PDF to extract slides.</p>
              )}
            </div>

            {/* Links */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Links</Label>
                <Button type="button" variant="outline" size="sm" onClick={addLink}>
                  <Plus size={13} className="mr-1" /> Add Link
                </Button>
              </div>
              {form.links.length === 0 && (
                <p className="text-xs text-gray-400">No links added.</p>
              )}
              <div className="space-y-2">
                {form.links.map((link, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input
                      value={link.label}
                      onChange={(e) => updateLink(i, "label", e.target.value)}
                      placeholder="Label"
                      className="flex-1"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => updateLink(i, "url", e.target.value)}
                      placeholder="URL"
                      className="flex-[2]"
                    />
                    <Input
                      value={link.icon}
                      onChange={(e) => updateLink(i, "icon", e.target.value)}
                      placeholder="Icon"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLink(i)}
                      className="text-red-500 hover:text-red-600 shrink-0"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              {!editingId && (
                <Button
                  variant="secondary"
                  onClick={() => handleSave(false)}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save & Add Slides"}
                </Button>
              )}
              <Button onClick={() => handleSave(true)} disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogs;
