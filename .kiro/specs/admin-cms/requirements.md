# Requirements Document

## Introduction

The Admin CMS is a secure, JWT-protected dashboard for the portfolio website that allows the site owner to manage all dynamic content — blogs, projects, testimonials — as well as view contact form submissions, upload images, and receive email notifications. It replaces hardcoded frontend data arrays (e.g., `blogData` in `BlogDetail.tsx`) with database-driven content managed through a dedicated admin interface.

The system consists of:
- A protected admin login/signup flow backed by JWT authentication
- A React-based dashboard at `/admin` (separate from the public portfolio)
- New and extended backend API routes under `/api/admin/*`
- File/image upload support via the backend
- Email notification delivery via the existing SMTP configuration

---

## Glossary

- **Admin_Dashboard**: The React frontend application section accessible at `/admin`, visible only to authenticated admins
- **Auth_Service**: The backend service responsible for admin registration, login, and JWT issuance/validation
- **JWT**: JSON Web Token used to authenticate admin API requests
- **Blog_Manager**: The Admin_Dashboard module for creating, editing, and deleting blog posts
- **Project_Manager**: The Admin_Dashboard module for creating, editing, and deleting projects
- **Testimonial_Manager**: The Admin_Dashboard module for creating, editing, and deleting testimonials
- **Contact_Viewer**: The Admin_Dashboard module for viewing contact form submissions
- **File_Uploader**: The backend service that accepts image files and returns a publicly accessible URL
- **Email_Service**: The backend service that sends email notifications via the configured SMTP server
- **Protected_Route**: A frontend route component that redirects unauthenticated users to the admin login page
- **Admin**: The authenticated site owner who manages portfolio content through the Admin_Dashboard

---

## Requirements

### Requirement 1: Admin Authentication

**User Story:** As the site owner, I want to log in with a username and password, so that only I can access the admin dashboard.

#### Acceptance Criteria

1. THE Auth_Service SHALL expose a `POST /api/admin/login` endpoint that accepts an email and password
2. WHEN valid credentials are submitted, THE Auth_Service SHALL return a signed JWT with a 24-hour expiry
3. WHEN invalid credentials are submitted, THE Auth_Service SHALL return a 401 status with a descriptive error message
4. THE Auth_Service SHALL expose a `POST /api/admin/register` endpoint for initial admin account creation
5. WHEN a registration request is received and an admin account already exists, THE Auth_Service SHALL return a 403 status to prevent duplicate admin accounts
6. THE Auth_Service SHALL store admin passwords as bcrypt hashes with a minimum cost factor of 10
7. WHEN a request is made to any `/api/admin/*` write endpoint without a valid JWT in the `Authorization: Bearer` header, THE Auth_Service SHALL return a 401 status
8. THE Admin_Dashboard SHALL store the JWT in `localStorage` and attach it to all subsequent API requests

---

### Requirement 2: Protected Admin Dashboard Route

**User Story:** As the site owner, I want the admin dashboard to be inaccessible to unauthenticated visitors, so that my content management tools are private.

#### Acceptance Criteria

1. THE Protected_Route SHALL redirect any unauthenticated user who navigates to `/admin/*` to `/admin/login`
2. WHEN a valid JWT is present in `localStorage`, THE Protected_Route SHALL render the requested admin page
3. WHEN the JWT is expired or invalid, THE Protected_Route SHALL clear the stored token and redirect to `/admin/login`
4. THE Admin_Dashboard SHALL provide a logout action that clears the JWT from `localStorage` and redirects to `/admin/login`

---

### Requirement 3: Blog CMS

**User Story:** As the Admin, I want to create, edit, and delete blog posts through a dashboard, so that blog content is managed dynamically from the database instead of hardcoded arrays.

#### Acceptance Criteria

1. THE Blog_Manager SHALL display a paginated list of all blog posts fetched from `GET /api/blogs`
2. WHEN the Admin submits a new blog post form with title, category, date, description, content, and at least one image, THE Blog_Manager SHALL send a `POST /api/admin/blogs` request and display the new post in the list on success
3. WHEN the Admin submits an edit form for an existing blog post, THE Blog_Manager SHALL send a `PUT /api/admin/blogs/:id` request and reflect the updated data in the list
4. WHEN the Admin confirms deletion of a blog post, THE Blog_Manager SHALL send a `DELETE /api/admin/blogs/:id` request and remove the post from the list
5. IF a blog create or update request fails, THEN THE Blog_Manager SHALL display an inline error message without navigating away
6. THE Blog_Manager SHALL support the following fields per post: `title`, `category`, `date`, `description`, `fullContent`, `subtitle`, `xp`, `location`, `tag`, `live` (boolean), `images` (array of URLs), `pptSlides` (array of URLs), `links` (array of label/url/icon objects)
7. WHEN blog data is saved to the database, THE public `BlogDetail` page SHALL render content fetched from the API rather than the hardcoded `blogData` array

---

