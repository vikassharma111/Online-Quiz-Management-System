const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    title: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    questions: [
        {
            questionText: String,
            options: [String],
            correctAnswer: Number,
        },
    ],
});
module.exports = mongoose.model('Quiz', quizSchema);
