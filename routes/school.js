const express = require("express");
const router = express.Router();
const School = require("../models/School");

// CRIAR ESCOLA
router.post("/create", async (req, res) => {
  try {
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
  } catch (err) {
    console.log("Erro CREATE SCHOOL:", err);
    res.status(500).json({ error: err.message });
  }
});

// VERIFICAR STATUS
router.get("/check/:id", async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (!school) {
      return res.status(404).json({ error: "Escola não encontrada" });
    }

    if (new Date() > school.expiresAt) {
      return res.json({ status: "expired" });
    }

    res.json({ status: "active" });
  } catch (err) {
    console.log("Erro CHECK SCHOOL:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
