import mongoose from "mongoose";

const ConnectDb = async (DB) => {
  try {
    await mongoose.connect(DB);
    console.log("successfully connected");
  } catch (err) {
    console.log(err.message);
    console.log("failed");
  }
};
export default ConnectDb;
