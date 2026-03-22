# Implementation Plan: Admin CMS

## Overview

Implement a JWT-authenticated admin dashboard with full CRUD for blogs, projects, and testimonials, contact submission viewer, and image upload. Backend extends the existing Express/MongoDB stack; frontend adds a protected `/admin` section to the existing React app.

## Tasks

- [x] 1. Install backend dependencies and extend db.js schemas
  - Run `npm install bcryptjs jsonwebtoken multer` in `backend/`
  - Add `Admin` model to `backend/db.js` (email, password fields with bcrypt hash)
  - Extend `blogSchema` with: `fullContent`, `subtitle`, `xp`, `location`, `tag`, `live`, `images[]`, `pptSlides[]`, `links[]`
  - Add `read` field (Boolean, default false) to `contactSchema`
  - Export `Admin` from `db.js`
  - _Requirements: 1.6, 3.6, 6.3_

- [x] 2. Replace auth middleware and create admin auth route
  - [x] 2.1 Replace `backend/middleware/auth.js` with JWT verify middleware
    - Read `Authorization: Bearer <token>` header
    - Verify with `jwt.verify` using `JWT_SECRET`
    - Attach decoded payload to `req.admin`; return 401 on missing/invalid token
    - _Requirements: 1.7_
  - [x] 2.2 Create `backend/routes/admin/auth.js`
    - `POST /api/admin/register` — bcrypt hash (cost 10), 403 if admin already exists
    - `POST /api/admin/login` — compare hash, return `{ token }` JWT 24h expiry, 401 on bad creds
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [x] 2.3 Add `JWT_SECRET` to `backend/.env` and `backend/.env.example`
    - _Requirements: 1.7_

- [x] 3. Create admin CRUD routes (blogs, projects, testimonials)
  - [x] 3.1 Create `backend/routes/admin/adminBlogs.js`
    - All routes protected by `adminAuth` middleware
    - `GET /api/admin/blogs`, `POST /api/admin/blogs`, `PUT /api/admin/blogs/:id`, `DELETE /api/admin/blogs/:id`
    - Derive slug from title on create (lowercase, hyphenated)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  - [x] 3.2 Create `backend/routes/admin/adminProjects.js`
    - All routes protected by `adminAuth`
    - `GET /api/admin/projects`, `POST /api/admin/projects`, `PUT /api/admin/projects/:id`, `DELETE /api/admin/projects/:id`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [x] 3.3 Create `backend/routes/admin/adminTestimonials.js`
    - All routes protected by `adminAuth`
    - `GET /api/admin/testimonials`, `POST /api/admin/testimonials`, `PUT /api/admin/testimonials/:id`, `DELETE /api/admin/testimonials/:id`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 4. Create admin contacts route and file upload route
  - [x] 4.1 Create `backend/routes/admin/adminContacts.js`
    - `GET /api/admin/contacts` — all contacts sorted newest first, protected by `adminAuth`
    - `PATCH /api/admin/contacts/:id/read` — set `read: true`, protected by `adminAuth`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [x] 4.2 Create `backend/routes/admin/upload.js`
    - `POST /api/admin/upload` protected by `adminAuth`
    - `multer` disk storage to `backend/uploads/`, allowed MIME: jpeg/png/webp/gif, max 5 MB
    - Return `{ url: "/uploads/<filename>" }` on success
    - Return 413 on size exceeded, 415 on unsupported MIME type
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.6_
  - [x] 4.3 Register all admin routes in `backend/server.js` and serve uploads as static
    - Mount auth at `/api/admin`, CRUD routes at their respective paths
    - Add `app.use("/uploads", express.static("uploads"))`
    - Add `backend/uploads/` to `backend/.gitignore`
    - _Requirements: 7.2_

- [x] 5. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create frontend auth utilities and protected route
  - [x] 6.1 Create `framer-clone-magic/src/lib/adminFetch.ts`
    - Attach `Authorization: Bearer <token>` from `localStorage` to every request
    - On 401 response: clear token and redirect to `/admin/login`
    - _Requirements: 1.8, 2.3_
  - [x] 6.2 Create `framer-clone-magic/src/components/admin/ProtectedRoute.tsx`
    - Read `admin_token` from `localStorage`; redirect to `/admin/login` if missing
    - Decode JWT payload (base64) to check expiry; clear and redirect if expired
    - _Requirements: 2.1, 2.2, 2.3_
  - [x] 6.3 Create `framer-clone-magic/src/components/admin/ImageUploader.tsx`
    - File input with preview; POST to `/api/admin/upload` as `multipart/form-data`
    - Show upload progress; call `onUpload(url: string)` callback on success
    - _Requirements: 7.5_

