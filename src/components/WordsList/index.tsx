"use client";

import { searchWords } from "@/api/services/wordsService";
import { ISearchWords } from "@/app/types";
import WordDetail from "@/app/word/[word]/page";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "../Button";
import { Input } from "../Input";
import Modal from "../Modal";
import Pagination from "../Pagination";

interface WordsListProp {
  showSeeMore?: boolean;
  showPagination?: boolean;
  showModal?: boolean;
}

export function WordsList({
  showSeeMore = false,
  showPagination = false,
  showModal = false,
}: WordsListProp): JSX.Element {
  const { word, setWord } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [term, setTerm] = useState(word);
  const [wordsListData, setWordsListData] = useState<ISearchWords>();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  useEffect(() => {
    setTerm(word);
  }, [word]);

  const loadWordsList = async () => {
    setLoading(true);
    try {
      const wordsData = await searchWords(word, currentPage, itemsPerPage);
      setWordsListData(wordsData);
      setTotalPages(wordsData.totalPages);
      setCurrentPage(wordsData.page);
      setHasNext(wordsData.hasNext);
      setHasPrev(wordsData.hasPrev);
    } catch (error) {
      setError(true);
      console.error("Erro ao buscar palavra", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWordsList();
  }, [currentPage, itemsPerPage, word]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedWord(null);
  };

  return (
    <div>
      <div className="flex justify-around">
        <Input
          type="text"
          placeholder="Buscar palavra"
          value={term}
          action={(e) => setTerm(e.target.value)}
        />
        <Button
          text="Buscar"
          action={() => {
            setWord(term);
          }}
        />
      </div>

      {loading && (
        <div className="mt-8 flex justify-center text-bold">Carregando...</div>
      )}

      {error && (
        <div className="mt-8 flex justify-center text-bold text-orange-600">
          Erro ao carregar a lista de palavras...
        </div>
      )}

      {!loading &&
        !error &&
        wordsListData?.results &&
        wordsListData?.results.length === 0 && (
          <div className="my-8 flex justify-center text-bold ">
            Nenhuma palavra encontrada.
          </div>
        )}

      {!loading &&
        !error &&
        wordsListData?.results &&
        wordsListData?.results.length > 0 && (
          <div>
            <ol className="list-disc list-inside my-8">
              {wordsListData?.results.map((item, index) => (
                <li key={index}>
                  <div className="capitalize inline cursor-pointer hover:text-[#0e899c]">
                    {!showModal && <Link href={`/word/${item}`}>{item}</Link>}

                    {showModal && (
                      <span onClick={() => handleWordClick(item)}>{item}</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {modalVisible && selectedWord && (
              <Modal closeModal={closeModal}>
                <WordDetail selectedWord={selectedWord} hideActions />
              </Modal>
            )}

            {showPagination && (
              <Pagination
                totalPages={totalPages}
                currentPage={Number(currentPage)}
                hasNext={hasNext}
                hasPrev={hasPrev}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPage={itemsPerPage}
              />
            )}

            {showSeeMore && (
              <div className="flex text-sm text-[#19c1ce] hover:text-[#0e899c]">
                <Link href={"/list"} className="flex">
                  Ver mais
                  <IoIosArrowRoundForward size={20} />
                </Link>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
