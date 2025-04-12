import { Request, Response } from "express";
import { Snippet } from "../models/snippet.model";

interface AuthenticatedRequest extends Request {
  userId: string;
}

export const createSnippet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, code, language, description, tags } = req.body;
    const userId = (req as AuthenticatedRequest).userId;

    const snippet = new Snippet({
      title,
      code,
      language,
      description,
      tags,
      owner: userId,
    });

    await snippet.save();
    res.status(201).json(snippet);
  } catch (error) {
    console.error("Error creating snippet:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.status(200).json(snippets);
  } catch (error) {
    console.error("Error getting snippet:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSnippetById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    res.status(200).json(snippet);
  } catch (error) {
    console.error("Error getting snippet by ID", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSnippet = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, code, language, description, tags } = req.body;
    const userId = (req as AuthenticatedRequest).userId;

    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    // Owner of snippet check
    if (snippet.owner.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { title, code, language, description, tags },
      { new: true }
    );
    res.status(200).json(updatedSnippet);
  } catch (error) {
    console.error("Error while updating snippet", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSnippet = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const postId = req.params.id;
    const snippet = await Snippet.findById(postId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    // Owner of snippet check
    if (snippet.owner.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Snippet.findByIdAndDelete(postId);
    res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("Error while deleting snippet", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const likeSnippet = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = (req as any).userId;
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.likes.includes(userId)) {
      // Unlike
      snippet.likes = snippet.likes.filter((id) => id.toString() !== userId);
    } else {
      snippet.likes.push(userId);
    }
    await snippet.save();
    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
