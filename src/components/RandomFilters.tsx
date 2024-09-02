import { useState, useEffect } from 'react';
import {
	TextField,
	Checkbox,
	Grid2,
	FormControl,
	Autocomplete,
	Chip,
} from '@mui/material';
import { GenresClient, JikanResponse, Genre } from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';
import StyledButton from './StyledButton';

const RandomFilters = () => {
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAnimeGenres = async () => {
			try {
				const genresClient = new GenresClient();
				const response: JikanResponse<Genre[]> =
					await genresClient.getAnimeGenres();
				setAnimeGenres(response.data);
			} catch (error) {
				console.error('Failed to fetch anime genres:', error);
			}
		};

		if (animeGenres.length === 0) {
			fetchAnimeGenres();
		}
	}, [animeGenres]);

	const handleGenreChange = (
		_event: React.SyntheticEvent,
		newValue: Genre[]
	) => {
		if (newValue.length <= 3) {
			setSelectedGenres(newValue);
		}
	};

	const handleRandomise = () => {
		const selectedGenresQuery = selectedGenres
			.map((genre) => genre.mal_id)
			.join(',');
		navigate(`/randomisersearch?genre=${selectedGenresQuery}`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 6 }} offset={{ xs: 3 }}>
				<FormControl fullWidth variant="filled">
					<Autocomplete
						multiple
						options={animeGenres}
						disableCloseOnSelect
						getOptionLabel={(option) => option.name}
						value={selectedGenres}
						onChange={handleGenreChange}
						limitTags={3}
						renderTags={(value, getTagProps) =>
							value
								.slice(0, 3)
								.map((option, index) => (
									<Chip
										label={option.name}
										{...getTagProps({ index })}
									/>
								))
						}
						renderOption={(props, option, { selected }) => (
							<li {...props}>
								<Checkbox
									checked={selected}
									sx={{
										color: 'primary.main',
									}}
								/>
								{option.name}
							</li>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="filled"
								label="Genres"
								placeholder="Select 3 or less"
							/>
						)}
					/>
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
