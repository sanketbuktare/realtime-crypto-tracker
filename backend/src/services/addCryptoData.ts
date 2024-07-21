import OHLC from "../models/OHLC";

export const saveOHLCData = async (coinId: string, ohlcData: number[][]) => {
  try {
    const result = [];
    for (const data of ohlcData) {
      const [timestamp, open, high, low, close] = data;

      const ohlcRecord = new OHLC({
        coinId,
        timestamp,
        open,
        high,
        low,
        close,
      });

      await ohlcRecord.save();
      result.push({
        coinId,
        timestamp,
        open,
        high,
        low,
        close,
      });
    }

    return result;
  } catch (error) {
    console.error(`Error saving OHLC data for coin ${coinId}:`, error);
    throw error;
  }
};
