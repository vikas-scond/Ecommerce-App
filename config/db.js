import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect Mongodb");
  } catch (err) {
    console.log(`mongodb error is ${err}`);
  }
};
export default connectDb;
