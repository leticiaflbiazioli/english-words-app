export interface ISearchWords {
  results: string[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ISearchWord {
  word: string;
  data: {
    word: string;
    phonetic: string;
    phonetics: { audio: string }[];
    origin: string;
    meanings: {
      partOfSpeech: string;
      definitions: {
        definition: string;
        example?: string;
        synonyms: string;
        antonyms: string;
      }[];
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
  isFavorite: boolean;
}

export interface IFavoriteWords {
  message: string;
}

export interface IUserProfile {
  name: string;
  email: string;
  history: { word: string; searchedAt: string }[];
}

export interface IUserHistory {
  results: { word: string; added: string }[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IUserFavorites extends IUserHistory {}

export interface ILogin {
  id: string;
  name: string;
  token: string;
}

export interface ISignup extends ILogin {}
