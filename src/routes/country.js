import express from "express";

import {
  createCountry,
  getAllCountry,
} from "../controllers/country/country.js";

const router = express.Router();

router.post("/", createCountry);
router.get("/", getAllCountry);

export default router;
