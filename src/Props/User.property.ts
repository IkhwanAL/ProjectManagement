export interface UserLogin {
	email: string;
	password: string;
}

export interface UserRegister {
	username: string;
	password: string;
	email: string;
	confirmPassword: string;
}

export enum TypeUser {
	"Proyek Manager",
	"Tim",
}

export interface DataUser {
	id: string | number;
	username: string;
	firstName: string;
	lastname: string;
	email: string;
	phoneNumber?: string;
}
