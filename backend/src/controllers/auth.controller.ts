import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { CookieOptions } from 'express';

const options: CookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
};

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

	res.cookie('accessToken', data.access_token, {
		...options,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', data.refresh_token, {
		...options,
		maxAge: 24 * 60 * 60 * 1000, // 1 day
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

	res.cookie('accessToken', data.access_token, {
		...options,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', data.refresh_token, {
		...options,
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});
	res.json(new ApiResponse(200, data, 'Logged in Successfully'));
});

const logout = asyncHandler(async (req, res) => {
	const { access_token: token } = req.cookies;
	console.log(token);
	if (!token) {
		throw new ApiError(400, 'Token is missing');
	}
	const response = await fetch(
		`${process.env.SUPABASE_URL}/auth/v1/logout?scope=local`,
		{
			method: 'POST',
			headers: {
				apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (!response.ok) {
		throw new ApiError(401, 'Invalid Credentials');
	}
	res.clearCookie('accessToken');
	res.clearCookie('refreshToken');
	res.json(new ApiResponse(200, response.body, 'Logged out Successfully'));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
	const token = req.cookies.refreshToken;
	if (!token) {
		throw new ApiError(400, 'Missing token');
	}
	const response = await fetch(
		`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
			},
			body: JSON.stringify({ refresh_token: token }),
		},
	);
	if (!response.ok) {
		throw new ApiError(400, 'Refresh token rejected');
	}

	const data = await response.json();
	res.cookie('accessToken', data.access_token, {
		...options,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', data.refresh_token, {
		...options,
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});
	res.send(new ApiResponse(200, null, 'Refresh successfull'));
});

export { signUp, login, logout, refreshAccessToken };
