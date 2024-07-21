import ApiService from "@/services/ApiService";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface CoinModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSelectCoin: (id: string) => void;
  selectedCoinId: string;
}

const CoinModal: React.FC<CoinModalProps> = ({
  isOpen,
  onRequestClose,
  onSelectCoin,
  selectedCoinId,
}) => {
  const [coins, setCoins] = useState<{ id: string; name: string }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await ApiService.getCoins({
          keyword: search,
          limit: 20,
        });
        console.log(response.data);
        setCoins(response?.data?.coins);
      } catch (error) {
        console.log("Error while fetching coins", error);
      }
    };

    fetchCoins();
  }, [search]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Select Coin"
      className="bg-white rounded-lg p-6 w-1/2 mx-auto mt-24"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Select Coin</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a coin"
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <ul className="max-h-60 overflow-y-auto">
        {coins.map((coin) => (
          <li
            key={coin.id}
            onClick={() => onSelectCoin(coin.id)}
            className={`cursor-pointer p-2 rounded hover:bg-gray-200 flex justify-between items-center ${
              coin.id === selectedCoinId ? "bg-blue-100" : ""
            }`}
          >
            {coin.name}
            {coin.id === selectedCoinId && (
              <span className="text-green-500">&#10003;</span>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={onRequestClose}
        className="mt-4 bg-red-500 text-white rounded p-2 hover:bg-red-700"
      >
        Close
      </button>
    </Modal>
  );
};

export default CoinModal;
