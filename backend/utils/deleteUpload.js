/**
 * deleteUpload(url)
 * Deletes a file from /uploads/ if the URL points to our own server.
 * Silently ignores external URLs or missing files.
 */
const fs = require("fs");
const path = require("path");

const UPLOADS_DIR = path.join(__dirname, "../uploads");

function deleteUpload(url) {
  if (!url || typeof url !== "string") return;
  // Only delete files hosted on our server (starts with /uploads/)
  if (!url.startsWith("/uploads/")) return;
  const filename = path.basename(url);
  const filepath = path.join(UPLOADS_DIR, filename);
  try {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  } catch {
    // ignore — file may already be gone
  }
}

module.exports = deleteUpload;
