import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.SUPABASE_URI,
	connectionTimeoutMillis: 10000,
});

pool.connect().then(() => {
	console.log('db connected');
});

export default pool;
