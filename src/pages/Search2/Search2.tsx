import { Grid2, Typography } from '@mui/material';

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

const Search: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const { query, filters } = state;

	useEffect(() => {
		const urlFilters = parseQueryParams();
		const { query, format, genres, status, rating } = urlFilters;

		if (query) {
			dispatch({ type: 'SET_QUERY', payload: query });
		}

		dispatch({
			type: 'SET_FILTERS',
			payload: { format, genres, status, rating },
		});

		animeService
			.searchAnime(query || '', 25, {
				genres,
				format,
				status,
				rating,
			})
			.then((animeList) => {
				dispatch({ type: 'SET_ANIME_LIST', payload: animeList });
			})
			.catch((error) => {
				console.error('Failed to fetch anime:', error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleApplyFilters = () => {
		const queryString = buildQueryParams(state.query, state.filters);
		window.history.replaceState(null, '', `/search2${queryString}`);
		animeService.searchAnime(query, 25, filters).then((animeList) => {
			dispatch({ type: 'SET_ANIME_LIST', payload: animeList });
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

		window.history.replaceState(null, '', '/search2');
	};

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

			<Grid2 container spacing={3} size={9} sx={{}}>
				<Grid2
					size={12}
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
					}}
				>
					<Sorting />
				</Grid2>
				{state.animeList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						sx={{
							marginTop: '2rem',
						}}
					>
						<SearchCard
							image={anime.images.jpg.image_url}
							title={anime.title}
						/>
					</Grid2>
				))}
			</Grid2>
		</Grid2>
	);
};

export default Search;
