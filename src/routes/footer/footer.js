import express from "express";
import { Footer, FooterLevel } from "../../models/navigation/footer/footer.js";
const router = express.Router();

router.post("/", async function (req, res) {
  try {
    const { level_name, sort_order } = req.body;

    // validator function
    const newFooter = await Footer.create({
      level_name,
      sort_order,
    });
    res.status(200).send({
      message: "footer created successfully",
      data: newFooter,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
router.post("/footer-level", async function (req, res) {
  try {
    const { name, url, sort_order, footer } = req.body;

    // validator function
    const newFooterLevel = await FooterLevel.create({
      name,
      url,
      sort_order,
      footer,
    });
    const populatedFooterLevel = await FooterLevel.findById(
      newFooterLevel._id
    ).populate("footer");

    res.status(200).send({
      message: "Footer level created successfully",
      data: populatedFooterLevel,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/", async function (req, res) {
  try {
    const allFooters = await Footer.find();
    res.status(200).send(allFooters);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
router.get("/footer-levels", async function (req, res) {
  try {
    // Fetch all FooterLevel documents and populate the footer field
    const footerLevels = await FooterLevel.find().populate("footer");

    // Send the response
    res.status(200).send(footerLevels);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
