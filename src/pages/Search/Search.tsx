import { Grid2, Skeleton, Typography, useMediaQuery } from '@mui/material';
import SearchInputField from '../../components/Search/SearchInputField';
import { useSearchContext } from '../../context/SearchContext';
import { useEffect } from 'react';

import { animeService } from '../../services/animeService';
import { parseQueryParams } from '../../utils/urlParams';
import GenresFilter from '../../components/Search/GenresFilter';
import Filters from '../../components/Search/Filters';
import Sorting from '../../components/Search/Sorting';
import { JikanPagination } from '@tutkli/jikan-ts';
import SearchButtons from '../../components/Search/SearchButtons';
import theme from '../../styles/theme';
import PaginationSearch from '../../components/Search/Pagination';
import ResultSection from '../../components/Search/ResultSection';
import FiltersMenu from '../../components/Search/FiltersMenu';

const Search: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const { page, loading } = state;
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const urlFilters = parseQueryParams();
		const { query, format, genres, status, rating, orderBy, sort } =
			urlFilters;

		if (query) {
			dispatch({ type: 'SET_QUERY', payload: query });
		}

		dispatch({
			type: 'SET_FILTERS',
			payload: { format, genres, status, rating },
		});

		dispatch({
			type: 'SET_SORTING',
			payload: { orderBy, sort },
		});
		dispatch({
			type: 'SET_LOADING',
			payload: false,
		});
		dispatch({
			type: 'SET_ERROR',
			payload: false,
		});
		animeService
			.searchAnime(
				query || '',
				24,
				{
					genres,
					format,
					status,
					rating,
				},
				{ orderBy, sort },
				page
			)
			.then((response) => {
				dispatch({ type: 'SET_ANIME_LIST', payload: response.data });
				dispatch({
					type: 'SET_PAGINATION',
					payload: response.pagination as JikanPagination,
				});
				dispatch({
					type: 'SET_LOADING',
					payload: true,
				});
			})
			.catch((error) => {
				console.error('Failed to fetch anime:', error);
				dispatch({
					type: 'SET_ERROR',
					payload: true,
				});
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<Grid2 container spacing={2}>
			{loading ? (
				<Grid2
					size={{ xs: 12 }}
					sx={{
						display: 'flex',
						textAlign: 'center',
						justifyContent: 'center',
					}}
				>
					<Skeleton
						variant="rectangular"
						width={950}
						height={60}
						sx={{
							marginTop: '1.5rem',
						}}
					/>
				</Grid2>
			) : (
				<Grid2 size={{ xs: 12 }}>
					<Typography
						variant="h1"
						sx={{
							textAlign: 'center',
							marginTop: '1.5rem',
							fontSize: {
								xs: theme.typography.h4.fontSize,
								sm: theme.typography.h3.fontSize,
								md: theme.typography.h2.fontSize,
								lg: theme.typography.h1.fontSize,
								xl: theme.typography.h1.fontSize,
							},
						}}
					>
						There's something for everyone!
					</Typography>
				</Grid2>
			)}

			<Grid2 size={{ xs: 12, sm: 10, md: 12 }}>
				<SearchInputField />
			</Grid2>

			{!isLargeScreen && (
				<Grid2 size={{ xs: 12, sm: 2 }}>
					<FiltersMenu />
				</Grid2>
			)}

			{isLargeScreen && (
				<Grid2
					container
					spacing={2}
					size={3}
					sx={{ marginTop: '1.5rem', alignContent: 'flex-start' }}
				>
					<SearchButtons />
					<Grid2 size={12}>
						<Filters />
					</Grid2>
					<Grid2 size={12}>
						<GenresFilter />
					</Grid2>
					<SearchButtons />
				</Grid2>
			)}

			<Grid2
				container
				spacing={3}
				size={{ xs: 12, sm: 12, md: 9 }}
				sx={{
					marginTop: '1rem',
					alignContent: 'flex-start',
				}}
			>
				{isLargeScreen && loading && (
					<>
						<Skeleton
							variant="rectangular"
							height={40}
							width="60%"
						/>
						<Skeleton
							variant="rectangular"
							height={40}
							width="60%"
						/>
					</>
				)}
				{isLargeScreen && !loading && (
					<Grid2 size={{ md: 12, lg: 7 }}>
						<Sorting />
					</Grid2>
				)}
				<Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 5 }}>
					<Grid2
						container
						size={12}
						sx={{
							justifyContent: 'center',
						}}
					>
						<PaginationSearch />
					</Grid2>
				</Grid2>
				<ResultSection />
				<Grid2
					size={12}
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<PaginationSearch />
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default Search;
