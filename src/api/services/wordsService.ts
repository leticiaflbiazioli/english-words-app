import { IFavoriteWords, ISearchWord, ISearchWords } from "@/app/types";
import { fetchApi } from "../fetchApi";

export const searchWords = async (
  search: string,
  page: number = 1,
  limit: number = 10
): Promise<ISearchWords> => {
  const data = await fetchApi(
    `/entries/en?search=${search}&page=${page}&limit=${limit}`
  );
  return data;
};

export const searchWord = async (word: string): Promise<ISearchWord> => {
  const data = await fetchApi(`/entries/en/${word}`);
  return data;
};

export const favoriteWord = async (word: string): Promise<IFavoriteWords> => {
  const response = await fetchApi(`/entries/en/${word}/favorite`, {
    method: "POST",
  });
  return response;
};

export const unfavoriteWord = async (word: string): Promise<IFavoriteWords> => {
  const response = await fetchApi(`/entries/en/${word}/unfavorite`, {
    method: "DELETE",
  });
  return response;
};
