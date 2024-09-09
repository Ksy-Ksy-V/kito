// import { Typography, Grid2 } from '@mui/material';
// import { AnimeClient, JikanResponse, Anime } from '@tutkli/jikan-ts';
// import { useEffect, useState } from 'react';

// import SearchCard from '../../components/Search/SearchCard';
// import SearchFilter from '../../components/Search/SearchFilter';

// function Search() {
// 	const animeClient = new AnimeClient();
// 	const [animeList, setAnimeList] = useState<Anime[]>([]);

// 	useEffect(() => {
// 		const fetchAnime = async () => {
// 			try {
// 				const response: JikanResponse<Anime[]> =
// 					await animeClient.getAnimeSearch({ q: 'Naruto' });
// 				setAnimeList(response.data);
// 			} catch (error) {
// 				console.error('Failed to fetch anime:', error);
// 			}
// 		};

// 		if (animeList.length === 0) {
// 			fetchAnime();
// 		}
// 	}, [animeList, animeClient]);

// 	return (
// 		<Grid2 container spacing={2}>
// 			<Grid2 size={{ xs: 12 }}>
// 				<Typography
// 					variant="h1"
// 					sx={{
// 						textAlign: 'center',
// 						marginTop: '1rem',
// 						marginBottom: '2rem',
// 					}}
// 				>
// 					There's something for everyone
// 				</Typography>
// 			</Grid2>

// 			<Grid2 size={{ xs: 12 }}>
// 				<SearchFilter />
// 			</Grid2>

// 			{animeList.map((anime) => (
// 				<Grid2 size={{ xs: 3 }} key={anime.mal_id}>
// 					<SearchCard
// 						title={anime.title}
// 						description={
// 							anime.synopsis || 'No description available.'
// 						}
// 						imageUrl={anime.images.jpg.image_url || ''}
// 					/>
// 				</Grid2>
// 			))}
// 		</Grid2>
// 	);
// }

// export default Search;

import React, { useState } from 'react';
import { TextField, Grid, Typography, Autocomplete } from '@mui/material';
import { AnimeClient, JikanResponse, Anime } from '@tutkli/jikan-ts';

import SearchCard from '../../components/Search/SearchCard';

const SearchWithAutocomplete: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [animeOptions, setAnimeOptions] = useState<Anime[]>([]);
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async (query: string) => {
		setLoading(true);
		setError(null);
		try {
			const animeClient = new AnimeClient();
			const response: JikanResponse<Anime[]> =
				await animeClient.getAnimeSearch({
					q: query,
					limit: 10,
				});
			setAnimeOptions(response.data);
			setAnimeList(response.data);
			setLoading(false);
		} catch (err) {
			console.error('Failed to search anime:', err);
			setError('Something went wrong during the search.');
		}
	};

	return (
		<div>
			<Autocomplete
				options={animeOptions}
				getOptionLabel={(option) => option.title}
				value={null}
				onInputChange={(_, newInputValue) => {
					setSearchTerm(newInputValue);
					if (newInputValue) {
						handleSearch(newInputValue);
					}
				}}
				loading={loading}
				noOptionsText="No results"
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search for Anime"
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<Grid container spacing={2} sx={{ marginTop: '2rem' }}>
				{loading ? (
					<Typography variant="body1">Loading...</Typography>
				) : error ? (
					<Typography variant="body1" color="error">
						{error}
					</Typography>
				) : animeList.length === 0 && searchTerm ? (
					<Typography variant="body1">No results found.</Typography>
				) : (
					animeList.map((anime) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={anime.mal_id}
						>
							<SearchCard
								title={anime.title}
								description={
									anime.synopsis ||
									'No description available.'
								}
								imageUrl={anime.images.jpg.image_url || ''}
							/>
						</Grid>
					))
				)}
			</Grid>
		</div>
	);
};

export default SearchWithAutocomplete;
