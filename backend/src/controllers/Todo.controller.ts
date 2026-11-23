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
		`select * from public.todos where owner = $1`,
		[userId],
	);
	return new ApiResponse(200, response.rows).send(res);
});

const addTodo = asyncHandler(async (req, res) => {
	const task = req.body?.task;
	const userId = req.user?.sub;

	if (!task || !userId) {
		throw new ApiError(400, 'Invalid request');
	}

	await pool.query(
		`insert into public.todos (task,completed,owner) values($1,$2,$3)`,
		[task, false, userId],
	);
	return new ApiResponse(200, null, 'todo added successfully').send(res);
});

export { viewTodos, addTodo };
