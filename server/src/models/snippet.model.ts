import { model, Schema, Types } from "mongoose";

interface ISnippet {
  title: string;
  code: string;
  language: string;
  description?: string;
  tags: string[];
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const snippetSchema = new Schema<ISnippet>(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Snippet = model<ISnippet>("Snippet", snippetSchema);
