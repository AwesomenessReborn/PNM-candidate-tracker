import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection setup
const pool = new Pool({
    user: process.env.DB_USER,      // This should be 'postgresql'
    host: process.env.DB_HOST,      // This should be 'localhost'
    database: process.env.DB_NAME,  // This should be 'feedbackDB'
    password: process.env.DB_PASSWORD, // This should be 'example'
    port: Number(process.env.DB_PORT),  // This should be 5432
});

app.use(express.json());

// Create users table if it does not exist
const createUsersTable = async () => {
    const filePath = path.join(__dirname, '../schema/init.sql');        // initialization sql query
    const sql = fs.readFileSync(filePath, 'utf-8');

    try {
        await pool.query(sql);
        console.log('Users table created or already exists.');
    } catch (err) {
        console.error('-----------\nError creating users table:\n', err);
    }
};

// Call the function to create the users table
createUsersTable();

// Dummy CRUD endpoint for testing
app.get('/test', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.status(200).json({ message: 'Connected to the DB!', time: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

