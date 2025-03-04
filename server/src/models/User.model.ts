import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import Category from "./Category.model";
import Expense from "./Expense.model";

// Define the User model class
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare role: string;
    declare deletedAt: Date | null;
}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 'user'
        },
        deletedAt: {
            type: new DataTypes.DATE,
            allowNull: true,
        },
    },
    {
      sequelize,
      tableName: 'users',  // The name of the table in the database
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

User.addHook(
    'beforeDestroy', async (user: User) => {
        try {
            // Soft delete all related budgets when the user is soft-deleted
            // await Budget.update(
            //     { deletedAt: new Date() },  // Set the deletedAt timestamp to trigger the soft delete
            //     {
            //         where: {
            //             category_id: user.id,
            //             deletedAt: null  // Only update budgets that are not already soft-deleted
            //         }
            //     }
            // );
        } catch (error) {
            console.error('Error during beforeDestroy hook for User:', error);
            throw error;  // Propagate the error to ensure the destroy action fails if necessary
        }
        
    },
)

async function getAllUsers(): Promise<User[]> {
    try {
        // Query the database
        const results = await User.findAll({
            include:[
                {
                    model: Category,
                    required: false
                },
                {
                    model: Expense,
                    required: false
                }
            ]
        });
        // Return the results
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Error querying the database: TABLE Users');
    }
}

async function getUserById(id: number): Promise<User | null> {
    try {
        // Query the database
        const results = await User.findByPk(id);
        if(!results) return null;
        // Return the results
        return results;
    } catch (error) {
        console.error(error);
        throw new Error(`Error querying the User ID: ${id}`);
    }
}

// Exporting the function as a named export
export default User;
export { getAllUsers, getUserById };
  