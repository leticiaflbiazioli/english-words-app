"use client";

import { WordsList } from "@/components/WordsList";

const WordsListPage = () => {
  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold">Lista de Palavras</h1>
        <hr className="my-8" />
      </div>
      <WordsList showPagination showModal />
    </>
  );
};

export default WordsListPage;
