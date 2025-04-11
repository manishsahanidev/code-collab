import express, { Application, NextFunction, Request, Response } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import snippetRoutes from "./routes/snippets.routes";

const app: Application = express();

dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
//app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/snippet", snippetRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on url http://localhost:${PORT}`);
});
