import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";

import { pool } from "./db";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleware/errorHandler";


dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests",
  },
});

app.use("/auth", loginLimiter);

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.use("/products", productRoutes);

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);