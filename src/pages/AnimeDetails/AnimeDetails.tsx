import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimeClient, Anime } from '@tutkli/jikan-ts';
import { Grid2, Skeleton, Typography, useMediaQuery } from '@mui/material';
import CardAnimeDetails from '../../components/Cards/CardAnimeDetails';
import YourRatingField from '../../components/Buttons/YourRatingField';
import AddButton from '../../components/Buttons/AddButton';
import RatingLabel from '../../components/AnimeDetails/RatingLabel';
import TitleInformation from '../../components/AnimeDetails/TitleInformation';
import MainInformation from '../../components/AnimeDetails/MainInformation';
import theme from '../../styles/theme';
import CharacterSection from '../../components/AnimeDetails/CharactersSection';
import SimilarTitlesSection from '../../components/AnimeDetails/SimilarTitlesSection';
import Error from '../../components/Error';
import BackgroundImg from '../../components/BackgroundImg';

function AnimeDetails() {
	const { id } = useParams<{ id: string }>();
	const [anime, setAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
	const isPhone = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		const fetchAnimeDetails = async () => {
			setLoading(true);
			const animeClient = new AnimeClient();
			try {
				const response = await animeClient.getAnimeFullById(Number(id));
				setAnime(response.data);
				setLoading(false);
			} catch (err) {
				console.error('Failed to fetch anime:', err);
				setError(true);
				setLoading(false);
			}
			setLoading(false);
		};
		fetchAnimeDetails();
	}, [id]);

	if (error) {
		return <Error />;
	}

	return (
		<>
			<Grid2
				container
				spacing={2}
				sx={{
					marginTop: '2rem',
				}}
			>
				<Grid2
					size={12}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 0,
						marginTop: '4rem',
					}}
				>
					<BackgroundImg
						anime={anime}
						loading={loading}
						height={'31.25rem'}
					/>
				</Grid2>

				{isLargeScreen && (
					<Grid2
						size={4}
						sx={{
							zIndex: 1,
							display: 'flex',
							justifyContent: {
								xs: 'center',
								sm: 'normal',
							},
							flexDirection: 'column',
							marginTop: '1rem',
						}}
					>
						{loading ? (
							<Skeleton
								variant="rectangular"
								sx={{
									width: '17rem',
									height: '25rem',
								}}
							/>
						) : (
							<>
								<CardAnimeDetails
									title={anime?.title}
									imageUrl={anime?.images?.jpg?.image_url}
									loading={loading}
								/>
								<AddButton
									loading={loading}
									sx={{
										width: {
											xs: '11rem',
											sm: '12rem',
											md: '14rem',
										},
										marginTop: '1rem',
									}}
								>
									Add To List
								</AddButton>
								<YourRatingField loading={loading} />
							</>
						)}
					</Grid2>
				)}

				<Grid2
					size={{ xs: 12, sm: 6, md: 8 }}
					sx={{
						zIndex: 1,
					}}
				>
					<Grid2
						container
						spacing={2}
						size={12}
						sx={{
							flexDirection: 'row',
							justifyContent: {
								xs: 'center',
								sm: 'flex-start',
								md: 'space-between',
							},
						}}
					>
						<TitleInformation anime={anime} loading={loading} />
						{isPhone && (
							<RatingLabel anime={anime} loading={loading} />
						)}

						{!isLargeScreen && (
							<Grid2
								size={{ xs: 12, sm: 6 }}
								sx={{
									zIndex: 1,
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'column',
								}}
							>
								{loading ? (
									<Skeleton
										variant="rectangular"
										width="17rem"
										height="25rem"
									/>
								) : (
									<>
										<CardAnimeDetails
											title={anime?.title}
											loading={loading}
											imageUrl={
												anime?.images?.jpg?.image_url
											}
										/>
										<AddButton
											loading={loading}
											sx={{
												marginTop: '1rem',
												width: {
													xs: '11rem',
													sm: '12rem',
													md: '14rem',
												},
											}}
										>
											Add To List
										</AddButton>
										<YourRatingField />
									</>
								)}
							</Grid2>
						)}

						<Grid2 size={12}>
							<MainInformation anime={anime} loading={loading} />

							{loading ? (
								!isLargeScreen &&
								anime?.trailer.embed_url && (
									<>
										<Skeleton
											variant="rectangular"
											width="12rem"
											height="2.5rem"
											sx={{ marginBottom: '2rem' }}
										/>
										<Skeleton
											variant="rectangular"
											sx={{
												width: {
													xs: '20rem',
													sm: '20rem',
													md: '35rem',
													lg: '50rem',
												},
												height: {
													xs: '15rem',
													sm: '15rem',
													md: '25rem',
													lg: '30rem',
												},
											}}
										/>
									</>
								)
							) : (
								<>
									{!isLargeScreen &&
										anime?.trailer.embed_url && (
											<>
												<Typography
													variant={
														isLargeScreen
															? 'h3'
															: 'h4'
													}
													sx={{
														color: theme.palette
															.text.secondary,
														marginBottom: '2rem',
														marginTop: '2rem',
													}}
												>
													Trailer:
												</Typography>
												<iframe
													width="100%"
													height="200"
													loading="lazy"
													allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
													allowFullScreen
													src={`${anime?.trailer.embed_url}?autoplay=0`}
													title="Anime Trailer"
													style={{
														border: 'none',
													}}
												></iframe>
											</>
										)}
								</>
							)}
						</Grid2>
					</Grid2>

					<Grid2 container spacing={2}>
						<Grid2 size={12} sx={{ marginTop: '2rem' }}>
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
										color: theme.palette.text.secondary,
										marginTop: '2rem',
									}}
								>
									Description:
								</Typography>
							)}
							<Typography
								variant="body1"
								marginTop="2rem"
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
												width="50rem"
												height="2.5rem"
											/>
										))}
									</>
								) : (
									anime?.synopsis
								)}
							</Typography>
						</Grid2>
					</Grid2>
					{isLargeScreen && anime?.trailer.embed_url && (
						<Grid2 size={{ xs: 12 }} sx={{ marginTop: '1rem' }}>
							{loading ? (
								<>
									<Skeleton
										variant="rectangular"
										width="12rem"
										height="2.5rem"
										sx={{ marginBottom: '2rem' }}
									/>
									<Skeleton
										variant="rectangular"
										width="50rem"
										height="25rem"
									/>
								</>
							) : (
								<>
									<Typography
										variant="h3"
										sx={{
											color: theme.palette.text.secondary,
											marginBottom: '2rem',
										}}
									>
										Trailer:
									</Typography>
									<iframe
										width="100%"
										height="350"
										loading="lazy"
										allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										src={`${anime?.trailer.embed_url}?autoplay=0`}
										title="Anime Trailer"
										style={{
											border: 'none',
										}}
									></iframe>
								</>
							)}
						</Grid2>
					)}
				</Grid2>

				<Grid2
					size={12}
					sx={{
						display: 'flex',
						alignContent: 'flex-start',
						alignItems: 'flex-start',
					}}
				>
					<CharacterSection anime={anime} />
				</Grid2>
				<Grid2
					size={12}
					sx={{
						display: 'flex',
						alignContent: 'flex-start',
						alignItems: 'flex-start',
					}}
				>
					<SimilarTitlesSection anime={anime} />
				</Grid2>
			</Grid2>
		</>
	);
}

export default AnimeDetails;
