import Course from "../models/courseModel.js";
import Enroll from "../models/enrollModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCourses = catchAsync(async (req, res, next) => {
  // const limit = req.body.limit * 1 || 100;
  // const page = req.body.page * 1 || 1;
  // const search = req.body.search || "";

  // const searchArr = [
  //   {
  //     name: { $regex: search, $options: "i" },
  //   },
  //   {
  //     instructor: { $regex: search, $options: "i" },
  //   },
  //   {
  //     description: { $regex: search, $options: "i" },
  //   },
  //   {
  //     location: { $regex: search, $options: "i" },
  //   },
  // ];

  const courses = await Course.find({
    // $or: [...searchArr],
  });
  // .limit(limit)
  // .skip((page - 1) * limit);

  res.status(200).json({
    status: "success",
    results: courses.length,
    courses,
  });
});

export const getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  res.status(200).json({
    status: "success",
    course,
  });
});

export const likeCourse = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: userId },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    course,
  });
});

export const updateCourseStatus = catchAsync(async (req, res, next) => {
  const { enrollmentId, status } = req.body;
  const studentId = req.user._id;

  const isEnrolled = await Enroll.findOne({
    _id: enrollmentId,
    student: studentId,
  });

  if (!isEnrolled) {
    return next(new AppError("You are not enrolled in this course", 400));
  }

  await Enroll.findOneAndUpdate(isEnrolled._id, {
    enrollmentStatus: status,
  });

  res.status(200).json({
    status: "success",
    message: "Course marked as " + status,
  });
});
