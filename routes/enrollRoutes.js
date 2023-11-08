import express from "express";
import {
  enrollIntoCourse,
  getAllEnrolledCourses,
} from "../controllers/enrollController.js";
import { protect } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/", protect, enrollIntoCourse);
router.get("/mine", protect, getAllEnrolledCourses);

export default router;
