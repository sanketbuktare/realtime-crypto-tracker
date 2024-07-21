import { API_BASE_URL } from "@/utils/constants";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // other default headers
  },
  // additional settings like timeouts
});

class ApiServices {
  getCoins(params: any) {
    return api.get("/api/coins/all", {
      params,
    });
  }

  getCoinData(params: any) {
    return api.get("/api/coins/coin-price-data", {
      params,
    });
  }
}

export default new ApiServices();
