import express from 'express';
const UsersRouter = express.Router();

// Metodi dei Controller
import {
    httpGetUsers,
    httpGetUser
} from '../controllers/Users.controller';

UsersRouter.get('/', httpGetUsers);
UsersRouter.get('/:id', httpGetUser);


export default UsersRouter;