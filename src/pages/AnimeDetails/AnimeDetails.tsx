import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimeClient, Anime } from '@tutkli/jikan-ts';
import { Typography, Grid2 } from '@mui/material';

import RandCardContainer from '../../components/Randomizer/RandCardContainer';

function AnimeDetails() {
	const { id } = useParams<{ id: string }>();
	const [anime, setAnime] = useState<Anime | null>(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAnimeDetails = async () => {
			const animeClient = new AnimeClient();
			try {
				const response = await animeClient.getAnimeById(Number(id));
				setAnime(response.data);
				setLoading(false);
			} catch (err) {
				setError('Failed to fetch anime details.');
			}
		};
		fetchAnimeDetails();
	}, [id]);

	return (
		<Grid2 container spacing={2} sx={{ marginTop: '2rem' }}>
			<Grid2 size={12}>
				<RandCardContainer loading={loading} randomAnime={anime} />
			</Grid2>
		</Grid2>
	);
}

export default AnimeDetails;
