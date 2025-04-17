import express from "express";

import {
  getQuestions,
  createQuestion,
  getAnswer,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/questions", getQuestions);
router.post("/create", createQuestion);
router.get("/answer/:questionID", getAnswer);

export default router;
