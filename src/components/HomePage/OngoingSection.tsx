import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Typography, Grid2, Box, Link, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AnimeCard from '../AnimeCard';
import { Anime, JikanResponse, SeasonsClient } from '@tutkli/jikan-ts';
import StyledButton from '../Buttons/StyledButton';
import Error from '../Error';

const OngoingSection: React.FC = () => {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const seasonsClient = useMemo(() => new SeasonsClient(), []);

	const sectionRef = useRef<HTMLDivElement | null>(null);
	const [error, setError] = useState(false);

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
		if (!isVisible) return;

		const fetchSeasonAnime = async () => {
			try {
				setLoading(true);
				const response: JikanResponse<Anime[]> =
					await seasonsClient.getSeasonNow({
						limit: 6,
					});
				setAnimeList(response.data);
				setLoading(false);
			} catch (err) {
				console.error('Failed to fetch seasonal anime:', err);
				setError(true);
				setLoading(false);
			}
		};

		fetchSeasonAnime();
	}, [isVisible, seasonsClient]);

	if (error) {
		return <Error />;
	}

	return (
		<Box sx={{ width: '100%', marginTop: '2rem' }} ref={sectionRef}>
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
						Airing
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
					: animeList.map((anime) => (
							<Grid2
								key={anime.mal_id}
								size={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<AnimeCard
									image={anime.images.jpg.image_url}
									title={anime.title}
									mal_id={anime.mal_id}
								/>
							</Grid2>
					  ))}
			</Grid2>
		</Box>
	);
};

export default OngoingSection;
