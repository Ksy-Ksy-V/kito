import { useState } from 'react';
import {
	TextField,
	MenuItem,
	IconButton,
	Grid2,
	FormControl,
	Autocomplete,
} from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import {
	Anime,
	AnimeClient,
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
	JikanResponse,
} from '@tutkli/jikan-ts';

import theme from '../../styles/theme';
import SearchFilters from './StyledSearchFilters';
import SearchIcon from '@mui/icons-material/Search';

const SearchFilter = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [animeOptions, setAnimeOptions] = useState<Anime[]>([]);
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [selectedFormat, setSelectedFormat] = useState<AnimeType | ''>('');
	const [selectedStatus, setSelectedStatus] = useState<
		AnimeSearchStatus | ''
	>('');
	const [selectedRating, setSelectedRating] = useState<AnimeRating | ''>('');

	const handleSearch = async (query: string) => {
		setLoading(true);
		setError(null);
		try {
			const animeClient = new AnimeClient();
			const response: JikanResponse<Anime[]> =
				await animeClient.getAnimeSearch({
					q: query,
					limit: 10,
				});
			setAnimeOptions(response.data);
			setAnimeList(response.data);
			setLoading(false);
		} catch (err) {
			console.error('Failed to search anime:', err);
			setError('Something went wrong during the search.');
		}
	};

	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
		{ value: 'option4', label: 'Option 4' },
	];

	const animeFormat: AnimeType[] = ['TV', 'Movie', 'Ova', 'Special', 'Ona'];

	const animeStatuses: AnimeSearchStatus[] = [
		'airing',
		'complete',
		'upcoming',
	];

	const animeRatings: AnimeRating[] = ['g', 'pg', 'pg13', 'r17', 'r'];

	return (
		<Grid2 container size={12}>
			<Grid2 size={3}>
				<FormControl fullWidth variant="filled">
					<Autocomplete
						options={animeOptions}
						getOptionLabel={(option) => option.title}
						value={null}
						sx={{
							color: theme.palette.secondary.main,
							backgroundColor: theme.palette.primary.light,
							borderRadius: '0',
						}}
						onInputChange={(_, newInputValue) => {
							setSearchTerm(newInputValue);
							if (newInputValue) {
								handleSearch(newInputValue);
							}
						}}
						loading={loading}
						noOptionsText={
							searchTerm
								? 'No results'
								: 'What anime are you looking for?'
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search for Anime"
								variant="outlined"
								fullWidth
							/>
						)}
					/>
				</FormControl>
			</Grid2>

			<Grid2 size={2}>
				<SearchFilters
					label="Format"
					value={selectedFormat}
					onChange={(event) =>
						setSelectedFormat(event.target.value as AnimeType)
					}
					options={animeFormat}
					clearValue={() => setSelectedFormat('')}
					sx={{ BorderColor: 'theme.palette.primary.main' }}
				/>
			</Grid2>

			<Grid2 size={2}>
				<SearchFilters
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
			</Grid2>

			<Grid2 size={2}>
				<SearchFilters
					label="Rating"
					value={selectedRating}
					onChange={(event) =>
						setSelectedRating(event.target.value as AnimeRating)
					}
					options={animeRatings}
					clearValue={() => setSelectedRating('')}
					upperCaseOptions
				/>
			</Grid2>

			<Grid2 size={2}>
				<TextField
					id="outlined-select-4"
					select
					label="Filter 4"
					defaultValue={options[0].value}
					variant="outlined"
				>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</Grid2>

			<Grid2 size={1}>
				<IconButton
					color="inherit"
					sx={{
						color: theme.palette.primary.main,
						'&:hover': {
							color: theme.palette.secondary.main,
						},
					}}
				>
					<TuneOutlinedIcon sx={{ fontSize: '2rem' }} />
				</IconButton>

				<IconButton
					color="inherit"
					sx={{
						color: theme.palette.primary.main,
						'&:hover': {
							color: theme.palette.secondary.main,
						},
					}}
				>
					<SearchIcon sx={{ fontSize: '2rem' }} />
				</IconButton>
			</Grid2>
		</Grid2>
	);
};

export default SearchFilter;
