import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createSnippet,
  getSnippetById,
  getSnippets,
  updateSnippet,
} from "../controllers/snippet.controller";

const router = Router();

router.post("/", auth, createSnippet);
router.get("/", getSnippets);
router.get("/:id", getSnippetById);
router.put("/:id", auth, updateSnippet);

export default router;
