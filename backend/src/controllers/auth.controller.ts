import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const signUp = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ApiError(400, 'Email or Password is missing');
	}

	const response = await fetch(`${process.env.SUPABASE_URI}/auth/v1/signup`, {
		method: 'POST',
		headers: {
			apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		throw new ApiError(400, 'Failed to Signup');
	}
	const data = await response.json();
	res.json(new ApiResponse(200, data, 'Signed up Successfully'));
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new ApiError(400, 'Email or Password is missing');
	}

	const response = await fetch(
		`https://${process.env.SUPABASE_PROJECT}.supabase.co/auth/v1/token?grant_type=password`,
		{
			method: 'POST',
			headers: {
				apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		},
	);
	if (!response.ok) {
		throw new ApiError(401, 'Invalid Credentials');
	}
	const data = await response.json();
	res.json(new ApiResponse(200, data, 'Logged in Successfully'));
});

export { signUp, login };
