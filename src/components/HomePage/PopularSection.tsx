import React, { useEffect, useState } from 'react';
import { Typography, Grid2, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PopularCard from '../PopularCard';
import { Anime, JikanResponse, TopClient } from '@tutkli/jikan-ts';
import StyledButton from '../StyledButton';

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
		<Box sx={{ width: '100%', marginTop: '2rem' }}>
			<Grid2
				container
				spacing={2}
				sx={{
					marginTop: '2rem',
				}}
			>
				<Grid2 size={4}>
					<Typography
						variant="h2"
						component={RouterLink}
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
				</Grid2>

				<Grid2 size={3} offset={5}>
					<Link
						component={RouterLink}
						to="/popularity"
						sx={{
							textDecoration: 'none',
						}}
					>
						<StyledButton
							sx={{
								backgroundColor: 'transparent',
								color: 'primary.main',
								borderColor: 'primary.main',
								marginTop: '1rem',
							}}
						>
							See more
						</StyledButton>
					</Link>
				</Grid2>
			</Grid2>

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
