// src/routes/urlRoutes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { addAnalise } from "../controllers/urlController.js";

const router = Router();

// Aplicamos o middleware apenas nas rotas que precisam de login
router.post("/nova-analise", requireAuth, addAnalise);

export default router;
