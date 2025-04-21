import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/dbConfig";
import User from "./User.model";
import Category from "./Category.model";

import { buildBudgetWhereClause } from '../utils/filters';
import { calcExpensesPerCategory } from "../services/ExpenseService";

// Define the Budget model class
class Budget extends Model<
  InferAttributes<Budget>,
  InferCreationAttributes<Budget>
> {
  declare id: CreationOptional<number>;
  declare amount: string;
  declare month: number;
  declare year: number;
  declare user_id: ForeignKey<User["id"]>;
  declare category_id: ForeignKey<Category["id"]>;
  declare deletedAt: Date | null;
}

// Initialize the Budget model
Budget.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: new DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    month: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    year: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    user_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    category_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    deletedAt: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "budgets", // The name of the table in the database
    paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
  }
);

interface BudgetQueryParams {
  month?: string;
  year?: string;
}

async function getAllBudget(params: BudgetQueryParams): Promise<object> {
  try {

    const whereClause = buildBudgetWhereClause(params);
   

    const budgetList = await Budget.findAll({
      attributes: [
        "id",
        "amount",
        "month",
        "year",
        "user_id",
        "category_id",
        [sequelize.col("Category.name"), "category_name"]
      ],
      where: whereClause,
      include: [
        {
          model: Category,
          attributes: [],
        },
      ],
      raw: true, // Restituisce un oggetto appiattito
    });

    
    if(params && budgetList.length){

      const {month, year} = params || {};
      const filters = {
        month: month || null,
        year: year || null,
      }

      // Estraggo e restituisco la somma delle spese totali per la Categoria filtrate per mese ed anno
      const summedAmount= await calcExpensesPerCategory(filters) as any[];
      if(summedAmount != undefined){
        
        // Aggiungo la somma come parametro a ciascun budget
        const budgetsWithTotals = budgetList.map(budget => {
          const sum = summedAmount.find(s => s.category_id === budget.category_id);
          return {
            ...budget,
            category_amount_spent: sum ? sum.total_amount : 0 
          };
        });

        // Return the results
        const res: object = {
          success: true,
          results: budgetsWithTotals,
        };
        return res;
      }
    }
    
    // Return the results
    const res: object = {
      success: true,
      results: budgetList,
    };
    return res;

  } catch (error: unknown) {
    // throw new Error('Error querying the database: TABLE Categories');
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: "Error querying the database: TABLE Budgets",
        error: error.message,
      };

      return res;
    }

    return { error };
  }
}

// ********** DEPRECATA *************
async function getBudgetByMonthYear(
  month: number,
  year: number
): Promise<object> {
  try {
    const budgetList = await Budget.findAll({
      where: {
        month,
        year,
      },
      attributes: [
        "id",
        "amount",
        "month",
        "year",
        "user_id",
        "category_id",
        [sequelize.col("Category.name"), "category_name"],
      ],
      include: [
        {
          model: Category,
          attributes: [],
        },
      ],
      raw: true,
    });

    return {
      success: true,
      results: budgetList,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Error querying the database: TABLE Budgets",
        error: error.message,
      };
    }
    return { error };
  }
}

async function getBudgetById(id: number): Promise<object> {
  try {
    // Query the database
    const results = await Budget.findByPk(id);
    const res: object = {
      success: true,
      results: results ? results : null,
    };
    // Return the results
    return res;
  } catch (error) {
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: `Error querying the Budget ID: ${id}`,
        error: error.message,
      };
      return res;
    }
    return { error };
  }
}

async function addNewBudget(request: Budget): Promise<object> {
  const { amount, month, year, user_id, category_id } = request;

  try {

    // First check if a budget for the same category has been set
    const budgetExists = await Budget.findOne({
      where: {
        'user_id': user_id,
        'category_id': category_id,
        'month': month,
        'year': year
      }
    });

    // If the budget exists throw an error
    if(budgetExists){
      const res: object = {
        success: false,
        message: `Error: a Budget for the Category with ID: ${category_id} has already been set`,
      };
      return res;
    }

    // If the budget doesn't exists create a new one
    const newBudget = await Budget.create({
      amount,
      month,
      year,
      user_id,
      category_id,
    });

    const res: object = {
      success: true,
      results: newBudget,
    };
    // Return the results
    return res;
  } catch (error) {
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: `Error creating the Budget`,
        error: error.message,
      };
      return res;
    }

    return { error };
  }
}
async function deleteBudget(id: number): Promise<object> {
  try {
    const budget = await Budget.findByPk(id);

    if (!budget) {
      const res: object = {
        success: false,
        message: `The Budget with ID: ${id} doesn't exists`,
      };
      return res;
    }

    if (budget) {
      budget.destroy();
    }

    const res: object = {
      success: true,
      results: await Budget.findByPk(id, {
        paranoid: false,
      }),
    };
    return res;
  } catch (error) {
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: `Error deleting the Budget with ID: ${id}`,
        error: error.message,
      };
      return res;
    }
    return { error };
  }
}

// Exporting the function as a named export
export default Budget;
export {
  getAllBudget,
  getBudgetByMonthYear,
  getBudgetById,
  addNewBudget,
  deleteBudget,
};
