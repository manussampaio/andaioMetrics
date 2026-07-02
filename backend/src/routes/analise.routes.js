import { Router } from "express";
import * as AnaliseController from "../controllers/analise.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", AnaliseController.listar);
router.get("/:id", AnaliseController.buscar);
router.post("/", requireAuth, AnaliseController.criar);
router.put("/:id", requireAuth, AnaliseController.atualizar);
router.delete("/:id", requireAuth, AnaliseController.deletar);

export default router;