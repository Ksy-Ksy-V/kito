import { useSearchContext } from '../../context/SearchContext';

import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';
import CustomSelect from './CustomSelect';
import {
	animeFormats,
	animeRatings,
	animeStatuses,
} from '../../models/AnimeFilters';

import { useEffect } from 'react';
import { Skeleton } from '@mui/material';
import theme from '../../styles/theme';

const Filters: React.FC = () => {
	const { state, dispatch } = useSearchContext();

	useEffect(() => {
		const urlFilters = parseQueryParams();
		const { format, status, rating } = urlFilters;

		const filterMapping = [
			{ filterName: 'format', value: format },
			{ filterName: 'status', value: status },
			{ filterName: 'rating', value: rating },
		];

		filterMapping.forEach(({ filterName, value }) => {
			dispatch({
				type: 'SET_FILTERS',
				payload: { [filterName]: value },
			});

			dispatch({
				type: 'SET_FILTERS_VALUE',
				payload: { [filterName]: value || '' },
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
						marginTop: '0.5rem',
						backgroundColor: theme.palette.primary.light,
					}}
				/>
			) : (
				<CustomSelect
					label="Format"
					value={state.filtersValue.format}
					defaultValue={state.filtersValue.format}
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
				<CustomSelect
					label="Status"
					value={state.filtersValue.status}
					defaultValue={state.filtersValue.status}
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
				<CustomSelect
					label="Rating"
					value={state.filtersValue.rating}
					defaultValue={state.filtersValue.rating}
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
