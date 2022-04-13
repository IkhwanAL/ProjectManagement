export interface ISuccess<T> {
	sukses: boolean;
	message: string;
	status: number;
	data?: T;
}

export interface LoginSuksesData {
	token: string;
}
