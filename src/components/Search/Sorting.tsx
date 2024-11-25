import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid2,
	Radio,
	RadioGroup,
	useMediaQuery,
} from '@mui/material';

import { useSearchContext } from '../../context/SearchContext';
import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';

import { useEffect } from 'react';
import {
	animeOrder,
	animeSorting,
	AnimeSortingLabel,
} from '../../models/AnimeFilters';
import theme from '../../styles/theme';
import { SearchOrder, SortOptions } from '@tutkli/jikan-ts';

const Sorting: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const urlFilters = parseQueryParams();
		const { sort, orderBy } = urlFilters;

		const sortingMapping = [
			{ filterName: 'sort', value: sort },
			{ filterName: 'orderBy', value: orderBy },
		];
		sortingMapping.forEach(({ filterName, value }) => {
			dispatch({
				type: 'SET_SORTING',
				payload: { [filterName]: value },
			});

			dispatch({
				type: 'SET_SORTING_VALUE',
				payload: { [filterName]: value },
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

		window.history.replaceState(null, '', `/search${queryString}`);
	};

	return (
		<Grid2 size={12} container spacing={2}>
			<Grid2
				size={12}
				sx={{
					backgroundColor: theme.palette.primary.light,
					marginTop: '1rem',
				}}
			>
				<FormControl
					sx={{
						display: 'flex',
						flexDirection: { xs: 'colom', md: 'row' },
						paddingLeft: '1rem',
					}}
				>
					<FormLabel
						focused={false}
						id="order-row-radio-buttons-group-label"
						sx={{
							marginLeft: { xs: '0', md: '1rem' },
							marginTop: '0.6rem',
							marginRight: '1rem',
							color: 'secondary.main',
						}}
					>
						Order by
					</FormLabel>

					<RadioGroup
						row={isLargeScreen ? true : false}
						name="order-by"
						onChange={(e) =>
							handleSortingChange('orderBy', e.target.value)
						}
					>
						{animeOrder.map((option: SearchOrder) => (
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
								checked={state.sortingValue.orderBy === option}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Grid2>
			<Grid2
				size={12}
				sx={{
					backgroundColor: theme.palette.primary.light,
				}}
			>
				<FormControl
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						paddingLeft: '1rem',
					}}
				>
					<FormLabel
						focused={false}
						id="sorting-row-radio-buttons-group-label"
						sx={{
							marginLeft: { xs: '0', md: '1rem' },
							color: 'secondary.main',
							marginRight: '1rem',
							marginTop: '0.6rem',
							paddingRight: '1rem',
						}}
					>
						Sort by
					</FormLabel>
					<RadioGroup
						row={isLargeScreen ? true : false}
						aria-labelledby="sorting-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						onChange={(e) =>
							handleSortingChange('sort', e.target.value)
						}
					>
						{animeSorting.map((option: SortOptions) => (
							<FormControlLabel
								key={option}
								value={option}
								control={<Radio />}
								label={AnimeSortingLabel[option]}
								checked={state.sortingValue.sort === option}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Grid2>
		</Grid2>
	);
};

export default Sorting;
