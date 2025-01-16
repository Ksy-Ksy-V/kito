import { UserAccount } from '../models/ProfileModels';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const RESET = 'RESET';

export interface UserState {
	user: UserAccount | null;
	id: number;
	name: string;
	status: string | undefined;
	avatar: string | undefined;
	background: string | undefined;
	isAuthenticated: boolean;

	loading: boolean;
	error: boolean;
}

export const initialUserState: UserState = {
	user: null,
	id: 0,
	name: '',
	status: undefined,
	avatar: undefined,
	background: undefined,
	isAuthenticated: false,

	loading: false,
	error: false,
};

export type Action =
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_ERROR'; payload: boolean }
	| { type: 'SET_USER'; payload: UserAccount }
	| { type: 'LOGOUT_USER'; payload: boolean };

export function userReducer(state: UserState, action: Action): UserState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_ERROR:
			return { ...state, error: action.payload };
		case 'SET_USER':
			return { ...state, user: action.payload, isAuthenticated: true };
		case 'LOGOUT_USER':
			return { ...state, user: null, isAuthenticated: false };
		default:
			return state;
	}
}
