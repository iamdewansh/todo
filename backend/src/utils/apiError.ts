class ApiError extends Error {
	statusCode: Number;

	constructor(statusCode = 500, message = 'Server Error', stack = '') {
		super(message);
		this.statusCode = statusCode;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
export default ApiError;
