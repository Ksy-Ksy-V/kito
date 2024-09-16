import React, { useCallback, useMemo, useState } from 'react';
import { Autocomplete, debounce, FormControl, TextField } from '@mui/material';
import { Anime, AnimeClient, JikanResponse } from '@tutkli/jikan-ts';

interface AnimeSearchFieldProps {
	searchTerm: string;
	setSearchTerm: (value: string) => void;

	label?: string;
}

const AnimeSearchField: React.FC<AnimeSearchFieldProps> = ({
	setSearchTerm,
	label = 'Search for Anime',
}) => {
	const [animeOptions, setAnimeOptions] = useState<Anime[]>([]);
	const animeClient = useMemo(() => new AnimeClient(), []);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const debouncedHandleAnimeOptions = useMemo(
		() =>
			debounce(async (query: string) => {
				setLoading(true);
				setError(null);
				try {
					const response: JikanResponse<Anime[]> =
						await animeClient.getAnimeSearch({
							q: query,
							limit: 10,
						});
					setAnimeOptions(response.data);
				} catch (err) {
					console.error('Failed to fetch options:', err);
					setError('Something went wrong during search.');
				} finally {
					setLoading(false);
				}
			}, 500),
		[animeClient, setAnimeOptions, setError, setLoading]
	);

	const handleAnimeOptions = useCallback(
		(query: string) => {
			debouncedHandleAnimeOptions(query);
		},
		[debouncedHandleAnimeOptions]
	);

	return (
		<FormControl fullWidth>
			<Autocomplete
				freeSolo
				options={animeOptions}
				getOptionLabel={(option) => {
					return typeof option === 'string' ? option : option.title;
				}}
				loading={loading}
				onInputChange={(_, newInputValue, reason) => {
					if (newInputValue.length >= 4 && reason !== 'reset') {
						setSearchTerm(newInputValue);
						handleAnimeOptions(newInputValue);
					}
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						variant="outlined"
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderWidth: '0.15rem',
									borderColor: 'primary.main',
								},
								'&:hover fieldset': {
									borderColor: 'primary.main',
								},
								'&.Mui-focused fieldset': {
									borderColor: 'primary.main',
								},
							},
							'& .MuiInputLabel-root': {
								color: 'secondary.main',
							},
						}}
					/>
				)}
			/>
		</FormControl>
	);
};

export default AnimeSearchField;
