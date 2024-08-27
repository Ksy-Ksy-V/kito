import { MenuItem, Grid } from '@mui/material';
import { GenresClient, JikanResponse, Genre } from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from './StyledButton';
import StyledTextField from './SearchFilter';

const RandomFilters = () => {
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<string | ''>('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAnimeGenres = async () => {
			try {
				const genresClient = new GenresClient();
				const response: JikanResponse<Genre[]> =
					await genresClient.getAnimeGenres();
				console.log('Received genres:', response.data);
				setAnimeGenres(response.data);
			} catch (error) {
				console.error('Failed to fetch anime genres:', error);
			}
		};

		if (animeGenres.length === 0) {
			fetchAnimeGenres();
		}
	}, [animeGenres]);

	const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedGenre(event.target.value);
	};

	const handleRandomize = () => {
		navigate(`/randomizersearch?genre=${selectedGenre}`);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={3} />
			<Grid item xs={6}>
				<StyledTextField
					select
					label="Genre"
					value={selectedGenre}
					onChange={handleGenreChange}
				>
					{animeGenres.map((genre) => (
						<MenuItem key={genre.mal_id} value={genre.mal_id}>
							{genre.name}
						</MenuItem>
					))}
				</StyledTextField>
				<StyledButton onClick={handleRandomize}>Randomize</StyledButton>
			</Grid>
		</Grid>
	);
};

export default RandomFilters;
