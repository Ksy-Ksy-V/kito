import { Pagination, useMediaQuery } from '@mui/material';
import { useSearchContext } from '../../context/SearchContext';
import theme from '../../styles/theme';

const PaginationSearch = () => {
	const { state, dispatch } = useSearchContext();
	const { pagination, page, loading, animeList, error } = state;
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		dispatch({ type: 'SET_PAGE', payload: value });
	};

	return (
		<>
			{!error && animeList.length > 0 && !loading && pagination && (
				<Pagination
					size={isLargeScreen ? 'large' : 'small'}
					count={pagination?.last_visible_page}
					page={page}
					color="primary"
					onChange={handlePageChange}
					sx={{ marginTop: '1.25rem' }}
				/>
			)}
		</>
	);
};

export default PaginationSearch;
