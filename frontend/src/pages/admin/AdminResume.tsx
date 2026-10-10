import { useEffect, useRef, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { apiFetch } from "@/lib/api";
import { FileText, Upload, Check, ExternalLink } from "lucide-react";

const AdminResume = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    apiFetch("/api/admin/upload/resume")
      .then(r => r.json())
      .then(data => setCurrentUrl(data.url))
      .catch(() => {});
  }, []);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    setError(null);
    setUploading(true);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const res = await adminFetch("/api/admin/upload/resume", {
        method: "POST",
        body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setCurrentUrl(data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Resume</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload a new PDF to replace the resume shown on the site.</p>
      </div>

      {/* Current file */}
      {currentUrl && (
        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border border-border bg-card">
          <FileText size={20} className="text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Current Resume</p>
            <p className="text-xs text-muted-foreground truncate">{currentUrl}</p>
          </div>
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0"
          >
            <ExternalLink size={13} /> View
          </a>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload size={24} className="text-primary" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-sm">Drop PDF here or click to browse</p>
          <p className="text-xs text-muted-foreground mt-1">PDF only · Max 10 MB</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      {/* Status */}
      <div className="mt-4 min-h-[24px]">
        {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
        {success && (
          <p className="text-sm text-green-600 flex items-center gap-1.5">
            <Check size={14} /> Resume updated successfully
          </p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AdminResume;
