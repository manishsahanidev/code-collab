import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createSnippet,
  deleteSnippet,
  getSnippetById,
  getSnippets,
  updateSnippet,
} from "../controllers/snippet.controller";

const router = Router();

router.post("/", auth, createSnippet);
router.get("/", getSnippets);
router.get("/:id", getSnippetById);
router.put("/:id", auth, updateSnippet);
router.delete("/:id", auth, deleteSnippet);

export default router;
