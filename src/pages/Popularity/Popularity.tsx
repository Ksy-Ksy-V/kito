import { useEffect, useState } from 'react';
import { Typography, Grid2, Skeleton } from '@mui/material';
import { TopClient, JikanResponse, Anime } from '@tutkli/jikan-ts';
import AnimeInfoCard from '../../components/Popularity/AnimeInfoCard';

import Error from '../../components/Error';
import theme from '../../styles/theme';
import Slider from '../../components/Popularity/Slider';

function Popularity() {
	const top = new TopClient();
	const [topList, setTopList] = useState<Anime[]>([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchTopAnime = async () => {
			setLoading(false);
			try {
				const response: JikanResponse<Anime[]> = await top.getTopAnime({
					page: 1,
					limit: 25,
				});

				setTopList(response.data);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [topList, TopClient]);

	if (error) {
		return <Error />;
	}

	return (
		<>
			<Slider />

			{loading ? (
				<Skeleton
					variant="rectangular"
					width="100%"
					height="4rem"
					sx={{
						marginTop: '2rem',
						marginBottom: '2rem',
					}}
				/>
			) : (
				<Typography
					variant="h2"
					sx={{
						textAlign: 'center',
						marginTop: '2rem',
						marginBottom: '2rem',
						fontSize: {
							xs: theme.typography.h4.fontSize,
							sm: theme.typography.h3.fontSize,
							md: theme.typography.h2.fontSize,
							lg: theme.typography.h1.fontSize,
							xl: theme.typography.h1.fontSize,
						},
					}}
				>
					Top Anime by Popularity
				</Typography>
			)}

			<Grid2 container spacing={2} size={12}>
				{topList.map((anime, index) => (
					<AnimeInfoCard
						key={anime.mal_id}
						anime={anime}
						number={index + 1}
						loading={loading}
					/>
				))}
			</Grid2>
		</>
	);
}

export default Popularity;
