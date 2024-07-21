import { Request, Response } from "express";
import Crypto from "../models/Crypto";
import { fetchCoinList, fetchCoinOHLC } from "../services/fetchCryptoData";
import { saveOHLCData } from "../services/addCryptoData";
import OHLC from "../models/OHLC";

export const seedCoinData = async (req: Request, res: Response) => {
  try {
    const data = await fetchCoinList();
    for (const coinData of data) {
      const stockData = new Crypto({
        id: coinData.id,
        symbol: coinData.symbol,
        name: coinData.name,
        platforms: coinData.platforms,
      });

      await stockData.save();
    }
    res.json({ message: "Coins data seeded successfully" });
  } catch (error) {
    console.log("Error while seeding the coins", error);
    res.status(500).json({ error: "Something went wrong", details: error });
  }
};

export const getAllCoins = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, keyword = "" } = req.query;

  try {
    const query = {
      $or: [
        { id: { $regex: keyword, $options: "i" } },
        { symbol: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } },
      ],
    };

    const skip = (Number(page) - 1) * Number(limit);
    const coins = await Crypto.find(query)
      .select("-_id -__v")
      .skip(skip)
      .limit(Number(limit));

    const total = await Crypto.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      coins,
    });
  } catch (error) {
    console.log("Error while fetching the coins", error);
    res.status(500).json({ error: "Something went wrong", details: error });
  }
};

export const getCoinPriceData = async (req: Request, res: Response) => {
  const { id, days, currency = "usd", page = 1, limit = 10 } = req.query;

  if (!id || !days) {
    return res
      .status(400)
      .json({ error: "Missing required parameters: id and days" });
  }
  if (isNaN(Number(days))) {
    return res.status(400).json({ error: "days should be an integer" });
  }
  if (isNaN(Number(page)) || isNaN(Number(limit))) {
    return res.status(400).json({ error: "page and limit should be integers" });
  }

  try {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const daysNumber = Number(days);
    const skip = (pageNumber - 1) * limitNumber;

    // Check if OHLC data for the given coin ID and days is present in the database
    const existingData = await OHLC.find({
      coinId: id,
      timestamp: { $gte: Date.now() - daysNumber * 24 * 60 * 60 * 1000 },
    })
      .select("-_id -__v")
      .skip(skip)
      .limit(limitNumber);

    if (existingData.length > 0) {
      return res.json(existingData);
    }

    // If not present, fetch the data from the API
    const priceData = await fetchCoinOHLC(
      id as string,
      daysNumber,
      currency as string
    );

    const result = await saveOHLCData(id as string, priceData);

    // Implement pagination on the newly fetched data
    const paginatedResult = result.slice(skip, pageNumber * limitNumber);

    res.json(paginatedResult);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error });
  }
};
