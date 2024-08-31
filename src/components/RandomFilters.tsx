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
	IconButton,
	useTheme,
} from '@mui/material';
import {
	GenresClient,
	JikanResponse,
	Genre,
	AnimeType,
	AnimeSearchStatus,
	AnimeRating,
} from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import StyledButton from './StyledButton';

const RandomFilters = () => {
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
	const animeTypes: AnimeType[] = [
		'TV',
		'Movie',
		'Ova',
		'Special',
		'Ona',
		'Music',
	];
	const animeStatuses: AnimeSearchStatus[] = [
		'airing',
		'complete',
		'upcoming',
	];
	const animeRatings: AnimeRating[] = ['g', 'pg', 'pg13', 'r17', 'r'];

	const [selectedType, setSelectedType] = useState<AnimeType | ''>('');
	const [selectedStatus, setSelectedStatus] = useState<
		AnimeSearchStatus | ''
	>('');
	const [selectedRating, setSelectedRating] = useState<AnimeRating | ''>('');
	const navigate = useNavigate();

	const theme = useTheme();

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

	const handleTypeChange = (event: SelectChangeEvent<AnimeType>) => {
		setSelectedType(event.target.value as AnimeType);
	};

	const handleStatusChange = (
		event: SelectChangeEvent<AnimeSearchStatus>
	) => {
		setSelectedStatus(event.target.value as AnimeSearchStatus);
	};

	const handleRatingChange = (event: SelectChangeEvent<AnimeRating>) => {
		setSelectedRating(event.target.value as AnimeRating);
	};

	const handleRandomise = () => {
		const queryParams: string[] = [];

		if (selectedGenre) {
			queryParams.push(`genre=${selectedGenre.mal_id}`);
		}

		if (selectedType) {
			queryParams.push(`type=${selectedType}`);
		}

		if (selectedStatus) {
			queryParams.push(`status=${selectedStatus}`);
		}
		if (selectedRating) {
			queryParams.push(`rating=${selectedRating}`);
		}

		const queryString =
			queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
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
								<li
									key={key}
									{...rest}
									onMouseEnter={(e) =>
										(e.currentTarget.style.backgroundColor =
											theme.palette.primary.main)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.backgroundColor =
											'inherit')
									}
								>
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
					<InputLabel>Type</InputLabel>
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
										<ClearIcon
											sx={{
												fontSize: '20px',
												marginRight: '20px',
											}}
										/>
									</IconButton>
								</InputAdornment>
							)
						}
					>
						{animeTypes.map((type) => (
							<MenuItem key={type} id={type} value={type}>
								{type}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth variant="filled">
					<InputLabel>Status</InputLabel>
					<Select
						value={selectedStatus}
						onChange={handleStatusChange}
						endAdornment={
							selectedType && (
								<InputAdornment position="end">
									<IconButton
										color="inherit"
										size="small"
										onClick={() => {
											setSelectedStatus('');
										}}
									>
										<ClearIcon
											sx={{
												fontSize: '20px',
												marginRight: '20px',
											}}
										/>
									</IconButton>
								</InputAdornment>
							)
						}
					>
						{animeStatuses.map((status) => (
							<MenuItem key={status} id={status} value={status}>
								{status.charAt(0).toUpperCase() +
									status.slice(1).toLowerCase()}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth variant="filled">
					<InputLabel>Rating</InputLabel>
					<Select
						value={selectedRating}
						onChange={handleRatingChange}
						endAdornment={
							selectedType && (
								<InputAdornment position="end">
									<IconButton
										color="inherit"
										size="small"
										onClick={() => {
											setSelectedRating('');
										}}
									>
										<ClearIcon
											sx={{
												fontSize: '20px',
												marginRight: '20px',
											}}
										/>
									</IconButton>
								</InputAdornment>
							)
						}
					>
						{animeRatings.map((rating) => (
							<MenuItem key={rating} id={rating} value={rating}>
								{rating.toUpperCase()}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<StyledButton
					onClick={handleRandomise}
					sx={{ marginTop: '3rem', marginBottom: '2rem' }}
				>
					Randomise
				</StyledButton>
			</Grid2>
		</Grid2>
	);
};

export default RandomFilters;
