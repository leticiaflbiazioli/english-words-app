"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  word: string;
  setWord: Dispatch<SetStateAction<string>>;
  dictionaryWord: string;
  setDicitionaryWord: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  word: "",
  setWord: () => {},
  dictionaryWord: "",
  setDicitionaryWord: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [word, setWord] = useState("");
  const [dictionaryWord, setDicitionaryWord] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const searchedWord = localStorage.getItem("word");
    const searchedDictionaryWord = localStorage.getItem("dictionaryWord");
    setIsAuthenticated(!!token);
    setWord(searchedWord || "");
    setDicitionaryWord(searchedDictionaryWord || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("word", word);
  }, [word]);

  useEffect(() => {
    localStorage.setItem("dictionaryWord", dictionaryWord);
  }, [dictionaryWord]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        word,
        setWord,
        dictionaryWord,
        setDicitionaryWord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
