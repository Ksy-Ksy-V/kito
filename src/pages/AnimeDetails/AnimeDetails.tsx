import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimeClient, Anime } from '@tutkli/jikan-ts';
import { Grid2, Skeleton, Typography } from '@mui/material';
import CardAnimeDetails from '../../components/AnimeDetails/CardAnimeDetails';
import YourRatingField from '../../components/YourRatingField';
import AddButton from '../../components/Buttons/AddButton';
import BackgroundAnimeDetail from '../../components/AnimeDetails/BackgroundAnimeDetail';
import RatingLabel from '../../components/AnimeDetails/RatingLabel';
import TitleInformation from '../../components/AnimeDetails/TitleInformation';
import MainInformation from '../../components/AnimeDetails/MainInformation';
import theme from '../../styles/theme';
import CharacterSection from '../../components/AnimeDetails/CharactersSection';
import SimilarTitlesSection from '../../components/AnimeDetails/SimilarTitlesSection';

function AnimeDetails() {
	const { id } = useParams<{ id: string }>();
	const [anime, setAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAnimeDetails = async () => {
			setLoading(true);
			const animeClient = new AnimeClient();
			try {
				const response = await animeClient.getAnimeFullById(Number(id));
				setAnime(response.data);
			} catch (err) {
				setError('Failed to fetch anime details.');
			}
			setLoading(false);
		};
		fetchAnimeDetails();
	}, [id]);

	return (
		<>
			<Grid2 container spacing={2} sx={{ marginTop: '2rem' }}>
				<Grid2
					size={12}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 0,
						marginTop: '7rem',
					}}
				>
					<BackgroundAnimeDetail anime={anime} loading={loading} />
				</Grid2>

				<Grid2
					size={4}
					sx={{
						position: 'relative',
						zIndex: 1,
					}}
				>
					{loading ? (
						<Skeleton variant="rectangular" height={40} />
					) : (
						<>
							<CardAnimeDetails
								title={anime?.title}
								imageUrl={anime?.images?.jpg?.image_url}
							/>
							<AddButton>Add To List</AddButton>
							<YourRatingField />
						</>
					)}
				</Grid2>

				<Grid2
					size={8}
					sx={{
						position: 'relative',
						zIndex: 1,

					}}
				>
					<Grid2 container spacing={2} size={12} justifyContent="space-between">
						<TitleInformation anime={anime} loading={loading} />
						<RatingLabel anime={anime} loading={loading} />
					</Grid2>

					<Grid2 container spacing={2} sx={{ marginTop: '12rem' }}>
						<Grid2 size={6}>
							<MainInformation anime={anime} loading={loading} />
						</Grid2>
						<Grid2 size={6}>
							<iframe
								src={anime?.trailer.embed_url}
								title="Anime Trailer"
								style={{
									border: 'none',
								}}
							></iframe>
						</Grid2>
					</Grid2>

					<Grid2 container spacing={2}>
						<Grid2 size={12}>
							<Typography
								variant="h5"
								sx={{
									color: theme.palette.text.secondary,
								}}
							>
								Description:
							</Typography>
							<Typography
								variant="body1"
								marginBottom="2rem"
								sx={{
									marginTop: '1rem',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{loading ? (
									<>
										{[...Array(6)].map((_, index) => (
											<Skeleton
												key={index}
												variant="text"
											/>
										))}
									</>
								) : (
									anime?.synopsis
								)}
							</Typography>
						</Grid2>
					</Grid2>
				</Grid2>

				<Grid2 size={12}>
					<CharacterSection anime={anime} />
				</Grid2>
				<Grid2 size={12}>
					<SimilarTitlesSection anime={anime} />
				</Grid2>

				{/*  place for a reviews section  */}

				{/* <Grid2 size={12}>
					<ReviewsSection />
				</Grid2> */}
			</Grid2>
		</>
	);
}

export default AnimeDetails;
