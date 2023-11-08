import mongoose from "mongoose";
const URL: string = "mongodb://localhost:27017/KidsData";

export const mainconnect = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("Database conected successflly 🤣😂👌");
    });
  } catch (error) {
    console.log("failed to connect to database!");
  }
};

mainconnect();
