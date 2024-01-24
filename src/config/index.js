import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/mhat-su",
  PORT: process.env.PORT || "5000",
  API_PREFIX: "/api",
  secret_key: process.env.SECRET || "Secret for jsonwebtoken",
  expiresIn: 60 * 60,
  sessionKey: `${Math.floor(Math.random() * 10000000)}`,
};
