import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.SUPABASE_URI,
	connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
	console.log('Connected to PostgreSQL');
});
pool.on('error', (err) => {
	console.error('Unexpected database error:', err);
});
pool.connect()
export default pool;
