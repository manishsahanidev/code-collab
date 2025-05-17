import { Request, Response } from "express";
import { Comment } from "../models/comment.model";
import { AuthenticatedRequest } from "../middleware/auth";

// Get comments for a snippet
export const getCommentsBySnippet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const snippetId = req.params.snippetId;
    const comments = await Comment.find({ snippet: snippetId })
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new comment
export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content, snippetId } = req.body;
    const userId = (req as AuthenticatedRequest).userId;

    const comment = new Comment({
      content,
      author: userId,
      snippet: snippetId,
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate(
      "author",
      "name profilePicture"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a comment
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const commentId = req.params.id;
    const userId = (req as AuthenticatedRequest).userId;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is the comment author
    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
