import Ticker from "../../models/ticker/ticker.js";

const createTicker = async (req, res) => {
  try {
    const { description, target_url } = req.body;
    const newTicker = await Ticker.create({
      description,
      target_url,
    });
    res.status(200).send({ newTicker });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};
const getAllTicker = async (req, res) => {
  try {
    const allTickers = await Ticker.find();
    res.status(200).send(allTickers);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};

export { getAllTicker, createTicker };
