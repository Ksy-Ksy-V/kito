export interface User {
	token: string;
	refreshToken: string;
}

export type AuthState = {
	isLoggedIn: boolean;
	user: User;
	error: string;
	loading: boolean;
};

export type UserCredentials = {
	email: string;
	password: string;
};

export type UserRegister = {
	name: string;
	email: string;
	password: string;
};
