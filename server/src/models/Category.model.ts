import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import { User } from "./User.model";


// Define the Category model class
class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare user_id: ForeignKey<User['id']>;
}

// Initialize the Category model
Category.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        user_id: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
      sequelize,
      tableName: 'categories',  // The name of the table in the database
      timestamps: false,   // If you don't have createdAt or updatedAt fields
    }
);

// Setting up the associations
User.hasMany(Category, {
    foreignKey: 'user_id', // The foreign key in the Category model
    sourceKey: 'id', // The key in the User model being referenced
});

Category.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Category model
    targetKey: 'id', // The key in the User model being referenced
});


async function getAllCategories(): Promise<Category[]> {
    try {
        // Query the database
        const results = await Category.findAll();
        // Return the results
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Error querying the database: TABLE Categories');
    }
}

// Exporting the function as a named export
export { Category, getAllCategories };
  