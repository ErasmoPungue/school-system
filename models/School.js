const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: String,
  email: String,
  plan: { type: String, default: "trial" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date
});

module.exports = mongoose.model("School", schoolSchema);
