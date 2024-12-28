"use client";

import { HistoryList } from "@/components/HistoryList";
import { WordsList } from "@/components/WordsList";

const Dashboard = () => {
  return (
    <div>
      <div>
        <h1 className="text-center text-2xl font-bold">Dashboard</h1>
        <hr className="my-8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div>
            <h2 className="text-center font-bold mb-4">Lista de Palavras</h2>
            <WordsList showSeeMore />
          </div>
        </div>
        <div>
          <h2 className="text-center font-bold mb-4">Histórico de Pesquisas</h2>
          <HistoryList showSeeMore />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
