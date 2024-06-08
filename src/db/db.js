import mongoose from "mongoose";

const ConnectDb = async (DB) => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected");
  } catch (err) {
    console.log("error DB,", err.message);
  }
};
export default ConnectDb;
