import { useEffect, useState } from 'react';
import {
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
	Genre,
	GenresClient,
	JikanResponse,
} from '@tutkli/jikan-ts';
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Paper,
	Typography,
} from '@mui/material';
import StyledSarchFilters from './StyledSearchFilters';
import theme from '../../styles/theme';
import StyledButton from '../StyledButton';

const SearchFilter = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

	const [selectedFormat, setSelectedFormat] = useState<AnimeType | ''>('');
	const [selectedStatus, setSelectedStatus] = useState<
		AnimeSearchStatus | ''
	>('');
	const [selectedRating, setSelectedRating] = useState<AnimeRating | ''>('');

	const animeFormat: AnimeType[] = ['TV', 'Movie', 'Ova', 'Special', 'Ona'];
	const animeStatuses: AnimeSearchStatus[] = [
		'airing',
		'complete',
		'upcoming',
	];
	const animeRatings: AnimeRating[] = ['g', 'pg', 'pg13', 'r17', 'r'];

	useEffect(() => {
		const fetchAnimeGenres = async () => {
			try {
				setLoading(true);
				const genresClient = new GenresClient();
				const response: JikanResponse<Genre[]> =
					await genresClient.getAnimeGenres('genres');
				setAnimeGenres(response.data);
			} catch (error) {
				console.error('Failed to fetch anime genres:', error);
			}
			setLoading(false);
		};
		fetchAnimeGenres();
	}, []);

	const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		setSelectedGenres((prevSelected) =>
			checked
				? [...prevSelected, value]
				: prevSelected.filter((genre) => genre !== value)
		);
	};

	useEffect(() => {
		const genresString = selectedGenres.join(', ');
		console.log('Selected genres:', genresString);
	}, [selectedGenres]);

	useEffect(() => {
		const applyAnimeFilters = () => {};
		applyAnimeFilters();
	}, [selectedFormat, selectedStatus, selectedRating, selectedGenres]);

	const handleClearFilters = () => {
		setSelectedFormat('');
		setSelectedStatus('');
		setSelectedRating('');
		setSelectedGenres([]);
		console.log('All filters cleared');
	};
	return (
		<>
			<StyledSarchFilters
				label="Format"
				value={selectedFormat}
				onChange={(event) =>
					setSelectedFormat(event.target.value as AnimeType)
				}
				options={animeFormat}
				clearValue={() => setSelectedFormat('')}
			/>

			<StyledSarchFilters
				label="Status"
				value={selectedStatus}
				onChange={(event) =>
					setSelectedStatus(event.target.value as AnimeSearchStatus)
				}
				options={animeStatuses}
				clearValue={() => setSelectedStatus('')}
				capitalizeOptions
			/>

			<StyledSarchFilters
				label="Rating"
				value={selectedRating}
				onChange={(event) =>
					setSelectedRating(event.target.value as AnimeRating)
				}
				options={animeRatings}
				clearValue={() => setSelectedRating('')}
				upperCaseOptions
			/>

			<Paper
				sx={{
					backgroundColor: theme.palette.primary.light,
					padding: '1rem',
					marginTop: '1rem',
				}}
			>
				<Typography variant="h6">Genres</Typography>
				<FormGroup>
					{animeGenres.map((genre) => (
						<FormControlLabel
							key={genre.mal_id}
							control={
								<Checkbox
									value={genre.name}
									checked={selectedGenres.includes(
										genre.name
									)}
									onChange={handleGenreChange}
								/>
							}
							label={genre.name}
						/>
					))}
				</FormGroup>

				<StyledButton
					onClick={handleClearFilters}
					sx={{ marginTop: '1rem' }}
				>
					Clean Filters
				</StyledButton>
			</Paper>
		</>
	);
};

export default SearchFilter;
