import express from 'express';
import UsersRouter from './Users.router'
import CategoriesRouter from './Categories.router'
import BudgetRouter from './Budget.router'

const api = express.Router();
api.use('/users', UsersRouter);
api.use('/categories', CategoriesRouter);
api.use('/budget', BudgetRouter);

export default api;