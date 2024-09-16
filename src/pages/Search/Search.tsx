import React, { useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import StyledButton from '../../components/StyledButton';
import { Anime, AnimeClient, JikanResponse } from '@tutkli/jikan-ts';
import AnimeCard from '../../components/AnimeCard';

import AnimeSearchField from '../../components/Search/AnimeSearchField';

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
					<AnimeSearchField
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
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
