class ApiError extends Error {
	statusCode: number;

	constructor(statusCode = 500, message = 'Server Error', stack = '') {
		super(message);
		this.statusCode = statusCode;

		if (stack && process.env.NODE_ENV === 'development') {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
export default ApiError;
