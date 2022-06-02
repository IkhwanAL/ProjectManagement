export type QueryArgLogin = {
	email: string;
	password: string;
};

export type QueryArgRegister = {
	username: string;
	email: string;
	password: string;
};

export type QueryArgProject = {
	projectName: string;
	projectDescription: string;
	startDate: string | Date;
};
