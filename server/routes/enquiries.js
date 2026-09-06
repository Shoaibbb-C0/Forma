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
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email))
    return res
      .status(400)
      .json({ error: "Please provide a name, valid email and message." });
  try {
    if (Enquiry.db.readyState === 1)
      await Enquiry.create({ name, email, interest, message });
    console.log("New enquiry:", { name, email, interest });
    return res.status(201).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unable to send enquiry." });
  }
});
module.exports = router;
