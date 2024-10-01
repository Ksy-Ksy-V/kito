import React, { useMemo, useState } from 'react';
import {
	Autocomplete,
	debounce,
	FormControl,
	TextField,
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
	const navigate = useNavigate();
	const animeClient = new AnimeClient();

	const debouncedHandleAnimeOptions = useMemo(
		() =>
			debounce(async (query: string) => {
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
					setAnimeOptions(options);
				} catch (error) {
					console.error('Failed to fetch options:', error);
				}
			}, 700),
		[animeClient]
	);

	const handleInputChange = (_event: any, newInputValue: string) => {
		dispatch({ type: 'SET_QUERY', payload: newInputValue });

		if (newInputValue.length >= 3) {
			debouncedHandleAnimeOptions(newInputValue);
		}
	};

	const handleSearch = (query: string) => {
		navigate(`/search?q=${query}`);
	};

	return (
		<FormControl fullWidth>
			<Autocomplete
				freeSolo
				inputValue={state.query}
				onInputChange={handleInputChange}
				options={animeOptions}
				onChange={(_event, newValue) => {
					if (typeof newValue === 'object' && newValue?.title) {
						handleSearch(newValue.title);
					}
				}}
				renderOption={(props, option) => (
					<ListItem {...props}>
						{option.images && (
							<img
								src={option.images.jpg.image_url}
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
				)}
				getOptionLabel={(option) =>
					typeof option === 'string' ? option : option.title
				}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search for Anime"
						variant="outlined"
						size="small"
						sx={{ width: '100%' }}
						onKeyPress={(e) => {
							if (e.key === 'Enter' && state.query.length >= 3) {
								handleSearch(state.query);
							}
						}}
					/>
				)}
			/>
		</FormControl>
	);
};

export default SearchInputField;
