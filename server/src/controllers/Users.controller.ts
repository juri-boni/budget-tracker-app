// -----------------------------------
//          USERS CONTROLLER
// -----------------------------------

import { Request, Response } from 'express'; // Import types for request and response
// Funzioni del Model
import { 
    getAllUsers, 
    getUserById
} from '../models/User.model';

async function httpGetUsers(req: Request, res: Response){
    try {
        const requests = await getAllUsers();
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};
async function httpGetUser(req: Request, res: Response){
    try {
        const requests = await getUserById(parseInt(req.params.id));
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};

export {
    httpGetUsers,
    httpGetUser
}