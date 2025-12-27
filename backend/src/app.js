import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import teamRoutes from "./routes/team.routes.js";
import { requireAuth, restrictTo } from "./middleware/auth.middleware.js";

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

// 🔐 Test protected route
app.get("/protected", requireAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// 🔐 Admin-only example
app.get(
  "/admin",
  requireAuth,
  restrictTo("ADMIN"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

app.use("/teams", teamRoutes);


// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

export default app;
