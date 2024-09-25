import React, { useEffect, useState } from 'react';
import { Typography, Grid2, Box, Skeleton, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AnimeCard from '../AnimeCard';
import { Anime, AnimeCharacter, AnimeClient } from '@tutkli/jikan-ts';
import theme from '../../styles/theme';

interface CharacterSectionProps {
	anime: Anime | null;
}

const CharacterSection: React.FC<CharacterSectionProps> = ({ anime }) => {
	const [characters, setCharacters] = useState<AnimeCharacter[]>([]);
	const [loading, setLoading] = useState(false);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const fetchCharacters = async () => {
			if (anime === null) return;

			setLoading(true);
			const animeClient = new AnimeClient();
			try {
				const response = await animeClient.getAnimeCharacters(
					anime.mal_id
				);
				setCharacters(response.data);
			} catch (err) {
				console.error('Failed to fetch characters:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchCharacters();
	}, [anime]);

	if (!loading && characters.length === 0) {
		return null;
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Grid2 container spacing={2}>
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
							component={RouterLink}
							to="/"
							sx={{
								color: theme.palette.text.secondary,
								textDecoration: 'none',
								'&:hover': {
									color: 'primary.main',
								},
							}}
						>
							Characters
						</Typography>
					)}
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
					: characters.slice(0, 6).map((character) => (
							<Grid2
								key={character.character.mal_id}
								size={{ xs: 6, sm: 3, md: 3, lg: 2 }}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<AnimeCard
									image={
										character.character.images.jpg.image_url
									}
									title={character.character.name}
									mal_id={character.character.mal_id}
								/>
							</Grid2>
					  ))}
			</Grid2>
		</Box>
	);
};

export default CharacterSection;
