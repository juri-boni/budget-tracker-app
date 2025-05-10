import express from 'express';
const CategoriesRouter = express.Router();

// Metodi dei Controller
import {
    httpGetCategories,
    httpGetCategory,
    httpAddCategory,
    httpDeleteCategory
} from '../controllers/Categories.controller';

 /**
* @swagger
* tags:
*   name: Categories
*   description: The Categories API allows you to manage categories information. It provides endpoints for creating, retrieving, updating and deleting categories information.
*/

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Retrieves a list of all categories in the system
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Internal server error.
 */
CategoriesRouter.get('/', httpGetCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Retrieves a single category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A Category Object
 *       500:
 *         description: Internal server error.
 */
CategoriesRouter.get('/:id', httpGetCategory);

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Add a new category
 *     description: Adds a new category to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: "test 2"
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user associated with the category.
 *                 example: 5
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
CategoriesRouter.post('/', httpAddCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category by ID.
 *     description: Remove a category from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
CategoriesRouter.delete('/:id', httpDeleteCategory);


export default CategoriesRouter;