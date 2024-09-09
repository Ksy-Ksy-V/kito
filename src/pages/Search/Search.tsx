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
import { TextField, Button, Grid, Typography } from '@mui/material';
import { AnimeClient, JikanResponse, Anime } from '@tutkli/jikan-ts';

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState(''); // Статус для зберігання пошукового запиту
	const [animeResults, setAnimeResults] = useState<Anime[]>([]); // Статус для зберігання результатів
	const [loading, setLoading] = useState(false); // Статус для лоадінгу
	const [error, setError] = useState<string | null>(null); // Статус для помилок

	const handleSearch = async () => {
		setLoading(true);
		setError(null);
		try {
			const animeClient = new AnimeClient();
			const response: JikanResponse<Anime[]> =
				await animeClient.getAnimeSearch({
					q: searchTerm,
				});
			setAnimeResults(response.data);
		} catch (err) {
			console.error('Failed to search anime:', err);
			setError('Something went wrong during the search.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{/* Поле введення для пошуку */}
			<TextField
				label="Search for Anime"
				variant="outlined"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)} // Оновлюємо статус на введення користувача
				sx={{ marginBottom: '1rem' }}
				fullWidth
			/>
			{/* Кнопка для запуску пошуку */}
			<Button
				variant="contained"
				onClick={handleSearch}
				disabled={loading || !searchTerm} // Деактивуємо кнопку, коли йде лоадінг або пошуковий запит порожній
				fullWidth
			>
				{loading ? 'Searching...' : 'Search'}
			</Button>

			{/* Результати пошуку */}
			<Grid container spacing={2} sx={{ marginTop: '2rem' }}>
				{loading ? (
					<Typography variant="body1">Loading...</Typography>
				) : error ? (
					<Typography variant="body1" color="error">
						{error}
					</Typography>
				) : animeResults.length === 0 && searchTerm ? (
					<Typography variant="body1">No results found.</Typography>
				) : (
					animeResults.map((anime) => (
						<Grid item xs={12} sm={6} md={4} key={anime.mal_id}>
							<Typography variant="h6">{anime.title}</Typography>
							<img
								src={anime.images.jpg.image_url}
								alt={anime.title}
								style={{ width: '100%' }}
							/>
							<Typography variant="body2">
								{anime.synopsis || 'No synopsis available.'}
							</Typography>
						</Grid>
					))
				)}
			</Grid>
		</div>
	);
};

export default Search;
