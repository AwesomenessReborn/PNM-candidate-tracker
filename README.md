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

## DB Schema

Currently, the goal is to set the DB run on the following schema:

1. ID
2. PNM Candidate Name (full name) required (select from list of possible PNMs)
3. Assignee (who reported, can be NULL for anonymity) (also should be from a list of possible Actives)
4. Severity (ranging from -10 to +10)
5. Details (text entry with details regarding feedback)
6. Release feedback? (weather not to release to the public -- boolean value)
7. Date (auto populated -- reported date)
