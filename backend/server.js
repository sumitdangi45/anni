require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const { connectDb, seedIfEmpty } = require("./db");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:8080",
      "http://localhost:8081",
    ].filter(Boolean);
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowed.some(o => origin.startsWith(o))) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/contact",      require("./routes/contact"));
app.use("/api/projects",     require("./routes/projects"));
app.use("/api/blogs",        require("./routes/blogs"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/services",     require("./routes/services"));
app.use("/api/faqs",         require("./routes/faqs"));
app.use("/api/comments",     require("./routes/comments"));

// Admin routes
app.use("/api/admin",              require("./routes/admin/auth"));
app.use("/api/admin/blogs",        require("./routes/admin/adminBlogs"));
app.use("/api/admin/projects",     require("./routes/admin/adminProjects"));
app.use("/api/admin/testimonials", require("./routes/admin/adminTestimonials"));
app.use("/api/admin/contacts",     require("./routes/admin/adminContacts"));
app.use("/api/admin/upload",       require("./routes/admin/upload"));
app.use("/api/admin/site-images",  require("./routes/admin/adminSiteImages"));
app.use("/api/site-images",        require("./routes/admin/adminSiteImages"));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

connectDb()
  .then(() => seedIfEmpty())
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`Backend running on http://localhost:${PORT}`)
    );
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} in use. Killing old process...`);
        const { execSync } = require("child_process");
        try {
          if (process.platform === "win32") {
            const result = execSync(`netstat -ano | findstr :${PORT}`).toString();
            const lines = result.trim().split("\n");
            const pids = new Set();
            lines.forEach(line => {
              const parts = line.trim().split(/\s+/);
              const pid = parts[parts.length - 1];
              if (pid && pid !== "0" && parseInt(pid) !== process.pid) pids.add(pid);
            });
            pids.forEach(pid => {
              try { execSync(`taskkill /PID ${pid} /F`); console.log(`Killed PID ${pid}`); } catch {}
            });
          } else {
            execSync(`lsof -ti:${PORT} | xargs kill -9`);
          }
          setTimeout(() => app.listen(PORT, () =>
            console.log(`Backend running on http://localhost:${PORT}`)
          ), 1000);
        } catch (e) {
          console.error("Could not kill process:", e.message);
          process.exit(1);
        }
      } else {
        console.error("Server error:", err);
        process.exit(1);
      }
    });
  })
  .catch((err) => { console.error("Startup error:", err); process.exit(1); });
