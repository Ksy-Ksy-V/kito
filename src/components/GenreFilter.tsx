import { Autocomplete, TextField, Checkbox, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import { GenresClient, JikanResponse, Genre } from '@tutkli/jikan-ts';

interface GenreFilterProps {
	// selectedGenres: Genre[];
	// onChange: (event: React.SyntheticEvent, newValue: Genre[]) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = () =>
	// {
	// selectedGenres,
	// onChange,
	// }
	{
		const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
		const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

		useEffect(() => {
			const fetchAnimeGenres = async () => {
				try {
					const genresClient = new GenresClient();
					const response: JikanResponse<Genre[]> =
						await genresClient.getAnimeGenres();
					setAnimeGenres(response.data);
				} catch (error) {
					console.error('Failed to fetch anime genres:', error);
				}
			};

			fetchAnimeGenres();
		}, []);

		const handleGenreChange = (
			_event: React.SyntheticEvent,
			newValue: Genre[]
		) => {
			if (newValue.length <= 3) {
				setSelectedGenres(newValue);
			}
		};

		return (
			<Autocomplete
				multiple
				options={animeGenres}
				disableCloseOnSelect
				getOptionLabel={(option) => option.name}
				value={selectedGenres}
				onChange={handleGenreChange}
				limitTags={3}
				renderTags={(value, getTagProps) =>
					value
						.slice(0, 3)
						.map((option, index) => (
							<Chip
								label={option.name}
								{...getTagProps({ index })}
							/>
						))
				}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox
							checked={selected}
							sx={{
								color: 'primary.main',
							}}
						/>
						{option.name}
					</li>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="filled"
						label="Genres"
						placeholder="Select 3 or less"
					/>
				)}
			/>
		);
	};

export default GenreFilter;
