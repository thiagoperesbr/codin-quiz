import Question from "../models/Question.js";
import { shuffleArray } from "../utils/shuffle.js";

let lastFourQuestions = [];

export const getQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find().lean();

    if (lastFourQuestions.length === 0) {
      const shuffled = shuffleArray(allQuestions).slice(0, 4);
      lastFourQuestions = shuffled.map((question) => question._id.toString());
      return res.json(shuffled);
    }

    const previousIds = lastFourQuestions;

    const newPool = allQuestions.filter(
      (question) => !previousIds.includes(question._id.toString())
    );

    const repeatablePool = allQuestions.filter((question) =>
      previousIds.includes(question._id.toString())
    );

    if (newPool.length < 3 || repeatablePool.length < 1) {
      return res.status(400).json({
        error: "Não há perguntas suficientes para garantir diversidade",
      });
    }

    const newQuestions = shuffleArray(newPool).slice(0, 3);

    const repeatedQuestion = shuffleArray(repeatablePool)[0];

    const combined = shuffleArray([...newQuestions, repeatedQuestion]);

    lastFourQuestions = combined.map((question) => question._id.toString());

    res.status(200).json({
      questions: combined,
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar perguntas" + err });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);

    const savedQuestion = newQuestion.save();

    res.status(201).json({
      message: "Pergunta cadastrada com sucesso",
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar pergunta" });
  }
};

export const getAnswer = async (req, res) => {
  const { questionID } = req.params;

  try {
    const question = await Question.findOne({ questionID });

    if (!question) {
      return res.status(404).json({ error: "Pergunta não encontrada" });
    }

    const correctAnswer = question.answer;
    const explanation = question.explanation;

    res.status(200).json({
      question: question.question,
      correct_answer: correctAnswer,
      explanation: explanation,
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar resposta" });
  }
};
