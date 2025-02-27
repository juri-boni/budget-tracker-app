import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import { User } from "./User.model";
import { Category } from "./Category.model";


// Define the Budget model class
class Budget extends Model<InferAttributes<Budget>, InferCreationAttributes<Budget>> {
    declare id: CreationOptional<number>;
    declare amount: number;
    declare month: number;
    declare year: number;
    declare user_id: ForeignKey<User['id']>;
    declare category_id: ForeignKey<Category['id']>;
}

// Initialize the Budget model
Budget.init(
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
        month: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: new DataTypes.INTEGER,
            allowNull: false,
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
      tableName: 'budgets',  // The name of the table in the database
      timestamps: false,   // If you don't have createdAt or updatedAt fields
    }
);

// Setting up the associations
User.hasMany(Budget, {
    foreignKey: 'user_id', // The foreign key in the Budget model
    sourceKey: 'id', // The key in the User model being referenced
});

Budget.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Budget model
    targetKey: 'id', // The key in the User model being referenced
});

// Setting up the associations
Category.hasMany(Budget, {
    foreignKey: 'category_id', // The foreign key in the Budget model
    sourceKey: 'id', // The key in the User model being referenced
});

Budget.belongsTo(Category, {
    foreignKey: 'category_id', // The foreign key in the Budget model
    targetKey: 'id', // The key in the User model being referenced
});

// Exporting the function as a named export
export { Budget };
  