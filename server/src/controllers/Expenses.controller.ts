// -----------------------------------
//          EXPENSES CONTROLLER
// -----------------------------------
import { Request, Response } from "express"; // Import types for request and response
// Funzioni del Model
import {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  deleteExpense,
} from "../models/Expense.model";

import { getUserById } from "../models/User.model";

import Category from "../models/Category.model";

async function httpGetExpenses(req: Request, res: Response) {
  try {
    const requests = await getAllExpenses(req.query);
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
async function httpGetExpense(req: Request, res: Response) {
  try {
    const requests = await getExpenseById(parseInt(req.params.id));
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
async function httpAddExpense(req: Request, res: Response): Promise<any> {
  const request = req.body;

  if (
    !request.amount ||
    !request.date ||
    !request.description ||
    !request.user_id ||
    !request.category_id
  ) {
    // console.log(request.amount);
    // console.log(request.date);
    // console.log(request.description);
    // console.log(request.user_id);
    // console.log(request.category_id);
    return res.status(400).json({
      error: "Missing properties",
    });
  }

  try {
    //Find the User
    const user = await getUserById(req.body.user_id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    //Find the Category
    const category = await Category.findByPk(req.body.category_id);
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    const newBudget = await addNewExpense(request);
    return res.status(201).json(newBudget);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create Budget" });
  }
}
async function httpDeleteExpense(req: Request, res: Response): Promise<any> {
  const expenseId = parseInt(req.params.id);

  if (!getExpenseById(expenseId)) {
    return res.status(404).json({
      error: "Expense not found",
    });
  }

  try {
    const deletedExpense = await deleteExpense(expenseId);
    return res.status(200).json(deletedExpense);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete Expense" });
  }
}

export { httpGetExpenses, httpGetExpense, httpAddExpense, httpDeleteExpense };
