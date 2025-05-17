import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createComment,
  deleteComment,
  getCommentsBySnippet,
} from "../controllers/comment.controller";

const router = Router();

// Get comments for a snippet
router.get("/snippet/:snippetId", getCommentsBySnippet);

// Create a new comment (requires auth)
router.post("/", auth, createComment);

// Delete a comment (requires auth)
router.delete("/:id", auth, deleteComment);

export default router;
