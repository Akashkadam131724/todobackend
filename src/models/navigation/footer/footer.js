import mongoose from "mongoose";

const { model, Schema, Types } = mongoose;

// Define Footer schema and model
const FooterSchema = new Schema({
  level_name: {
    type: String,
    required: true,
  },
  sort_order: {
    type: Number,
    required: true,
  },
});

const Footer = model("Footer", FooterSchema);

// Define FooterLevel schema and model with reference to Footer
const FooterLevelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  sort_order: {
    type: Number,
    required: true,
  },
  footer: {
    type: Types.ObjectId,
    ref: "Footer",
    required: true,
  },
});

const FooterLevel = model("FooterLevel", FooterLevelSchema);

export { Footer, FooterLevel };
