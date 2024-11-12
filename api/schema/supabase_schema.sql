


CREATE TABLE IF NOT EXISTS general_user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,

    -- PII
    email VARCHAR(70) UNIQUE, 
    first_name VARCHAR(70),
    last_name VARCHAR(70),

    -- together will make up the exact time they started school, to calculate which year. 
    university_join_season ENUM('FALL', 'SPRING'), 
    university_join_year INT CHECK (university_join_year >= 2000 AND university_join_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
);

CREATE TABLE IF NOT EXISTS PNMs (
    pnm_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,  -- Ensure that a user can only be a PNM once
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE  -- Cascade delete if the user is removed
);

CREATE TABLE IF NOT EXISTS Brothers (
    brother_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,  -- A user can only be a brother once
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Rushees (
    rushee_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,  -- A user can only be a rushee once
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);





-- user status change audit records
CREATE TABLE StatusChangeLog (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    old_status VARCHAR(10),  -- For example, 'Rushee'
    new_status VARCHAR(10),  -- For example, 'PNM'
    change_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
