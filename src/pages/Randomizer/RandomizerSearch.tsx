import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import {
	JikanResponse,
	Anime,
	AnimeClient,
	AnimeType,
	AnimeSearchStatus,
	AnimeRating,
} from '@tutkli/jikan-ts';

import RandHeroSection from '../../components/Randomizer/RandHeroSection';
import RandDescriptionSection from '../../components/Randomizer/RandDescriptionSection';
import { AbstractAnime } from '../../models/AbstractAnime';
import Error from '../../components/Error';
import RandNotResult from '../../components/Randomizer/RandNotResult';

function RandomizerSearch() {
	const location = useLocation();
	const [randomAnime, setRandomAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

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
				setLoading(false);
			}
		} catch (err) {
			console.error('Error fetching anime list:', err);
			setError(true);
		}
	}, [location.search]);

	useEffect(() => {
		fetchAnimeList();
	}, [fetchAnimeList]);

	if (error) {
		return <Error />;
	}

	if (!randomAnime) {
		return <RandNotResult />;
	}

	return (
		<Grid2 container spacing={2}>
			<RandHeroSection
				loading={loading}
				randomAnime={randomAnime as AbstractAnime}
				fetchAnimeList={() => fetchAnimeList()}
			/>

			<RandDescriptionSection
				loading={loading}
				randomAnime={randomAnime as AbstractAnime}
			/>
		</Grid2>
	);
}

export default RandomizerSearch;
