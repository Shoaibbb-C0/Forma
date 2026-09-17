const express = require("express");
const rateLimit = require("express-rate-limit");
const Enquiry = require("../models/Enquiry");
const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
});
router.post("/", limiter, async (req, res) => {
  const { name, email, interest, message, website } = req.body || {};
  if (website) return res.status(204).end();
  if ([name, email, message].some(value => typeof value !== "string" || !value.trim()) ||
      name.length > 100 || email.length > 160 || message.length > 3000 ||
      (interest !== undefined && (typeof interest !== "string" || interest.length > 80)) ||
      !/^\S+@\S+\.\S+$/.test(email.trim()))
    return res
      .status(400)
      .json({ error: "Please provide a name, valid email and message." });
  try {
    if (Enquiry.db.readyState !== 1) return res.status(503).json({ error: "Enquiries are unavailable. Please email hello@forma.studio." });
    await Enquiry.create({ name: name.trim(), email: email.trim(), interest, message: message.trim() });
    return res.status(201).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unable to send enquiry." });
  }
});
module.exports = router;
