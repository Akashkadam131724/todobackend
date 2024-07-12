import express from "express";
import {
  createCountry,
  createMultipleCountries,
  getAllCountry,
  getCountryById,
  updateCountry,
  searchCountry,
  deleteCountryById,
  deleteAllCountries,
  suggestCountryName,
} from "../controllers/country/country.js";

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
