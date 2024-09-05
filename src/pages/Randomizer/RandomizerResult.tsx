import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid2, Skeleton, Typography } from '@mui/material';
import {
	JikanResponse,
	Anime,
	AnimeClient,
	AnimeType,
	AnimeSearchStatus,
	AnimeRating,
} from '@tutkli/jikan-ts';

import RandHeroSection from '../../components/Randomizer/RandHeroSection';
import { RandomAnime } from '../../models/randomAnime';

function RandomizerResult() {
	const location = useLocation();
	const [randomAnime, setRandomAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState(true);

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

	return (
		<Grid2 container spacing={2}>
			<RandHeroSection
				loading={loading}
				randomAnime={randomAnime as RandomAnime}
				fetchAnimeList={() => fetchAnimeList()}
			/>

			<Typography
				variant="h3"
				sx={{
					marginTop: '1rem',
					color: 'theme.palette.text.secondary',
				}}
			>
				Description
			</Typography>

			<Grid2 container spacing={2} size={12}>
				<Grid2 size={5}>
					<Typography
						variant="body1"
						marginBottom="2rem"
						sx={{
							marginTop: '1rem',
							display: '-webkit-box',
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{loading ? (
							<>
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
							</>
						) : randomAnime && randomAnime.synopsis ? (
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
				</Grid2>

				<Grid2 size={6} offset={1}>
					{randomAnime && randomAnime.trailer?.embed_url && (
						<Box
							sx={{
								marginTop: '2rem',
								position: 'relative',
								paddingTop: '56.25%',
								marginBottom: '2rem',
							}}
						>
							<iframe
								src={randomAnime.trailer.embed_url}
								title="Anime Trailer"
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									border: 'none',
								}}
								allowFullScreen
							></iframe>
						</Box>
					)}
				</Grid2>
			</Grid2>
		</Grid2>
	);
}

export default RandomizerResult;
