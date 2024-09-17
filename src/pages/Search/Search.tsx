import React, { useEffect, useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';
import AnimeCard from '../../components/AnimeCard';

import AnimeSearchField from '../../components/Search/AnimeSearchField';

const Search: React.FC = () => {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [applyFilters, setApplyFilters] = useState(false);

	useEffect(() => {}, [applyFilters, animeList]);

	return (
		<div>
			<Grid2 container spacing={2}>
				<Grid2 size={{ xs: 12 }}>
					<Typography
						variant="h1"
						sx={{ textAlign: 'center', margin: '1.5rem' }}
					>
						There's something for everyone!
					</Typography>
				</Grid2>

				<Grid2 size={{ xs: 8 }} offset={2}>
					<AnimeSearchField
						callbackAnime={(value) => setAnimeList(value)}
					/>
				</Grid2>
			</Grid2>

			<Grid2 container spacing={2}>
				{animeList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						size={{ xs: 2 }}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: '2rem',
						}}
					>
						<AnimeCard
							image={anime.images.jpg.image_url}
							title={anime.title}
						/>
					</Grid2>
				))}
			</Grid2>
		</div>
	);
};

export default Search;
