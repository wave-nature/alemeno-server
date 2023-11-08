import express from "express";
import {
  getAllCourses,
  getCourse,
  likeCourse,
  updateCourseStatus,
} from "../controllers/courseController.js";
import { protect } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.patch("/like/:id", protect, likeCourse);
router.patch("/update-status", protect, updateCourseStatus);

export default router;
