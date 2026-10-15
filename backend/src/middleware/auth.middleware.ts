import { createRemoteJWKSet, jwtVerify } from 'jose';
import { asyncHandler } from '../utils/asyncHandler.js';

const verifyToken = asyncHandler(async (req, res, next) => {
	const projectUrl = process.env.SUPABASE_URL;

	const JKWS = createRemoteJWKSet(
		new URL(`${projectUrl}/auth/v1/.well-known/jwks.json`),
	);
	const token = req.cookies.accessToken;
	const { payload } = await jwtVerify(token, JKWS, {
		algorithms: ['ES256'],
		issuer: `${projectUrl}/auth/v1`,
		audience: 'authenticated',
	});
	req.user = payload;
	next();
});

export { verifyToken };
