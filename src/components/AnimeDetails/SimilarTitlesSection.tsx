import React, { useEffect, useState } from 'react';
import { Typography, Grid2, Box, Link, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AnimeCard from '../AnimeCard';
import { Anime, Recommendation, AnimeClient } from '@tutkli/jikan-ts';
import StyledButton from '../Buttons/StyledButton';

interface SimilarTitlesSectionProps {
	anime: Anime | null;
}

const SimilarTitlesSection: React.FC<SimilarTitlesSectionProps> = ({
	anime,
}) => {
	const [recommendationsList, setRecommendationsList] = useState<
		Recommendation[]
	>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchRecommendation = async () => {
			if (anime === null) return;

			setLoading(true);
			const animeClient = new AnimeClient();
			try {
				const response = await animeClient.getAnimeRecommendations(
					anime.mal_id
				);
				setRecommendationsList(response.data);
				setLoading(false);
			} catch (err) {
				console.error('Failed to fetch characters:', err);
			}
		};

		fetchRecommendation();
	}, [anime]);

	return (
		<Box sx={{ width: '100%' }}>
			<Grid2 container spacing={2} sx={{ marginTop: '2rem' }}>
				<Grid2 size={4}>
					<Typography
						variant="h2"
						component={RouterLink}
						to="/"
						sx={{
							textDecoration: 'none',
							'&:hover': {
								color: 'primary.main',
							},
						}}
					>
						Similar Titles
					</Typography>
				</Grid2>

				{/* <Grid2 size={3} offset={5}>
					<Link
						component={RouterLink}
						to="/"
						sx={{ textDecoration: 'none' }}
					>
						<StyledButton
							sx={{
								backgroundColor: 'transparent',
								borderColor: 'primary.main',
								marginTop: '1rem',
							}}
						>
							See more
						</StyledButton>
					</Link>
				</Grid2> */}
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
								size={2}
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
					: recommendationsList.slice(0, 6).map((item) => (
							<Grid2
								key={item.entry.mal_id}
								size={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<AnimeCard
									image={item.entry.images.jpg.image_url}
									title={item.entry.title}
									mal_id={item.entry.mal_id}
								/>
							</Grid2>
					  ))}
			</Grid2>
		</Box>
	);
};

export default SimilarTitlesSection;
