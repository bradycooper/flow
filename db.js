const mongoose = require('mongoose');
require('dotenv').config();


const MONGODB_URL = process.env.MONGODB_URI;

const MongoDBConnection = async () => {
  // mongoose.set("strictQuery", true);
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Database connected succcessfully");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected succcessfully");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Error in db", error.message);
  });
};

module.exports = {
  MongoDBConnection
};