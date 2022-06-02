export interface IUser {
	values: {
		id?: string | number;
		email: string;
		token: string;
		isLogin: boolean;
		user: string;
	};
}

export interface IRegister {
	values: {
		username: string;
		password: string;
		email: string;
	};
}
