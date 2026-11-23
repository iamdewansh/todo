import pool from '../db/supabase.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const viewTodos = asyncHandler(async (req, res) => {
	const userId = req.user?.sub;
	if (!userId) {
		throw new ApiError(404, 'Not Found');
	}
	const response = await pool.query(
		`select id,task,created_at,completed,priority from public.todos where owner = $1`,
		[userId],
	);
	return new ApiResponse(200, response.rows).send(res);
});

const addTodo = asyncHandler(async (req, res) => {
	const task = req.body?.task;
	const priority = req.body?.priority;
	const userId = req.user?.sub;

	if (!task || !priority || !userId) {
		throw new ApiError(400, 'Invalid request');
	}

	await pool.query(
		`insert into public.todos (task,completed,owner,priority) values($1,$2,$3,$4)`,
		[task, false, userId, priority],
	);
	return new ApiResponse(200, null, 'todo added successfully').send(res);
});

const toggleCompletionStatus = asyncHandler(async (req, res) => {
	const todoId = req.body?.todoId;
	const status = req.body?.status;
	const userId = req.user?.sub;
	if (!todoId || status === undefined || !userId) {
		throw new ApiError(400, 'Invalid request');
	}

	await pool.query(
		`update public.todos set completed = $1 where id = $2 and owner = $3`,
		[status, todoId, userId],
	);
	return new ApiResponse(200, null, 'Task completed').send(res);
});

const deleteTodo = asyncHandler(async (req, res) => {
	const todoId = req.body?.todoId;
	if (!todoId) {
		throw new ApiError(400, 'Invalid request');
	}
	await pool.query(`delete from public.todos where id = $1`, [todoId]);
	return new ApiResponse(200, null, 'todo removed successfully').send(res);
});

const editTodo = asyncHandler(async (req, res) => {
	const task = req.body?.task;
	const todoId = req.body?.todoId;
	const priority = req.body?.priority;
	const userId = req.user?.sub;

	if (!task || !priority || !todoId || !userId) {
		throw new ApiError(403, 'Invalid input');
	}
	await pool.query(
		`update public.todos set task = $1, priority = $2  where id = $3 and owner = $4 `,
		[task, priority, todoId, userId],
	);
	return new ApiResponse(200, null, 'Task updated').send(res);
});

export { viewTodos, addTodo, toggleCompletionStatus, deleteTodo, editTodo };
