import { Typography, Grid } from '@mui/material';
import { AnimeClient, JikanResponse, Anime } from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';

import CardAnime from '../../components/TitleCard';
import SearchFilter from '../../components/SearchFilter';

function Search() {
	const animeClient = new AnimeClient();
	const [animeList, setAnimeList] = useState<Anime[]>([]);

	useEffect(() => {
		const fetchAnime = async () => {
			try {
				const response: JikanResponse<Anime[]> =
					await animeClient.getAnimeSearch({ q: 'Naruto' });
				setAnimeList(response.data);
			} catch (error) {
				console.error('Failed to fetch anime:', error);
			}
		};

		if (animeList.length === 0) {
			fetchAnime();
		}
	}, [animeList, animeClient]);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography
					variant="h1"
					sx={{
						textAlign: 'center',
						marginTop: '1rem',
						marginBottom: '2rem',
					}}
				>
					There's something for everyone
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<SearchFilter />
			</Grid>

			<Grid container spacing={2}>
				{animeList.map((anime) => (
					<Grid item xs={3} key={anime.mal_id}>
						<CardAnime
							title={anime.title}
							description={
								anime.synopsis || 'No description available.'
							}
							imageUrl={anime.images.jpg.image_url || ''}
						/>
					</Grid>
				))}
			</Grid>
		</Grid>
	);
}

export default Search;
