const express = require('express');
const { createQuiz, getQuizzes, attemptQuiz } = require('../controllers/quizController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createQuiz);
router.get('/', getQuizzes);
router.post('/attempt', authMiddleware, attemptQuiz);

module.exports = router;
