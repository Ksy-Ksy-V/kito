import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2, Skeleton } from '@mui/material';
import {
	JikanResponse,
	Anime,
	AnimeClient,
	AnimeType,
	AnimeSearchStatus,
	AnimeRating,
} from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';

import AnimeDetails from '../../components/Randomiser/DetailsRandomiserResult';
import RandomiserContent from './../../components/Randomiser/RandomiserContent';

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
			<RandomiserContent
				randomAnime={randomAnime}
				loading={loading}
				handleRandomize={handleRandomize}
				handleReturnToFilter={handleReturnToFilter}
			/>

			<Grid2 size={12}>
				{loading ? (
					<Skeleton variant="text" width="100%" height={80} />
				) : (
					randomAnime && (
						<AnimeDetails
							randomAnime={randomAnime}
							loading={loading}
						/>
					)
				)}
			</Grid2>
		</Grid2>
	);
}

export default RandomiserResult;
