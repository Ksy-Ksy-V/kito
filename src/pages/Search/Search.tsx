import React, { useEffect, useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import {
	Anime,
	AnimeClient,
	AnimeRating,
	AnimeSearchOrder,
	AnimeSearchStatus,
	AnimeType,
	JikanResponse,
} from '@tutkli/jikan-ts';

import AnimeSearchField from '../../components/Search/AnimeSearchField';
import SearchFilters from '../../components/Search/SearchFilter';
import SearchCard from '../../components/SearchCard';
import { AnimeFilters, AnimeSearchFilters } from '../../models/animeFilters';
import StyledButton from '../../components/StyledButton';
import StyledSarchFilters from '../../components/Search/StyledSearchFilters';

const Search: React.FC = () => {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
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

	const OrderOptions: AnimeSearchOrder[] = [
		'mal_id',
		'title',
		'start_date',
		'end_date',
		'episodes',
		'score',
		'scored_by',
		'rank',
		'popularity',
		'members',
		'favorites',
	];
	const [selectedOrder, setSelectedOrder] = useState<AnimeSearchOrder | ''>(
		''
	);

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
					order_by: selectedOrder,
					limit: 25,
				})
				.then((response: JikanResponse<Anime[]>) => {
					setAnimeList(response.data);
					setLoading(false);
				})
				.catch((err) => console.error('Failed to fetch anime:', err));

			setIsInitialSearch(false);
		}
	}, [isInitialSearch, selectedOrder]);

	const buildQueryParams = (
		filters: AnimeSearchFilters,
		inputSearch: string
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
		const queryString = buildQueryParams(searchFilters, inputSearch);
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
	}, [selectedFilters, inputSearch]);

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
					callbackSearch={(value) => {
						setSearchFilters((prev) => ({
							...prev,
							q: value,
						}));
						setInputSearch(value);
					}}
				/>
				<StyledSarchFilters
					label="Order By"
					value={selectedOrder}
					onChange={(event) =>
						setSelectedOrder(event.target.value as AnimeSearchOrder)
					}
					options={OrderOptions}
					clearValue={() => setSelectedOrder('mal_id')}
				/>
			</Grid2>

			<Grid2 container spacing={2} size={3} sx={{ marginTop: '2rem' }}>
				<Grid2 size={12}>
					<StyledButton
						onClick={handleApplyFilters}
						sx={{ marginBottom: '1rem' }}
					>
						Apply Filters
					</StyledButton>
					<SearchFilters
						defaultFilters={selectedFilters}
						callbackSearch={(filters) => {
							const queryString = buildQueryParams(
								searchFilters,
								inputSearch
							);
							window.history.replaceState(
								null,
								'New Page Title',
								queryString
							);
							setSelectedFilters(filters);
						}}
					/>
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
