import mongoose from 'mongoose';

const dbConnect = async (): Promise<void> => {
  console.log("connect wait config");

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pdfInfo");

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Call the function to establish the connection
dbConnect();

export default dbConnect;
