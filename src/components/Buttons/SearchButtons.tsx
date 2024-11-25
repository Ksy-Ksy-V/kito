import { Grid2 } from '@mui/material';
import MainButton from './MainButton';
import { useSearchContext } from '../../context/SearchContext';
import { JikanPagination } from '@tutkli/jikan-ts';
import { animeService } from '../../services/animeService';
import { buildQueryParams } from '../../utils/urlParams';

interface SearchButtonsProps {
	dialogOptions?: boolean;
	closeDialog?: () => void;
}

const SearchButtons: React.FC<SearchButtonsProps> = ({
	dialogOptions = false,
	closeDialog,
}) => {
	const { state, dispatch } = useSearchContext();
	const { query, filters, sorting, loading } = state;

	const handleApplyFilters = async () => {
		dispatch({ type: 'SET_LOADING', payload: true });

		const queryString = buildQueryParams(
			state.query,
			state.filters,
			state.sorting
		);
		window.history.replaceState(null, '', `/search${queryString}`);
		animeService
			.searchAnime(query, 24, filters, sorting)
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

				if (dialogOptions && closeDialog) {
					return closeDialog();
				}
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

		window.history.replaceState(null, '', '/search');
	};

	return (
		<>
			{' '}
			<Grid2 size={12}>
				<MainButton
					onClick={() => handleApplyFilters()}
					disabled={loading}
					sx={{ marginTop: { xs: '0', md: '0.5rem' } }}
				>
					Apply Filters
				</MainButton>
			</Grid2>
			<Grid2 size={12}>
				<MainButton
					onClick={handleClearFilters}
					disabled={loading}
					sx={{
						backgroundColor: 'transparent',
						marginTop: { xs: '1rem', md: '0.8rem' },
					}}
				>
					Reset Filters
				</MainButton>
			</Grid2>
		</>
	);
};

export default SearchButtons;
