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

router.use(verifyToken);

router.get('/get-todos', viewTodos);
router.post('/add-todo', addTodo);
router.patch('/toggle-completion-status', toggleCompletionStatus);
router.put('/delete-todo', deleteTodo);
router.put('/edit-todo', editTodo);
