import { config } from "dotenv";
import express from "express";
import ConnectDB from "./src/db/db.js";
import CountryRoute from "./src/routes/country.js";
import specs from "./swaggerOptions.js"; //
import swaggerUi from "swagger-ui-express"; // Corrected import

const app = express();
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

const DB = process.env.DB;
const PORT = process.env.PORT || 3000; // Change PORT to 3000 if you want to run on localhost:3000

app.get("/", (req, res) => {
  res.send(`<h1>Hello world</h1>`);
});

app.use("/country", CountryRoute);

app.listen(PORT, async () => {
  try {
    await ConnectDB(DB);
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error(`Error starting server: ${err.message}`);
  }
});
