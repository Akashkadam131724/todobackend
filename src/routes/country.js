import express from "express";
import {
  createCountry,
  createMultipleCountries,
  getAllCountry,
  getCountryById,
  updateCountry,
  deleteCountryById,
  deleteAllCountries,
} from "../controllers/country/country.js";

import {
  searchCountry,
  suggestCountryName,
} from "../controllers/country/search-filter.js";

const router = express.Router();

router.post("/", createCountry);
router.post("/createmultiple", createMultipleCountries); // New endpoint for creating multiple countries
router.get("/", getAllCountry);
router.get("/search", searchCountry);
router.get("/suggest", suggestCountryName);
router.get("/:id", getCountryById);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountryById);
router.delete("/", deleteAllCountries);

export default router;
