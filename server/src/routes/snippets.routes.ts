import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createSnippet,
  deleteSnippet,
  getSnippetById,
  getSnippets,
  likeSnippet,
  updateSnippet,
} from "../controllers/snippet.controller";

const router = Router();

router.post("/", auth, createSnippet);
router.get("/", getSnippets);
router.get("/:id", getSnippetById);
router.put("/:id", auth, updateSnippet);
router.delete("/:id", auth, deleteSnippet);
router.put("/:id/like", auth, likeSnippet);

export default router;
