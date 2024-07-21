import express from "express";
import dotenv from "dotenv";
import coinRoutes from "./src/routes/coin.routes";
import connectDb from "./src/config/connectDb";
import cors from 'cors';
import cron from "node-cron";
import { fetchCoinList, fetchCoinOHLC } from "./src/services/fetchCryptoData";
import { saveOHLCData } from "./src/services/addCryptoData";

dotenv.config();
connectDb();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server running...");
});
app.use("/api/coins", coinRoutes);

/*
---------- Commented the cron job to save the free API credits -----------------
this will call the API by coingecko and store the data in DB by polling it
*/

// cron.schedule("0 0 * * *", async () => {
//   console.log("Running a job at 00:00 every day to fetch and save OHLC data");

//   const coinList = await fetchCoinList();
//   for (const coin of coinList) {
//     try {
//       const ohlcData = await fetchCoinOHLC(coin.id, 1); // Fetch OHLC data for the last day
//       await saveOHLCData(coin.id, ohlcData);
//     } catch (error) {
//       console.error(`Error processing OHLC data for coin ${coin.id}:`, error);
//     }
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
