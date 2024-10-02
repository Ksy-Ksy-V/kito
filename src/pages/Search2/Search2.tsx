import { Grid2, Typography } from '@mui/material';

import SearchInputField from '../../components/Search/SearchInputField';

import StyledButton from '../../components/StyledButton';
import { useSearchContext } from '../../context/SearchContext';
import { useEffect } from 'react';
import SearchCard from '../../components/SearchCard';

const Search: React.FC = () => {
	const { state, searchAnime } = useSearchContext();
	const { query, filters } = state;
	useEffect(() => {
		searchAnime(query, 25, filters);
	});
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

			<Grid2 container spacing={2} size={3} sx={{ marginTop: '2rem' }}>
				<Grid2 size={12}>
					<StyledButton
						// onClick={handleApplyFilters}
						sx={{ marginBottom: '1rem' }}
					>
						Apply Filters
					</StyledButton>
				</Grid2>
			</Grid2>

			<Grid2 container spacing={3} size={9} sx={{}}>
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
