import mongoose from "mongoose";

const { model, Schema, Types } = mongoose;

// Define Footer schema and model
const ImageSchema = new Schema({
  image_url: {
    type: String,
    required: true,
  },
});

const Image = model("Image", ImageSchema);

export default Image;
