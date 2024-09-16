import {
	Autocomplete,
	FormControl,
	Grid2,
	TextField,
	Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import StyledButton from '../../components/StyledButton';
import theme from '../../styles/theme';
import { Anime, AnimeClient, JikanResponse } from '@tutkli/jikan-ts';
import AnimeCard from '../../components/AnimeCard';
import { debounce } from '@mui/material/utils';

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [animeOptions, setAnimeOptions] = useState<Anime[]>([]);
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const animeClient = useMemo(() => new AnimeClient(), []);

	const handleAnimeOptions = useCallback(
		debounce(async (query: string) => {
			setLoading(true);
			setError(null);
			try {
				const response: JikanResponse<Anime[]> =
					await animeClient.getAnimeSearch({
						q: query,
						limit: 10,
					});
				setAnimeOptions(response.data);
			} catch (error) {
				console.error('Failed to fetch options:', error);
				setError('Something went wrong during search.');
			} finally {
				setLoading(false);
			}
		}, 500),
		[setAnimeOptions, setError, setLoading, animeClient]
	);

	useEffect(() => {
		if (searchTerm.length >= 4) {
			handleAnimeOptions(searchTerm);
		} else {
			setAnimeOptions([]);
		}
		console.log(error, 'eror');
	}, [error, handleAnimeOptions, searchTerm]);

	const handleSearch = async (query: string) => {
		if (!searchTerm) return;

		setLoading(true);
		setError(null);
		try {
			const animeClient = new AnimeClient();
			const response: JikanResponse<Anime[]> =
				await animeClient.getAnimeSearch({
					q: query,
					limit: 10,
				});

			setAnimeList(response.data);
			setLoading(false);
		} catch (error) {
			console.error('Failed to search anime:', error);
			setError('Something went wrong during the search.');
			setLoading(false);
		}
	};

	return (
		<div>
			<Grid2 container spacing={2}>
				<Grid2 size={{ xs: 12 }}>
					<Typography
						variant="h1"
						sx={{ textAlign: 'center', margin: '1.5rem' }}
					>
						There's something for everyone!
					</Typography>
				</Grid2>

				<Grid2 size={{ xs: 6 }} offset={2}>
					<FormControl fullWidth variant="filled">
						<Autocomplete
							freeSolo
							options={animeOptions}
							getOptionLabel={(option) => option.title}
							value={null}
							loading={loading}
							onInputChange={(event, newInputValue, reason) => {
								if (
									newInputValue.length >= 4 &&
									reason !== 'reset'
								) {
									setSearchTerm(newInputValue);
									handleAnimeOptions(newInputValue);
								}
							}}
							onChange={(_, newValue) => {
								console.log(newValue, 'new value');
								console.log(typeof newValue, 'typ[e');
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Search for Anime"
									variant="outlined"
									sx={{
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderWidth: '0.15rem',
												borderColor:
													theme.palette.primary.main,
											},
											'&:hover fieldset': {
												borderColor:
													theme.palette.primary.main,
											},
											'&.Mui-focused fieldset': {
												borderColor:
													theme.palette.primary.main,
											},
										},
										'& .MuiInputLabel-root': {
											color: theme.palette.secondary.main,
										},
									}}
								/>
							)}
						/>
					</FormControl>
				</Grid2>
				<Grid2 size={{ xs: 2 }}>
					<StyledButton
						sx={{
							height: '3.25rem',
							backgroundColor: 'transparent',
						}}
						onClick={() => handleSearch(searchTerm)}
					>
						Search
					</StyledButton>
				</Grid2>
			</Grid2>

			<Grid2 container spacing={2}>
				{animeList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						size={{ xs: 2 }}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: '2rem',
						}}
					>
						<AnimeCard
							image={anime.images.jpg.image_url}
							title={anime.title}
						/>
					</Grid2>
				))}
			</Grid2>
		</div>
	);
};

export default Search;
