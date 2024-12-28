"use client";

import { getUserFavorites } from "@/api/services/userService";
import { unfavoriteWord } from "@/api/services/wordsService";
import { Button } from "@/components/Button";
import Pagination from "@/components/Pagination";
import { dateConverter } from "@/utils/dateConverter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IUserFavorites } from "../types";

const FavoritesPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favoritesData, setFavoritesData] = useState<IUserFavorites>();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const loadFavorites = async () => {
    try {
      const favoritesData = await getUserFavorites(currentPage, itemsPerPage);
      setFavoritesData(favoritesData);
      setTotalPages(favoritesData.totalPages);
      setCurrentPage(favoritesData.page);
      setHasNext(favoritesData.hasNext);
      setHasPrev(favoritesData.hasPrev);
    } catch (error) {
      setError(true);
      console.error("Erro ao carregar lista de favoritos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [currentPage, itemsPerPage]);

  const handleUnfavorite = async (word: string) => {
    if (word) {
      await unfavoriteWord(word.toString());
      loadFavorites();
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="mt-8 flex justify-center text-bold">Carregando...</div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 flex justify-center text-bold text-orange-600">
        Erro ao carregar lista de favoritos...
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold">Lista de Favoritos</h1>
        <hr className="my-8" />
      </div>
      {favoritesData?.results && favoritesData?.results.length > 0 ? (
        <div>
          <ol className="list-disc list-inside">
            {favoritesData?.results.map((item, index) => (
              <li key={index} className="mb-3">
                <div className="capitalize inline font-bold cursor-pointer">
                  <Link href={`/word/${item.word}`}>{item.word} - </Link>
                </div>
                <div className="inline">
                  Adicionada em {dateConverter(item.added)}
                </div>
                <Button
                  text="Desfavoritar"
                  action={() => handleUnfavorite(item.word)}
                  className="bg-red-300 text-xs block"
                />
              </li>
            ))}
          </ol>

          <Pagination
            totalPages={totalPages}
            currentPage={Number(currentPage)}
            hasNext={hasNext}
            hasPrev={hasPrev}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPage={itemsPerPage}
          />
        </div>
      ) : (
        <div>Nenhuma palavra encontrada na sua lista de favoritos.</div>
      )}
    </>
  );
};

export default FavoritesPage;
