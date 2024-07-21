import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL: string = process.env.API_URL as string;
const COIN_GECKO_API_KEY: string = process.env.COIN_GECKO_API_KEY as string;

export const fetchCoinList = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v3/coins/list?include_platform=true`,
      {
        headers: {
          "x-cg-demo-api-key": COIN_GECKO_API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchCoinOHLC = async (
  id: string,
  days: number,
  vs_currency = "usd"
) => {
  try {
    const response = await axios.get(`${API_URL}/api/v3/coins/${id}/ohlc`, {
      params: {
        vs_currency: vs_currency, 
        days: days,
      },
      headers: {
        "x-cg-demo-api-key": COIN_GECKO_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching OHLC data for coin ${id}:`, error);
    throw error;
  }
};
