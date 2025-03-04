// -----------------------------------
//          CATEGORIES CONTROLLER
// -----------------------------------
import { Request, Response } from 'express'; // Import types for request and response
// Funzioni del Model
import { 
    getAllBudget, 
    getBudgetById,
    addNewBudget,
    deleteBudget
} from '../models/Budget.model';

import {
    getUserById
} from '../models/User.model'
import {
    getCategoryById
} from '../models/Category.model'

import Category from '../models/Category.model'

async function httpGetBudgetList(req: Request, res: Response){
    try {
        const requests = await getAllBudget();
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};
async function httpGetBudget(req: Request, res: Response){
    try {
        const requests = await getBudgetById(parseInt(req.params.id));
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};
async function httpAddBudget(req: Request, res: Response): Promise<any>{
    const request = req.body;

    if(!request.amount || !request.month || !request.year || !request.user_id || !request.category_id ){
        return res.status(400).json({
            error: 'Missing properties'
        })
    }

    try {

        //Find the User
        const user = await getUserById(req.body.user_id);
        if(!user){
            return res.status(404).json({
                error: 'User not found'
            });
        }

        //Find the Category
        const category = await Category.findByPk(req.body.category_id);
        if(!category){
            return res.status(404).json({
                error: 'Category not found'
            });
        }

        const newBudget = await addNewBudget(request);
        return res.status(201).json(newBudget);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to create Budget' });
    }
};
async function httpDeleteBudget(req: Request, res: Response): Promise<any>{
    const budgetId = parseInt(req.params.id);

    if(!getBudgetById(budgetId)){
        return res.status(404).json({
            error: 'Budget not found'
        });
    }

    try {
        const deletedBudget = await deleteBudget(budgetId);
        return res.status(200).json(deletedBudget);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete Budget' });
    }
};

export {
    httpGetBudgetList,
    httpGetBudget,
    httpAddBudget,
    httpDeleteBudget
}