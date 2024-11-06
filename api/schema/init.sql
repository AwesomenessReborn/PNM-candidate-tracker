-- init.sql
-- Create the pnm_candidates table
CREATE TABLE IF NOT EXISTS pnm_candidates (
    name VARCHAR(255) PRIMARY KEY  -- Unique name of each PNM candidate
);

-- Create the assignees table
CREATE TABLE IF NOT EXISTS active_table_list (
    name VARCHAR(255) PRIMARY KEY  -- Unique name of each assignee
);

-- Create the feedbacks table with references to pnm_candidates and assignees
CREATE TABLE IF NOT EXISTS feedbacks_table (
    id SERIAL PRIMARY KEY,
    pnm_candidate_name VARCHAR(255) NOT NULL,
    active_table_list VARCHAR(255),
    severity INT CHECK (severity BETWEEN -10 AND 10),
    details TEXT,
    release_feedback BOOLEAN DEFAULT false,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pnm_candidate FOREIGN KEY (pnm_candidate_name) REFERENCES pnm_candidates(name) ON DELETE SET NULL,
    CONSTRAINT fk_assignee FOREIGN KEY (active_table_list) REFERENCES active_table_list(name) ON DELETE SET NULL
);
