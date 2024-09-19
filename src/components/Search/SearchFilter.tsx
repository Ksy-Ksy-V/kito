import { useEffect, useState } from 'react';

import {
	// Anime,
	// AnimeClient,
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
	Genre,
	GenresClient,
	GenresFilter,
	JikanResponse,
	// JikanResponse,
} from '@tutkli/jikan-ts';

import StyledSarchFilters from './StyledSearchFilters';
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Paper,
	Typography,
} from '@mui/material';
import theme from '../../styles/theme';

const SearchFilter = () => {
	// const [searchTerm, setSearchTerm] = useState('');
	// const [animeOptions, setAnimeOptions] = useState<Anime[]>([]);
	// const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	// const [error, setError] = useState<string | null>(null);

	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);

	const [selectedFormat, setSelectedFormat] = useState<AnimeType | ''>('');
	const [selectedStatus, setSelectedStatus] = useState<
		AnimeSearchStatus | ''
	>('');
	const [selectedRating, setSelectedRating] = useState<AnimeRating | ''>('');

	useEffect(() => {
		const fetchAnimeGenres = async () => {
			try {
				setLoading(true);
				const genresClient = new GenresClient();
				const response: JikanResponse<Genre[]> =
					await genresClient.getAnimeGenres();
				setAnimeGenres(response.data);
			} catch (error) {
				console.error('Failed to fetch anime genres:', error);
			}
		};
		if (!animeGenres || animeGenres.length === 0) {
			fetchAnimeGenres();
		}

		setLoading(false);
	}, [animeGenres]);

	const genresByType = (type: GenresFilter) =>
		animeGenres.filter((genre) => genre.type === type);

	// const handleSearch = async (query: string) => {
	// 	setLoading(true);
	// 	setError(null);
	// 	try {
	// 		const animeClient = new AnimeClient();
	// 		const response: JikanResponse<Anime[]> =
	// 			await animeClient.getAnimeSearch({
	// 				q: query,
	// 				limit: 10,
	// 			});
	// 		setAnimeOptions(response.data);
	// 		setAnimeList(response.data);
	// 		setLoading(false);
	// 	} catch (err) {
	// 		console.error('Failed to search anime:', err);
	// 		setError('Something went wrong during the search.');
	// 	}
	// };

	useEffect(() => {
		const applyAnimeFilters = () => {};

		applyAnimeFilters();
	}, [selectedFormat, selectedStatus, selectedRating]);

	const animeFormat: AnimeType[] = ['TV', 'Movie', 'Ova', 'Special', 'Ona'];

	const animeStatuses: AnimeSearchStatus[] = [
		'airing',
		'complete',
		'upcoming',
	];

	const animeRatings: AnimeRating[] = ['g', 'pg', 'pg13', 'r17', 'r'];

	return (
		<>
			<StyledSarchFilters
				label="Format"
				value={selectedFormat}
				onChange={(event) =>
					setSelectedFormat(event.target.value as AnimeType)
				}
				options={animeFormat}
				clearValue={() => setSelectedFormat('')}
			/>

			<StyledSarchFilters
				label="Status"
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
					backgroundColor: theme.palette.primary.main,
					padding: '1rem',
				}}
			>
				<Typography variant="h6">Genres</Typography>
				<FormGroup>
					{genresByType('genres').map((genre) => (
						<FormControlLabel
							key={genre.mal_id}
							control={<Checkbox />}
							label={genre.name}
						/>
					))}
				</FormGroup>
			</Paper>
		</>
	);
};

export default SearchFilter;
