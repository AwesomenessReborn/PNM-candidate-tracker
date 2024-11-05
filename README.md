# PNM-candidate-tracker

This project is designed to manage feedback for Potential New Members (PNMs) of a fraternity via discord feedback channels. It consists of two primary components:


## TODO

1. work on the POSTGRESS.
2. build a lot ...

## Project Structure

* `api/**` Contains the *Express.js* API server that handles CRUD operations and connects to the PostgreSQL database.
* `bot/**` points to *Discord.js* application facilitating the discord bots' functionality. Sends feedback information to the API. 

```text
pnm-candidate-tracker/
├── bot/
│   ├── src/                    # Discord bot entry point. 
│   │   └── bot.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── api/
│   ├── src/                    # CRUD operations api entry point. 
│   │   └── api.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                   # Project documentation
```

## Development process

Both entry points are to run separately...
TODO ... finish this section

## DB Schema

Currently, the goal is to set the DB run on the following schema:

1. ID
2. PNM Candidate Name (full name) required (select from list of possible PNMs)
3. Assignee (who reported, can be NULL for anonymity) (also should be from a list of possible Actives)
4. Severity (ranging from -10 to +10)
5. Details (text entry with details regarding feedback)
6. Release feedback? (weather not to release to the public -- boolean value)
7. Date (auto populated -- reported date)
