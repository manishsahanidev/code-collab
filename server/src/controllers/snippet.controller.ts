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
