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

export { viewTodos };
