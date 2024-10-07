// import { useEffect } from 'react';
import { Grid2 } from '@mui/material';

import { useSearchContext } from '../../context/SearchContext';
import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';
import StyledSarchFilters from './StyledSelectFilters';
import { animeOrder, animeSorting } from '../../models/animeFilters';
import { useEffect } from 'react';

const Sorting: React.FC = () => {
	const { state, dispatch } = useSearchContext();

	useEffect(() => {
		const urlFilters = parseQueryParams();
		const { sort, orderBy } = urlFilters;

		const sortingMapping = [
			{ filterName: 'sort', value: sort, valueKey: 'sortValue' },
			{ filterName: 'orderBy', value: orderBy, valueKey: 'orderByValue' },
		];

		sortingMapping.forEach(({ filterName, value, valueKey }) => {
			dispatch({
				type: 'SET_SORTING',
				payload: { [filterName]: value },
			});

			dispatch({
				type: 'SET_SORTING_VALUE',
				payload: { [valueKey]: value || '' },
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	const handleSortingChange = (sortName: string, value: string) => {
		const sortingValue = sortName.concat('Value');
		console.log(sortName, 'sortName2');
		console.log(sortingValue, 'sortingValue2');
		console.log(sortName, 'sortName2');
		console.log(value, 'value2');

		dispatch({
			type: 'SET_SORTING_VALUE',
			payload: {
				[sortingValue]: value,
			},
		});

		dispatch({
			type: 'SET_SORTING',
			payload: { [sortName]: value },
		});

		console.log(sortName, 'sortName');
		console.log(sortingValue, 'sortingValue');
		console.log(sortName, 'sortName');
		console.log(value, 'value');

		const queryString = buildQueryParams(
			state.query,
			{
				...state.filters,
			},
			{
				...state.sorting,
				[sortName]: value,
			}
		);

		window.history.replaceState(null, '', `/search2${queryString}`);
	};

	const handleClearValue = (sortName: string) => {
		const sortingValue = sortName.concat('Value');

		dispatch({
			type: 'SET_SORTING_VALUE',
			payload: {
				[sortingValue]: '',
			},
		});

		dispatch({
			type: 'SET_SORTING',
			payload: { [sortName]: undefined },
		});

		const queryString = buildQueryParams(
			state.query,
			{
				...state.filters,
			},
			{
				...state.sorting,
				[sortName]: '',
			}
		);

		window.history.replaceState(null, '', `/search2${queryString}`);
	};

	return (
		<>
			<Grid2 size={6}>
				<StyledSarchFilters
					label="Order by:"
					value={state.sortingValue.orderByValue}
					defaultValue={state.sortingValue.orderByValue}
					onChange={(e) =>
						handleSortingChange('orderBy', e.target.value)
					}
					options={animeOrder}
					clearValue={() => handleClearValue('orderBy')}
					underscoreOptions
				/>
			</Grid2>
			<Grid2 size={6}>
				<StyledSarchFilters
					label="Sort"
					value={state.sortingValue.sortValue}
					defaultValue={state.sortingValue.sortValue}
					onChange={(e) =>
						handleSortingChange('sort', e.target.value)
					}
					options={animeSorting}
					clearValue={() => handleClearValue('sort')}
					capitalizeOptions
				/>
			</Grid2>
		</>
	);
};

export default Sorting;
