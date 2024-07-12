import mongoose from "mongoose";
const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: {
    type: String,
    required: [true, "Country name is required"],
    trim: true,
    minlength: [2, "Country name must be at least 2 characters long"],
    maxlength: [100, "Country name must be at most 100 characters long"],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description must be at most 500 characters long"],
  },
  capital: {
    type: String,
    required: [true, "Capital city is required"],
    trim: true,
    minlength: [2, "Capital city must be at least 2 characters long"],
    maxlength: [100, "Capital city must be at most 100 characters long"],
  },
  country_code: {
    type: String,
    required: [true, "Country code is required"],
    trim: true,
    uppercase: true,
    minlength: [2, "Country code must be at least 2 characters long"],
    maxlength: [3, "Country code must be at most 3 characters long"],
    match: [/^[A-Z]{2,3}$/, "Country code must be 2 or 3 uppercase letters"],
  },
  population: {
    type: Number,
    min: [0, "Population must be a positive number"],
    validate: {
      validator: Number.isInteger,
      message: "Population must be an integer",
    },
  },
  area: {
    type: Number,
    min: [0, "Area must be a positive number"],
    validate: {
      validator: Number.isInteger,
      message: "Area must be an integer",
    },
  },
  currency: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[A-Z]{3}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid currency code. Currency code must be 3 uppercase letters.`,
    },
  },
});

const Country = mongoose.model("Country", CountrySchema);

export default Country;
