import { Grid2, Pagination, Typography } from '@mui/material';

import SearchInputField from '../../components/Search/SearchInputField';
import StyledButton from '../../components/StyledButton';
import { useSearchContext } from '../../context/SearchContext';
import { useEffect, useState } from 'react';
import SearchCard from '../../components/SearchCard';
import { animeService } from '../../services/animeService';
import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';
import GenresFilter from '../../components/Search/GenresFilter';
import Filters from '../../components/Search/Filters';
import Sorting from '../../components/Search/Sorting';
import { JikanPagination } from '@tutkli/jikan-ts';
import theme from '../../styles/theme';

const Search: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const { query, filters, sorting } = state;
	const [page, setPage] = useState(1);
	const [paginationData, setPaginationData] =
		useState<JikanPagination | null>(null);

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
		animeService
			.searchAnime(
				query || '',
				25,
				{
					genres,
					format,
					status,
					rating,
				},
				{ orderBy, sort },
				page
			)
			.then((animeList) => {
				dispatch({ type: 'SET_ANIME_LIST', payload: animeList.data });
				setPaginationData(animeList.pagination as JikanPagination);
			})
			.catch((error) => {
				console.error('Failed to fetch anime:', error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const handleApplyFilters = () => {
		const queryString = buildQueryParams(
			state.query,
			state.filters,
			state.sorting
		);
		window.history.replaceState(null, '', `/search2${queryString}`);
		animeService
			.searchAnime(query, 25, filters, sorting)
			.then((animeList) => {
				dispatch({ type: 'SET_ANIME_LIST', payload: animeList.data });
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

		window.history.replaceState(null, '', '/search2');
	};

	const uniqueAnimeList = state.animeList.filter(
		(anime, index, self) =>
			index === self.findIndex((a) => a.mal_id === anime.mal_id)
	);

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }}>
				<Typography
					variant="h1"
					sx={{ textAlign: 'center', marginTop: '1.5rem' }}
				>
					There's something for everyone!
				</Typography>
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<SearchInputField />
			</Grid2>

			<Grid2
				container
				spacing={2}
				size={3}
				sx={{ marginTop: '2rem', alignContent: 'flex-start' }}
			>
				<Grid2 size={12}>
					<StyledButton onClick={handleApplyFilters}>
						Apply Filters
					</StyledButton>
				</Grid2>
				<Grid2 size={12}>
					<StyledButton
						onClick={handleClearFilters}
						sx={{
							backgroundColor: 'transparent',
						}}
					>
						Reset Filters
					</StyledButton>
				</Grid2>
				<Grid2 size={12}>
					<Filters />
				</Grid2>
				<Grid2 size={12}>
					<GenresFilter />
				</Grid2>
				<Grid2 size={12}>
					<StyledButton onClick={handleApplyFilters}>
						Apply Filters
					</StyledButton>
				</Grid2>
				<Grid2 size={12}>
					<StyledButton
						onClick={handleClearFilters}
						sx={{ backgroundColor: 'transparent' }}
					>
						Reset Filters
					</StyledButton>
				</Grid2>
			</Grid2>

			<Grid2 container spacing={3} size={9}>
				<Grid2 size={9}>
					<Sorting />
				</Grid2>
				<Grid2
					container
					size={3}
					sx={{
						backgroundColor: theme.palette.primary.light,
						borderRadius: '0.5rem',
					}}
				>
					{paginationData && (
						<Pagination
							count={paginationData.last_visible_page}
							page={page}
							onChange={handlePageChange}
							sx={{
								'& .Mui-selected': {
									backgroundColor: 'primary.main',
								},
								'& .MuiPaginationItem-root': {
									'&:hover': {
										backgroundColor: 'primary.main',
									},
								},
							}}
						/>
					)}
				</Grid2>

				{uniqueAnimeList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						sx={{
							marginTop: '1rem',
						}}
					>
						<SearchCard
							image={anime.images.jpg.image_url}
							title={anime.title}
						/>
					</Grid2>
				))}
			</Grid2>

			<Grid2 size={12} sx={{ display: 'flex', justifyContent: 'right' }}>
				{paginationData && (
					<Pagination
						count={paginationData.last_visible_page}
						page={page}
						onChange={handlePageChange}
						sx={{
							'& .Mui-selected': {
								backgroundColor: 'primary.main',
							},
							'& .MuiPaginationItem-root': {
								'&:hover': {
									backgroundColor: 'primary.main',
								},
							},
						}}
					/>
				)}
			</Grid2>
		</Grid2>
	);
};

export default Search;
