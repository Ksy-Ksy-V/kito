import {
	Anime,
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
	SearchOrder,
	SortOptions,
} from '@tutkli/jikan-ts';

export const SET_LOADING = 'SET_LOADING';

export const SET_ANIME_LIST = 'SET_ANIME_LIST';
export const SET_ERROR = 'SET_ERROR';
export const SET_QUERY = 'SET_QUERY';
export const SET_ORDER = 'SET_ORDER';
export const SET_SORT = 'SET_SORT';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_FILTERS_VALUE = 'SET_FILTERS_VALUE';
export const RESET = 'RESET';

export interface SearchState {
	animeList: Anime[];
	loading: boolean;
	error: boolean;
	query: string;
	sort: SortOptions | undefined;
	orderBy: SearchOrder | undefined;
	filters: {
		genres: string | undefined;
		format: AnimeType | undefined;
		status: AnimeSearchStatus | undefined;
		rating: AnimeRating | undefined;
	};
	filtersValue: {
		genresValue: string[];
		formatValue: string;
		statusValue: string;
		ratingValue: string;
	};
}

export const initialState: SearchState = {
	animeList: [],
	loading: false,
	error: false,
	query: '',
	sort: undefined,
	orderBy: undefined,
	filters: {
		genres: '',
		format: undefined,
		status: undefined,
		rating: undefined,
	},
	filtersValue: {
		genresValue: [],
		formatValue: '',
		statusValue: '',
		ratingValue: '',
	},
};

export type Action =
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_ANIME_LIST'; payload: Anime[] }
	| { type: 'SET_ERROR'; payload: boolean }
	| { type: 'SET_QUERY'; payload: string }
	| { type: 'SET_ORDER'; payload: string }
	| { type: 'SET_SORT'; payload: string }
	| { type: 'SET_FILTERS'; payload: Partial<SearchState['filters']> }
	| {
			type: 'SET_FILTERS_VALUE';
			payload: Partial<SearchState['filtersValue']>;
	  }
	| { type: 'RESET' };

export function searchReducer(state: SearchState, action: Action): SearchState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_ANIME_LIST:
			return { ...state, animeList: action.payload, loading: false };
		case SET_ERROR:
			return { ...state, error: action.payload, loading: false };
		case SET_QUERY:
			return { ...state, query: action.payload };
		case SET_ORDER:
			return { ...state, query: action.payload };
		case SET_SORT:
			return { ...state, query: action.payload };
		case SET_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					...action.payload,
				},
			};
		case SET_FILTERS_VALUE:
			return {
				...state,
				filtersValue: {
					...state.filtersValue,
					...action.payload,
				},
			};
		case RESET:
			return initialState;
		default:
			return state;
	}
}
