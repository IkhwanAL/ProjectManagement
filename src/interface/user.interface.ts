export interface IUser {
	values: {
		id?: string | number;
		email: string;
		token: string;
		isLogin: boolean;
	};
}

export interface IRegister {
	values: {
		username: string;
		password: string;
		email: string;
	};
}
