const { z } = require("zod");

// ── Reusable schemas ──────────────────────────────────────

const schemas = {
  contact: z.object({
    name:    z.string().min(1, "Name is required").max(100),
    email:   z.string().email("Invalid email address"),
    service: z.string().max(100).optional(),
    message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  }),

  project: z.object({
    category:    z.string().min(1, "Category is required"),
    title:       z.string().min(1, "Title is required").max(200),
    description: z.string().min(1, "Description is required").max(1000),
    image_url:   z.string().url("Invalid URL").optional().nullable(),
  }),

  blog: z.object({
    category:    z.string().min(1, "Category is required"),
    date:        z.string().min(1, "Date is required"),
    title:       z.string().min(1, "Title is required").max(200),
    description: z.string().min(1, "Description is required").max(500),
    content:     z.string().optional().nullable(),
    image_url:   z.string().url("Invalid URL").optional().nullable(),
  }),

  testimonial: z.object({
    name:       z.string().min(1, "Name is required").max(100),
    role:       z.string().min(1, "Role is required").max(100),
    text:       z.string().min(10, "Review must be at least 10 characters").max(1000),
    rating:     z.number().int().min(1).max(5).default(5),
    avatar_url: z.string().optional().nullable(),
  }),

  service: z.object({
    num:   z.string().min(1),
    title: z.string().min(1, "Title is required").max(100),
    items: z.array(z.string().min(1)).min(1, "At least one item required"),
  }),

  faq: z.object({
    num:      z.string().min(1),
    question: z.string().min(1, "Question is required").max(300),
    answer:   z.string().min(1, "Answer is required").max(1000),
  }),
};

// ── Middleware factory ────────────────────────────────────

/**
 * validate(schemaName) — returns Express middleware
 * Validates req.body against the named schema.
 * On failure: 400 with structured errors.
 */
function validate(schemaName) {
  const schema = schemas[schemaName];
  if (!schema) throw new Error(`Unknown schema: "${schemaName}"`);

  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({
        error: "Validation failed",
        fields: errors,
      });
    }
    // Attach parsed (coerced + stripped) data
    req.validated = result.data;
    next();
  };
}

module.exports = { validate, schemas };
