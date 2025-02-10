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
  port: Number(process.env.DB_PORT) || 5432,  // This should be 5432
});

app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check database connectivity
    await pool.query('SELECT 1');

    // If successful, return healthy status
    res.status(200).json({
      status: 'healthy',
      database: 'connected',
      uptime: process.uptime() + 's',
    });
  } catch (error) {

    if (error instanceof Error) {
      // If error is an instance of Error, safely access its message
      res.status(500).json({
        status: 'unhealthy',
        database: 'disconnected',
        error: error.message,
      });
    } else {
      // Handle unexpected error types
      res.status(500).json({
        status: 'unhealthy',
        database: 'disconnected',
        error: 'An unknown error occurred.',
      });
    }

  }
});

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

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await pool.end();
  process.exit();
});

