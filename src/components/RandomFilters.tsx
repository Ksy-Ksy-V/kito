import { useState, useEffect } from 'react';
import {
	TextField,
	Grid2,
	FormControl,
	Autocomplete,
	Select,
	SelectChangeEvent,
	MenuItem,
	InputLabel,
	InputAdornment,
	IconButton
} from '@mui/material';
import { GenresClient, JikanResponse, Genre, AnimeType } from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import StyledButton from './StyledButton';

const RandomFilters = () => {
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
	const animeTypes: AnimeType[] = ['TV', 'Movie', 'Ova', 'Special', 'Ona', 'Music'];

	const [selectedType, setSelectedType] = useState<AnimeType | ''>('');
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
		if (!animeGenres || animeGenres.length === 0) {
			fetchAnimeGenres();
		}
	}, [animeGenres]);


	const handleGenreChange = (
		_event: React.SyntheticEvent,
		newValue: Genre | null
	) => {
		setSelectedGenre(newValue);
	};

	const handleTypeChange = (
		event: SelectChangeEvent<AnimeType>,
	) => {
		setSelectedType(event.target.value as AnimeType);
	};

	const handleRandomise = () => {
		const queryParams: string[] = [];
		// Add genre to query params if it's defined
		if (selectedGenre) {
			queryParams.push(`genre=${selectedGenre.mal_id}`);
		}

		// Add type to query params if it's defined
		if (selectedType) {
			queryParams.push(`type=${selectedType}`);
		}

		// Add other query params here similarly
		// if (anotherParam) {
		//     queryParams.push(`anotherParam=${anotherParam}`);
		// }

		// Construct the query string
		const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

		// Navigate to the constructed URL
		navigate(`/randomiser-search${queryString}`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 6 }} offset={{ xs: 3 }}>
				<FormControl fullWidth variant="filled">
					<Autocomplete
						options={animeGenres}
						getOptionLabel={(option) => option.name}
						value={selectedGenre}
						onChange={handleGenreChange}
						renderOption={(props, option) => {
							const { key, ...rest } = props;
							return (
								<li key={key} {...rest}>
									{option.name}
								</li>
							);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="filled"
								label="Genre"
							/>
						)}
					/>
				</FormControl>

				<FormControl fullWidth variant="filled">
					<InputLabel >Type</InputLabel>
					<Select
						value={selectedType}
						onChange={handleTypeChange}
						endAdornment={
							selectedType && (
								<InputAdornment position="end">
									<IconButton
										color="inherit"
										size="small"
										onClick={() => {
											setSelectedType('');
										}}
									>
										<ClearIcon sx={{ fontSize: '20px', marginRight: '20px' }} />
									</IconButton>
								</InputAdornment>
							)
						}
					>
						{animeTypes.map((type) => (
							<MenuItem
								key={type}
								id={type}
								value={type}
							>
								{type}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<StyledButton
					onClick={handleRandomise}
					sx={{ marginTop: '1rem' }}
				>
					Randomise
				</StyledButton>
			</Grid2 >
		</Grid2 >
	);
};

export default RandomFilters;
