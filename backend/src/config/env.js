const dotenv = require("dotenv");
dotenv.config();

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  MONGO_URI: required("MONGO_URI", "mongodb://127.0.0.1:27017/pc_photo"),
  JWT_SECRET: required("JWT_SECRET", "dev-only-change-me"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  ADMIN_URL: process.env.ADMIN_URL || "http://localhost:3001",
  UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
  MAX_UPLOAD_MB: parseInt(process.env.MAX_UPLOAD_MB || "8", 10),
  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL || "admin@theweddingfilmer.com",
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD || "ChangeMe@123",
};

module.exports = env;
