export interface ISuccess<T = {}> {
	sukses: boolean;
	message: string;
	status: number;
	data?: T;
	error?: {
		data: {
			message: string;
			status: number;
			sukses: boolean;
		};
		status: number;
	};
}

export interface LoginSuksesData {
	token: string;
	id: number;
}
