import React, { useEffect, useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import {
	Anime,
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
} from '@tutkli/jikan-ts';
import AnimeCard from '../../components/AnimeCard';

import AnimeSearchField from '../../components/Search/AnimeSearchField';
import SearchFilters from '../../components/Search/SearchFilter';
import SearchCard from '../../components/SearchCard';

const Search: React.FC = () => {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [applyFilters, setApplyFilters] = useState(false);

	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

	const [selectedFormat, setSelectedFormat] = useState<AnimeType | ''>('');
	const [selectedStatus, setSelectedStatus] = useState<
		AnimeSearchStatus | ''
	>('');
	const [selectedRating, setSelectedRating] = useState<AnimeRating | ''>('');

	useEffect(() => {}, [applyFilters, animeList]);

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }}>
				<Typography
					variant="h1"
					sx={{ textAlign: 'center', marginTop: '1.5rem' }}
				>
					There's something for everyone!
				</Typography>
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<AnimeSearchField
					callbackAnime={(value) => setAnimeList(value)}
					selectedFormat={selectedFormat}
					selectedStatus={selectedStatus}
					selectedRating={selectedRating}
					selectedGenres={selectedGenres}
				/>
			</Grid2>

			<Grid2 container spacing={2} size={3} sx={{ marginTop: '2rem' }}>
				<Grid2 size={12}>
					<SearchFilters
						callbackFilters={(value) => setSelectedGenres(value)}
					/>
				</Grid2>
			</Grid2>

			<Grid2
				container
				spacing={3}
				size={9}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{animeList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: '2rem',
						}}
					>
						<SearchCard
							image={anime.images.jpg.image_url}
							title={anime.title}
						/>
					</Grid2>
				))}
			</Grid2>
		</Grid2>
	);
};

export default Search;
