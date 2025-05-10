import express from 'express';
const ExpensesRouter = express.Router();

// Metodi dei Controller
import {
    httpGetExpenses,
    httpGetExpense,
    httpAddExpense,
    httpDeleteExpense
} from '../controllers/Expenses.controller';

ExpensesRouter.get('/', httpGetExpenses);
ExpensesRouter.get('/:id', httpGetExpense);

ExpensesRouter.post('/', httpAddExpense);
ExpensesRouter.delete('/:id', httpDeleteExpense);


export default ExpensesRouter;