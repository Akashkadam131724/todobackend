import Country from "../../models/country/country.js";

const searchCountry = async (req, res) => {
  try {
    let {
      name,
      description,
      country_code,
      capital,
      page,
      pageSize,
      sortBy,
      orderBy,
    } = req.query;

    // Default values if not provided
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10; // Default page size is 10
    sortBy = sortBy || "name"; // Default sort by name
    orderBy = orderBy === "asc" ? "asc" : "desc"; // Ensure orderBy is 'asc' or 'desc'

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

    const sortOptions = {};
    sortOptions[sortBy] = orderBy === "asc" ? 1 : -1;

    const totalCountries = await Country.countDocuments(query);
    const totalPages = Math.ceil(totalCountries / pageSize);

    const countries = await Country.find(query)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).send({
      countries,
      currentPage: page,
      totalPages,
      totalCountries,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const suggestCountryName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      return res.status(200).send([]);
    }

    const regexName = new RegExp(name, "i"); // case-insensitive regex search

    const countries = await Country.find(
      { name: regexName },
      { _id: 0, name: 1 }
    );

    const countryNames = countries.map((country) => country.name).slice(0, 10);

    res.status(200).send(countryNames);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

export { suggestCountryName, searchCountry };
