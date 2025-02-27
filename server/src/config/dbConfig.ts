import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from the .env file
dotenv.config();

// Eenvironment variables (to prevent undefined errors)
// Assert the type string because TypeScript assumes the value might be undefined (because environment variables can be missing or not set).
const DB_DATABASE: string = process.env.DB_DATABASE as string;
const DB_USER: string = process.env.DB_USER as string;
const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
const DB_HOST: string = process.env.DB_HOST as string;
const DB_PORT: string = process.env.DB_PORT as string;

// Create a new Sequelize insatnce and connect to PostgreSQL
const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,                  // Host address
    port: parseInt(DB_PORT, 10),    // DB Port
    dialect: 'postgres',            // DB Type (PostgreSQL)
    logging: false,                 // Disable query log
  }
);

export default sequelize;