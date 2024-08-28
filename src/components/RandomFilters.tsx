import {
	MenuItem,
	Select,
	Grid2,
	InputLabel,
	FormControl,
	SelectChangeEvent,
} from '@mui/material';
import { GenresClient, JikanResponse, Genre } from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from './StyledButton';

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

	const handleGenreChange = (event: SelectChangeEvent<string>) => {
		setSelectedGenre(event.target.value as string);
	};

	const handleRandomise = () => {
		navigate(`/randomisersearch?genre=${selectedGenre}`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 6 }} offset={{ xs: 3 }}>
				<FormControl fullWidth variant="filled">
					<InputLabel>Genre</InputLabel>
					<Select
						value={selectedGenre}
						onChange={handleGenreChange}
						label="Genre"
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 200,
									width: 'auto',
								},
							},
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left',
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'left',
							},
						}}
					>
						{animeGenres.map((genre) => (
							<MenuItem key={genre.mal_id} value={genre.mal_id}>
								{genre.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth variant="filled">
					<InputLabel>Airing status</InputLabel>
					<Select
						value={selectedGenre}
						onChange={handleGenreChange}
						label="Genre"
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 200,
									width: 'auto',
								},
							},
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left',
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'left',
							},
						}}
					></Select>
				</FormControl>

				<FormControl fullWidth variant="filled">
					<InputLabel>Format</InputLabel>
					<Select
						value={selectedGenre}
						onChange={handleGenreChange}
						label="Genre"
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 200,
									width: 'auto',
								},
							},
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left',
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'left',
							},
						}}
					></Select>
				</FormControl>

				<FormControl fullWidth variant="filled">
					<InputLabel>Rating</InputLabel>
					<Select
						value={selectedGenre}
						onChange={handleGenreChange}
						label="Genre"
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 200,
									width: 'auto',
								},
							},
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left',
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'left',
							},
						}}
					></Select>
				</FormControl>

				<FormControl fullWidth variant="filled">
					<InputLabel>Episodes</InputLabel>
					<Select
						value={selectedGenre}
						onChange={handleGenreChange}
						label="Genre"
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 200,
									width: 'auto',
								},
							},
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left',
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'left',
							},
						}}
					></Select>
				</FormControl>

				<StyledButton
					onClick={handleRandomise}
					sx={{ marginTop: '1rem' }}
				>
					Randomise
				</StyledButton>
			</Grid2>
		</Grid2>
	);
};

export default RandomFilters;
