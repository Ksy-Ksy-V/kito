import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	Grid2,
	Typography,
	Skeleton,
	Card,
	CardMedia,
	Box,
} from '@mui/material';
import {
	JikanResponse,
	Anime,
	AnimeClient,
	AnimeType,
	AnimeSearchStatus,
	AnimeRating,
} from '@tutkli/jikan-ts';
import StyledButton from '../../components/StyledButton';
import RandomCard from '../../components/RandomCard';
import { useNavigate } from 'react-router-dom';

import notFoundImg from '../../images/not-found.png';
import theme from '../../styles/theme';

import AnimeDetails from '../../components/Randomiser/DetailsRandomiserResult';

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { RandomAnime } from '../../models/randomAnime';

function RandomiserResult() {
	const location = useLocation();
	const [randomAnime, setRandomAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const getQueryParams = (query: string) => {
		return new URLSearchParams(query);
	};

	const getRandomPage = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const getRandomAnimeFromList = (list: Anime[]) => {
		const randomIndex = Math.floor(Math.random() * list.length);
		return list[randomIndex];
	};

	const fetchAnimeList = useCallback(async () => {
		try {
			setLoading(true);
			const animeClient = new AnimeClient();
			const queryParams = getQueryParams(location.search);
			const genre = queryParams.get('genre') || undefined;
			const type = (queryParams.get('type') as AnimeType) || undefined;

			const status =
				(queryParams.get('status') as AnimeSearchStatus) || undefined;

			const rating =
				(queryParams.get('rating') as AnimeRating) || undefined;
			const randomPage = getRandomPage(1, 5);

			let response: JikanResponse<Anime[]> =
				await animeClient.getAnimeSearch({
					page: randomPage,
					limit: 25,
					sort: 'asc',
					order_by: 'popularity',
					genres: genre,
					type,
					status,
					rating,
				});
			if (response.data.length === 0) {
				response = await animeClient.getAnimeSearch({
					page: 1,
					limit: 25,
					sort: 'asc',
					order_by: 'popularity',
					genres: genre,
					type,
					status,
					rating,
				});
			}

			if (response.data && response.data.length > 0) {
				const randomAnime = getRandomAnimeFromList(response.data);
				setRandomAnime(randomAnime);
			}
		} catch (err) {
			console.error('Error fetching anime list:', err);
		} finally {
			setLoading(false);
		}
	}, [location.search]);

	useEffect(() => {
		fetchAnimeList();
	}, [fetchAnimeList]);

	const handleRandomize = () => {
		fetchAnimeList();
	};

	const handleReturnToFilter = () => {
		navigate(`/randomiser`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={12}>
				<Box
					sx={{
						position: 'relative',
						width: '100vw',
						left: '50%',
						right: '50%',
						marginLeft: '-50vw',
						marginRight: '-50vw',
						height: '500px',
						marginTop: '2rem',
					}}
				>
					{randomAnime && (
						<Box
							sx={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								backgroundImage: `url(${randomAnime.images.jpg.large_image_url})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								zIndex: 1,
							}}
						></Box>
					)}

					<Box
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							zIndex: 2,
						}}
					></Box>

					<Grid2
						container
						spacing={2}
						sx={{
							position: 'relative',
							zIndex: 3,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Grid2 size={2} offset={3} sx={{ marginTop: '4rem' }}>
							{loading ? (
								<Skeleton
									variant="rectangular"
									width="100%"
									height={300}
								/>
							) : randomAnime ? (
								<RandomCard
									title={randomAnime.title}
									imageUrl={randomAnime.images.jpg.image_url}
								/>
							) : (
								<Card
									sx={{
										background: 'rgba(29, 51, 53, 0.51)',
										borderRadius: '8px',
										boxShadow:
											'0 4px 30px rgba(0, 0, 0, 0.1)',
										backdropFilter: 'blur(4.9px)',
										webkitBackdropFilter: 'blur(4.9px)',
										border: '1px solid rgba(29, 51, 53, 0.3)',
									}}
								>
									<CardMedia
										component="img"
										height="300"
										image={notFoundImg}
										alt="Default Image"
									/>
								</Card>
							)}
						</Grid2>
						<Grid2 size={4} offset={1} sx={{ marginTop: '5rem' }}>
							{loading ? (
								<Skeleton
									variant="text"
									width="80%"
									height={40}
								/>
							) : (
								<Box>
									<Box sx={{ display: 'flex' }}>
										<Typography variant="h3">
											{randomAnime
												? randomAnime.title
												: 'Sorry...'}
										</Typography>

										{randomAnime && randomAnime.score && (
											<Typography
												variant="h4"
												sx={{
													color: theme.palette.primary
														.main,
													marginLeft: '1rem',
													marginTop: '0.5rem',
													display: 'flex',
												}}
											>
												<StarOutlinedIcon
													sx={{
														marginTop: '0.25rem',
														marginRight: '0.25rem',
													}}
												/>
												{randomAnime.score}
											</Typography>
										)}
									</Box>

									{randomAnime && (
										<Typography
											variant="h6"
											sx={{
												marginTop: '0.5rem',
												color: theme.palette.primary
													.main,
											}}
										>
											<b>
												{randomAnime.rating?.match(
													/[A-Z0-9-]+/
												) || 'N/A'}
											</b>
										</Typography>
									)}

									<Box
										sx={{
											marginTop: '0.5rem',
											display: 'flex',
											flexWrap: 'wrap',
											gap: '0.5rem',
										}}
									>
										{randomAnime?.genres.map((genre) => (
											<Box
												key={genre.mal_id}
												sx={{
													backgroundColor:
														'rgba(29, 51, 53, 0.7)',
													padding: '0.25rem 0.5rem',
													borderRadius: '12px',
													fontSize: '0.875rem',
													display: 'inline-block',
												}}
											>
												{genre.name}
											</Box>
										))}
									</Box>
								</Box>
							)}
							<Typography
								variant="body1"
								marginBottom="2rem"
								sx={{
									marginTop: '1rem',
									display: '-webkit-box',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									WebkitLineClamp: 3,
									WebkitBoxOrient: 'vertical',
								}}
							>
								{loading ? (
									<>
										<Skeleton variant="text" />
										<Skeleton variant="text" />
										<Skeleton variant="text" />
										<Skeleton variant="text" />
									</>
								) : randomAnime ? (
									randomAnime.synopsis
								) : (
									<>
										<Typography variant="body1">
											We couldn't find matching anime.
										</Typography>
										<Typography variant="body1">
											Try changing your filter parameters
										</Typography>
									</>
								)}
							</Typography>

							<Grid2 container spacing={2}>
								<Grid2 size={6}>
									<StyledButton
										onClick={handleRandomize}
										disabled={loading || !randomAnime}
									>
										Randomize
									</StyledButton>
								</Grid2>

								<Grid2 size={6}>
									<StyledButton
										onClick={handleReturnToFilter}
									>
										New Filter
									</StyledButton>
								</Grid2>
							</Grid2>
						</Grid2>
					</Grid2>
				</Box>
			</Grid2>

			<Grid2 size={12}>
				{loading ? (
					<Skeleton variant="text" width="100%" height={80} />
				) : (
					randomAnime && (
						<AnimeDetails
							randomAnime={randomAnime as RandomAnime}
							loading={loading}
						/>
					)
				)}
			</Grid2>
		</Grid2>
	);
}

export default RandomiserResult;
