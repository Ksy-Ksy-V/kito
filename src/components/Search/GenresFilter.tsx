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

import theme from '../../styles/theme';
import { ExpandMore } from '@mui/icons-material';
import { useSearchContext } from '../../context/SearchContext';
import { useEffect, useState } from 'react';
import { Genre, GenresClient, JikanResponse } from '@tutkli/jikan-ts';
import { buildQueryParams, parseQueryParams } from '../../utils/urlParams';

const GenresFilter: React.FC = () => {
	const { state, dispatch } = useSearchContext();
	const [genresOpen, setGenresOpen] = useState(true);
	const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
	const [isInitialGenres, setIsInitialGenres] = useState(true);

	useEffect(() => {
		const urlFilters = parseQueryParams();
		const { genres } = urlFilters;

		dispatch({
			type: 'SET_FILTERS',
			payload: { genres },
		});

		const genresArr = genres?.split(',') || [];

		dispatch({
			type: 'SET_FILTERS_VALUE',
			payload: { genresValue: genresArr },
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	useEffect(() => {
		const fetchAnimeGenres = async () => {
			try {
				const genresClient = new GenresClient();
				const response: JikanResponse<Genre[]> =
					await genresClient.getAnimeGenres('genres');
				setAnimeGenres(response.data);
			} catch (error) {
				console.error('Failed to fetch anime genres:', error);
			}
		};
		if (isInitialGenres) {
			fetchAnimeGenres();
			setIsInitialGenres(false);
		}
	}, [isInitialGenres]);

	const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;

		const updatedGenres = checked
			? [...state.filtersValue.genresValue.filter(Boolean), value]
			: state.filtersValue.genresValue.filter((genre) => genre !== value);

		updatedGenres.toString();

		dispatch({
			type: 'SET_FILTERS_VALUE',
			payload: {
				genresValue: updatedGenres.length > 0 ? updatedGenres : [],
			},
		});

		dispatch({
			type: 'SET_FILTERS',
			payload: {
				genres:
					updatedGenres.length > 0
						? updatedGenres.join(',')
						: undefined,
			},
		});

		const queryString = buildQueryParams(
			state.query,
			{
				...state.filters,
				genres: updatedGenres.join(','),
			},
			state.sorting
		);

		window.history.replaceState(null, '', `/search${queryString}`);
	};

	return (
		<>
			{state.loading ? (
				<Skeleton
					variant="rectangular"
					width="100%"
					height={800}
					sx={{
						marginTop: '1rem',
						backgroundColor: theme.palette.primary.light,
					}}
				/>
			) : (
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
						<Typography variant="h6" component="span">
							Genres
						</Typography>
						<IconButton
							onClick={() => setGenresOpen(genresOpen)}
							aria-expanded={genresOpen}
						>
							<ExpandMore
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
											checked={state.filtersValue.genresValue.includes(
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
			)}
		</>
	);
};

export default GenresFilter;
