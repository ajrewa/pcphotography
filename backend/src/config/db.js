const mongoose = require("mongoose");
const env = require("./env");

mongoose.set("strictQuery", true);

async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log(`[mongo] connected -> ${mongoose.connection.name}`);
  });
  mongoose.connection.on("error", (err) => {
    console.error(`[mongo] connection error: ${err.message}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("[mongo] disconnected");
  });

  await mongoose.connect(env.MONGO_URI, {
    serverSelectionTimeoutMS: 8000,
  });

  return mongoose.connection;
}

async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
