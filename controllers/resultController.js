const Result = require('../models/Result');

exports.getResults = async (req, res) => {
    try {
       
        const results = await Result.find({ userId: req.user.id }).populate('quizId', 'title');

       
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No results found for this user.' });
        }

       
        res.status(200).json(results);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
};
