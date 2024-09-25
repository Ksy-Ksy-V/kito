import { useEffect, useState } from 'react';
import { Typography, Grid2 } from '@mui/material';
import { TopClient, JikanResponse, Anime } from '@tutkli/jikan-ts';
import AnimeInfoCard from '../../components/Popularity/AnimeInfoCard';

import Slyder from '../../components/Popularity/Slider';
import Error from '../../components/Error';
import theme from '../../styles/theme';

function Popularity() {
	const top = new TopClient();
	const [topList, setTopList] = useState<Anime[]>([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchTopAnime = async () => {
			setLoading(true);
			try {
				const response: JikanResponse<Anime[]> = await top.getTopAnime({
					page: 1,
					limit: 25,
				});

				setTopList(response.data);
				console.log(response);
				setLoading(false);
			} catch (err) {
				console.error('Failed to fetch anime:', err);
				setError(true);
				setLoading(false);
			}
		};

		if (topList.length === 0) {
			fetchTopAnime();
		}
	}, [topList, TopClient]);

	if (error) {
		return <Error />;
	}

	return (
		<>
			<Slyder />
			<Typography
				variant="h2"
				sx={{
					textAlign: 'center',
					marginTop: '2rem',
					marginBottom: '2rem',
					fontSize: {
						xs: theme.typography.h5.fontSize,
						sm: theme.typography.h4.fontSize,
						md: theme.typography.h4.fontSize,
						lg: theme.typography.h2.fontSize,
						xl: theme.typography.h2.fontSize,
					},
				}}
			>
				Top Anime by Popularity
			</Typography>

			<Grid2 container spacing={2} size={12}>
				{topList.map((anime, index) => (
					<AnimeInfoCard
						key={anime.mal_id}
						mal_id={anime.mal_id}
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
						loading={loading}
					/>
				))}
			</Grid2>
		</>
	);
}

export default Popularity;
