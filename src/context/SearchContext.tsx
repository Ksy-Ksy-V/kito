import { createContext, Dispatch, FC, useContext, useReducer } from 'react';

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
	dispatch: Dispatch<Action>;
	searchAnime: (
		query: SearchState['query'],
		limit: number,
		filters?: SearchState['filters'],
		sorting?: SearchState['sorting']
	) => void;
} | null>(null);

export const SearchProvider: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(searchReducer, initialState);

	const searchAnime = async (
		query: SearchState['query'],
		limit: number,
		filters?: SearchState['filters'],
		sorting?: SearchState['sorting']
	) => {
		dispatch({ type: 'SET_LOADING', payload: true });
		try {
			const animeList = await animeService.searchAnime(
				query,
				limit,
				filters,
				sorting
			);
			dispatch({ type: 'SET_ANIME_LIST', payload: animeList.data });
			dispatch({ type: 'SET_LOADING', payload: false });
		} catch (error) {
			console.error(error);
			dispatch({ type: SET_ERROR, payload: true });
		}
	};

	return (
		<SearchContext.Provider value={{ state, dispatch, searchAnime }}>
			{children}
		</SearchContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error(
			'useSearchContext must be used within a SearchProvider'
		);
	}
	return context;
};
