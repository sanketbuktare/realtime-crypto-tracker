import { Router, Request, Response } from "express";
import { getAllCoins, getCoinPriceData, seedCoinData } from "../controllers/coin.controllers";

const router = Router();

router.post("/seed-data", seedCoinData);
router.get("/all", getAllCoins);
router.get('/coin-price-data', getCoinPriceData);

export default router;