- [x] 7. Create admin login page and layout
  - [x] 7.1 Create `framer-clone-magic/src/pages/admin/AdminLogin.tsx`
    - Centered card with email + password fields
    - On submit: `POST /api/admin/login` via `adminFetch`, store token in `localStorage`, redirect to `/admin`
    - Show error message on failed login
    - _Requirements: 1.1, 1.2, 1.3, 1.8_
  - [x] 7.2 Create `framer-clone-magic/src/pages/admin/AdminLayout.tsx`
    - Sidebar with nav links: Dashboard, Blogs, Projects, Testimonials, Contacts (with unread badge), Logout
    - Logout clears `admin_token` from `localStorage` and redirects to `/admin/login`
    - Uses `<Outlet />` for content area; responsive at 768px+
    - Fetch unread count from contacts to display badge
    - _Requirements: 2.4, 9.1, 9.2, 9.3, 9.4_
  - [x] 7.3 Create `framer-clone-magic/src/pages/admin/AdminDashboard.tsx`
    - Fetch counts from blogs, projects, testimonials, and unread contacts APIs
    - Display stat cards for each content type
    - _Requirements: 9.1_

- [x] 8. Create admin CRUD pages (blogs, projects, testimonials)
  - [x] 8.1 Create `framer-clone-magic/src/pages/admin/AdminBlogs.tsx`
    - Table/card list of all blogs with Edit + Delete actions
    - "New Blog" button opens inline form or sheet
    - Form fields: title, subtitle, category, date, description, fullContent, xp, location, tag, live (toggle), images (ImageUploader, multiple), pptSlides (ImageUploader, multiple), links (dynamic list)
    - POST on create, PUT on edit; show inline error on failure
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  - [x] 8.2 Create `framer-clone-magic/src/pages/admin/AdminProjects.tsx`
    - Card grid with Edit + Delete actions
    - Form fields: title, category, description, image (ImageUploader)
    - POST on create, PUT on edit; show inline error on failure
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [x] 8.3 Create `framer-clone-magic/src/pages/admin/AdminTestimonials.tsx`
    - Card list with Edit + Delete actions
    - Form fields: name, role, text, rating (1–5 stars), avatar (ImageUploader)
    - POST on create, PUT on edit; show inline error on failure
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 9. Create admin contacts viewer
  - [x] 9.1 Create `framer-clone-magic/src/pages/admin/AdminContacts.tsx`
    - Read-only table: name, email, service, message, date, read status
    - Filter tabs: All / Unread / Read
    - Click row → PATCH to mark as read; visually distinguish read vs unread
    - Show error state with retry on fetch failure
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 10. Wire admin routes into App.tsx
  - Add `/admin/login` route (public)
  - Add nested `/admin` route wrapped in `ProtectedRoute` with `AdminLayout` as parent
  - Add child routes: index → `AdminDashboard`, `blogs`, `projects`, `testimonials`, `contacts`
  - Admin routes must render outside `LenisProvider` to avoid smooth scroll in dashboard
  - _Requirements: 2.1, 9.3_

- [x] 11. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [x] 12. Migrate BlogDetail.tsx and Blogs.tsx to API-driven data
  - [x] 12.1 Update `framer-clone-magic/src/pages/BlogDetail.tsx`
    - Replace `blogData` array import with `useEffect` fetch from `GET /api/blogs/:id`
    - Add loading and not-found states
    - Keep `ImageCarousel`, `SlidePreview`, `CommentSection` components intact
    - _Requirements: 3.7_
  - [x] 12.2 Update `framer-clone-magic/src/pages/Blogs.tsx`
    - Replace any usage of `blogData` from `BlogDetail.tsx` with `useEffect` fetch from `GET /api/blogs`
    - Add loading and error states
    - _Requirements: 3.7_

- [x] 13. Final checkpoint — Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The admin dashboard intentionally skips Lenis smooth scroll (utility UI, not portfolio)
- `backend/uploads/` must be gitignored before any images are uploaded
