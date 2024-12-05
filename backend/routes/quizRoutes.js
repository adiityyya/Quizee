import express from "express";
import Quiz from "../models/quiz.model.js";
import User from "../models/user.model.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, async (req, res) => {
  try {
    const { questions, duration } = req.body;
    const email = req.user.email;

    const quiz = new Quiz({
      title: req.body.title || "Untitled Quiz",
      questions, // Array of Question IDs (already created questions)
      duration,
      creator: email,
    });

    await quiz.save();

    res.status(201).json({ quizId: quiz._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/start/:id", protectRoute, async (req, res) => {
  try {
    const { id } = req.params; // quizId
    const email = req.user.email; // From JWT payload

    // console.log(email);
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Check if email already accessed
    if (quiz.accessedEmails.includes(email)) {
      return res
        .status(403)
        .json({ message: "This email has already started the quiz" });
    }

    // Calculate expiration time
    const startedAt = new Date();
    const expiresAt = new Date(startedAt.getTime() + quiz.duration * 60000); // Convert minutes to ms

    // Push email to accessedEmails and add submission entry
    quiz.accessedEmails.push(email);
    quiz.submissions.push({ email, startedAt, expiresAt });

    await quiz.save();

    res.status(200).json({
      message: "Quiz started",
      startedAt,
      expiresAt,
      duration: quiz.duration,
      questions: quiz.questions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/submit/:id", protectRoute, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { score } = req.body;
    const email = req.user.email; // Extracted from JWT

    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Find the student's submission
    const submission = quiz.submissions.find((sub) => sub.email === email);
    if (!submission) {
      return res
        .status(400)
        .json({ message: "You have not started this quiz" });
    }

    // Check if the quiz duration has expired
    if (new Date() > submission.expiresAt) {
      return res
        .status(400)
        .json({ message: "Time is up! You cannot submit the quiz anymore" });
    }

    // Prevent duplicate submissions
    if (submission.submittedAt) {
      return res
        .status(400)
        .json({ message: "You have already submitted this quiz" });
    }

    // Update the submission with score and submittedAt time
    submission.score = score;
    submission.submittedAt = new Date();

    await quiz.save();

    res.status(200).json({ message: "Quiz submitted successfully", score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/lists", protectRoute, async (req, res) => {
  try {
    const email = req.user.email;
    const quizzes = await Quiz.find({ creator: email });

    res.status(200).json({ quizzes });
  } catch (error) {
    console.log("Error in lists controller.");
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/result/:id", protectRoute, async (req, res) => {
  //get the quiz with this id and return the lists of submissions.
  console.log("hi it hit.")
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id).populate("submissions");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ submissions: quiz.submissions });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});
export default router;
