import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import Category from "./Category.model";

// Define the User model class
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare role: string;
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
        }
    },
    {
      sequelize,
      tableName: 'users',  // The name of the table in the database
      timestamps: false,   // If you don't have createdAt or updatedAt fields
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

async function getAllUsers(): Promise<User[]> {
    try {
        // Query the database
        const results = await User.findAll({
            include:[
                {
                    model: Category,
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
  