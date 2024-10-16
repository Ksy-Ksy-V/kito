import { Pagination } from '@mui/material';
import { useSearchContext } from '../../context/SearchContext';

const PaginationSearch = () => {
	const { state, dispatch } = useSearchContext();
	const { pagination, page, loading, animeList, error } = state;

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
					size="large"
					count={pagination.last_visible_page}
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
