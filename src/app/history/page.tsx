"use client";

import { HistoryList } from "@/components/HistoryList";

const HistoryPage = () => {
  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold">Histórico</h1>
        <hr className="my-8" />
      </div>
      <HistoryList showPagination />
    </>
  );
};

export default HistoryPage;
