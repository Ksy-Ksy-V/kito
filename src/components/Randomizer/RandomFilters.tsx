import React, { useState, useEffect } from 'react';
import {
	Grid2,
	useTheme,
	FormControl,
	Autocomplete,
	TextField,
	Skeleton,
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
import StyledButton from '../StyledButton';
import SelectForm from '../SelectForm';
import ClearIcon from '@mui/icons-material/Clear';

const RandomFilters = () => {
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
	const [loading, setLoading] = useState(false);
	const animeTypes: AnimeType[] = ['TV', 'Movie', 'Ova', 'Special', 'Ona'];
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
				setLoading(true);
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

		setLoading(false);
	}, [animeGenres]);

	const handleGenreChange = (
		_event: React.SyntheticEvent,
		newValue: Genre | null
	) => {
		setSelectedGenre(newValue);
	};

	const handleRandomize = () => {
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
		navigate(`/randomizer-search${queryString}`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 6 }} offset={{ xs: 3 }}>
				{loading ? (
					<Skeleton variant="rectangular" width="100%" height={56} />
				) : (
					<FormControl fullWidth variant="filled">
						<Autocomplete
							options={animeGenres}
							getOptionLabel={(option) => option.name}
							value={selectedGenre}
							clearIcon={
								<ClearIcon
									sx={[{ visibility: 'visible' }]}
									fontSize="small"
								/>
							}
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
				)}

				<SelectForm
					label="Type"
					value={selectedType}
					onChange={(event) =>
						setSelectedType(event.target.value as AnimeType)
					}
					options={animeTypes}
					clearValue={() => setSelectedType('')}
				/>

				<SelectForm
					label="Status"
					value={selectedStatus}
					onChange={(event) =>
						setSelectedStatus(
							event.target.value as AnimeSearchStatus
						)
					}
					options={animeStatuses}
					clearValue={() => setSelectedStatus('')}
					capitalizeOptions
				/>

				<SelectForm
					label="Rating"
					value={selectedRating}
					onChange={(event) =>
						setSelectedRating(event.target.value as AnimeRating)
					}
					options={animeRatings}
					clearValue={() => setSelectedRating('')}
					upperCaseOptions
				/>

				<StyledButton
					disabled={loading}
					onClick={handleRandomize}
					sx={{ marginTop: '3rem', marginBottom: '2rem' }}
				>
					Randomize
				</StyledButton>
			</Grid2>
		</Grid2>
	);
};

export default RandomFilters;
