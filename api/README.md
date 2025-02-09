# Discord Bot API - Feedback Management

## Overview

This API is designed to support a Discord bot service for managing feedback on potential new members (PNMs) within an organization. It interacts with a PostgreSQL database to store and retrieve feedback from active members. The API provides CRUD functionality to manage PNMs, active members, and feedback entries.

## Database Schema

The database consists of the following tables:

1. **pnm_candidates** - Stores information about potential new members.
2. **active_list** - Stores information about active members providing feedback.
3. **feedbacks_table** - Stores feedback entries linking PNMs and active members.

### Table Structures

#### `pnm_candidates`

| Column       | Type         | Constraints           |
|-------------|-------------|----------------------|
| pnm_id      | SERIAL      | PRIMARY KEY         |
| discord_id  | BIGINT      | UNIQUE              |
| full_name   | VARCHAR(255) | NOT NULL           |

#### `active_list`

| Column       | Type         | Constraints           |
|-------------|-------------|----------------------|
| active_id   | SERIAL      | PRIMARY KEY         |
| discord_id  | BIGINT      | UNIQUE              |
| full_name   | VARCHAR(255) | NOT NULL           |

#### `feedbacks_table`

| Column             | Type         | Constraints                                    |
|-------------------|-------------|----------------------------------------------|
| id               | SERIAL      | PRIMARY KEY                                  |
| pnm_candidate_id | INT         | REFERENCES pnm_candidates(pnm_id) ON DELETE SET NULL |
| assignee_id      | INT         | REFERENCES active_list(active_id) ON DELETE SET NULL |
| severity         | INT         | DEFAULT 0, CHECK (severity BETWEEN -10 AND 10) |
| details          | TEXT        |                                              |
| release_feedback | BOOLEAN     | DEFAULT false                                |
| date            | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP                    |

## API Endpoints

The API exposes the following HTTP endpoints:

### PNM Candidates Endpoints

- **GET /pnms** - Retrieve all PNMs.
- **POST /pnms** - Add a new PNM.
- **GET /pnms/{pnm_id}** - Retrieve details of a specific PNM.

### Active Members Endpoints

- **GET /actives** - Retrieve all active members.
- **POST /actives** - Add a new active member.
- **GET /actives/{active_id}** - Retrieve details of a specific active member.

### Feedback Endpoints

- **GET /feedbacks** - Retrieve all feedback entries.
- **GET /feedbacks?pnm_id={pnm_id}** - Retrieve feedback for a specific PNM.
- **GET /feedbacks?assignee_id={active_id}** - Retrieve feedback posted by a specific active member.
- **POST /feedbacks** - Submit a new feedback entry.
- **PUT /feedbacks/{feedback_id}** - Update an existing feedback entry.

## Implementation Notes

- The API should use appropriate status codes for success and failure cases.
- Authentication and authorization should be implemented to restrict access.
- Input validation should be enforced to prevent invalid data entries.

## Future Enhancements

- Implement pagination for large dataset retrieval.
- Add role-based access control (RBAC) for different types of users.
- Implement WebSocket support for real-time feedback updates.

---
This README provides a structured plan for implementing the API. Let me know if you'd like any refinements!
