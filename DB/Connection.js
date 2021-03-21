const mongoose = require("mongoose");
const URI =
  "mongodb+srv://tutoring_hub:colman@tutoringhabcluster.ik3yp.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("db connected");
};

module.exports = connectDB;
