import express from "express";
import {
  getAllCourses,
  getCourse,
  updateCourseStatus,
} from "../controllers/courseController.js";
import { protect } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/", getAllCourses);
router.get("/:id", getCourse);
router.patch("/update-status", protect, updateCourseStatus);

export default router;