### Requirement 4: Project CMS

**User Story:** As the Admin, I want to add, edit, and delete portfolio projects, so that the projects section stays current without code changes.

#### Acceptance Criteria

1. THE Project_Manager SHALL display a list of all projects fetched from `GET /api/projects`
2. WHEN the Admin submits a new project form with title, category, description, and an optional image, THE Project_Manager SHALL send a `POST /api/admin/projects` request and display the new project on success
3. WHEN the Admin submits an edit form for an existing project, THE Project_Manager SHALL send a `PUT /api/admin/projects/:id` request and reflect the updated data
4. WHEN the Admin confirms deletion of a project, THE Project_Manager SHALL send a `DELETE /api/admin/projects/:id` request and remove the project from the list
5. IF a project create or update request fails, THEN THE Project_Manager SHALL display an inline error message without navigating away

---

### Requirement 5: Testimonials Management

**User Story:** As the Admin, I want to add, edit, and delete testimonials, so that the testimonials section reflects real, up-to-date feedback.

#### Acceptance Criteria

1. THE Testimonial_Manager SHALL display a list of all testimonials fetched from `GET /api/testimonials`
2. WHEN the Admin submits a new testimonial form with name, role, text, rating (1–5), and an optional avatar image, THE Testimonial_Manager SHALL send a `POST /api/admin/testimonials` request and display the new entry on success
3. WHEN the Admin submits an edit form for an existing testimonial, THE Testimonial_Manager SHALL send a `PUT /api/admin/testimonials/:id` request and reflect the updated data
4. WHEN the Admin confirms deletion of a testimonial, THE Testimonial_Manager SHALL send a `DELETE /api/admin/testimonials/:id` request and remove the entry from the list
5. IF a testimonial create or update request fails, THEN THE Testimonial_Manager SHALL display an inline error message without navigating away

---

### Requirement 6: Contact Form Submissions View

**User Story:** As the Admin, I want to view all contact form submissions in the dashboard, so that I can review and respond to inquiries.

#### Acceptance Criteria

1. THE Contact_Viewer SHALL fetch and display all contact submissions from `GET /api/admin/contacts` in reverse chronological order
2. THE Contact_Viewer SHALL display the following fields per submission: `name`, `email`, `service`, `message`, and `createdAt`
3. WHEN the Admin marks a submission as read, THE Contact_Viewer SHALL visually distinguish read submissions from unread ones
4. THE Contact_Viewer SHALL support filtering submissions by read/unread status
5. IF the contacts fetch request fails, THEN THE Contact_Viewer SHALL display an error state with a retry option

---

### Requirement 7: File and Image Upload

**User Story:** As the Admin, I want to upload images for blogs and projects through the dashboard, so that I can use custom images instead of local asset files.

#### Acceptance Criteria

1. THE File_Uploader SHALL expose a `POST /api/admin/upload` endpoint that accepts a single image file via `multipart/form-data`
2. WHEN a valid image file (JPEG, PNG, WebP, GIF) of up to 5 MB is uploaded, THE File_Uploader SHALL store the file and return a publicly accessible URL
3. WHEN a file exceeding 5 MB is uploaded, THE File_Uploader SHALL return a 413 status with a descriptive error message
4. WHEN a file with an unsupported MIME type is uploaded, THE File_Uploader SHALL return a 415 status with a descriptive error message
5. THE Admin_Dashboard SHALL provide an image picker component that calls the upload endpoint and inserts the returned URL into the relevant form field
6. WHERE the upload endpoint is called without a valid JWT, THE File_Uploader SHALL return a 401 status

---

### Requirement 8: Email Notifications on Contact Form Submission

**User Story:** As the site owner, I want to receive an email whenever someone submits the contact form, so that I can respond promptly.

#### Acceptance Criteria

1. WHEN a contact form submission is successfully saved to the database, THE Email_Service SHALL send a notification email to the address configured in `SMTP_TO` environment variable
2. THE Email_Service SHALL use the SMTP credentials already configured in `backend/.env` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`)
3. THE notification email SHALL include the submitter's `name`, `email`, `service`, and `message` fields
4. IF the SMTP send operation fails, THEN THE Email_Service SHALL log the error and allow the contact form response to succeed without blocking the user
5. THE Email_Service SHALL send a confirmation email to the submitter's email address acknowledging receipt of their message

---

### Requirement 9: Admin Dashboard Navigation and Layout

**User Story:** As the Admin, I want a clear, consistent dashboard layout with navigation between sections, so that I can efficiently manage all content types.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL provide a sidebar or top navigation with links to: Blogs, Projects, Testimonials, Contacts, and a logout action
2. THE Admin_Dashboard SHALL display the count of unread contact submissions as a badge on the Contacts navigation item
3. WHEN the Admin navigates between sections, THE Admin_Dashboard SHALL update the active route without a full page reload
4. THE Admin_Dashboard SHALL be responsive and usable on screens with a minimum width of 768px
