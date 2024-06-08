import mongoose from "mongoose";
const { Schema } = mongoose;

const TickerSchema = new Schema({
  description: String,
  target_url: String,
});

const Ticker = mongoose.model("Ticker", TickerSchema);

export default Ticker;
