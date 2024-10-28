import { Typography, Grid2, Skeleton } from '@mui/material';

import RandomFilters from '../../components/Randomizer/RandomFilters';
import theme from '../../styles/theme';
import { Genre, GenresClient, JikanResponse } from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';
import Error from '../../components/Error';

function Randomizer() {
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchAnimeGenres = async () => {
			try {
				setLoading(true);
				const genresClient = new GenresClient();
				const response: JikanResponse<Genre[]> =
					await genresClient.getAnimeGenres();
				setAnimeGenres(response.data);
			} catch (error) {
				console.error('Failed to fetch anime genres:', error);
				setError(true);
				setLoading(false);
			}
		};
		if (!animeGenres || animeGenres.length === 0) {
			fetchAnimeGenres();
		}

		setLoading(false);
	}, [animeGenres]);

	if (error) {
		return <Error />;
	}

	return (
		<Grid2
			container
			spacing={2}
			sx={{
				minHeight: '70vh',
			}}
		>
			<Grid2
				size={{ xs: 12 }}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{loading ? (
					<Skeleton
						variant="rectangular"
						width={'60%'}
						height={50}
						sx={{ marginTop: '2rem' }}
					/>
				) : (
					<Typography
						variant="h1"
						sx={{
							textAlign: 'center',
							marginTop: '2rem',
							marginBottom: '2rem',
							color: theme.palette.secondary.main,
							fontSize: {
								xs: theme.typography.h4.fontSize,
								sm: theme.typography.h3.fontSize,
								md: theme.typography.h2.fontSize,
								lg: theme.typography.h2.fontSize,
								xl: theme.typography.h1.fontSize,
							},
						}}
					>
						Choose Your Preferences
					</Typography>
				)}
			</Grid2>
			<Grid2
				size={{ xs: 12 }}
				sx={{
					marginBottom: '3rem',
				}}
			>
				<RandomFilters loading={loading} animeGenres={animeGenres} />
			</Grid2>
		</Grid2>
	);
}

export default Randomizer;
