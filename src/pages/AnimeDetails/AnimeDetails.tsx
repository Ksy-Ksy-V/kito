import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimeClient, Anime } from '@tutkli/jikan-ts';
import { Typography, Grid2, Skeleton } from '@mui/material';

import CardAnimeDetails from '../../components/AnimeDetails/CardAnimeDetails';
import YourRaitingField from '../../components/YourRaitingField';
import StyledButton from '../../components/StyledButton';

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
				const response = await animeClient.getAnimeById(Number(id));
				setAnime(response.data);
			} catch (err) {
				setError('Failed to fetch anime details.');
			}
			setLoading(false);
		};
		fetchAnimeDetails();
	}, [id]);

	return (
		<Grid2 container spacing={2} sx={{ marginTop: '2rem' }}>
			<Grid2 size={3} offset={1} sx={{ position: 'relative', zIndex: 1 }}>
				{loading ? (
					<>
						<Skeleton variant="text" width="80%" height={40} />
					</>
				) : (
					<>
						<Typography>{anime?.title_english}</Typography>

						<CardAnimeDetails
							imageUrl={anime?.images?.jpg?.image_url}
							title={anime?.title}
						/>
						<StyledButton
							sx={{
								backgroundColor: 'transparent',
								borderColor: 'primary.main',
								marginTop: '1rem',
								marginBottom: '1rem',
								height: '56px',
							}}
						>
							Add To List
						</StyledButton>
						<YourRaitingField />
					</>
				)}
			</Grid2>
		</Grid2>
	);
}

export default AnimeDetails;
