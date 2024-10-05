// import { useEffect } from 'react';
import { Grid2, IconButton, Typography } from '@mui/material';
// import { useSearchContext } from '../../context/SearchContext';
// import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';

import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

const Sorting: React.FC = () => {
	// const { state, dispatch } = useSearchContext();

	// useEffect(() => {
	// 	const urlFilters = parseQueryParams();
	// 	const { format, status, rating } = urlFilters;

	// 	const filterMapping = [
	// 		{ filterName: 'format', value: format, valueKey: 'formatValue' },
	// 		{ filterName: 'status', value: status, valueKey: 'statusValue' },
	// 		{ filterName: 'rating', value: rating, valueKey: 'ratingValue' },
	// 	];

	// 	filterMapping.forEach(({ filterName, value, valueKey }) => {
	// 		dispatch({
	// 			type: 'SET_FILTERS',
	// 			payload: { [filterName]: value },
	// 		});

	// 		dispatch({
	// 			type: 'SET_FILTERS_VALUE',
	// 			payload: { [valueKey]: value || '' },
	// 		});
	// 	});

	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [location.search]);

	// const handleFilterChange = (filterName: string, value: string) => {
	// 	const filterValue = filterName.concat('Value');

	// 	dispatch({
	// 		type: 'SET_FILTERS_VALUE',
	// 		payload: {
	// 			[filterValue]: value,
	// 		},
	// 	});

	// 	dispatch({
	// 		type: 'SET_FILTERS',
	// 		payload: { [filterName]: value },
	// 	});

	// 	const queryString = buildQueryParams(state.query, {
	// 		...state.filters,

	// 		[filterName]: value,
	// 	});

	// 	window.history.replaceState(null, '', `/search2${queryString}`);
	// };

	// const handleClearValue = (filterName: string) => {
	// 	const filterValue = filterName.concat('Value');

	// 	dispatch({
	// 		type: 'SET_FILTERS_VALUE',
	// 		payload: {
	// 			[filterValue]: '',
	// 		},
	// 	});

	// 	dispatch({
	// 		type: 'SET_FILTERS',
	// 		payload: { [filterName]: undefined },
	// 	});

	// 	const queryString = buildQueryParams(state.query, {
	// 		...state.filters,
	// 		[filterName]: '',
	// 	});

	// 	window.history.replaceState(null, '', `/search2${queryString}`);
	// };

	return (
		<>
			<Grid2 size={2}>
				<Typography variant="h5">Order by:</Typography>
			</Grid2>
			<Grid2 size={2}>
				<Typography variant="h5">Alphabet</Typography>

				<IconButton>
					<ArrowDropDownOutlinedIcon />
				</IconButton>
				<IconButton>
					<ArrowDropUpOutlinedIcon />
				</IconButton>
			</Grid2>

			<Grid2 size={2}>
				<Typography variant="h5">Starting Date</Typography>

				<IconButton>
					<ArrowDropDownOutlinedIcon />
				</IconButton>
				<IconButton>
					<ArrowDropUpOutlinedIcon />
				</IconButton>
			</Grid2>

			<Grid2 size={2}>
				<Typography variant="h5">Score</Typography>

				<IconButton>
					<ArrowDropDownOutlinedIcon />
				</IconButton>
				<IconButton>
					<ArrowDropUpOutlinedIcon />
				</IconButton>
			</Grid2>

			<Grid2 size={2}>
				<Typography variant="h5">Popularity</Typography>

				<IconButton>
					<ArrowDropDownOutlinedIcon />
				</IconButton>
				<IconButton>
					<ArrowDropUpOutlinedIcon />
				</IconButton>
			</Grid2>
		</>
	);
};

export default Sorting;
