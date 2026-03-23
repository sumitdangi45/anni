import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import ImageUploader from "@/components/admin/ImageUploader";
import { Check, Pencil, X } from "lucide-react";

const IMAGE_SLOTS = [
  // Hero
  { key: "hero",              label: "Hero Portrait",           section: "Hero Section" },
  // About (homepage)
  { key: "about",             label: "About Portrait",          section: "About Section" },
  // Carousel
  { key: "carousel_1",        label: "Carousel Image 1",        section: "Image Carousel" },
  { key: "carousel_2",        label: "Carousel Image 2",        section: "Image Carousel" },
  { key: "carousel_3",        label: "Carousel Image 3",        section: "Image Carousel" },
  { key: "carousel_4",        label: "Carousel Image 4",        section: "Image Carousel" },
  { key: "carousel_5",        label: "Carousel Image 5",        section: "Image Carousel" },
  // Badges
  { key: "badge_1",           label: "Badge Image 1",           section: "Badges" },
  { key: "badge_2",           label: "Badge Image 2",           section: "Badges" },
  { key: "badge_3",           label: "Badge Image 3",           section: "Badges" },
  { key: "badge_4",           label: "Badge Image 4",           section: "Badges" },
  { key: "badge_5",           label: "Badge Image 5",           section: "Badges" },
  // Gallery
  { key: "gallery_1",         label: "Gallery Image 1",         section: "Gallery" },
  { key: "gallery_2",         label: "Gallery Image 2",         section: "Gallery" },
  { key: "gallery_3",         label: "Gallery Image 3",         section: "Gallery" },
  // Testimonials — reviewer avatars
  { key: "reviewer_1",        label: "Reviewer 1 Avatar",       section: "Testimonials" },
  { key: "reviewer_2",        label: "Reviewer 2 Avatar",       section: "Testimonials" },
  { key: "reviewer_3",        label: "Reviewer 3 Avatar",       section: "Testimonials" },
  { key: "reviewer_4",        label: "Reviewer 4 Avatar",       section: "Testimonials" },
  // Blog author avatar
  { key: "blog_author",       label: "Blog Author Avatar",      section: "Blog" },
  // Navbar avatar
  { key: "navbar_avatar",     label: "Navbar Avatar",           section: "Navbar" },
  // Contact section
  { key: "contact_img",       label: "Contact Section Image",   section: "Contact" },
  // Contact modal avatar
  { key: "modal_avatar",      label: "Contact Modal Avatar",    section: "Contact" },
  // Scroll morph (homepage hero→services→about animation)
  { key: "morph_portrait",    label: "Morph — Portrait",        section: "Scroll Morph" },
  { key: "morph_back",        label: "Morph — Back Photo",      section: "Scroll Morph" },
  // FAQ hover/scroll images
  { key: "faq_img_1",         label: "FAQ Image 1",             section: "FAQ" },
  { key: "faq_img_2",         label: "FAQ Image 2",             section: "FAQ" },
  { key: "faq_img_3",         label: "FAQ Image 3",             section: "FAQ" },
  { key: "faq_img_4",         label: "FAQ Image 4",             section: "FAQ" },
  { key: "faq_img_5",         label: "FAQ Image 5",             section: "FAQ" },
  { key: "faq_img_6",         label: "FAQ Image 6",             section: "FAQ" },
  // About page scroll morph images
  { key: "about_img1",        label: "About Page — Portrait",   section: "About Page" },
  { key: "about_img2",        label: "About Page — Back Photo", section: "About Page" },
  { key: "about_img3",        label: "About Page — Gallery",    section: "About Page" },
  { key: "about_img4",        label: "About Page — Process",    section: "About Page" },
  // About page process section
  { key: "process_research",  label: "Process — Research",      section: "About Page" },
  { key: "process_concept",   label: "Process — Concept",       section: "About Page" },
  { key: "process_launch",    label: "Process — Launch",        section: "About Page" },
  // SEO
  { key: "og_image",          label: "OG / Social Share Image", section: "SEO" },
];

const sections = [...new Set(IMAGE_SLOTS.map(s => s.section))];

interface SlotCardProps {
  slot: typeof IMAGE_SLOTS[0];
  currentUrl: string;
  onSave: (key: string, url: string) => Promise<void>;
}

const SlotCard = ({ slot, currentUrl, onSave }: SlotCardProps) => {
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(currentUrl);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setUrl(currentUrl); }, [currentUrl]);

  const handleSave = async () => {
    setSaving(true);
    await onSave(slot.key, url);
    setSaving(false);
    setEditing(false);
  };

  const handleUpload = (uploadedUrl: string) => {
    setUrl(`${uploadedUrl}`);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Preview */}
      <div className="aspect-video bg-muted relative">
        {url ? (
          <img src={url} alt={slot.label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            No image set
          </div>
        )}
        <button
          onClick={() => setEditing(!editing)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          {editing ? <X size={13} /> : <Pencil size={13} />}
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-semibold">{slot.label}</p>
        <p className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">{slot.key}</p>

        {editing && (
          <div className="mt-3 space-y-2">
            <ImageUploader onUpload={handleUpload} label="Upload new image" />
            <div className="flex gap-1.5 mt-2">
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Or paste image URL"
                className="flex-1 text-xs px-2 py-1.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
              />
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
              >
                <Check size={12} />
                {saving ? "..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminPhotos = () => {
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    adminFetch("/api/site-images")
      .then(r => r.json())
      .then(data => setImageMap(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (key: string, url: string) => {
    const slot = IMAGE_SLOTS.find(s => s.key === key);
    await adminFetch(`/api/admin/site-images/${key}`, {
      method: "PUT",
      body: JSON.stringify({ url, label: slot?.label }),
    });
    setImageMap(prev => ({ ...prev, [key]: url }));
  };

  const filteredSlots = IMAGE_SLOTS.filter(s => s.section === activeSection);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Site Photos</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage images shown across the portfolio site.</p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {sections.map(sec => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeSection === sec
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:border-primary hover:text-primary"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card animate-pulse">
              <div className="aspect-video bg-muted" />
              <div className="p-3 space-y-1.5">
                <div className="h-3 bg-muted rounded w-3/4" />
                <div className="h-2 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSlots.map(slot => (
            <SlotCard
              key={slot.key}
              slot={slot}
              currentUrl={imageMap[slot.key] || ""}
              onSave={handleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPhotos;
