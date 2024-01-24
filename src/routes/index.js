import express from "express";

import authRoutes from "./auth.route.js";
import profileRoutes from "./profile.route.js";

const api = express.Router();

api.use("/auth", authRoutes);
api.use("/profile", profileRoutes);

export default api;
