import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	Autocomplete,
	debounce,
	FormControl,
	TextField,
	createFilterOptions,
	ListItem,
} from '@mui/material';
import {
	Anime,
	AnimeClient,
	JikanImages,
	JikanResponse,
} from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface AnimeSearchFieldProps {
	callbackAnime?: (animesList: Anime[]) => void;
	label?: string;
}

interface AnimeOptionType {
	inputValue?: string;
	title: string;
	mal_id?: number;
	images?: JikanImages;
}

const AnimeSearchField: React.FC<AnimeSearchFieldProps> = ({
	callbackAnime,
	label = 'Search for Anime',
}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const filter = createFilterOptions<AnimeOptionType>();
	const animeClient = useMemo(() => new AnimeClient(), []);

	const [animeOptions, setAnimeOptions] = useState<AnimeOptionType[]>([]);
	const [inputValue, setInputValue] = useState('');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isSearchPage = location.pathname === '/search';

	useEffect(() => {
		if (!isSearchPage) {
			setInputValue('')
		}
	}, [location, isSearchPage])

	const getQueryParams = (query: string) => {
		return new URLSearchParams(query);
	};

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

					const options = response.data.map((anime) => ({
						title: anime.title,
						mal_id: anime.mal_id,
						images: anime.images,
					}));

					setAnimeOptions(options.slice(0, 10));
					if (callbackAnime) {
						callbackAnime(response.data);
					}
				} catch (err) {
					console.error('Failed to fetch options:', err);
					setError('Something went wrong during search.');
				} finally {
					setLoading(false);
				}
			}, 700),
		[animeClient, setAnimeOptions, setError, setLoading, callbackAnime]
	);

	const handleAnimeOptions = useCallback(
		(query: string) => {
			debouncedHandleAnimeOptions(query);
		},
		[debouncedHandleAnimeOptions]
	);

	useEffect(() => {
		const queryParams = getQueryParams(location.search);
		const query = queryParams.get('q') || undefined;
		if (query) {
			setInputValue(query);
			debouncedHandleAnimeOptions(query);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	useEffect(() => { }, [inputValue]);


	return (
		<FormControl fullWidth>
			<Autocomplete
				freeSolo
				inputValue={inputValue}
				options={animeOptions}
				onChange={(_event, newValue) => {
					if (typeof newValue === 'object' && newValue?.inputValue) {
						setInputValue(newValue?.inputValue);
						navigate(`/search?q=${newValue.inputValue}`);
					} else if (
						typeof newValue === 'object' &&
						newValue?.title
					) {
						navigate(`/anime/${newValue.mal_id}`);
					}
				}}
				filterOptions={(options, params) => {
					const filtered = filter(options, params);

					const { inputValue } = params;
					const isExisting = options.some(
						(option) => inputValue === option.title
					);
					if (inputValue !== '' && !isExisting) {
						filtered.unshift({
							inputValue,
							title: `Search "${inputValue}"`,
						});
					}
					return filtered;
				}}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props;
					return (
						<ListItem
							key={key}
							{...optionProps}
							sx={{
								backgroundColor: option?.inputValue
									? 'primary.main'
									: undefined,
							}}
						>
							{!option?.inputValue && (
								<img
									src={`${option.images?.jpg.image_url}?w=164&h=164&fit=crop&auto=format`}
									alt={option.title}
									style={{
										width: '50px',
										height: '50px',
										objectFit: 'cover',
										borderRadius: '0.5rem',
										marginRight: '0.625rem',
									}}
								/>
							)}
							{option.title}
						</ListItem>
					);
				}}
				getOptionLabel={(option) => {
					if (typeof option === 'string') {
						return option;
					}
					return option?.inputValue ? option?.inputValue : option.title;
				}}
				loading={loading}
				onInputChange={(_, newInputValue, reason) => {
					if (newInputValue.length >= 3 && reason !== 'reset') {
						setInputValue(newInputValue);
						handleAnimeOptions(newInputValue);
					} else {
						setInputValue(newInputValue);
					}
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						variant="outlined"
						size="small"
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
								color: 'primary.main',
							},
						}}
					/>
				)}
			/>
		</FormControl>
	);
};

export default AnimeSearchField;
