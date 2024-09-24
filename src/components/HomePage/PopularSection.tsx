import React, { useEffect, useState } from 'react';
import { Typography, Grid2, Box, Link, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AnimeCard from '../AnimeCard';
import { Anime, JikanResponse, TopClient } from '@tutkli/jikan-ts';
import StyledButton from '../StyledButton';
import Error from '../Error';

const PopularSection: React.FC = () => {
	const [topList, setTopList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const top = new TopClient();
		const fetchTopAnime = async () => {
			try {
				setLoading(true);
				const response: JikanResponse<Anime[]> = await top.getTopAnime({
					page: 1,
					limit: 6,
				});

				setTopList(response.data);
				setLoading(false);
			} catch (err) {
				console.error('Failed to fetch anime:', err);
				setError(true);
				setLoading(false);
			}
		};

		fetchTopAnime();
	}, []);

	if (error) {
		return <Error />;
	}

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
						to="/popular"
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
						to="/popular"
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
				{loading
					? [...Array(6)].map((_, index) => (
							<Grid2
								key={index}
								size={{ xs: 2 }}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Skeleton
									variant="rectangular"
									width={150}
									height={250}
								/>
							</Grid2>
					  ))
					: topList.map((anime) => (
							<Grid2
								key={anime.mal_id}
								size={{ xs: 2 }}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<AnimeCard
									image={anime.images.jpg.image_url}
									title={anime.title}
								/>
							</Grid2>
					  ))}
			</Grid2>
		</Box>
	);
};

export default PopularSection;
