import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { TopClient, JikanResponse, Anime } from '@tutkli/jikan-ts';
import AnimeInfoCard from '../../components/Popularity/AnimeInfoCard';

import Slyder from '../../components/Popularity/Slider';

function Popularity() {
	const top = new TopClient();
	const [topList, setTopList] = useState<Anime[]>([]);

	useEffect(() => {
		const fetchTopAnime = async () => {
			try {
				const response: JikanResponse<Anime[]> = await top.getTopAnime({
					page: 1,
					limit: 25,
				});

				setTopList(response.data);
				console.log(response);
			} catch (err) {
				console.error('Failed to fetch anime:', err);
			}
		};

		if (topList.length === 0) {
			fetchTopAnime();
		}
	}, [topList, TopClient]);

	return (
		<>
			<Slyder />
			<Typography
				variant="h2"
				sx={{ textAlign: 'center', marginBottom: '2rem' }}
			>
				Top Anime by Popularity
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem',
					alignItems: 'center',
				}}
			>
				{topList.map((anime, index) => (
					<AnimeInfoCard
						key={anime.mal_id}
						number={index + 1}
						image={anime.images.jpg.image_url}
						title={anime.title}
						score={anime.score || 0}
						genres={anime.genres.map((genre) => genre.name)}
						description={
							anime.synopsis || 'No description available.'
						}
						rating={anime.rating || 'Unknown'}
						onAddToList={() =>
							console.log(`Added ${anime.title} to list`)
						}
					/>
				))}
			</Box>
		</>
	);
}

export default Popularity;
