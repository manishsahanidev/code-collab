const API_URL = "http://localhost:5000/api/users";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  website?: string;
  location?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  bio?: string;
  website?: string;
  location?: string;
  profilePicture?: string;
}

// Get current user profile
export const getUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch user profile");
  }

  return response.json();
};

// Update user profile
export const updateUserProfile = async (
  data: UpdateProfileData,
  token: string
): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update profile");
  }

  return response.json();
};

// Get public user profile by ID
export const getUserById = async (id: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch user");
  }

  return response.json();
};
