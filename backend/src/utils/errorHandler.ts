import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
	let statusCode = err.statusCode || 500;
	let message = err.message || 'Internal server error';

	console.error(err);
	return res.status(statusCode).json({
		success: false,
		message,
		...(process.env.NODE_ENV !== 'production' && {
			stack: err.stack,
		}),
	});
};
export { errorHandler };
