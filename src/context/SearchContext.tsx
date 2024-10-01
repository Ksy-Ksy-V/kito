import { Anime } from '@tutkli/jikan-ts';
import { animeService } from '../services/animeService';
import React, { createContext, useContext, useReducer } from 'react';
import { AnimeFilters } from '../models/animeFilters';
import { parseQueryParams } from '../utils/urlParams';

const SET_LOADING = 'SET_LOADING';
const SET_ANIME_LIST = 'SET_ANIME_LIST';
const SET_ERROR = 'SET_ERROR';
const SET_QUERY = 'SET_QUERY';
const SET_FILTERS = 'SET_FILTERS';
const RESET = 'RESET';

interface SearchState {
	animeList: Anime[];
	loading: boolean;
	error: boolean;
	query: string;
	filters: {
		genres: string;
		format: string;
		status: string;
		rating: string;
	};
}

const initialState: SearchState = {
	animeList: [],
	loading: false,
	error: false,
	query: '',
	filters: {
		genres: '',
		format: '',
		status: '',
		rating: '',
	},
};

type Action =
	| { type: typeof SET_LOADING; payload: boolean }
	| { type: typeof SET_ANIME_LIST; payload: Anime[] }
	| { type: typeof SET_ERROR; payload: boolean }
	| { type: typeof SET_QUERY; payload: string }
	| { type: typeof SET_FILTERS; payload: Partial<SearchState['filters']> }
	| { type: typeof RESET };

function searchReducer(state: SearchState, action: Action): SearchState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_ANIME_LIST:
			return { ...state, animeList: action.payload, loading: false };
		case SET_ERROR:
			return { ...state, error: action.payload, loading: false };
		case SET_QUERY:
			return { ...state, query: action.payload };
		case SET_FILTERS:
			return {
				...state,
				filters: { ...state.filters, ...action.payload },
			};
		case RESET:
			return initialState;
		default:
			return state;
	}
}

const SearchContext = createContext<{
	state: SearchState;
	dispatch: React.Dispatch<Action>;
	searchAnime: (filters: AnimeFilters) => void;
} | null>(null);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(searchReducer, initialState);

	const searchAnime = async (filters: AnimeFilters) => {
		dispatch({ type: SET_LOADING, payload: true });
		try {
			const animeList = await animeService.searchAnime(filters);
			dispatch({ type: SET_ANIME_LIST, payload: animeList });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: true });
		}
	};

	const updateFromQueryParams = () => {
		const filters = parseQueryParams();
		dispatch({ type: 'SET_FILTERS', payload: filters });
		searchAnime(filters);
	};

	return (
		<SearchContext.Provider value={{ state, dispatch, searchAnime }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error(
			'useSearchContext must be used within a SearchProvider'
		);
	}
	return context;
};
