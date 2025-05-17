import { model, Schema, Types } from "mongoose";

interface IComment {
  content: string;
  author: Types.ObjectId;
  snippet: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    snippet: { type: Schema.Types.ObjectId, ref: "Snippet", required: true },
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", commentSchema);
