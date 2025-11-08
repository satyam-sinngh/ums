import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(`Connected to DB!`);
    }
    console.log(`Database already connected`);
    return;
  } catch (error) {
    console.error(`Failed to connect MongoDB`, error);
  }
};
