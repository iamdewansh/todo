import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { CookieOptions } from 'express';
const signUp = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ApiError(400, 'Email or Password is missing');
	}

	const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/signup`, {
		method: 'POST',
		headers: {
			apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		console.log(await response.json());
		throw new ApiError(400, 'Failed to Signup');
	}
	const data = await response.json();
	const options: CookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
	};

	res.cookie('accessToken', data.access_token, {
		...options,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', data.refresh_token, {
		...options,
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
	res.json(new ApiResponse(200, null, 'Signed up Successfully'));
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new ApiError(400, 'Email or Password is missing');
	}

	const response = await fetch(
		`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`,
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

const logout = asyncHandler(async (req, res) => {
	const { access_token: token } = req.body;
	if (!token) {
		throw new ApiError(400, 'Token is missing');
	}
	const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/logout`, {
		method: 'POST',
		headers: {
			apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new ApiError(401, 'Invalid Credentials');
	}

	res.json(new ApiResponse(200, response.body, 'Logged out Successfully'));
});

export { signUp, login, logout };
