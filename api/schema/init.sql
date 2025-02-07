-- init.sql
-- Create the pnm_candidates table
CREATE TABLE IF NOT EXISTS pnm_candidate_table (
    pnm_id SERIAL PRIMARY KEY,          -- use unique ID for PNMs
    discord_id BIGINT UNIQUE,                -- unique discord ID for each user. 
    full_name VARCHAR(255) PRIMARY KEY       -- name of the PNM
);

-- Create the assignees table
CREATE TABLE IF NOT EXISTS active_list (
    active_id SERIAL PRIMARY KEY,       -- use unique ID for each active
    discord_id BIGINT UNIQUE,           -- use discord ID for tie with discord acc
    name VARCHAR(255) PRIMARY KEY       -- name of active brother. 
);

-- Create the feedbacks table with references to pnm_candidates and assignees
CREATE TABLE IF NOT EXISTS feedbacks_table (
    id SERIAL PRIMARY KEY,
    pnm_candidate_id INT NOT NULL,       -- References pnm_candidates.user_id
    assignee_id INT,                     -- References active_table_list.user_id
    severity INT DEFAULT 0 CHECK (severity BETWEEN -10 AND 10),
    details TEXT,
    release_feedback BOOLEAN DEFAULT false,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pnm_candidate FOREIGN KEY (pnm_candidate_id) REFERENCES pnm_candidates(user_id) ON DELETE SET NULL,
    CONSTRAINT fk_assignee FOREIGN KEY (assignee_id) REFERENCES active_table_list(user_id) ON DELETE SET NULL
);

