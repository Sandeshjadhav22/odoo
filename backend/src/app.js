import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import teamRoutes from "./routes/team.routes.js";
import userRoutes from "./routes/user.routes.js";
import { requireAuth, restrictTo } from "./middleware/auth.middleware.js";
import equipmentCategoryRoutes from "./routes/equipmentCategory.routes.js";
import equipmentRoutes from "./routes/equipment.routes.js";
import dotenv from "dotenv";
import maintenanceRequestRoutes from "./routes/maintenanceRequest.routes.js";
dotenv.config();
import workCenterRoutes from "./routes/workCenter.routes.js"
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// routes
app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
app.use("/users", userRoutes);
app.use("/api/categories", equipmentCategoryRoutes);
app.use("/api/equipments", equipmentRoutes);
app.use("/maintenance-requests", maintenanceRequestRoutes);

// 🔐 Test protected route
app.get("/protected", requireAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// 🔐 Admin-only example
app.get("/admin", requireAuth, restrictTo("ADMIN"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

app.use("/teams", teamRoutes);
app.use("/api/work-centers", workCenterRoutes);


// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

export default app;
