import { Grid2 } from '@mui/material';
import StyledButton from '../StyledButton';
import { useSearchContext } from '../../context/SearchContext';
import { JikanPagination } from '@tutkli/jikan-ts';
import { animeService } from '../../services/animeService';
import { buildQueryParams } from '../../utils/urlParams';

const SearchButtons: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const { query, filters, sorting, loading } = state;

	const handleApplyFilters = async () => {
		dispatch({ type: 'SET_LOADING', payload: true });

		const queryString = buildQueryParams(
			state.query,
			state.filters,
			state.sorting
		);
		window.history.replaceState(null, '', `/search2${queryString}`);
		animeService
			.searchAnime(query, 25, filters, sorting)
			.then((response) => {
				dispatch({ type: 'SET_ANIME_LIST', payload: response.data });
				dispatch({
					type: 'SET_PAGINATION',
					payload: response.pagination as JikanPagination,
				});
				dispatch({
					type: 'SET_PAGE',
					payload: 1,
				});
				dispatch({ type: 'SET_LOADING', payload: false });
			});
	};

	const handleClearFilters = () => {
		dispatch({ type: 'SET_QUERY', payload: '' });
		dispatch({
			type: 'SET_FILTERS',
			payload: {
				genres: undefined,
				format: undefined,
				status: undefined,
				rating: undefined,
			},
		});
		dispatch({
			type: 'SET_SORTING',
			payload: {
				orderBy: undefined,
				sort: undefined,
			},
		});

		window.history.replaceState(null, '', '/search2');
	};

	return (
		<>
			{' '}
			<Grid2 size={12}>
				<StyledButton
					onClick={() => handleApplyFilters()}
					disabled={loading}
				>
					Apply Filters
				</StyledButton>
			</Grid2>
			<Grid2 size={12}>
				<StyledButton
					onClick={handleClearFilters}
					disabled={loading}
					sx={{
						backgroundColor: 'transparent',
					}}
				>
					Reset Filters
				</StyledButton>
			</Grid2>
		</>
	);
};

export default SearchButtons;
