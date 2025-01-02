const Quiz = require('../models/Quiz');
const Result = require('../models/Result');

exports.createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getQuizzes = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const quizzes = await Quiz.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Quiz.countDocuments();
        res.status(200).json({ quizzes, total, page });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.attemptQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                const difficulty = question.difficulty || 'Easy';
                score += difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 2 : 3;
            }
        });

       
        const result = new Result({
            userId: req.user.id,
            quizId,
            score,
        });

        await result.save();

        
        res.status(200).json({ score, message: 'Quiz attempted successfully', result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

