const express = require("express");
const router = express.Router();
const School = require("../models/School");

router.post("/create", async (req, res) => {
  const { name, email } = req.body;

  const expires = new Date();
  expires.setMonth(expires.getMonth() + 3);

  const school = new School({
    name,
    email,
    expiresAt: expires
  });

  await school.save();

  res.json(school);
});

router.get("/check/:id", async (req, res) => {
  const school = await School.findById(req.params.id);

  if (new Date() > school.expiresAt) {
    return res.json({ status: "expired" });
  }

  res.json({ status: "active" });
});

module.exports = router;