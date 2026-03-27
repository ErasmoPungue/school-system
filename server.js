const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mongo correto
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

// ✅ rota teste (IMPORTANTE)
app.get("/", (req, res) => {
  res.send("API OK");
  });

  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/school", require("./routes/school"));

  // ✅ porta correta para Railway
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
    });