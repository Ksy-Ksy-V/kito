import React, { useCallback, useState } from 'react';
import {
	Autocomplete,
	debounce,
	FormControl,
	TextField,
	createFilterOptions,
	ListItem,
} from '@mui/material';
import { AnimeClient, JikanImages } from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../context/SearchContext';

interface AnimeOptionType {
	inputValue?: string;
	title: string;
	mal_id?: number;
	images?: JikanImages;
}

const SearchInputField: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const [animeOptions, setAnimeOptions] = useState<AnimeOptionType[]>([]);
	const [value, setValue] = useState('');
	const navigate = useNavigate();
	const animeClient = new AnimeClient();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedHandleAnimeOptions = useCallback(
		debounce(async (query: string) => {
			dispatch({ type: 'SET_LOADING', payload: true });
			try {
				const response = await animeClient.getAnimeSearch({
					q: query,
					limit: 10,
				});
				const options = response.data.map((anime) => ({
					title: anime.title,
					mal_id: anime.mal_id,
					images: anime.images,
				}));
				setAnimeOptions(options.slice(0, 10));
			} catch (error) {
				console.error('Failed to fetch options:', error);
			} finally {
				dispatch({ type: 'SET_LOADING', payload: false });
			}
		}, 700),
		[animeClient]
	);

	const handleInputChange = (
		_event: React.SyntheticEvent,
		newInputValue: string
	) => {
		setValue(newInputValue);
		dispatch({ type: 'SET_QUERY', payload: newInputValue });

		if (newInputValue.length >= 3) {
			debouncedHandleAnimeOptions(newInputValue);
		}
	};

	const filter = createFilterOptions<AnimeOptionType>();

	return (
		<FormControl fullWidth>
			<Autocomplete
				freeSolo
				inputValue={value}
				options={animeOptions}
				onInputChange={handleInputChange}
				onChange={(_event, newValue) => {
					if (typeof newValue === 'object' && newValue?.title) {
						navigate(`/anime/${newValue.mal_id}`);
					} else if (
						typeof newValue === 'object' &&
						newValue?.inputValue
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
					return option?.inputValue
						? option?.inputValue
						: option.title;
				}}
				loading={state.loading}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search for Anime"
						variant="outlined"
						size="small"
						sx={{
							width: {
								xl: '23rem',
								lg: '23rem',
								md: '23rem',
								sm: '18rem',
							},
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderWidth: '0.15rem',
									borderColor: {
										sm: 'primary.main',
										xs: 'secondary.main',
									},
								},
								'&:hover fieldset': {
									borderColor: 'primary.main',
								},
								'&.Mui-focused fieldset': {
									borderColor: 'primary.main',
								},
							},
							'& .MuiInputLabel-root': {
								color: {
									sm: 'primary.main',
									xs: 'secondary.main',
								},
							},
						}}
					/>
				)}
			/>
		</FormControl>
	);
};
export default SearchInputField;
