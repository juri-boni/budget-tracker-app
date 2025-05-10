/* Replace with your SQL commands */
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(id),
    category_id INTEGER REFERENCES categories(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP
)