import { Feedback } from '../models/feedbackStruct';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const createFeedback = async (pnm: string, reason: string, author: string): Promise<void> => {
    const feedback: Feedback = {
        pnm,
        reason,
        author,
        createdAt: new Date()
    };

    const query = 'INSERT INTO feedback(pnm, reason, author, created_at) VALUES($1, $2, $3, $4)';
    await pool.query(query, [feedback.pnm, feedback.reason, feedback.author, feedback.createdAt]);
};
