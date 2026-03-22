# Design Document — Admin CMS

## Overview

The Admin CMS adds a JWT-authenticated dashboard at `/admin` inside the existing React frontend, and extends the Express backend with new admin-only routes. The existing `x-admin-secret` header auth is replaced by proper JWT auth. File uploads are handled by `multer` storing files in `backend/uploads/` served as static files. No new frontend framework is introduced — the dashboard reuses the existing Tailwind + shadcn/ui component library.

---

## Architecture

```
framer-clone-magic/src/
  pages/admin/
    AdminLogin.tsx          ← public login page
    AdminLayout.tsx         ← sidebar + outlet (protected)
    AdminDashboard.tsx      ← overview stats
    AdminBlogs.tsx          ← blog CRUD
    AdminProjects.tsx       ← project CRUD
    AdminTestimonials.tsx   ← testimonial CRUD
    AdminContacts.tsx       ← contact submissions viewer
  components/admin/
    ProtectedRoute.tsx      ← JWT guard
    ImageUploader.tsx       ← reusable image upload widget

backend/
  routes/admin/
    auth.js                 ← POST /api/admin/login, /register
    adminBlogs.js           ← CRUD /api/admin/blogs
    adminProjects.js        ← CRUD /api/admin/projects
    adminTestimonials.js    ← CRUD /api/admin/testimonials
    adminContacts.js        ← GET/PATCH /api/admin/contacts
    upload.js               ← POST /api/admin/upload
  middleware/
    auth.js                 ← REPLACED: JWT verify middleware
  uploads/                  ← static file storage (gitignored)
  db.js                     ← Admin model added
```

---

## Backend Design

### New Dependencies

```json
"bcryptjs": "^2.4.3",
"jsonwebtoken": "^9.0.2",
"multer": "^1.4.5-lts.1"
```

Install: `npm install bcryptjs jsonwebtoken multer`

### Admin Model (`db.js` addition)

```js
const adminSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hash
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
```

### Updated Blog Schema (`db.js`)

The existing `blogSchema` needs extended fields to match `blogData` in `BlogDetail.tsx`:

```js
const blogSchema = new mongoose.Schema({
  category:    { type: String, required: true },
  date:        { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  fullContent: String,
  subtitle:    String,
  xp:          String,
  location:    String,
  tag:         String,
  live:        { type: Boolean, default: false },
  images:      [String],
  pptSlides:   [String],
  links:       [{ label: String, url: String, icon: String }],
  // legacy fields kept for backward compat:
  content:     String,
  image_url:   String,
}, { timestamps: true });
```

### Updated Contact Schema (`db.js`)

Add `read` field for read/unread tracking:

```js
const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  service: String,
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
}, { timestamps: true });
```

### Replaced `middleware/auth.js`

```js
const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    req.admin = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
}

module.exports = adminAuth;
```

### `routes/admin/auth.js`

- `POST /api/admin/register` — creates first admin only (403 if one exists), bcrypt cost 10
- `POST /api/admin/login` — verifies password, returns `{ token }` (JWT, 24h expiry)

### `routes/admin/adminBlogs.js`

All routes protected by `adminAuth`. Mirrors existing `/api/blogs` but uses extended schema fields. Slug (`id` field used in `BlogDetail`) is derived from `title` on create.

- `GET /api/admin/blogs` — all blogs
- `POST /api/admin/blogs` — create
- `PUT /api/admin/blogs/:id` — update
- `DELETE /api/admin/blogs/:id` — delete

### `routes/admin/adminProjects.js`

- `GET /api/admin/projects` — all projects
- `POST /api/admin/projects` — create
- `PUT /api/admin/projects/:id` — update
- `DELETE /api/admin/projects/:id` — delete

### `routes/admin/adminTestimonials.js`

- `GET /api/admin/testimonials` — all
- `POST /api/admin/testimonials` — create
- `PUT /api/admin/testimonials/:id` — update
- `DELETE /api/admin/testimonials/:id` — delete

### `routes/admin/adminContacts.js`

- `GET /api/admin/contacts` — all, sorted newest first
- `PATCH /api/admin/contacts/:id/read` — toggle `read: true`

### `routes/admin/upload.js`

Uses `multer` with disk storage to `backend/uploads/`. Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`. Max size: 5 MB. Returns `{ url: "/uploads/<filename>" }`.

Backend serves uploads as static: `app.use("/uploads", express.static("uploads"))`.

### `.env` additions

```
JWT_SECRET=your_jwt_secret_here
```

---

## Frontend Design

### Auth Flow

JWT stored in `localStorage` under key `admin_token`. All admin API calls attach `Authorization: Bearer <token>` header. A shared `adminFetch` helper handles this automatically and redirects to `/admin/login` on 401.

```ts
// src/lib/adminFetch.ts
export const adminFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`http://localhost:3001${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  }
  return res;
};
```

