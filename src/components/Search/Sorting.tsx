import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid2,
	Radio,
	RadioGroup,
} from '@mui/material';

import { useSearchContext } from '../../context/SearchContext';
import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';

import { useEffect } from 'react';
import { animeOrder, animeSorting } from '../../models/animeFilters';
import theme from '../../styles/theme';

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
				payload: { [valueKey]: value },
			});
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	const handleSortingChange = (sortName: string, value: string) => {
		const sortingValue = sortName.concat('Value');
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

	return (
		<Grid2 size={12} container spacing={2}>
			<Grid2
				size={8}
				sx={{
					backgroundColor: theme.palette.primary.light,
					borderRadius: '0.5rem',
					display: 'inline',
				}}
			>
				<FormControl>
					<FormLabel
						id="order-row-radio-buttons-group-label"
						sx={{
							marginRight: '1rem',
							color: theme.palette.secondary.main,
						}}
					>
						Order by:
					</FormLabel>

					<RadioGroup
						row
						name="order-by"
						onChange={(e) =>
							handleSortingChange('orderBy', e.target.value)
						}
					>
						{animeOrder.map((option) => (
							<FormControlLabel
								key={option}
								value={option}
								control={<Radio />}
								label={
									option.charAt(0).toUpperCase() +
									option
										.slice(1)
										.toLowerCase()
										.replace('_', ' ')
								}
								checked={
									state.sortingValue.orderByValue === option
								}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Grid2>
			<Grid2
				size={4}
				sx={{
					backgroundColor: theme.palette.primary.light,
					borderRadius: '0.5rem',
				}}
			>
				<FormControl>
					<FormLabel
						id="sorting-row-radio-buttons-group-label"
						sx={{
							marginRight: '1rem',
							color: theme.palette.secondary.main,
						}}
					>
						Sort:
					</FormLabel>
					<RadioGroup
						row
						aria-labelledby="sorting-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						onChange={(e) =>
							handleSortingChange('sort', e.target.value)
						}
					>
						{animeSorting.map((option) => (
							<FormControlLabel
								key={option}
								value={option}
								control={<Radio />}
								label={
									option.charAt(0).toUpperCase() +
									option.slice(1).toLowerCase()
								}
								checked={
									state.sortingValue.sortValue === option
								}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Grid2>
		</Grid2>
	);
};

export default Sorting;
