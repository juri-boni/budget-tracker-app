require('dotenv').config(); //va importato all'inizio
import express from 'express';
import api from './routes/api';
import './models/associations';

const app = express();

// Parse any incoming JSON
app.use(express.json());

// Versioning delle APIs
app.use('/v1', api);

export default app;