### `ProtectedRoute.tsx`

Reads `admin_token` from `localStorage`. If missing → redirect to `/admin/login`. Optionally validates expiry by decoding the JWT payload (no library needed, just base64 decode).

### Routes added to `App.tsx`

```tsx
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
  <Route index element={<AdminDashboard />} />
  <Route path="blogs" element={<AdminBlogs />} />
  <Route path="projects" element={<AdminProjects />} />
  <Route path="testimonials" element={<AdminTestimonials />} />
  <Route path="contacts" element={<AdminContacts />} />
</Route>
```

### `AdminLayout.tsx`

Sidebar with nav links: Dashboard, Blogs, Projects, Testimonials, Contacts (with unread badge), Logout. Uses `<Outlet />` for content area. Sidebar collapses to icon-only on mobile.

### `AdminLogin.tsx`

Simple centered card with email + password fields. On submit: `POST /api/admin/login`, store token, redirect to `/admin`.

### `AdminBlogs.tsx`

- Table/card list of all blogs with Edit + Delete actions
- "New Blog" button opens a slide-over or inline form
- Form fields: title, subtitle, category, date, description, fullContent (textarea), xp, location, tag, live (toggle), images (ImageUploader, multiple), pptSlides (ImageUploader, multiple), links (dynamic list of label/url/icon)
- On save: POST or PUT to `/api/admin/blogs`

### `AdminProjects.tsx`

- Card grid of projects with Edit + Delete
- Form fields: title, category, description, image (ImageUploader)

### `AdminTestimonials.tsx`

- Card list with Edit + Delete
- Form fields: name, role, text, rating (1–5 stars), avatar (ImageUploader)

### `AdminContacts.tsx`

- Read-only table: name, email, service, message, date, read status
- Filter tabs: All / Unread / Read
- Click row → mark as read via `PATCH /api/admin/contacts/:id/read`
- Unread count shown as badge in sidebar

### `ImageUploader.tsx`

Reusable component:
- File input (drag-and-drop optional)
- On file select: POST to `/api/admin/upload` with `multipart/form-data`
- Shows upload progress, then renders preview + returned URL
- Accepts `onUpload(url: string)` callback prop

---

## `BlogDetail.tsx` Migration

Once the Blog CMS is live, `BlogDetail.tsx` will fetch blog data from the API instead of the hardcoded `blogData` array:

```ts
// Replace static import with:
const { id } = useParams();
const [blog, setBlog] = useState(null);
useEffect(() => {
  fetch(`http://localhost:3001/api/blogs/${id}`)
    .then(r => r.json())
    .then(setBlog);
}, [id]);
```

The `blogData` export from `BlogDetail.tsx` is also used by `Blogs.tsx` — both will be migrated to API calls in the same task.

---

## Data Flow Diagram

```
Admin Browser
  │
  ├─ POST /api/admin/login ──────────────► Auth Route → bcrypt.compare → JWT
  │                                                                        │
  │  ◄──────────────────────────────────────────────── { token } ─────────┘
  │
  ├─ GET/POST/PUT/DELETE /api/admin/* ──► adminAuth middleware (JWT verify)
  │                                              │
  │                                              ▼
  │                                       Route Handler → MongoDB
  │
  ├─ POST /api/admin/upload ────────────► multer → backend/uploads/ → { url }
  │
  └─ Public portfolio pages
       GET /api/blogs/:id ──────────────► Blog.findById → JSON
       GET /api/projects ───────────────► Project.find → JSON
```

---

## Security Considerations

- JWT secret stored in `backend/.env` as `JWT_SECRET` — never committed
- `backend/uploads/` added to `.gitignore`
- Register endpoint disabled after first admin created (403)
- All write endpoints require valid JWT — existing `x-admin-secret` routes replaced
- File upload validates MIME type server-side (not just extension)
- Upload directory is outside `src/` — no hot-reload interference

---

## Implementation Notes

- The existing `adminAuth` middleware in `auth.js` is fully replaced — all existing routes using it (`blogs.js`, `projects.js`, `testimonials.js`, `contact.js`) will automatically use JWT after the replacement
- `multer` is a well-maintained LTS fork (`multer@1.4.5-lts.1`) compatible with Express 4
- No new frontend routing library needed — React Router v6 nested routes handle the admin layout
- The admin dashboard does NOT use Lenis smooth scroll (it's a utility UI, not a portfolio page)
