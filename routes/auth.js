const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTAR
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, schoolId } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role,
      schoolId
    });

    await user.save();

    res.json(user);
  } catch (err) {
    console.log("Erro REGISTER:", err);
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("Usuário não encontrado");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json("Senha errada");

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token, user });
  } catch (err) {
    console.log("Erro LOGIN:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
