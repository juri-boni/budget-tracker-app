import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import { User } from "./User.model";
import { Category } from "./Category.model";


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
      timestamps: false,   // If you don't have createdAt or updatedAt fields
    }
);

// Setting up the associations
User.hasMany(Expense, {
    foreignKey: 'user_id', // The foreign key in the Expense model
    sourceKey: 'id', // The key in the User model being referenced
});

Expense.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Expense model
    targetKey: 'id', // The key in the User model being referenced
});

// Setting up the associations
Category.hasMany(Expense, {
    foreignKey: 'category_id', // The foreign key in the Expense model
    sourceKey: 'id', // The key in the User model being referenced
});

Expense.belongsTo(Category, {
    foreignKey: 'category_id', // The foreign key in the Expense model
    targetKey: 'id', // The key in the User model being referenced
});

// Exporting the function as a named export
export { Expense };
  