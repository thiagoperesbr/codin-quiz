import mongoose from "mongoose";
import cuid from "cuid";

const QuestionSchema = new mongoose.Schema(
  {
    questionID: {
      type: String,
      default: () => cuid(),
      unique: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Question", QuestionSchema);
