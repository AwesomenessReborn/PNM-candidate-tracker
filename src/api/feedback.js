const express = require('express');
const router = express.Router();
const feedbackService = require('../services/feedbackService');

// Create new feedback
router.post('/', async (req, res) => {
    try {
        const feedback = await feedbackService.createFeedback(req.body);
        res.status(201).json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all feedback
router.get('/', async (req, res) => {
    try {
        const feedbacks = await feedbackService.getAllFeedback();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
