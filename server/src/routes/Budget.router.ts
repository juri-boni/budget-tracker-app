import express from "express";
const BudgetRouter = express.Router();

// Metodi dei Controller
import {
  httpGetBudgetList,
  httpGetBudgetByMonthYear,
  httpGetBudget,
  httpAddBudget,
  httpDeleteBudget,
} from "../controllers/Budget.controller";

/**
 * @swagger
 * tags:
 *   name: Budget
 *   description: The Budget API allows you to manage budget information. It provides endpoints for creating, retrieving, updating and deleting budget information.
 */

/**
 * @swagger
 * /budget:
 *   get:
 *     tags: [Budget]
 *     summary: Retrieve a list of budgets
 *     responses:
 *       200:
 *         description: A list of budgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier for the budget
 *                   name:
 *                     type: string
 *                     description: The name of the budget
 *                   amount:
 *                     type: number
 *                     format: float
 *                     description: The total amount allocated in the budget
 *                   user_id:
 *                     type: integer
 *                     description: The ID of the user associated with the budget
 *       500:
 *         description: Server error
 */
BudgetRouter.get("/", httpGetBudgetList);

/**
 * @swagger
 * /budget/{id}:
 *   get:
 *     tags: [Budget]
 *     summary: Retrieve a specific budget by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the budget
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A single budget object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 amount:
 *                   type: number
 *                   format: float
 *                 user_id:
 *                   type: integer
 *       404:
 *         description: Budget not found
 *       500:
 *         description: Server error
 */
BudgetRouter.get("/:id", httpGetBudget);

BudgetRouter.get("/by-date", httpGetBudgetByMonthYear);

/**
 * @swagger
 * /budget:
 *   post:
 *     tags: [Budget]
 *     summary: Create a new budget
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - user_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the budget
 *                 example: "Marketing Budget"
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The total amount for the budget
 *                 example: 5000.00
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who owns the budget
 *                 example: 1
 *     responses:
 *       201:
 *         description: Budget created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
BudgetRouter.post("/", httpAddBudget);

/**
 * @swagger
 * /budget/{id}:
 *   delete:
 *     tags: [Budget]
 *     summary: Delete a budget by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the budget to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Budget successfully deleted
 *       404:
 *         description: Budget not found
 *       500:
 *         description: Server error
 */
BudgetRouter.delete("/:id", httpDeleteBudget);

export default BudgetRouter;
