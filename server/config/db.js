const mongoose = require("mongoose");

const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URL);

  console.log(`MongoDB is connected`);
};

module.exports = connectDB;
