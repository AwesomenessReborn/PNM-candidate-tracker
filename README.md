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

## DB Controls

### Overview

This section provides instructions for setting up and running the API of the application, which uses Express.js and PostgreSQL.

### Prerequisites

* Docker and Docker Compose installed
* `node_modules` appropriately setup. 

### Steps to Run the API

1. Setting Up Docker with Docker Compose
Open your terminal and navigate to the `/api` directory where your docker-compose.yml file is located.

```bash
cd api
```

Start the PostgreSQL container using Docker Compose:

```bash
docker-compose up -d
```

* This command will start the PostgreSQL database defined in your docker-compose.yml. It runs in detached mode (-d), allowing you to continue using your terminal.

* Running npm to Install Dependencies and Start the Server
After starting the Docker container, ensure you have all necessary Node.js dependencies installed. Run the following command:

```bash
npm install
```

Once the dependencies are installed, start the Express server with:

```bash
npm run dev
```

This command will start the server in development mode using nodemon, which automatically restarts the server when file changes are detected.

### Editing and Viewing the Database from the Terminal

To access and interact with your PostgreSQL database from the terminal open a new terminal window and execute the following command to access the PostgreSQL container:

```bash
docker exec -it api-db-1 psql -U postgres -d feedbackDB
```

Replace API-db-1 with the actual name of your running PostgreSQL container if it differs.

Query data from the users table:

```sql
SELECT * FROM users;
```

Exit the PostgreSQL shell:

```sql
\q
```
