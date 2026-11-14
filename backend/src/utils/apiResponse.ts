import type { Response } from 'express';

class ApiResponse<T = unknown> {
	statusCode: number;
	message: String;
	data: T;
	constructor(statusCode = 200, data = {} as T, message = 'Success') {
		this.statusCode = statusCode;
		this.data = data;
		this.message = message;
	}
	send(res: Response) {
		return res.status(this.statusCode).json(this);
	}
}

export default ApiResponse;
