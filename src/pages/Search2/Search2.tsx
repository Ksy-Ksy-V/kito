import {
	Box,
	Grid2,
	keyframes,
	Pagination,
	Skeleton,
	Typography,
} from '@mui/material';
import SearchInputField from '../../components/Search/SearchInputField';
import StyledButton from '../../components/StyledButton';
import { useSearchContext } from '../../context/SearchContext';
import { useEffect } from 'react';
import SearchCard from '../../components/SearchCard';
import { animeService } from '../../services/animeService';
import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';
import GenresFilter from '../../components/Search/GenresFilter';
import Filters from '../../components/Search/Filters';
import Sorting from '../../components/Search/Sorting';
import { JikanPagination } from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';
import kitoLoading from '../../images/loading.png';

const Search: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const { query, filters, sorting, pagination, page, loading } = state;
	const navigate = useNavigate();

	const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);  
  }
  100% {
    transform: scale(1);
  }
`;

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
			payload: true,
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
					payload: false,
				});
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
		dispatch({ type: 'SET_PAGE', payload: value });
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
			.then((response) => {
				dispatch({ type: 'SET_ANIME_LIST', payload: response.data });
				dispatch({
					type: 'SET_PAGINATION',
					payload: response.pagination as JikanPagination,
				});
				dispatch({
					type: 'SET_PAGE',
					payload: 1,
				});
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
						sx={{ textAlign: 'center', marginTop: '1.5rem' }}
					>
						There's something for everyone!
					</Typography>
				</Grid2>
			)}

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
					<StyledButton
						onClick={handleApplyFilters}
						disabled={loading}
					>
						Apply Filters
					</StyledButton>
				</Grid2>
				<Grid2 size={12}>
					<StyledButton
						onClick={handleClearFilters}
						disabled={loading}
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
					<StyledButton
						onClick={handleApplyFilters}
						disabled={loading}
					>
						Apply Filters
					</StyledButton>
				</Grid2>
				<Grid2 size={12}>
					<StyledButton
						onClick={handleClearFilters}
						disabled={loading}
						sx={{ backgroundColor: 'transparent' }}
					>
						Reset Filters
					</StyledButton>
				</Grid2>
			</Grid2>

			<Grid2
				container
				spacing={3}
				size={9}
				sx={{
					marginTop: '1rem',
					alignContent: 'flex-start',
				}}
			>
				{loading ? (
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
				) : (
					<Grid2 size={7}>
						<Sorting />
					</Grid2>
				)}

				<Grid2 size={5}>
					<Grid2
						container
						size={12}
						sx={{
							justifyContent: 'right',
						}}
					>
						{!loading && pagination && (
							<Pagination
								size="large"
								count={pagination.last_visible_page}
								page={page}
								color="primary"
								onChange={handlePageChange}
								sx={{ marginTop: '1.25rem' }}
							/>
						)}
					</Grid2>
				</Grid2>

				{loading ? (
					<Grid2
						size={12}
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							display: 'flex',
						}}
					>
						<Grid2 container className="test2">
							<Grid2
								className="test"
								size={12}
								sx={{
									justifyContent: 'center',
									alignItems: 'center',
									display: 'flex',
								}}
							>
								<Box
									className="test3"
									component="img"
									src={kitoLoading}
									sx={{
										width: '25rem',
										marginTop: '5rem',
										animation: `${pulse} 5s ease-in-out infinite`,
									}}
								/>
							</Grid2>
						</Grid2>
					</Grid2>
				) : (
					<Grid2 size={12}>
						<Grid2
							container
							spacing={3}
							sx={{
								marginTop: '1rem',
								justifyContent: 'right',
							}}
						>
							{uniqueAnimeList.map((anime) => (
								<Grid2 key={anime.mal_id} size={3}>
									<SearchCard
										image={anime.images.jpg.image_url}
										title={anime.title}
										description={anime.synopsis}
										genres={anime.genres}
										score={anime.score}
										rating={anime.rating}
										onClick={() =>
											navigate(`/anime/${anime.mal_id}`)
										}
									/>
								</Grid2>
							))}
						</Grid2>
					</Grid2>
				)}
			</Grid2>

			<Grid2
				size={12}
				sx={{
					display: 'flex',
					justifyContent: 'right',
				}}
			>
				{!loading && pagination && (
					<Pagination
						count={pagination.last_visible_page}
						page={page}
						size="large"
						color="primary"
						onChange={handlePageChange}
					/>
				)}
			</Grid2>
		</Grid2>
	);
};

export default Search;
