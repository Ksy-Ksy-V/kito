import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	Autocomplete,
	debounce,
	FormControl,
	TextField,
	createFilterOptions,
	ListItem,
} from '@mui/material';
import { JikanImages } from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../context/SearchContext';
import { animeService } from '../../services/animeService';
import { buildQueryParams } from '../../utils/urlParams';

interface AnimeOptionType {
	inputValue?: string;
	title: string;
	mal_id?: number;
	images?: JikanImages;
}

const SearchInputField: React.FC = () => {
	const [animeOptions, setAnimeOptions] = useState<AnimeOptionType[]>([]);
	const [value, setValue] = useState('');
	const navigate = useNavigate();

	const isSearchPage = location.pathname === '/search';

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const context = isSearchPage ? useSearchContext() : null;
	const dispatch = context ? context.dispatch : null;

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const queryFromUrl = urlParams.get('q') || '';
		setValue(queryFromUrl);

		if (dispatch) {
			dispatch({ type: 'SET_QUERY', payload: queryFromUrl });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedHandleAnimeOptions = useCallback(
		debounce(async (query: string) => {
			try {
				const options = await animeService.searchAnime(query, 10);
				setAnimeOptions(options.data);
			} catch (error) {
				console.error('Failed to fetch anime options:', error);
			}
		}, 700),
		[]
	);

	const handleInputChange = (
		_event: React.SyntheticEvent,
		newInputValue: string
	) => {
		setValue(newInputValue);

		if (dispatch) {
			dispatch({ type: 'SET_QUERY', payload: newInputValue });
		}

		if (newInputValue === '') {
			const queryString = buildQueryParams('');
			window.history.replaceState(null, '', `/search${queryString}`);
		} else if (newInputValue.length >= 3) {
			debouncedHandleAnimeOptions(newInputValue);
		}
	};

	const uniqueAnimeList = useMemo(() => {
		return animeOptions.filter(
			(anime, index, self) =>
				index === self.findIndex((a) => a.mal_id === anime.mal_id)
		);
	}, [animeOptions]);

	const filter = createFilterOptions<AnimeOptionType>();

	return (
		<FormControl fullWidth>
			<Autocomplete
				freeSolo
				inputValue={value}
				options={uniqueAnimeList}
				onInputChange={handleInputChange}
				onChange={async (_event, newValue) => {
					if (typeof newValue === 'object' && newValue?.inputValue) {
						if (isSearchPage) {
							const queryString = buildQueryParams(
								newValue.inputValue
							);

							window.history.replaceState(
								null,
								'',
								`/search${queryString}`
							);

							const response = await animeService.searchAnime(
								newValue.inputValue,
								25
							);
							if (dispatch) {
								dispatch({
									type: 'SET_ANIME_LIST',
									payload: response.data,
								});
							}
						} else {
							navigate(`/search?q=${newValue.inputValue}`);
						}
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
										width: '3rem',
										height: '3rem',
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
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search for Anime"
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
export default SearchInputField;
