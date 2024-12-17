import express from "express";
import { createImage, getAllImages } from "../../controllers/image/image.js";
const router = express.Router();

router.post("/", createImage);
router.get("/", getAllImages);

export default router;
