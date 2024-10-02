import { createContext, useContext, useReducer } from 'react';

import {
	searchReducer,
	Action,
	SearchState,
	initialState,
	SET_ERROR,
} from './SearchReducers';
import { animeService } from '../services/animeService';

const SearchContext = createContext<{
	state: SearchState;
	dispatch: React.Dispatch<Action>;
	searchAnime: (
		query: SearchState['query'],
		limit: number,
		filters?: SearchState['filters']
	) => void;
} | null>(null);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(searchReducer, initialState);

	const searchAnime = async (
		query: SearchState['query'],
		limit: number,
		filters?: SearchState['filters']
	) => {
		dispatch({ type: 'SET_LOADING', payload: true });
		try {
			const animeList = await animeService.searchAnime(
				query,
				limit,
				filters
			);
			dispatch({ type: 'SET_ANIME_LIST', payload: animeList });
			dispatch({ type: 'SET_LOADING', payload: false });
		} catch (error) {
			console.log(error);
			dispatch({ type: SET_ERROR, payload: true });
		}
	};

	return (
		<SearchContext.Provider value={{ state, dispatch, searchAnime }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	console.log(context, 'con');
	if (!context) {
		throw new Error(
			'useSearchContext must be used within a SearchProvider'
		);
	}
	return context;
};
