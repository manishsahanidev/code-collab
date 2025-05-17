const API_URL = "http://localhost:5000/api/comments";

export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    profilePicture?: string;
  };
  snippet: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
  snippetId: string;
}

// Get all comments for a snippet
export const getCommentsBySnippet = async (
  snippetId: string
): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/snippet/${snippetId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch comments");
  }

  return response.json();
};

// Create a new comment
export const createComment = async (
  commentData: CreateCommentData,
  token: string
): Promise<Comment> => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create comment");
  }

  return response.json();
};

// Delete a comment
export const deleteComment = async (
  commentId: string,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete comment");
  }
};
