import React, { useState } from 'react';
import {
	Grid2,
	useTheme,
	FormControl,
	Autocomplete,
	TextField,
	Skeleton,
} from '@mui/material';
import {
	Genre,
	AnimeType,
	AnimeSearchStatus,
	AnimeRating,
} from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';
import MainButton from '../Buttons/MainButton';
import SelectForm from '../SelectForm';
import ClearIcon from '@mui/icons-material/Clear';
import {
	animeFormats,
	animeRatings,
	animeStatuses,
} from '../../models/AnimeFilters';
import { RandomFiltersProps } from '../../models/Interfaces';

const RandomFilters: React.FC<RandomFiltersProps> = ({
	loading,
	animeGenres,
}) => {
	const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
	const [selectedType, setSelectedType] = useState<AnimeType | ''>('');
	const [selectedStatus, setSelectedStatus] = useState<
		AnimeSearchStatus | ''
	>('');
	const [selectedRating, setSelectedRating] = useState<AnimeRating | ''>('');
	const navigate = useNavigate();
	const theme = useTheme();

	const handleGenreChange = (
		_event: React.SyntheticEvent,
		newValue: Genre | null
	) => {
		setSelectedGenre(newValue);
	};

	const handleRandomize = () => {
		const queryParams: string[] = [];

		if (selectedGenre) {
			queryParams.push(`genre=${selectedGenre.mal_id}`);
		}
		if (selectedType) {
			queryParams.push(`type=${selectedType}`);
		}
		if (selectedStatus) {
			queryParams.push(`status=${selectedStatus}`);
		}
		if (selectedRating) {
			queryParams.push(`rating=${selectedRating}`);
		}
		const queryString =
			queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
		navigate(`/randomizer-search${queryString}`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2
				size={{ xs: 12, sm: 10, md: 6, lg: 6 }}
				offset={{ xs: 0, sm: 1, md: 3, lg: 3 }}
			>
				{loading ? (
					<Skeleton variant="rectangular" width="100%" height={56} />
				) : (
					<FormControl fullWidth variant="filled">
						<Autocomplete
							options={animeGenres}
							getOptionLabel={(option) => option.name}
							value={selectedGenre}
							clearIcon={
								<ClearIcon
									sx={[{ visibility: 'visible' }]}
									fontSize="small"
								/>
							}
							onChange={handleGenreChange}
							renderOption={(props, option) => {
								const { key, ...rest } = props;
								return (
									<li
										key={key}
										{...rest}
										onMouseEnter={(e) =>
											(e.currentTarget.style.backgroundColor =
												theme.palette.primary.main)
										}
										onMouseLeave={(e) =>
											(e.currentTarget.style.backgroundColor =
												'inherit')
										}
									>
										{option.name}
									</li>
								);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="filled"
									label="Genre"
								/>
							)}
						/>
					</FormControl>
				)}

				{loading ? (
					<Skeleton variant="rectangular" width="100%" height={56} />
				) : (
					<SelectForm
						label="Type"
						value={selectedType}
						onChange={(event) =>
							setSelectedType(event.target.value as AnimeType)
						}
						options={animeFormats}
						clearValue={() => setSelectedType('')}
					/>
				)}

				{loading ? (
					<Skeleton variant="rectangular" width="100%" height={56} />
				) : (
					<SelectForm
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
				)}

				{loading ? (
					<Skeleton variant="rectangular" width="100%" height={56} />
				) : (
					<SelectForm
						label="Rating"
						value={selectedRating}
						onChange={(event) =>
							setSelectedRating(event.target.value as AnimeRating)
						}
						options={animeRatings}
						clearValue={() => setSelectedRating('')}
						upperCaseOptions
					/>
				)}

				<MainButton
					disabled={loading}
					onClick={handleRandomize}
					sx={{ marginTop: '3rem', marginBottom: '2rem' }}
				>
					Randomize
				</MainButton>
			</Grid2>
		</Grid2>
	);
};

export default RandomFilters;
