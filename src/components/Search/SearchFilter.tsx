import { useEffect, useState } from 'react';
import {
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
	Genre,
	GenresClient,
	JikanResponse,
} from '@tutkli/jikan-ts';
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Paper,
	Typography,
} from '@mui/material';
import StyledSarchFilters from './StyledSearchFilters';
import theme from '../../styles/theme';
import StyledButton from '../StyledButton';
import { AnimeFilters, animeFormats, animeRatings, animeStatuses } from '../../models/animeFilters';

interface AnimeSearchFiltersProps {
	callbackSearch?: (filters: AnimeFilters) => void;
	defaultFilters?: AnimeFilters;
}

const SearchFilter: React.FC<AnimeSearchFiltersProps> = ({
	callbackSearch,
	defaultFilters
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown | null>(null);
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>(defaultFilters?.selectedGenres?.split(',') || []);
	const [selectedFormat, setSelectedFormat] = useState<AnimeType | ''>(defaultFilters?.selectedFormat as AnimeType);
	const [selectedStatus, setSelectedStatus] = useState<
		AnimeSearchStatus | ''
	>(defaultFilters?.selectedStatus as AnimeSearchStatus);
	const [selectedRating, setSelectedRating] = useState<AnimeRating | ''>(defaultFilters?.selectedRating as AnimeRating);
	const [isInitialGenres, setIsInitialGenres] = useState(true);

	useEffect(() => {

		const fetchAnimeGenres = async () => {
			try {
				setLoading(true);
				const genresClient = new GenresClient();
				const response: JikanResponse<Genre[]> =
					await genresClient.getAnimeGenres('genres');
				setAnimeGenres(response.data);
			} catch (error) {
				console.error('Failed to fetch anime genres:', error);
				setError(error)
			}
			setLoading(false);
		};
		if (isInitialGenres) {
			fetchAnimeGenres();
			setIsInitialGenres(false)
		}
	}, [isInitialGenres]);
	const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		console.log()
		setSelectedGenres((prevSelected) =>
			checked
				? [...prevSelected, value]
				: prevSelected.filter((genre) => genre !== value)
		);

	};
	useEffect(() => {
		if (callbackSearch) {
			const genresString = selectedGenres.join(',');
			callbackSearch({
				selectedGenres: genresString,
				selectedFormat,
				selectedStatus,
				selectedRating,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFormat, selectedStatus, selectedRating, selectedGenres]);

	useEffect(() => {
		if (defaultFilters) {
			setSelectedFormat((prev) =>
				defaultFilters?.selectedFormat !== prev ? (defaultFilters?.selectedFormat as AnimeType) : prev
			);
			setSelectedStatus((prev) =>
				defaultFilters?.selectedStatus !== prev ? (defaultFilters?.selectedStatus as AnimeSearchStatus) : prev
			);
			setSelectedRating((prev) =>
				defaultFilters?.selectedRating !== prev ? (defaultFilters?.selectedRating as AnimeRating) : prev
			);
			setSelectedGenres((prev) =>
				defaultFilters?.selectedGenres?.split(',').toString() !== prev.toString()
					? defaultFilters?.selectedGenres?.split(',') || []
					: prev
			);
		}
	}, [defaultFilters]);

	const handleClearFilters = () => {
		setSelectedFormat('');
		setSelectedStatus('');
		setSelectedRating('');
		setSelectedGenres([]);
	};
	return (
		<>
			<StyledSarchFilters
				label="Format"
				value={selectedFormat}
				defaultValue={defaultFilters?.selectedFormat}
				onChange={(event) => {
					setSelectedFormat(event.target.value as AnimeType)
				}
				}
				options={animeFormats}
				clearValue={() => setSelectedFormat('')}
			/>

			<StyledSarchFilters
				label="Status"
				defaultValue={defaultFilters?.selectedStatus}
				value={selectedStatus}
				onChange={(event) =>
					setSelectedStatus(event.target.value as AnimeSearchStatus)
				}
				options={animeStatuses}
				clearValue={() => setSelectedStatus('')}
				capitalizeOptions
			/>

			<StyledSarchFilters
				label="Rating"
				defaultValue={defaultFilters?.selectedRating}
				value={selectedRating}
				onChange={(event) =>
					setSelectedRating(event.target.value as AnimeRating)
				}
				options={animeRatings}
				clearValue={() => setSelectedRating('')}
				upperCaseOptions
			/>

			<Paper
				sx={{
					backgroundColor: theme.palette.primary.light,
					padding: '1rem',
					marginTop: '1rem',
				}}
			>
				<Typography variant="h6">Genres</Typography>
				<FormGroup>
					{animeGenres.map((genre) => (
						<FormControlLabel
							// onChange={handleGenreChange}
							key={genre.mal_id}
							control={
								<Checkbox
									value={genre.mal_id}
									checked={selectedGenres.includes(
										genre.mal_id.toString()
									)}
									onChange={handleGenreChange}
								/>
							}
							label={genre.name}
						/>
					))}
				</FormGroup>
				<StyledButton
					onClick={handleClearFilters}
					sx={{ marginTop: '1rem' }}
				>
					Clean Filters
				</StyledButton>
			</Paper>
		</>
	);
};

export default SearchFilter;
