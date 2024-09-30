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
	Box,
	Checkbox,
	Collapse,
	FormControlLabel,
	FormGroup,
	IconButton,
	Paper,
	Skeleton,
	Typography,
} from '@mui/material';
import StyledSarchFilters from './StyledSelectFilters';
import theme from '../../styles/theme';
import StyledButton from '../StyledButton';
import {
	AnimeFilters,
	animeFormats,
	animeRatings,
	animeStatuses,
} from '../../models/animeFilters';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AnimeSearchFiltersProps {
	callbackSearch?: (filters: AnimeFilters) => void;
	clearInputField: () => void;
	defaultFilters?: AnimeFilters;
}

const SearchFilter: React.FC<AnimeSearchFiltersProps> = ({
	callbackSearch,
	clearInputField,
	defaultFilters,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown | null>(null);
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>(
		defaultFilters?.selectedGenres?.split(',') || []
	);
	const [selectedFormat, setSelectedFormat] = useState<AnimeType | ''>(
		defaultFilters?.selectedFormat as AnimeType
	);
	const [selectedStatus, setSelectedStatus] = useState<
		AnimeSearchStatus | ''
	>(defaultFilters?.selectedStatus as AnimeSearchStatus);
	const [selectedRating, setSelectedRating] = useState<AnimeRating | ''>(
		defaultFilters?.selectedRating as AnimeRating
	);
	const [isInitialGenres, setIsInitialGenres] = useState(true);
	const [genresOpen, setGenresOpen] = useState(true);

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
				setError(error);
			}
			setLoading(false);
		};
		if (isInitialGenres) {
			fetchAnimeGenres();
			setIsInitialGenres(false);
		}
	}, [isInitialGenres]);
	const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		console.log();
		setSelectedGenres((prevSelected) => {
			const updatedGenres = checked
				? [...prevSelected, value]
				: prevSelected.filter((genre) => genre !== value);
			return updatedGenres.filter(Boolean);
		});
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
				defaultFilters?.selectedFormat !== prev
					? (defaultFilters?.selectedFormat as AnimeType)
					: prev
			);
			setSelectedStatus((prev) =>
				defaultFilters?.selectedStatus !== prev
					? (defaultFilters?.selectedStatus as AnimeSearchStatus)
					: prev
			);
			setSelectedRating((prev) =>
				defaultFilters?.selectedRating !== prev
					? (defaultFilters?.selectedRating as AnimeRating)
					: prev
			);
			setSelectedGenres((prev) =>
				defaultFilters?.selectedGenres?.split(',').toString() !==
				prev.toString()
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
		clearInputField();
		window.history.replaceState(
			null,
			'New Page Title',
			window.location.pathname
		);
	};

	// Add error component after merge
	if (error) {
		return null;
	}

	return (
		<>
			{loading ? (
				<Skeleton variant="rectangular" width="350px" height="55px" />
			) : (
				<StyledSarchFilters
					label="Format"
					value={selectedFormat}
					defaultValue={defaultFilters?.selectedFormat}
					onChange={(event) => {
						setSelectedFormat(event.target.value as AnimeType);
					}}
					options={animeFormats}
					clearValue={() => setSelectedFormat('')}
				/>
			)}

			{loading ? (
				<Skeleton variant="rectangular" width="350px" height="55px" />
			) : (
				<StyledSarchFilters
					label="Status"
					defaultValue={defaultFilters?.selectedStatus}
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
				<Skeleton variant="rectangular" width="350px" height="55px" />
			) : (
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
			)}

			<Paper
				sx={{
					backgroundColor: theme.palette.primary.light,
					padding: '1rem',
					marginTop: '1rem',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						cursor: 'pointer',
					}}
					onClick={() => setGenresOpen((prev) => !prev)}
				>
					<Typography variant="h6">Genres</Typography>
					<IconButton
						onClick={() => setGenresOpen(genresOpen)}
						aria-expanded={genresOpen}
					>
						<ExpandMoreIcon
							sx={{
								transform: genresOpen
									? 'rotate(180deg)'
									: 'rotate(0deg)',
								transition: 'transform 0.3s ease',
							}}
						/>
					</IconButton>
				</Box>

				<Collapse in={genresOpen} timeout="auto" unmountOnExit>
					<FormGroup>
						{animeGenres.map((genre) => (
							<FormControlLabel
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
				</Collapse>
			</Paper>
			<StyledButton
				onClick={handleClearFilters}
				sx={{ marginTop: '1rem' }}
			>
				Clean Filters
			</StyledButton>
		</>
	);
};

export default SearchFilter;
