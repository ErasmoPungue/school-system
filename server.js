const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔥 ROTA TESTE (SEMPRE PRIMEIRO)
app.get("/", (req, res) => {
  res.send("API OK");
});

// 🔥 CONEXÃO MONGO
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log("Erro Mongo:", err));

// 🔥 ROTAS
app.use("/api/auth", require("./routes/auth"));
app.use("/api/school", require("./routes/school"));

// 🔥 PORTA (IMPORTANTE PARA RAILWAY)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
