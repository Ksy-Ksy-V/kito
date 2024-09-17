import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	Autocomplete,
	debounce,
	FormControl,
	TextField,
	createFilterOptions,
} from '@mui/material';
import { Anime, AnimeClient, JikanResponse } from '@tutkli/jikan-ts';

interface AnimeSearchFieldProps {
	callbackSearch: (value: string) => void;
	label?: string;
}

const AnimeSearchField: React.FC<AnimeSearchFieldProps> = ({
	callbackSearch,
	label = 'Search for Anime',
}) => {
	const filter = createFilterOptions<Anime>();
	const [animeOptions, setAnimeOptions] = useState<Anime[]>([]);
	const [inputValue, setInputValue] = useState('');
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
							limit: 25,
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

	useEffect(() => {
		console.log(inputValue, 'inputValue');
		callbackSearch(inputValue);
	}, [callbackSearch, inputValue]);

	return (
		<FormControl fullWidth>
			<Autocomplete
				freeSolo
				options={animeOptions}
				filterOptions={(options, params) => {
					const filtered = filter(options, params);

					const { inputValue } = params;
					const isExisting = options.some(
						(option) => inputValue === option.title
					);
					if (inputValue !== '' && !isExisting) {
						filtered.push({
							inputValue,
							title: `Search "${inputValue}"`,
						});
					}
					return filtered;
				}}
				getOptionLabel={(option) => {
					return typeof option === 'string' ? option : option.title;
				}}
				loading={loading}
				onInputChange={(_, newInputValue, reason) => {
					if (newInputValue.length >= 3 && reason !== 'reset') {
						setInputValue(newInputValue);
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
