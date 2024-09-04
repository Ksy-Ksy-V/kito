import React, { useEffect, useState } from 'react';
import { Typography, Grid2, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PopularCard from '../PopularCard';
import { Anime, JikanResponse, SeasonsClient } from '@tutkli/jikan-ts';
import StyledButton from '../StyledButton';

const OngoingSection: React.FC = () => {
	const [animeList, setAnimeList] = useState<Anime[]>([]);

	useEffect(() => {
		const seasonsClient = new SeasonsClient();

		const fetchSeasonAnime = async () => {
			try {
				const response: JikanResponse<Anime[]> =
					await seasonsClient.getSeasonNow({
						limit: 6,
					});

				setAnimeList(response.data);
			} catch (err) {
				console.error('Failed to fetch seasonal anime:', err);
			}
		};

		fetchSeasonAnime();
	}, []);

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
						to="/airing"
						sx={{
							textDecoration: 'none',
							'&:hover': {
								color: 'primary.main',
							},
						}}
					>
						This season
					</Typography>
				</Grid2>

				<Grid2 size={3} offset={5}>
					<Link
						component={RouterLink}
						to="/airing"
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
				{animeList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						size={2}
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

export default OngoingSection;
