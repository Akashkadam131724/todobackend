import Country from "../../models/country/country.js";

const createCountry = async (req, res) => {
  try {
    const { name, description, county_code, capital } = req.body;
    const newCountry = {
      name,
      description,
      county_code,
      capital,
    };
    const country = await Country.create(newCountry);

    res.status(200).send(country);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const getAllCountry = async (req, res) => {
  try {
    const country = await Country.find();

    res.status(200).send(country);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

export { createCountry, getAllCountry };
