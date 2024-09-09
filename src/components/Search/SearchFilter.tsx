import { useState, useEffect } from 'react';
import {
	TextField,
	MenuItem,
	IconButton,
	Grid2,
	FormControl,
	Autocomplete,
} from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { Anime, AnimeClient, JikanResponse } from '@tutkli/jikan-ts';

const SearchFilter = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [animeOptions, setAnimeOptions] = useState<Anime[]>([]);
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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

	return (
		<Grid2 container spacing={2} size={12}>
			<Grid2 size={3}>
				<FormControl fullWidth variant="filled">
					<Autocomplete
						options={animeOptions}
						getOptionLabel={(option) => option.title}
						value={null}
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
				<TextField
					id="outlined-select-1"
					select
					label="Filter 1"
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

			<Grid2 size={2}>
				<TextField
					id="outlined-select-2"
					select
					label="Filter 2"
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

			<Grid2 size={2}>
				<TextField
					id="outlined-select-3"
					select
					label="Filter 3"
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
					// onClick={handleMenuClick}
					// sx={{
					// 	color: theme.palette.primary.main,
					// 	'&:hover': {
					// 		color: theme.palette.secondary.main,
					// 	},
					// }}
				>
					<TuneOutlinedIcon sx={{ fontSize: '1.5rem' }} />
				</IconButton>
			</Grid2>
		</Grid2>
	);
};

export default SearchFilter;
