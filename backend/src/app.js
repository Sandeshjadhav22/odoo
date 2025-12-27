import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

export default app;
