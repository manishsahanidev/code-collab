const API_URL = "http://localhost:5000/api";

export interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  description?: string;
  tags: string[];
  owner: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSnippetData {
  title: string;
  code: string;
  language: string;
  description?: string;
  tags?: string[];
}

export const getSnippets = async (): Promise<Snippet[]> => {
  const response = await fetch(`${API_URL}/snippet`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch snippets");
  }

  return response.json();
};

export const getSnippetById = async (id: string): Promise<Snippet> => {
  const response = await fetch(`${API_URL}/snippet/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch snippet");
  }

  return response.json();
};

export const createSnippet = async (
  snippetData: CreateSnippetData,
  token: string
): Promise<Snippet> => {
  const response = await fetch(`${API_URL}/snippet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(snippetData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create snippet");
  }

  return response.json();
};

export const updateSnippet = async (
  id: string,
  snippetData: Partial<CreateSnippetData>,
  token: string
): Promise<Snippet> => {
  const response = await fetch(`${API_URL}/snippet/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(snippetData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update snippet");
  }

  return response.json();
};

export const deleteSnippet = async (
  id: string,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/snippet/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete snippet");
  }
};

export const likeSnippet = async (
  id: string,
  token: string
): Promise<Snippet> => {
  const response = await fetch(`${API_URL}/snippet/${id}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to like snippet");
  }

  return response.json();
};
