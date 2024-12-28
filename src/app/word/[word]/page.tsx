"use client";

import {
  favoriteWord,
  searchWord,
  unfavoriteWord,
} from "@/api/services/wordsService";
import { ISearchWord } from "@/app/types";
import { Button } from "@/components/Button";
import { Toast } from "@/components/Toast";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

interface IWordDetail {
  selectedWord?: string;
  hideActions?: boolean;
}

const WordDetail = ({ selectedWord, hideActions = false }: IWordDetail) => {
  const { setDicitionaryWord } = useApp();
  const params = useParams();
  const [wordData, setWordData] = useState({} as ISearchWord);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toastFavoriteVisible, setToastFavoriteVisible] = useState(false);
  const [toastUnfavoriteVisible, setToastUnfavoriteVisible] = useState(false);
  const word = params.word || selectedWord || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDicitionaryWord(word.toString());
        const response = await searchWord(word.toString());
        setWordData(response);
      } catch (error) {
        setError(true);
        console.error("Erro ao carregar histórico", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFavorite = async () => {
    if (word) {
      await favoriteWord(word.toString());
      setToastFavoriteVisible(true);
      setTimeout(() => {
        setToastFavoriteVisible(false);
      }, 3000);
      setWordData({ ...wordData, isFavorite: true });
    }
  };

  const handleUnfavorite = async () => {
    if (word) {
      await unfavoriteWord(word.toString());
      setToastUnfavoriteVisible(true);
      setTimeout(() => {
        setToastUnfavoriteVisible(false);
      }, 3000);
      setWordData({ ...wordData, isFavorite: false });
    }
  };

  const handleReturn = async () => {
    window.location.href = "/";
  };

  const phoneticsAudio = wordData.data?.[0].phonetics.filter(
    (item) => item.audio !== ""
  )[0]?.audio;

  const meanings = wordData.data?.[0].meanings[0].definitions.map(
    (item) => item.definition || "Nenhum significado listado na plataforma"
  );

  const synonyms =
    wordData.data?.[0].meanings[0].synonyms.join(", ") ||
    "Nenhum sinônimo listado na plataforma";

  const antonyms =
    wordData.data?.[0].meanings[0].antonyms.join(", ") ||
    "Nenhum antônimo listado na plataforma";

  if (loading) {
    return (
      <div className="mt-8 flex justify-center text-bold">Carregando...</div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="mt-8 text-orange-600 text-center">
          Não foi possível carregar as informações dessa palavra.
        </div>
        {!hideActions && (
          <Button text="Voltar" action={handleReturn} className="mt-4" />
        )}
      </div>
    );
  }

  return (
    <>
      {wordData.data && (
        <div>
          <div className="justify-between flex items-center">
            <h1 className="text-2xl font-bold capitalize">{word}</h1>
            {phoneticsAudio && (
              <audio controls>
                <source src={phoneticsAudio} type="audio/mpeg" />
              </audio>
            )}
          </div>
          <hr className="my-4" />

          <div>
            <div className="flex mr-4">
              <h2 className="mr-4 font-bold">Fonética: </h2>
              <div>{wordData.data[0].phonetic}</div>
            </div>

            <div className="flex mr-4">
              <h2 className="mr-4 font-bold">Significados: </h2>
              <div>{meanings}</div>
            </div>

            <div className="flex mr-4">
              <h2 className="mr-4 font-bold">Sinônimos: </h2>
              <div>{synonyms}</div>
            </div>

            <div className="flex mr-4">
              <h2 className="mr-4 font-bold">Antônimos: </h2>
              <div>{antonyms}</div>
            </div>

            {!hideActions && (
              <div className="my-4">
                {!wordData.isFavorite && (
                  <Button
                    text="Favoritar"
                    action={handleFavorite}
                    className="mr-4"
                  />
                )}
                {toastFavoriteVisible && (
                  <Toast
                    message="Palavra adicionada aos favoritos!"
                    className="bg-[rgba(25,193,206,0.7)]"
                  />
                )}
                {wordData.isFavorite && (
                  <Button
                    text="Desfavoritar"
                    action={handleUnfavorite}
                    className="bg-red-300"
                  />
                )}
                {toastUnfavoriteVisible && (
                  <Toast
                    message="Palavra removida aos favoritos!"
                    className="bg-[rgba(248,113,113,0.7)]"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {!hideActions && (
        <div className="flex text-sm text-[#19c1ce] items-center hover:text-[#0e899c]">
          <Link href={"/list"} className="flex">
            Pesquisar outra palavra
            <IoIosArrowRoundForward size={20} />
          </Link>
        </div>
      )}
    </>
  );
};

export default WordDetail;
