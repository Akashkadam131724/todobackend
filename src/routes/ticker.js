import express from "express";
import { getAllTicker, createTicker } from "../controllers/ticker/ticker.js";
const router = express.Router();

router.post("/", createTicker);
router.get("/", getAllTicker);

export default router;
