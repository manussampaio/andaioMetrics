import express from "express";
import dontenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { requireAuth } from "./middleware/auth.js";
import cors from "cors";


dontenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,              // permite envio de cookies de sessão
}));

app.all("/api/auth/*path", toNodeHandler(auth));

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/", (req, res) => {
  res.json({
    message: "ANDAIO Metrics rodando!!",
    status: "OK",
  });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    message: "Bem-vindo ao seu perfil!",
    user: req.user, // Dados vindos do middleware
  });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
});
