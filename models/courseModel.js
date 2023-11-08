import mongoose from "mongoose";

// Define the course schema
const courseSchema = new mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  enrollmentStatus: String,
  thumbnail: String,
  duration: String,
  schedule: String,
  location: String,
  prerequisites: [String],
  syllabus: [
    {
      week: Number,
      topic: String,
      content: String,
    },
  ],
  students: [
    {
      name: String,
      email: String,
    },
  ],
});

// Create a Course model using the schema
const Course = mongoose.model("Course", courseSchema);

export default Course;
