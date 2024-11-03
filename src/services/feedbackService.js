const { Client } = require('pg');
const Feedback = require('../models/feedback');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const createFeedback = async (data) => {
    const feedback = new Feedback(data.pnm, data.reason, data.author);
    const result = await client.query('INSERT INTO feedback (pnm, reason, author, created_at) VALUES ($1, $2, $3, $4) RETURNING *', 
                                        [feedback.pnm, feedback.reason, feedback.author, feedback.createdAt]);
    return result.rows[0];
};

const getAllFeedback = async () => {
    const result = await client.query('SELECT * FROM feedback');
    return result.rows;
};

module.exports = {
    createFeedback,
    getAllFeedback,
};
