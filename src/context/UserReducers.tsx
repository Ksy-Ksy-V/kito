import { user } from '../data/profileInformation';
import { AnimeKito, UserAccount } from '../models/ProfileModels';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_USER = 'SET_USER';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const SET_ADD_ANIME = 'UPDATE_ANIME';
export const UPDATE_ANIME = 'UPDATE_ANIME';
export const SET_DELETE_ANIME = 'SET_DELETE_ANIME';
export const SET_DELETE_ACCOUNT = 'SET_DELETE_ACCOUNT';
export const CANCEL_DELETE_ACCOUNT = 'CANCEL_DELETE_ACCOUNT';

export interface UserState {
	user: UserAccount | null;
	loading: boolean;
	error: boolean;
}

export const initialUserState: UserState = {
	user: user,
	loading: false,
	error: false,
};

export type Action =
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_ERROR'; payload: boolean }
	| { type: 'SET_USER'; payload: UserAccount | null }
	| {
			type: 'UPDATE_USER_INFO';
			payload: {
				name?: string;
				status?: string;
				avatar?: string;
				background?: string;
				isPrivate?: boolean;
			};
	  }
	| {
			type: 'UPDATE_ANIME';
			payload: {
				animeId: number;
				updates: {
					userRating?: number;
					listName?:
						| 'Watching'
						| 'Completed'
						| 'On-Hold'
						| 'Dropped'
						| 'Plan to Watch';
					episodesWatched?: number;
				};
			};
	  }
	| {
			type: 'SET_ADD_ANIME';
			payload: {
				anime: AnimeKito;
			};
	  }
	| { type: 'SET_DELETE_ANIME' }
	| { type: 'SET_DELETE_ACCOUNT' }
	| { type: 'CANCEL_DELETE_ACCOUNT' };

export function userReducer(state: UserState, action: Action): UserState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_ERROR:
			return { ...state, error: action.payload };
		case SET_USER:
			return {
				...state,
				user: action.payload,
			};

		case UPDATE_USER_INFO:
			return {
				...state,
				user: state.user
					? {
							...state.user,
							...action.payload,
					  }
					: null,
			};

		case UPDATE_ANIME:
			return {
				...state,
				user: state.user
					? {
							...state.user,
							animeList: state.user.animeList.map((anime) =>
								anime.id === action.payload.animeId
									? {
											...anime,
											...action.payload.updates,
									  }
									: anime
							),
					  }
					: null,
			};

		case 'SET_ADD_ANIME':
			return {
				...state,
				user: state.user
					? {
							...state.user,
							animeList: state.user.animeList
								? [
										...state.user.animeList,
										action.payload.anime,
								  ]
								: [action.payload.anime],
					  }
					: null,
			};

		case 'SET_DELETE_ANIME':
			return initialUserState;

		case 'SET_DELETE_ACCOUNT':
			return {
				...state,
				user: state.user
					? {
							...state.user,
							isDeleted: true,
					  }
					: null,
			};

		case 'CANCEL_DELETE_ACCOUNT':
			return {
				...state,
				user: state.user
					? {
							...state.user,
							isDeleted: false,
					  }
					: null,
			};

		default:
			return state;
	}
}
