import mongoose from "mongoose";
const { Schema } = mongoose;

const TodOSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  task: String,
});
const ToDo = mongoose.model("ToDo", TodOSchema);
export default ToDo;
