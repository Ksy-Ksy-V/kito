import React, { useEffect, useState } from 'react';
import { Typography, Grid2, Box, Link, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AnimeCard from '../Cards/AnimeCard';
import { Anime, JikanResponse, TopClient } from '@tutkli/jikan-ts';
import MainButton from '../Buttons/MainButton';
import Error from '../Error';
import theme from '../../styles/theme';

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
							fontSize: {
								xs: theme.typography.h4.fontSize,
								sm: theme.typography.h3.fontSize,
								md: theme.typography.h2.fontSize,
								lg: theme.typography.h2.fontSize,
								xl: theme.typography.h2.fontSize,
							},
							textDecoration: 'none',
							'&:hover': {
								color: 'primary.main',
							},
						}}
					>
						Popularity
					</Typography>
				</Grid2>

				<Grid2
					size={{ xs: 6, sm: 3, md: 3, lg: 3 }}
					offset={{ xs: 2, sm: 5, md: 5, lg: 5 }}
				>
					<Link
						component={RouterLink}
						to="/popular"
						sx={{
							textDecoration: 'none',
						}}
					>
						<MainButton
							sx={{
								backgroundColor: 'transparent',
								color: 'primary.main',
								borderColor: 'primary.main',
								marginTop: {
									xl: '1rem',
									lg: '1rem',
									md: '1rem',
									sm: '0.5rem',
									xs: '0.25rem',
								},
							}}
						>
							See more
						</MainButton>
					</Link>
				</Grid2>
			</Grid2>

			<Grid2
				container
				spacing={2}
				sx={{
					marginTop: '2rem',
				}}
			>
				{loading
					? [...Array(6)].map((_, index) => (
							<Grid2
								key={index}
								size={{ xs: 6, sm: 3, md: 3, lg: 2 }}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Skeleton
									variant="rectangular"
									width={170}
									height={250}
								/>
							</Grid2>
					  ))
					: topList.map((anime) => (
							<Grid2
								key={anime.mal_id}
								size={{ xs: 6, sm: 3, md: 3, lg: 2 }}
								sx={{
									display: 'flex',
									alignContent: 'flex-start',
									alignItems: 'flex-start',
								}}
							>
								<AnimeCard
									image={anime.images.jpg.image_url}
									isTitle={true}
									title={anime.title}
									mal_id={anime.mal_id}
								/>
							</Grid2>
					  ))}
			</Grid2>
		</Box>
	);
};

export default PopularSection;
