import { Router } from "express";
import { auth } from "../middleware/auth";
import { createSnippet, getSnippets } from "../controllers/snippet.controller";

const router = Router();

router.post("/", auth, createSnippet);
router.get("/", getSnippets);

export default router;
