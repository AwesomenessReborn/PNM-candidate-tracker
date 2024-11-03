import { Router } from 'express';
import { createFeedback } from '../services/feedbackService';

const router = Router();

router.post('/', async (req, res) => {
    const { pnm, reason, author } = req.body;

    try {
        await createFeedback(pnm, reason, author);
        res.status(201).json({ message: 'Feedback recorded.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
