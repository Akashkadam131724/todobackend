// imports
import { config } from "dotenv";
config();
import express from "express";
import ConnectDB from "./src/db/db.js";

import CountryRoute from "./src/routes/country.js";

const app = express();
app.use(express.json());

const DB = process.env.DB;
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send(`<h1>Hello world</h1>`);
});

app.use("/country", CountryRoute);

app.listen(PORT, async () => {
  try {
    await ConnectDB(DB);
  } catch (err) {
    console.log(err.message);
  }
});
