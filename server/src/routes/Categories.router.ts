import express from 'express';
const CategoriesRouter = express.Router();

// Metodi dei Controller
import {
    httpGetCategories,
    httpGetCategory,
    httpAddCategory,
    httpDeleteCategory
} from '../controllers/Categories.controller';

CategoriesRouter.get('/', httpGetCategories);
CategoriesRouter.get('/:id', httpGetCategory);

CategoriesRouter.post('/', httpAddCategory);
CategoriesRouter.delete('/:id', httpDeleteCategory);


export default CategoriesRouter;