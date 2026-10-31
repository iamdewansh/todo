import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import crypto from 'node:crypto';
import type { CookieOptions } from 'express';
import { redisClient } from '../db/redis.js';

const authCookieOptions: CookieOptions = {
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
		...authCookieOptions,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', data.refresh_token, {
		...authCookieOptions,
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
		...authCookieOptions,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', data.refresh_token, {
		...authCookieOptions,
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
		...authCookieOptions,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', data.refresh_token, {
		...authCookieOptions,
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});
	res.send(new ApiResponse(200, null, 'Refresh successfull'));
});

function randomToken(bytes: number) {
	return crypto.randomBytes(bytes).toString('base64url');
}

function createPkce() {
	const verifier = randomToken(32);
	const challenge = crypto
		.createHash('sha256')
		.update(verifier)
		.digest('base64url');

	return { verifier, challenge };
}

const transactionCookieOptions: CookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV == 'production',
	sameSite: 'lax',
	maxAge: 10 * 60 * 1000,
};

const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;
	if (!email) {
		throw new ApiError(400, 'Email is missing');
	}
	const { verifier, challenge } = createPkce();
	console.log('verifier :>> ', verifier);
	console.log('challenge :>> ', challenge);
	const txn_id = randomToken(32);
	const result = await redisClient.set(`reset:${txn_id}`, verifier, {
		expiration: {
			type: 'EX',
			value: 600,
		},
		condition: 'NX',
	});

	console.log('result: ', result);

	const redirectTo = `${process.env.BACKEND_URL}/auth/reset/callback`;
	const response = await fetch(
		`${process.env.SUPABASE_URL}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`,
		{
			method: 'POST',
			headers: {
				apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				code_challenge: challenge,
				code_challenge_method: 's256',
			}),
		},
	);

	if (!response.ok) {
		throw new ApiError(400, 'Unable to request password reset');
	}
	console.log('response :>> ', await response.json());
	console.log('txnId:>> ', txn_id);
	console.log('codeVerifier>>', verifier);
	res.cookie('TX_ID', txn_id, transactionCookieOptions);
	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				null,
				'If the account exists, a recovery email will be sent.',
			),
		);
});

const resetCallback = asyncHandler(async (req, res) => {
	console.log('----------------in callback----------------');
	const { code } = req.query;
	console.log(req.query);
	const txnId = req.cookies?.TX_ID;
	console.log('txnId:>> ', txnId);

	if (!code || !txnId) {
		throw new ApiError(401, 'Invalid request');
	}
	const codeVerifier = await redisClient.getDel(`reset:${txnId}`);
	console.log('codeVerifier>>', codeVerifier);

	if (!codeVerifier) {
		throw new ApiError(400, 'Unable to process request');
	}
	const tokenResponse = await fetch(
		`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=pkce`,
		{
			method: 'POST',
			headers: {
				apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				auth_code: code,
				code_verifier: codeVerifier,
			}),
		},
	);

	const tokens = await tokenResponse.json();
	console.log('tokens :>> ', tokens);
	if (!tokenResponse.ok || !tokens.access_token || !tokens.refresh_token) {
		throw new ApiError(401, 'Authentication Failed');
	}

	res.clearCookie('TX_ID', transactionCookieOptions);
	res.cookie('accessToken', tokens.access_token, {
		...authCookieOptions,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', tokens.refresh_token, {
		...authCookieOptions,
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});

	return res.redirect(`${process.env.FRONTEND_URL}/reset-password`);
});

const resetPassword = asyncHandler(async (req, res) => {
	console.log('----------------in reset ----------------');
	const { password } = req.body;
	console.log('cookies ', req.cookies);
	if (!password) {
		throw new ApiError(400, 'Password is missing');
	}
	const access_token = req.cookies?.accessToken;
	if (!access_token) {
		throw new ApiError(400, 'Invalid request');
	}

	const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
			Authorization: `Bearer ${access_token}`,
		},
		body: JSON.stringify({
			password,
		}),
	});
	const result = await response.json();
	console.log(result);
	if (!response.ok) {
		throw new ApiError(400, 'Unable to update password');
	}
	const { full_name, avatar_url, email, email_verified } =
		result.user_metadata;
	res.json(
		new ApiResponse(
			200,
			{ full_name, avatar_url, email, email_verified },
			'Password updated successfully',
		),
	);
});

const loginWithGoogle = asyncHandler(async (req, res) => {
	const { verifier, challenge } = createPkce();
	const txnId = randomToken(32);

	console.log('verifier :>> ', verifier);
	console.log('txnId :>> ', txnId);

	const resu = await redisClient.set(
		`oauth:${txnId}`,
		JSON.stringify(verifier),
		{
			expiration: {
				type: 'EX',
				value: 600,
			},
			condition: 'NX',
		},
	);
	console.log('resu :>> ', resu);

	res.cookie('TX_ID', txnId, transactionCookieOptions);

	const params = new URLSearchParams({
		provider: 'google',
		redirect_to: `${process.env.BACKEND_URL}/auth/callback`,
		code_challenge: challenge,
		code_challenge_method: 's256',
	});
	console.log('params :>> ', params);
	const authUrl = `${process.env.SUPABASE_URL}/auth/v1/authorize?${params.toString()}`;
	console.log('authUrl :>> ', authUrl);
	res.redirect(authUrl);
});

const oauthCallback = asyncHandler(async (req, res) => {
	const txnId = req.cookies?.TX_ID;
	const code = req.query?.code;

	console.log('in oauth callback');
	console.log('txnId :>> ', txnId);
	console.log('code :>> ', code);

	if (!txnId || typeof code !== 'string') {
		res.clearCookie('TX_ID', transactionCookieOptions);
		throw new ApiError(400, 'Invalid OAuth callback');
	}

	const result = await redisClient.getDel(`oauth:${txnId}`);
	const verifier = result ? JSON.parse(result) : null;
	console.log('result :>> ', result);
	console.log('verifier :>> ', verifier);
	if (!verifier) {
		throw new ApiError(400, 'OAuth transaction expired');
	}
	res.clearCookie('TX_ID', transactionCookieOptions);

	const tokenResponse = await fetch(
		`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=pkce`,
		{
			method: 'POST',
			headers: {
				apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
				'content-type': 'application/json',
			},
			body: JSON.stringify({ auth_code: code, code_verifier: verifier }),
		},
	);

	const tokens = await tokenResponse.json();
	console.log('tokens :>> ', tokens);
	if (!tokenResponse.ok || !tokens.access_token || !tokens.refresh_token) {
		throw new ApiError(401, 'Authentication Failed');
	}

	res.cookie('accessToken', tokens.access_token, {
		...authCookieOptions,
		maxAge: 60 * 60 * 1000, // 60 minutes
	});
	res.cookie('refreshToken', tokens.refresh_token, {
		...authCookieOptions,
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});

	return res.redirect(`${process.env.FRONTEND_URL}`);
});

export {
	signUp,
	login,
	logout,
	loginWithGoogle,
	oauthCallback,
	refreshAccessToken,
	forgotPassword,
	resetCallback,
	resetPassword,
};
