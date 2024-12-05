import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        creator : {
          type: String,
        },
        questions: [{
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: Number, required: true },
        }],

        // questions: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Question',
        //         required: true,
        //     }
        // ],
        accessedEmails: [{ type: String }],
        duration: { type: Number, required: true },

        submissions: [
            {
              email: { type: String, required: true }, // Email of the user submitting
              startedAt: { type: Date }, // Time when the user started the quiz
              expiresAt: {type: Date},
              submittedAt: { type: Date }, // Time of quiz submission
              score: { type: Number, default: 0 }, 
            },
          ],
    }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;