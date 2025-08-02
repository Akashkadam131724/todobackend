import dotenv from "dotenv";

import express from "express";
import ConnectDB from "./src/db/db.js";
import CountryRoute from "./src/routes/country.js";
import FooterRoute from "./src/routes/footer/footer.js";
import ImageRoute from "./src/routes/image/image.js";
import specs from "./swaggerOptions.js"; //
import swaggerUi from "swagger-ui-express"; // Corrected import
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
//aasd
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const app = express();
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

const DB = process.env.DB;
const PORT = process.env.PORT || 3000; // Change PORT to 3000 if you want to run on localhost:3000

console.log(
  process.env.DB,
  process.env.PORT,
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

app.get("/", (req, res) => {
  res.send(`<h1>Hello world Akash</h1>`);
});

app.use("/country", CountryRoute);
app.use("/footer", FooterRoute);

app.use("/image", ImageRoute);

app.listen(PORT, async () => {
  try {
    await ConnectDB(DB);
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error(`Error starting server: ${err.message}`);
  }
});
