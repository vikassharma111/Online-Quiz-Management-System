const express = require('express');
const { getResults } = require('../controllers/resultController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/', authMiddleware, getResults);

module.exports = router;
