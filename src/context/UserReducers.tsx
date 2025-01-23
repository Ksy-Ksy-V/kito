import { user } from '../data/profileInformation';
import {
	// AnimeKito,
	UserAccount,
} from '../models/ProfileModels';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_USER = 'SET_USER';
export const SET_ADD_ANIME = 'UPDATE_ANIME';
export const UPDATE_ANIME = 'UPDATE_ANIME';
export const SET_DELETE_ANIME = 'SET_DELETE_ANIME';

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

// export const initialAnimeState: AnimeKito = {
// 	id: 1,
// 	name: '',
// 	image: '',
// 	userRating: 1,
// 	episodes: 1,
// 	episodesWatched: 1,
// 	type: 'TV',
// 	listName: 'Watching',
// 	description: '',
// 	genres: [],
// 	score: 1,
// 	rating: '',
// };

export type Action =
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_ERROR'; payload: boolean }
	| { type: 'SET_USER'; payload: UserAccount | null }
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
				animeId: number;
				updates: {
					userRating?: number;
					listName:
						| 'Watching'
						| 'Completed'
						| 'On-Hold'
						| 'Dropped'
						| 'Plan to Watch';
					episodesWatched?: number;
				};
			};
	  }
	| { type: 'SET_DELETE_ANIME' };

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

		case SET_ADD_ANIME:
			return {
				...state,
				user: state.user
					? {
							...state.user,
					  }
					: null,
			};

		case SET_DELETE_ANIME:
			return initialUserState;

		default:
			return state;
	}
}
