const express = require("express");
const { Service } = require("../db");
const adminAuth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
  res.json(await Service.find().sort({ num: 1 }));
}));

router.post("/", adminAuth, validate("service"), asyncHandler(async (req, res) => {
  await Service.create(req.validated);
  res.status(201).json({ success: true });
}));

router.put("/:id", adminAuth, validate("service"), asyncHandler(async (req, res) => {
  await Service.findByIdAndUpdate(req.params.id, req.validated);
  res.json({ success: true });
}));

router.delete("/:id", adminAuth, asyncHandler(async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}));

module.exports = router;
