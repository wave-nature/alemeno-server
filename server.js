import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from "fs";
import cookieParser from "cookie-parser";
// import { connectDB } from "./database/conn";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrolledRoutes from "./routes/enrollRoutes.js";
import { connectDB } from "./database/conn.js";
import Course from "./models/courseModel.js";

dotenv.config();

const app = express();

connectDB();

/** Middlewares */
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://alemeno-client.vercel.app"],
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.disable("x-powered-by"); //less hacker know about our stack

app.use("/api/health", (req, res) =>
  res.json({ message: "Server is up 🚀 and running." })
);

app.use("/api/dump", async (req, res) => {
  const data = fs.readFileSync(`${process.cwd()}/data.json`, "utf8");

  const jsonData = JSON.parse(data, null, 2);

  await Course.deleteMany({});

  await Course.insertMany(jsonData);

  res.json({ message: "dumped ✅" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrolledRoutes);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} ✅`));
