const mongoose = require("mongoose");
const URI =
  "mongodb+srv://tutoring_hub:colman@tutoringhabcluster.ik3yp.mongodb.net/tutoringHab?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection started.");
  } catch (e) {
    console.error(`an error accourd: ${e}`);
  }
};

module.exports = connectDB;
