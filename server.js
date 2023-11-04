import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import { connectDB } from "./database/conn";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// connectDB();

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.disable("x-powered-by"); //less hacker know about our stack

app.use("/health", (req, res) =>
  res.json({ message: "Server is up 🚀 and running." })
);

// Routes
app.use("/api/auth", authRoutes);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const PORT = process.env.PORT || 7400;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} ✅`));
