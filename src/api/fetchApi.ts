import { checkAuthToken } from "./middlewares/authMiddleware";

const API_URL = "http://localhost:3000";

export const fetchApi = async (
  endpoint: string,
  options: RequestInit = {},
  ignoreToken = false
) => {
  const headers = {
    "Content-Type": "application/json",
    ...(!ignoreToken && { Authorization: `Bearer ${checkAuthToken()}` }),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer requisição");
  }

  return response.json();
};
