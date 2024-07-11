import mongoose from "mongoose";
const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: String,
  description: String,
  capital: String,
  country_code: String,
});

const Country = mongoose.model("Country", CountrySchema);

export default Country;
