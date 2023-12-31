const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `connected to Mongode database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`mongo connection error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
