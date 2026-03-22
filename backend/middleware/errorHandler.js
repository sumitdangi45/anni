const { Error: MongooseError } = require("mongoose");

/**
 * Async wrapper — eliminates try/catch boilerplate in every route
 * Usage: router.get("/", asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Global error handler — must be last middleware in server.js
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} —`, err.message);

  // Mongoose validation error
  if (err instanceof MongooseError.ValidationError) {
    const fields = {};
    Object.keys(err.errors).forEach((key) => {
      fields[key] = [err.errors[key].message];
    });
    return res.status(400).json({ error: "Validation failed", fields });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err instanceof MongooseError.CastError) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ error: `Duplicate value for ${field}` });
  }

  // JWT / auth errors
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Default 500
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
};

module.exports = { asyncHandler, errorHandler };
