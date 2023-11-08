import mongoose from "mongoose";

const enrollSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    enrollmentStatus: {
      type: String,
      default: "open",
      enum: ["open", "progress", "completed"],
    },
  },

  {
    timestamps: true,
  }
);

const Enroll = mongoose.model("Enroll", enrollSchema);
export default Enroll;
