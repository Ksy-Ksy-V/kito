import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimeClient, Anime } from '@tutkli/jikan-ts';
import Error from '../../components/Error';
import AnimeDetail from '../../components/AnimeDetailsComponent';

function AnimeDetails() {
	const { id } = useParams<{ id: string }>();
	const [anime, setAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

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

	console.log(anime);

	return <AnimeDetail loading={loading} anime={anime} />;
}

export default AnimeDetails;
