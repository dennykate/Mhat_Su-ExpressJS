import express from "express";

import authRoutes from "./auth.route.js";
import profileRoutes from "./profile.route.js";
import noteRoutes from "./note.route.js";
import themeRoutes from "./theme.route.js";
import noteListRoutes from "./noteList.route.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const api = express.Router();

api.use("/auth", authRoutes);
api.use("/profile", authMiddleware, profileRoutes);
api.use("/notes", authMiddleware, noteRoutes);
api.use("/themes", authMiddleware, themeRoutes);
api.use("/note-lists", authMiddleware, noteListRoutes);

export default api;
