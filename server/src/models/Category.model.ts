import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import sequelize from "../config/dbConfig";
import User from "./User.model";


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
            references: {
                model: User, // Make sure this references the User model
                key: 'id',
            },
        }
    },
    {
      sequelize,
      tableName: 'categories',  // The name of the table in the database
      timestamps: false,   // If you don't have createdAt or updatedAt fields
      paranoid: true, // paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    }
);

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

async function getCategoryById(id: number): Promise<Category | false> {
    try {
        // Query the database
        const results = await Category.findByPk(id);
        if(!results) return false;
        // Return the results
        return results;
    } catch (error) {
        console.error(error);
        throw new Error(`Error querying the Category ID: ${id}`);
    }
}

async function addNewCategory(request: { name: string, user_id: number }): Promise<Category | null>{
    const { name, user_id } = request;

    try {
        const newCategory = await Category.create({
            name,
            user_id
        });

        return newCategory;
    } catch (error) {
        console.error(error);
        throw new Error(`Error creating the Category`);
    }
}

// Exporting the function as a named export
export default Category;
export { getAllCategories, getCategoryById, addNewCategory };
  