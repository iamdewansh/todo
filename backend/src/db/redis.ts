import { createClient } from 'redis';
import ApiError from '../utils/apiError.js';

const { REDIS_USERNAME, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = process.env;

if (!REDIS_USERNAME || !REDIS_HOST || !REDIS_PASSWORD || !REDIS_PORT) {
	throw new ApiError(500, 'Variables not received');
}

const PORT = Number(REDIS_PORT);
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
	throw new ApiError(500, 'Invalid REDIS_PORT');
}

const redisClient = createClient({
	username: REDIS_USERNAME,
	password: REDIS_PASSWORD,
	socket: {
		host: REDIS_HOST,
		port: PORT,
	},
});

redisClient.on('error', (err) => console.log('Redis Client Error', err.message));
try {
	await redisClient.connect();
	console.log('Redis connected');
} catch (err) {
	console.error('Redis connection failed:', err);
	process.exit(1);
}
export { redisClient };
