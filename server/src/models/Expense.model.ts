import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  CreationOptional,
  Op,
  literal,
  where,
} from "sequelize";
import sequelize from "../config/dbConfig";
import User from "./User.model";
import Category from "./Category.model";

// Define the Expense model class
class Expense extends Model<
  InferAttributes<Expense>,
  InferCreationAttributes<Expense>
> {
  declare id: CreationOptional<number>;
  declare amount: string;
  declare date: Date;
  declare description: CreationOptional<string>;
  declare user_id: ForeignKey<User["id"]>;
  declare category_id: ForeignKey<Category["id"]>;
  declare deletedAt: Date | null;
}

interface ExpenseQueryParams {
  uid?: string;
  catid?: string;
  month?: number;
  year?: number;
  page?: string;
}

// Initialize the Expense model
Expense.init(
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(),
      allowNull: true,
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
    tableName: "expenses", // The name of the table in the database
    paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
  }
);

async function getAllExpenses(params: ExpenseQueryParams): Promise<object> {
  try {
    /**
     *  SELECT id FROM expenses
        WHERE user_id = 4
          AND category_id = 10
          AND EXTRACT(MONTH FROM date) = 3
          AND EXTRACT(YEAR FROM date) = 2025;
     */

    // Variabili per la gestione della paginazione
    let page: string = "1";
    let limit: number = 10;
    let offset: number = 0;
    let totalPages: number = 1;

    // Clausola WHERE costruita dinamicamente in base ai query parameters ricevuti
    const whereClause: any = {};

    if (params) {
      // esempio di query params: http://localhost:5000/v1/expenses?uid=1&catid=2&month=3&year=2025
      const { uid, month, year, catid, page } = params || {};

      if (uid) whereClause.user_id = uid;
      if (catid) whereClause.category_id = catid;

      if (month) {
        // Se ci sono già altre condizioni AND, le manteniamo, altrimenti inizializziamo l'array
        whereClause[Op.and] = whereClause[Op.and] || [];
        whereClause[Op.and].push(
          where(
            literal(`EXTRACT(MONTH FROM "date")`), //literal permette di scrivere raw SQL
            month
          )
        );
      }

      if (year) {
        whereClause[Op.and] = whereClause[Op.and] || [];
        whereClause[Op.and].push(
          where(literal(`EXTRACT(YEAR FROM "date")`), year)
        );
      }

      // PAGINATION
      if (page) {
        // Count total items
        let totalItems = await Expense.count({ where: whereClause });
        // Count the number of pages needed based on the limit variable
        totalPages = Math.ceil(totalItems / limit);
        offset = (parseInt(page) - 1) * limit;
      }
    }
    // Query the database
    const results = await Expense.findAll({
      offset,
      limit,
      attributes: [
        "id",
        "amount",
        "date",
        "description",
        "user_id",
        "category_id",
        [sequelize.col("Category.name"), "category_name"],
      ],
      where: whereClause,
      include: [
        {
          model: Category,
          attributes: [],
        },
      ],
      order: [["date", "DESC"]],
      raw: true, // Restituisce un oggetto appiattito
    });

    // Return the results
    let res: object = {
      success: true,
      results: results,
      pagination: {
        currentPage: parseInt(page),
        totalPages
      }
    };
    return res;

  } catch (error: unknown) {
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: "Error querying the database: TABLE Expenses",
        error: error.message,
      };
      return res;
    }

    return { error };
  }
}

async function getExpenseById(id: number): Promise<object | null> {
  try {
    // Query the database
    const results = await Expense.findByPk(id);
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
        message: `Error querying the Expense with ID: ${id}`,
        error: error.message,
      };

      return res;
    }

    return { error };
  }
}

async function addNewExpense(request: Expense): Promise<object | null> {
  const { amount, date, description, user_id, category_id } = request;

  try {
    const newExpense = await Expense.create({
      amount,
      date,
      description,
      user_id,
      category_id,
    });

    const res: object = {
      success: true,
      results: newExpense,
    };
    // Return the results
    return res;
  } catch (error) {
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: `Error creating the Expense`,
        error: error.message,
      };

      return res;
    }

    return { error };
  }
}

async function deleteExpense(id: number): Promise<object | undefined> {
  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      const res: object = {
        success: false,
        message: `The Expense with ID: ${id} doesn't exists`,
      };
      return res;
    }

    if (expense) {
      await expense.destroy();
    }

    const res: object = {
      success: true,
      results: await Expense.findByPk(id, {
        paranoid: false,
      }),
    };
    return res;
  } catch (error) {
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: `Error deleting the Expense with ID: ${id}`,
        error: error.message,
      };

      return res;
    }

    return { error };
  }
}


// Exporting the function as a named export
export default Expense;
export { getAllExpenses, getExpenseById, addNewExpense, deleteExpense };
