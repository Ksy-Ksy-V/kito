import { Box, Grid2, keyframes, Skeleton, Typography } from '@mui/material';
import SearchInputField from '../../components/Search/SearchInputField';
import { useSearchContext } from '../../context/SearchContext';
import { useEffect, useMemo } from 'react';

import { animeService } from '../../services/animeService';
import { parseQueryParams } from '../../utils/urlParams';
import GenresFilter from '../../components/Search/GenresFilter';
import Filters from '../../components/Search/Filters';
import Sorting from '../../components/Search/Sorting';
import { JikanPagination } from '@tutkli/jikan-ts';
import kitoLoading from '../../images/loading.png';
import SearchButtons from '../../components/Search/SearchButtons';
import theme from '../../styles/theme';
import PaginationSearch from '../../components/Search/Pagination';
import CardSection from '../../components/Search/CardSection';
import NotResultsSection from '../../components/Search/NotResultsSection';
import ErrorSection from '../../components/Search/ErrorSection';

const Search: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const { page, loading } = state;

	const pulse = useMemo(
		() => keyframes`
			0% { transform: scale(1); }
			50% { transform: scale(1.2); }
			100% { transform: scale(1); }
		`,
		[]
	);

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
					payload: false,
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

			<Grid2 size={{ xs: 12 }}>
				<SearchInputField />
			</Grid2>

			<Grid2
				container
				spacing={2}
				size={3}
				sx={{ marginTop: '2rem', alignContent: 'flex-start' }}
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
						<PaginationSearch />
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
						<Grid2 container>
							<Grid2
								size={12}
								sx={{
									justifyContent: 'center',
									alignItems: 'center',
									display: 'flex',
								}}
							>
								<Box
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
				) : state.error ? (
					<ErrorSection />
				) : state.animeList.length === 0 ? (
					<NotResultsSection />
				) : (
					<CardSection />
				)}
			</Grid2>

			<Grid2
				size={12}
				sx={{
					display: 'flex',
					justifyContent: 'right',
				}}
			>
				<PaginationSearch />
			</Grid2>
		</Grid2>
	);
};

export default Search;
