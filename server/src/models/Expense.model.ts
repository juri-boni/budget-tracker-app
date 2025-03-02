import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import User  from "./User.model";
import Category from "./Category.model";


// Define the Expense model class
class Expense extends Model<InferAttributes<Expense>, InferCreationAttributes<Expense>> {
    declare id: CreationOptional<number>;
    declare amount: number;
    declare date: number;
    declare description: CreationOptional<string>;
    declare user_id: ForeignKey<User['id']>;
    declare category_id: ForeignKey<Category['id']>;
}

// Initialize the Expense model
Expense.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        amount: {
            type: new DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        date: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        category_id: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
      sequelize,
      tableName: 'expenses',  // The name of the table in the database
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

// Exporting the function as a named export
export default Expense;
  