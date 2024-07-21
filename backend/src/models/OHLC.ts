import mongoose, { Document, Schema } from "mongoose";

interface IOHLC extends Document {
  coinId: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

const OHLCSchema: Schema = new Schema({
  coinId: { type: String, required: true },
  timestamp: { type: Number, required: true },
  open: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  close: { type: Number, required: true },
});

const OHLC = mongoose.model<IOHLC>("OHLC", OHLCSchema);

export default OHLC;
