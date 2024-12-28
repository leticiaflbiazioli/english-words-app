import { getUserHistory } from "@/api/services/userService";
import { IUserHistory } from "@/app/types";
import { dateConverter } from "@/utils/dateConverter";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Pagination from "../Pagination";

interface HistoryListProp {
  showSeeMore?: boolean;
  showPagination?: boolean;
}

export function HistoryList({
  showSeeMore = false,
  showPagination = false,
}: HistoryListProp): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [historyData, setHistoryData] = useState<IUserHistory>();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const historyData = await getUserHistory(currentPage, itemsPerPage);
        setHistoryData(historyData);
        setTotalPages(historyData.totalPages);
        setCurrentPage(historyData.page);
        setHasNext(historyData.hasNext);
        setHasPrev(historyData.hasPrev);
      } catch (error) {
        setError(true);
        console.error("Erro ao carregar histórico", error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [currentPage, itemsPerPage]);

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
        Erro ao carregar histórico...
      </div>
    );
  }

  return historyData?.results && historyData?.results.length > 0 ? (
    <div>
      <ol className="list-disc list-inside">
        {historyData?.results.map((item, index) => (
          <li key={index}>
            <div className="capitalize inline font-bold cursor-pointer hover:text-[#0e899c]">
              <Link href={`/word/${item.word}`}>{item.word} - </Link>
            </div>
            <div className="inline">
              Visualizada em {dateConverter(item.added)}
            </div>
          </li>
        ))}
      </ol>

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
        <div className="flex text-sm mt-8 text-[#19c1ce] hover:text-[#0e899c]">
          <Link href={"/history"} className="flex">
            Ver mais
            <IoIosArrowRoundForward size={20} />
          </Link>
        </div>
      )}
    </div>
  ) : (
    <div>Nenhuma palavra encontrada no seu histórico.</div>
  );
}
