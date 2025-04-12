import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createSnippet,
  getSnippetById,
  getSnippets,
} from "../controllers/snippet.controller";

const router = Router();

router.post("/", auth, createSnippet);
router.get("/", getSnippets);
router.get("/:id", getSnippetById);

export default router;
