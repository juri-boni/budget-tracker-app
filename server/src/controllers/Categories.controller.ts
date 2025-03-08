// -----------------------------------
//          CATEGORIES CONTROLLER
// -----------------------------------
import { Request, Response } from 'express'; // Import types for request and response
// Funzioni del Model
import { 
    getAllCategories, 
    getCategoryById,
    addNewCategory,
    deleteCategory
} from '../models/Category.model';

import {
    getUserById
} from '../models/User.model'

async function httpGetCategories(req: Request, res: Response){
    try {
        const requests = await getAllCategories();
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};
async function httpGetCategory(req: Request, res: Response){
    try {
        const requests = await getCategoryById(parseInt(req.params.id));
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};
async function httpAddCategory(req: Request, res: Response): Promise<any>{
    const request = req.body;

    if(!request.name){
        return res.status(400).json({
            error: 'Missing property: Name'
        })
    }

    try {

        // // Find the User
        const user = await getUserById(req.body.user_id);
        if(!user){
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const newCategory = await addNewCategory(request);
        return res.status(201).json(newCategory);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to create Category' });
    }
};
async function httpDeleteCategory(req: Request, res: Response): Promise<any>{
    const categoryId = parseInt(req.params.id);

    if(!getCategoryById(categoryId)){
        return res.status(404).json({
            error: 'Category not found'
        });
    }

    try {
        const deletedCategory = await deleteCategory(categoryId);
        return res.status(200).json(deletedCategory);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete Category' });
    }
};

export {
    httpGetCategories,
    httpGetCategory,
    httpAddCategory,
    httpDeleteCategory
}