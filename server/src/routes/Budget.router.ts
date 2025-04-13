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

BudgetRouter.get("/", httpGetBudgetList);
BudgetRouter.get("/by-date", httpGetBudgetByMonthYear);
BudgetRouter.get("/:id", httpGetBudget);

BudgetRouter.post("/", httpAddBudget);
BudgetRouter.delete("/:id", httpDeleteBudget);

export default BudgetRouter;
