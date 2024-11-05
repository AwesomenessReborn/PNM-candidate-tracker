import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection setup
const pool = new Pool({
    user: process.env.DB_USER,      // From .env
    host: process.env.DB_HOST,      // From .env
    database: process.env.DB_NAME,  // From .env
    password: process.env.DB_PASSWORD, // From .env
    port: Number(process.env.DB_PORT),
});

app.use(express.json());

// Create users table if it does not exist
const createUsersTable = async () => {
    const query = `

    `;

    try {
        await pool.query(query);
        console.log('Users table created or already exists.');
    } catch (err) {
        console.error('Error creating users table:', err);
    }
};

// Call the function to create the users table
createUsersTable();

// Dummy CRUD endpoint for testing
app.get('/api/dummy', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Connected to the DB!', time: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
