/* Replace with your SQL commands */
CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL, 
    category_id INTEGER REFERENCES categories(id) NOT NULL
)