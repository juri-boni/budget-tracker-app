import express from 'express';
import UsersRouter from './Users.router'
import CategoriesRouter from './Categories.router'

const api = express.Router();
api.use('/users', UsersRouter);
api.use('/categories', CategoriesRouter);

export default api;