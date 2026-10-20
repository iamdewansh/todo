import { createClient } from 'redis';

const PORT = Number(process.env.REDIS_PORT);
const redisClient = createClient({
	username: process.env.REDIS_USERNAME!,
	password: process.env.REDIS_PASSWORD!,
	socket: {
		host: process.env.REDIS_HOST,
		port: PORT,
	},
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
try {
	await redisClient.connect();
	console.log('Redis connected');
} catch (err) {
	console.error('Redis connection failed:', err);
	process.exit(1);
}
export { redisClient };
