import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Typography, Grid2, Box, Skeleton, useMediaQuery } from '@mui/material';
import AnimeCard from '../Cards/AnimeCard';
import { Anime, Recommendation, AnimeClient } from '@tutkli/jikan-ts';
import theme from '../../styles/theme';

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
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const animeClient = useMemo(() => new AnimeClient(), []);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const fetchRecommendation = async () => {
			if (!isVisible || !anime) return;

			setLoading(true);
			try {
				const response = await animeClient.getAnimeRecommendations(
					anime.mal_id
				);
				setRecommendationsList(response.data);
			} catch (err) {
				console.error('Failed to fetch recommendations:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchRecommendation();
	}, [isVisible, anime, animeClient]);

	if (isVisible && recommendationsList.length === 0) {
		return null;
	}

	return (
		<Box sx={{ width: '100%' }} ref={sectionRef}>
			<Grid2 container spacing={2} sx={{ marginTop: '2rem' }}>
				<Grid2 size={4}>
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="12rem"
							height="2.5rem"
						/>
					) : (
						<Typography
							variant={isLargeScreen ? 'h3' : 'h4'}
							sx={{
								color: theme.palette.secondary.main,
							}}
						>
							Similar Titles
						</Typography>
					)}
				</Grid2>
			</Grid2>
			<Grid2
				container
				spacing={2}
				sx={{
					marginTop: '2rem',

					display: 'flex',
					alignContent: 'flex-start',
					alignItems: 'flex-start',
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
					: recommendationsList.slice(0, 6).map((item) => (
							<Grid2
								key={item.entry.mal_id}
								size={{ xs: 6, sm: 3, md: 3, lg: 2 }}
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
