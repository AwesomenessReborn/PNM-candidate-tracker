BEGIN;

-- Step 1: Log the status change
INSERT INTO StatusChangeLog (user_id, old_status, new_status)
VALUES (123, 'Rushee', 'PNM');

-- Step 2: Move the user to the PNMs table
DELETE FROM Rushees WHERE user_id = 123;
INSERT INTO PNMs (user_id) VALUES (123);

COMMIT;
