import Course from "../models/courseModel.js";
import Enroll from "../models/enrollModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const enrollIntoCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.body;

  const studentId = req.user._id;

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError("No course found with this id", 404));
  }

  const isEnrolled = await Enroll.findOne({
    course: courseId,
    student: studentId,
  });

  if (isEnrolled) {
    return next(new AppError("You are already enrolled in this course", 400));
  }

  await Enroll.create({
    student: studentId,
    course: courseId,
  });

  res.status(200).json({
    status: "success",
    message: "Enrolled into course successfully",
  });
});

export const getAllEnrolledCourses = catchAsync(async (req, res, next) => {
  const enrolledCourses = await Enroll.find({
    student: req.user._id,
  }).populate({
    path: "course student",
    select: "-__v",
  });

  res.status(200).json({
    status: "success",
    enrolledCourses,
  });
});
