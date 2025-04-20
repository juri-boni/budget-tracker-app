import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  CreationOptional,
  Op
} from "sequelize";
import sequelize from "../config/dbConfig";
import User from "./User.model";
import Budget from "./Budget.model";
import Expense from "./Expense.model";

// Define the Category model class
class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare user_id: ForeignKey<User["id"]>;
  declare deletedAt: Date | null;
}

// Initialize the Category model
Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: User, // Make sure this references the User model
        key: "id",
      },
    },
    deletedAt: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "categories", // The name of the table in the database
    paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
  }
);

Category.addHook("beforeDestroy", async (category: Category) => {
  try {
    // Soft delete all related budgets when the category is soft-deleted
    await Budget.update(
      { deletedAt: new Date() }, // Set the deletedAt timestamp to trigger the soft delete
      {
        where: {
          category_id: category.id,
          deletedAt: null, // Only update budgets that are not already soft-deleted
        },
      }
    );
    // Soft delete all related expenses when the category is soft-deleted
    await Expense.update(
      { deletedAt: new Date() }, // Set the deletedAt timestamp to trigger the soft delete
      {
        where: {
          category_id: category.id,
          deletedAt: null, // Only update expenses that are not already soft-deleted
        },
      }
    );
  } catch (error) {
    console.error("Error during beforeDestroy hook for Category:", error);
    throw error; // Propagate the error to ensure the destroy action fails if necessary
  }
});

async function getAllCategories(): Promise<object> {
  try {
    // Query the database
    const results = await Category.findAll({
      include: [
        {
          model: Budget,
          required: false,
        },
        {
          model: Expense,
          required: false,
        },
      ],
    });

    // Return the results
    const res: object = {
      success: true,
      results: results,
    };
    return res;
  } catch (error: unknown) {
    // throw new Error('Error querying the database: TABLE Categories');
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: "Error querying the database: TABLE Categories",
        error: error.message,
      };

      return res;
    }

    return { error };
  }
}

async function getCategoryById(id: number): Promise<object | null> {
  try {
    // Query the database
    const results = await Category.findByPk(id);
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
        message: `Error querying the Category ID: ${id}`,
        error: error.message,
      };

      return res;
    }

    return { error };
  }
}

async function addNewCategory(request: Category): Promise<object | null> {
  const { name, user_id } = request;

  try {

    // First check if the category exists
    const categoryExists = await Category.findOne({
      where: {
        [Op.and]: [
          { user_id },
          sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            sequelize.fn('LOWER', name)
          )
        ]
      }
    });

    // If the category exists throw an error
    if(categoryExists){
      const res: object = {
        success: false,
        message: `Error: a Category with the same name has already been set`,
      };
      return res;
    }

    // If the category doesn't exists create a new one
    const newCategory = await Category.create({
      name,
      user_id,
    });

    const res: object = {
      success: true,
      results: newCategory,
    };
    // Return the results
    return res;
  } catch (error) {
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: `Error creating the Category`,
        error: error.message,
      };

      return res;
    }

    return { error };
  }
}

async function deleteCategory(id: number): Promise<object | undefined> {
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      const res: object = {
        success: false,
        message: `The Category with ID: ${id} doesn't exists`,
      };
      return res;
    }

    if (category) {
      await category.destroy();
    }

    const res: object = {
      success: true,
      results: await Category.findByPk(id, {
        paranoid: false,
      }),
    };
    return res;
  } catch (error) {
    if (error instanceof Error) {
      const res: object = {
        success: false,
        message: `Error deleting the Category with ID: ${id}`,
        error: error.message,
      };

      return res;
    }

    return { error };
  }
}

// Exporting the function as a named export
export default Category;
export { getAllCategories, getCategoryById, addNewCategory, deleteCategory };
