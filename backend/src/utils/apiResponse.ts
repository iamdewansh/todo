class ApiResponse<T = unknown> {
	statusCode: Number;
	message: String;
	data: T;
	constructor(statusCode = 200, data = {} as T, message = 'Success') {
		this.statusCode = statusCode;
		this.data = data;
		this.message = message;
	}
}

export default ApiResponse;
