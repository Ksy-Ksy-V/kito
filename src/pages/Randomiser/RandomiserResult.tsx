import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2, Typography, Skeleton } from '@mui/material';
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
			const type =
				(queryParams.get('type') as AnimeType) || undefined;

			const status =
				(queryParams.get('status') as AnimeSearchStatus) ||
				undefined;

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
				response =
					await animeClient.getAnimeSearch({
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
		fetchAnimeList()
	};

	const handleReturnToFilter = () => {
		navigate(`/randomiser`);
	};

	return (
		<Grid2
			container
			spacing={2}
			sx={{
				minHeight: '80vh',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Grid2 size={{ xs: 3 }} offset={{ xs: 2 }}>
				{loading ? (
					<Skeleton variant="rectangular" width="100%" height={300} />
				) : randomAnime ?
					(
						<RandomCard
							title={randomAnime.title}
							imageUrl={randomAnime.images.jpg.image_url}
						/>
					) : (
						///#TODO: Add a default image
						<Skeleton variant="rectangular" width="100%" height={300} />
					)}
			</Grid2>
			<Grid2 size={{ xs: 4 }} offset={{ xs: 1 }}>
				{loading ? (
					<Skeleton variant="text" width="80%" height={40} />
				) : (
					<Typography variant="h3">
						{randomAnime ? randomAnime.title : 'Not found'}
					</Typography>
				)}
				<Typography
					variant="body1"
					// margin={loading ? 0 : '1rem'}
					marginBottom='2rem'
					marginTop='2rem'
					sx={{
						display: '-webkit-box',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						WebkitLineClamp: 9,
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
						'Sorry, no information available for provided filters.'
					)}
				</Typography>

				<Grid2 container spacing={2}>
					<Grid2 size={{ xs: 6 }}>
						<StyledButton
							onClick={handleRandomize}
							disabled={loading || !randomAnime}
						>
							Randomize
						</StyledButton>
					</Grid2>

					<Grid2 size={{ xs: 6 }}>
						<StyledButton onClick={handleReturnToFilter}>
							New Filter
						</StyledButton>
					</Grid2>
				</Grid2>
			</Grid2>
		</Grid2>
	);
}

export default RandomiserResult;
