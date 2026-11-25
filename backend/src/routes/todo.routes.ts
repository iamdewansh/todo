import { verifyToken } from '../middleware/auth.middleware.js';
import {
	addTodo,
	deleteTodo,
	editTodo,
	toggleCompletionStatus,
	viewTodos,
} from '../controllers/Todo.controller.js';
import { Router } from 'express';

const router: Router = Router();

router.get('/getTodos', verifyToken, viewTodos);
router.post('/addTodo', verifyToken, addTodo);
router.patch('/toggleCompletionStatus', verifyToken, toggleCompletionStatus);
router.put('/deleteTodo', verifyToken, deleteTodo);
router.put('/editTodo', verifyToken, editTodo);
