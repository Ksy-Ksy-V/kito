import React, { useEffect, useState } from 'react';
import { Grid2, Skeleton, Typography } from '@mui/material';
import {
	Anime,
	AnimeClient,
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
	JikanResponse,
} from '@tutkli/jikan-ts';

import SearchInputField from '../../components/Search/SearchInputField';
import SearchFilters from '../../components/Search/SearchFilters';
import SearchCard from '../../components/SearchCard';
import { AnimeFilters, AnimeSearchFilters } from '../../models/animeFilters';
import StyledButton from '../../components/StyledButton';

const Search: React.FC = () => {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);

	const [resetInputField, setResetInputField] = useState(false);

	const [inputSearch, setInputSearch] = useState('');
	const [searchFilters, setSearchFilters] = useState<AnimeSearchFilters>({
		q: '',
		genres: '',
		type: undefined,
		status: undefined,
		rating: undefined,
	});
	const [selectedFilters, setSelectedFilters] = useState<AnimeFilters>({
		selectedGenres: '',
		selectedFormat: '',
		selectedStatus: '',
		selectedRating: '',
	});

	const [isInitialSearch, setIsInitialSearch] = useState(true);

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const query = queryParams.get('q') || '';
		const genres = queryParams.get('genres') || '';
		const format = queryParams.get('format') || '';
		const status = queryParams.get('status') || '';
		const rating = queryParams.get('rating') || '';

		const newFilters: AnimeFilters = {
			selectedGenres: genres,
			selectedFormat: format,
			selectedStatus: status,
			selectedRating: rating,
		};

		setSelectedFilters(newFilters);
		setSearchFilters({
			q: query,
			genres,
			type: format as AnimeType,
			status: status as AnimeSearchStatus,
			rating: rating as AnimeRating,
		});

		if (isInitialSearch) {
			const animeClient = new AnimeClient();
			animeClient
				.getAnimeSearch({
					q: query,
					genres,
					type: format as AnimeType,
					status: status as AnimeSearchStatus,
					rating: rating as AnimeRating,
					limit: 25,
				})
				.then((response: JikanResponse<Anime[]>) => {
					setAnimeList(response.data);
					setLoading(false);
				})
				.catch((err) => console.error('Failed to fetch anime:', err));

			setIsInitialSearch(false);
		}
	}, [isInitialSearch]);

	const buildQueryParams = (
		inputSearch: string,
		filters: AnimeSearchFilters
	) => {
		const queryParams: string[] = [];
		if (inputSearch) queryParams.push(`q=${inputSearch}`);
		if (filters.genres) queryParams.push(`genres=${filters.genres}`);
		if (filters.type) queryParams.push(`format=${filters.type}`);
		if (filters.status) queryParams.push(`status=${filters.status}`);
		if (filters.rating) queryParams.push(`rating=${filters.rating}`);
		return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
	};

	const handleApplyFilters = () => {
		const queryString = buildQueryParams(inputSearch, searchFilters);
		window.history.replaceState(null, 'New Page Title', queryString);

		const animeClient = new AnimeClient();
		animeClient
			.getAnimeSearch({
				q: inputSearch,
				genres: searchFilters.genres,
				type: searchFilters.type,
				status: searchFilters.status,
				rating: searchFilters.rating,
				limit: 10,
			})
			.then((response: JikanResponse<Anime[]>) => {
				setAnimeList(response.data);
			})
			.catch((err) => {
				console.error('Failed to fetch anime:', err);
			});
	};

	useEffect(() => {
		setSearchFilters({
			q: inputSearch,
			genres: selectedFilters.selectedGenres,
			type: selectedFilters.selectedFormat as AnimeType,
			status: selectedFilters.selectedStatus as AnimeSearchStatus,
			rating: selectedFilters.selectedRating as AnimeRating,
		});
	}, [selectedFilters, inputSearch, resetInputField]);

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
				<SearchInputField
					resetValue={resetInputField}
					revertResetValue={() => setResetInputField(false)}
					callbackSearch={(value) => {
						const queryString = buildQueryParams(
							value,
							searchFilters
						);
						window.history.replaceState(
							null,
							'New Page Title',
							queryString
						);
						setSearchFilters((prev) => ({
							...prev,
							q: value,
						}));
						setInputSearch(value);
					}}
				/>
			</Grid2>

			<Grid2 container spacing={2} size={3} sx={{ marginTop: '2rem' }}>
				<Grid2 size={12}>
					<StyledButton
						onClick={handleApplyFilters}
						sx={{ marginBottom: '1rem' }}
					>
						Search
					</StyledButton>
					<SearchFilters
						defaultFilters={selectedFilters}
						clearInputField={() => {
							setResetInputField(true);
							setInputSearch('');
						}}
						callbackSearch={(filters) => {
							const queryString = buildQueryParams(inputSearch, {
								type: filters?.selectedFormat as AnimeType,
								status: filters?.selectedStatus as AnimeSearchStatus,
								rating: filters?.selectedRating as AnimeRating,
								genres: filters.selectedGenres,
							});
							window.history.replaceState(
								null,
								'New Page Title',
								queryString
							);
							setSelectedFilters(filters);
						}}
					/>
				</Grid2>
				<Grid2 container spacing={2} size={12}>
					<StyledButton>Search</StyledButton>
				</Grid2>
			</Grid2>

			<Grid2 container spacing={3} size={9} sx={{}}>
				{animeList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						sx={{
							marginTop: '2rem',
						}}
					>
						{loading ? (
							<Skeleton
								variant="rectangular"
								width="250px"
								height="450px"
							/>
						) : (
							<SearchCard
								image={anime.images.jpg.image_url}
								title={anime.title}
							/>
						)}
					</Grid2>
				))}
			</Grid2>
		</Grid2>
	);
};

export default Search;
