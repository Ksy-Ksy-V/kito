import React, { useEffect, useState } from 'react';
import { Typography, Grid2, Box } from '@mui/material';
import { Link } from 'react-router-dom';
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
					limit: 6,
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
		<Box sx={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}>
			<Typography
				variant="h2"
				component={Link}
				to="/popularity"
				sx={{
					textDecoration: 'none',

					'&:hover': {
						color: 'primary.main',
					},
				}}
			>
				Popular
			</Typography>

			<Grid2
				container
				spacing={2}
				sx={{
					marginTop: '2rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{topList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						size={{ xs: 2 }}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
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
		</Box>
	);
};

export default PopularSection;
