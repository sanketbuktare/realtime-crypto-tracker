"use client";

import CoinModal from "@/components/CoinModal";
import CoinTable from "@/components/CoinTable";
import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coinId, setCoinId] = useState("bitcoin");
  const pollingInterval = 30000; // 30 seconds

  useEffect(() => {
    if (coinId) {
      fetchCoinData();

      // Set up polling
      const intervalId = setInterval(() => {
        fetchCoinData();
      }, pollingInterval);

      // Clean up polling on component unmount
      return () => clearInterval(intervalId);
    }
  }, [coinId, pollingInterval]);

  const fetchCoinData = async () => {
    try {
      const response = await ApiService.getCoinData({
        id: coinId,
        days: 1,
        limit: 20,
      });
      console.log("Coin price data", response.data)
      setData(response.data);
    } catch (error) {
      console.log("Error while fetching the coin data", error);
    }
  };

  const handleSelectCoin = (coinId: string) => {
    setCoinId(coinId);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Coin Data</h1>
      <div className="flex flex-row justify-between items-center">
        <h2>
          Selected Coin ID: <b>{coinId}</b>
        </h2>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit"
          onClick={() => setIsModalOpen(true)}
        >
          Select Coin
        </button>
      </div>
      <br />
      <CoinTable data={data} />
      {isModalOpen && (
        <CoinModal
          selectedCoinId={coinId}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSelectCoin={handleSelectCoin}
        />
      )}
    </div>
  );
}
