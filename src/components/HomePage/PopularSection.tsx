import React, { useEffect, useState } from 'react';
import { Typography, Grid2 } from '@mui/material';
import PopularCard from '../PopularCard';
import { Anime, JikanResponse, TopClient } from '@tutkli/jikan-ts';

const PopularSection: React.FC = () => {
	const [topList, setTopList] = useState<Anime[]>([]);

	useEffect(() => {
		const top = new TopClient();
		const fetchTopAnime = async () => {
			try {
				const response: JikanResponse<Anime[]> = await top.getTopAnime({
					page: 1,
					limit: 5,
				});

				setTopList(response.data);
			} catch (err) {
				console.error('Failed to fetch anime:', err);
			}
		};

		if (topList.length === 0) {
			fetchTopAnime();
		}
	}, [topList]);

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }} sx={{ marginTop: '2rem' }}>
				<Typography variant="h2">Popular</Typography>
			</Grid2>

			{topList.map((anime) => (
				<Grid2
					key={anime.mal_id}
					size={{ xs: 2 }}
					sx={{ marginTop: '2rem' }}
				>
					<PopularCard
						thumbnailImage={anime.images.jpg.image_url}
						title={anime.title}
						onClick={() => {
							console.log(`Redirect to ${anime.url}`);
						}}
					/>
				</Grid2>
			))}
		</Grid2>
	);
};

export default PopularSection;
