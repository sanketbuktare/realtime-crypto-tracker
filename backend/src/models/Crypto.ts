import mongoose, { Document, Schema } from "mongoose";

interface ICrypto extends Document {
  id: string;
  symbol: string;
  name: string;
  platforms: Record<string, string>;
}

const CryptoSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  symbol: { type: String },
  name: { type: String, required: true },
  platforms: { type: Object },
});

CryptoSchema.index({ id: 1 });
CryptoSchema.index({ symbol: 1 });
CryptoSchema.index({ name: 1 });

const Crypto = mongoose.model<ICrypto>("Crypto", CryptoSchema);

export default Crypto;
