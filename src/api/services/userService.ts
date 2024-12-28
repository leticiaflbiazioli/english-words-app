import { IUserFavorites, IUserHistory, IUserProfile } from "@/app/types";
import { fetchApi } from "../fetchApi";

export const getUserProfile = async (): Promise<IUserProfile> => {
  const data = await fetchApi("/user/me");
  return data;
};

export const getUserHistory = async (
  page: number = 1,
  limit: number = 10
): Promise<IUserHistory> => {
  const data = await fetchApi(`/user/me/history?page=${page}&limit=${limit}`);
  return data;
};

export const getUserFavorites = async (
  page = 1,
  limit = 10
): Promise<IUserFavorites> => {
  const data = await fetchApi(`/user/me/favorites?page=${page}&limit=${limit}`);
  return data;
};
