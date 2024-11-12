


-- NOTE remember to add phone number for 2FA for signin in auth.users table

-- general_user table ... 1 to 1 relationship with auth.users. 
-- NOTE upon auth.users creation, create a general_user to hold user metadata. 
CREATE TABLE IF NOT EXISTS general_user (
    general_user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE, 
    username VARCHAR(50) NOT NULL UNIQUE, 

    -- PII
    email VARCHAR(70) UNIQUE, 
    first_name VARCHAR(70),
    last_name VARCHAR(70),

    -- together will make up the exact time they started school, to calculate which year. 
    university_join_season ENUM('FALL', 'SPRING'), 
    university_join_year INT CHECK (university_join_year >= 2000 AND university_join_year <= EXTRACT(YEAR FROM CURRENT_DATE)),

    -- Contact information (optional fields)
    portfolio_url VARCHAR(255), 
    linkedIn_url VARCHAR(255), 
    github_url VARCHAR(255), 
);

CREATE TABLE IF NOT EXISTS PNMs (
    pnm_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,  -- Ensure that a user can only be a PNM once
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE  -- Cascade delete if the user is removed
);

-- ! brothers should also hold big/little information. 
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

-- * automate general_user creation upon user sign in. 
CREATE OR REPLACE FUNCTION create_general_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO general_user (user_id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_signup
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION create_general_user();
-- * end macro






-- user status change audit records 
-- when candidate transitions from rushee to pnm, or pnm to active. 
CREATE TABLE StatusChangeLog (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    old_status VARCHAR(10),  -- For example, 'Rushee'
    new_status VARCHAR(10),  -- For example, 'PNM'
    change_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- -- creates a direct link from general_user (private information accessible to respective user)
-- -- RLS active. 
-- CREATE TABLE IF NOT EXISTS general_user (
--     general_user_id SERIAL PRIMARY KEY,
--     user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,  -- Links to Supabase auth.users table
--     username VARCHAR(50) NOT NULL UNIQUE,
--     -- Other fields specific to the user
--     first_name VARCHAR(70),
--     last_name VARCHAR(70),
--     email VARCHAR(70) UNIQUE,
--     university_join_season ENUM('FALL', 'SPRING'),
--     university_join_year INT CHECK (university_join_year >= 2000 AND university_join_year <= EXTRACT(YEAR FROM CURRENT_DATE))
-- );