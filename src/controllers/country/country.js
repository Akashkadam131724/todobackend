import Country from "../../models/country/country.js";

const createCountry = async (req, res) => {
  try {
    const { name, description, country_code, capital } = req.body;
    const newCountry = {
      name,
      description,
      country_code,
      capital,
    };
    // const country = await Country.create(newCountry);
    const country = await Country.insertMany(newCountry);

    res.status(200).send(country);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});
      res.status(400).send({
        errors: validationErrors,
      });
    } else if (error.code === 11000) {
      // Handle unique constraint error
      const duplicateField = Object.keys(error.keyValue)[0];
      const validationErrors = {};
      validationErrors[duplicateField] = `${duplicateField} must be unique.`;
      res.status(400).send({
        errors: validationErrors,
      });
    } else {
      res.status(400).send({
        error: error.message,
      });
    }
  }
};

const createMultipleCountries = async (req, res) => {
  try {
    const countriesData = req.body; // Expecting an array of countries

    // Validate if the request body is an array
    if (!Array.isArray(countriesData)) {
      return res.status(400).send({
        error: "Invalid data format. Expected an array of countries.",
      });
    }

    // Insert all countries using insertMany
    const countries = await Country.insertMany(countriesData);

    res.status(200).send(countries);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});
      res.status(400).send({
        errors: validationErrors,
      });
    } else if (error.code === 11000) {
      // Handle unique constraint error
      const duplicateField = Object.keys(error.keyValue)[0];
      const validationErrors = {};
      validationErrors[duplicateField] = `${duplicateField} must be unique.`;
      res.status(400).send({
        errors: validationErrors,
      });
    } else {
      res.status(400).send({
        error: error.message,
      });
    }
  }
};

const getAllCountry = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).send(countries);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findById(id);

    if (!country) {
      return res.status(404).send({
        error: "Country not found",
      });
    }

    res.status(200).send(country);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, country_code, capital } = req.body;
    const updatedCountry = {
      name,
      description,
      country_code,
      capital,
    };

    const country = await Country.findByIdAndUpdate(id, updatedCountry, {
      new: true,
      runValidators: true,
    });

    if (!country) {
      return res.status(404).send({
        error: "Country not found",
      });
    }

    res.status(200).send(country);
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});
      res.status(400).send({
        errors: validationErrors,
      });
    } else if (error.code === 11000) {
      // Handle unique constraint error
      const duplicateField = Object.keys(error.keyValue)[0];
      const validationErrors = {};
      validationErrors[duplicateField] = `${duplicateField} must be unique.`;
      res.status(400).send({
        errors: validationErrors,
      });
    } else {
      res.status(400).send({
        error: error.message,
      });
    }
  }
};

const searchCountry = async (req, res) => {
  try {
    const { name, description, country_code, capital } = req.query;
    const query = {};

    if (name) {
      query.name = new RegExp(name, "i"); // case-insensitive regex search
    }
    if (description) {
      query.description = new RegExp(description, "i");
    }
    if (country_code) {
      query.country_code = new RegExp(country_code, "i");
    }
    if (capital) {
      query.capital = new RegExp(capital, "i");
    }

    const countries = await Country.find(query);
    res.status(200).send(countries);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const deleteCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByIdAndDelete(id);

    if (!country) {
      return res.status(404).send({
        error: "Country not found",
      });
    }

    res.status(200).send({
      message: "Country deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const deleteAllCountries = async (req, res) => {
  try {
    await Country.deleteMany();
    res.status(200).send({
      message: "All countries deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

export {
  createCountry,
  getAllCountry,
  getCountryById,
  updateCountry,
  searchCountry,
  deleteCountryById,
  deleteAllCountries,
  createMultipleCountries,
};
