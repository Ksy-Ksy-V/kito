import { useSearchContext } from '../../context/SearchContext';

import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';
import StyledSarchFilters from './StyledSelectFilters';
import {
	animeFormats,
	animeRatings,
	animeStatuses,
} from '../../models/animeFilters';

import { useEffect } from 'react';
import { Skeleton } from '@mui/material';
import theme from '../../styles/theme';

const Filters: React.FC = () => {
	const { state, dispatch } = useSearchContext();

	useEffect(() => {
		const urlFilters = parseQueryParams();
		const { format, status, rating } = urlFilters;

		const filterMapping = [
			{ filterName: 'format', value: format, valueKey: 'formatValue' },
			{ filterName: 'status', value: status, valueKey: 'statusValue' },
			{ filterName: 'rating', value: rating, valueKey: 'ratingValue' },
		];

		filterMapping.forEach(({ filterName, value, valueKey }) => {
			dispatch({
				type: 'SET_FILTERS',
				payload: { [filterName]: value },
			});

			dispatch({
				type: 'SET_FILTERS_VALUE',
				payload: { [valueKey]: value || '' },
			});
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	const handleFilterChange = (filterName: string, value: string) => {
		const filterValue = filterName.concat('Value');

		dispatch({
			type: 'SET_FILTERS_VALUE',
			payload: {
				[filterValue]: value,
			},
		});

		dispatch({
			type: 'SET_FILTERS',
			payload: { [filterName]: value },
		});

		const queryString = buildQueryParams(
			state.query,
			{
				...state.filters,

				[filterName]: value,
			},
			state.sorting
		);

		window.history.replaceState(null, '', `/search${queryString}`);
	};

	const handleClearValue = (filterName: string) => {
		const filterValue = filterName.concat('Value');

		dispatch({
			type: 'SET_FILTERS_VALUE',
			payload: {
				[filterValue]: '',
			},
		});

		dispatch({
			type: 'SET_FILTERS',
			payload: { [filterName]: undefined },
		});

		const queryString = buildQueryParams(
			state.query,
			{
				...state.filters,
				[filterName]: '',
			},
			state.sorting
		);

		window.history.replaceState(null, '', `/search${queryString}`);
	};

	return (
		<>
			{state.loading ? (
				<Skeleton
					variant="rectangular"
					width="100%"
					height={56}
					sx={{
						marginTop: '1rem',
						backgroundColor: theme.palette.primary.light,
					}}
				/>
			) : (
				<StyledSarchFilters
					label="Format"
					value={state.filtersValue.formatValue}
					defaultValue={state.filtersValue.formatValue}
					onChange={(e) =>
						handleFilterChange('format', e.target.value)
					}
					options={animeFormats}
					clearValue={() => handleClearValue('format')}
				/>
			)}

			{state.loading ? (
				<Skeleton
					variant="rectangular"
					width="100%"
					height={56}
					sx={{
						marginTop: '1rem',
						backgroundColor: theme.palette.primary.light,
					}}
				/>
			) : (
				<StyledSarchFilters
					label="Status"
					value={state.filtersValue.statusValue}
					defaultValue={state.filtersValue.statusValue}
					onChange={(e) =>
						handleFilterChange('status', e.target.value)
					}
					options={animeStatuses}
					clearValue={() => handleClearValue('status')}
					capitalizeOptions
				/>
			)}

			{state.loading ? (
				<Skeleton
					variant="rectangular"
					width="100%"
					height={56}
					sx={{
						marginTop: '1rem',
						backgroundColor: theme.palette.primary.light,
					}}
				/>
			) : (
				<StyledSarchFilters
					label="Rating"
					value={state.filtersValue.ratingValue}
					defaultValue={state.filtersValue.ratingValue}
					onChange={(e) =>
						handleFilterChange('rating', e.target.value)
					}
					options={animeRatings}
					clearValue={() => handleClearValue('rating')}
					upperCaseOptions
				/>
			)}
		</>
	);
};

export default Filters;
