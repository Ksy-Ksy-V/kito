import React, { useEffect } from 'react';
import { Grid, Typography, Skeleton } from '@mui/material';
import { useSearchContext } from '../../context/SearchContext';
import SearchInputField from '../../components/Search/SearchInputField';
import SearchFilters from '../../components/Search/SearchFilters';
import SearchCard from '../../components/SearchCard';
import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';
import { useLocation } from 'react-router-dom';

const Search: React.FC = () => {
	const { state, dispatch, searchAnime } = useSearchContext();
	const location = useLocation();

	useEffect(() => {
		const filters = parseQueryParams();
		dispatch({ type: 'SET_FILTERS', payload: filters });
		searchAnime(filters);
	}, [location.search, dispatch, searchAnime]);

	const handleApplyFilters = () => {
		const queryString = buildQueryParams(state.query, state.filters);
		window.history.replaceState(null, '', `/search${queryString}`);
		searchAnime(state.filters);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography
					variant="h1"
					sx={{ textAlign: 'center', marginTop: '1.5rem' }}
				>
					There's something for everyone!
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<SearchInputField />
			</Grid>

			<Grid item xs={12}>
				<SearchFilters />
				<button onClick={handleApplyFilters}>Apply Filters</button>
			</Grid>

			<Grid item xs={12} container spacing={2}>
				{state.loading
					? Array.from({ length: 8 }).map((_, index) => (
							<Skeleton
								key={index}
								variant="rectangular"
								width="250px"
								height="350px"
							/>
					  ))
					: state.animeList.map((anime) => (
							<SearchCard
								key={anime.mal_id}
								image={anime.images.jpg.image_url}
								title={anime.title}
							/>
					  ))}
			</Grid>
		</Grid>
	);
};

export default Search;
