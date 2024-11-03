# PNM-candidate-tracker

A Discord bot and Express server for managing feedback on potential new members (PNMs) of a fraternity.

## Project Structure

```text
project-root/
├── cmd/                        # Main entry point for the bot
│   └── bot/
│       └── main.ts             # Starts the Discord bot
├── src/                        # Source files for your application
│   ├── api/                    # API-related files
│   │   ├── index.ts            # Express server setup
│   │   └── feedback.ts         # API routes for feedback
│   ├── models/                 # Data models
│   │   └── feedback.ts         # Feedback model
│   ├── services/               # Business logic for handling operations
│   │   └── feedbackService.ts  # Service to handle feedback logic
│   └── config/                 # Configuration files
│       └── config.ts           # Environment and config setup
├── package.json                # Node.js project metadata and dependencies
├── .env                        # Environment variables (tokens, DB credentials)
└── README.md                   # Project documentation
```

## TypeScipt compile and run

You can run the compiled JavaScript from the dist directory
