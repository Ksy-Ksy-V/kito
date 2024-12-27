import React, { useState } from 'react';
import {
	Tabs,
	Tab,
	Box,
	Typography,
	Grid2,
	useMediaQuery,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	SelectChangeEvent,
} from '@mui/material';
import { user } from '../../data/profileInformation';
import ListCard from '../Cards/ListCard';
import theme from '../../styles/theme';
import ScoreCard from '../Cards/ScoreCard';
import PagePagination from '../PagePagination';
import EmptyList from './EmptyList';

interface Tab {
	label: string;
	value: string;
}

interface RatingOption {
	label: string;
	value: string;
}

interface TypeOption {
	label: string;
	value: string;
}

const AnimeTabs = () => {
	const [page, setPage] = useState(1);
	const [itemsPerPage] = useState<number>(18);
	const [loading] = useState(false);

	const tabs: Tab[] = [
		{ label: 'Watching', value: 'Watching' },
		{ label: 'Completed', value: 'Completed' },
		{ label: 'On-Hold', value: 'On-Hold' },
		{ label: 'Dropped', value: 'Dropped' },
		{ label: 'Plan to Watch', value: 'Plan to Watch' },
		{ label: 'Score', value: 'Score' },
	];

	const ratingOptions: RatingOption[] = [
		{ label: 'All', value: 'All' },
		{ label: 'This is Legendary - 10!!!', value: '10' },
		{ label: 'Almost Perfect - 9', value: '9' },
		{ label: 'Impressive - 8', value: '8' },
		{ label: 'Pretty Good - 7', value: '7' },
		{ label: 'Decent but Flawed - 6', value: '6' },
		{ label: 'Just OK - 5', value: '5' },
		{ label: 'Mediocre at Best - 4', value: '4' },
		{ label: 'Needs Improvement - 3', value: '3' },
		{ label: 'Barely Watchable - 2', value: '2' },
		{ label: 'Complete Disaster - 1', value: '1' },
	];

	const typeOptions: TypeOption[] = [
		{ label: 'All', value: 'All' },
		{ label: 'TV', value: 'TV' },
		{ label: 'Movie', value: 'Movie' },
		{ label: 'OVA', value: 'OVA' },
		{ label: 'Special', value: 'Special' },
		{ label: 'ONA', value: 'ONA' },
	];

	const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [ratingFilter, setRatingFilter] = useState<string>('All');
	const [typeFilter, setTypeFilter] = useState<string>('All');

	const getAnimeCount = (tabValue: string) => {
		if (tabValue === 'Score') {
			return user.animeList.filter(
				(anime) => anime.userRating !== undefined
			).length;
		}
		return user.animeList.filter((anime) => anime.listName === tabValue)
			.length;
	};

	const handleTabChange = (
		_event: React.SyntheticEvent,
		newValue: string
	) => {
		setActiveTab(newValue);
		setPage(1);
	};

	const handleSelectChange = (
		_event: SelectChangeEvent<string>,
		newValue: string
	) => {
		setActiveTab(newValue);
		setPage(1);
	};

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const handleFilterChange = (
		event: SelectChangeEvent<string>,
		filterType: 'rating' | 'type'
	) => {
		if (filterType === 'rating') {
			setRatingFilter(event.target.value);
		} else if (filterType === 'type') {
			setTypeFilter(event.target.value);
		}
		setPage(1);
	};

	const filteredAnime = user.animeList.filter((anime) => {
		if (activeTab === 'Score' && anime.userRating === undefined)
			return false;
		if (activeTab !== 'Score' && anime.listName !== activeTab) return false;

		if (
			ratingFilter !== 'All' &&
			anime.userRating?.toString() !== ratingFilter
		)
			return false;

		if (typeFilter !== 'All' && anime.type !== typeFilter) return false;

		return true;
	});

	const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);

	const paginatedAnime = filteredAnime.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);
	return (
		<Grid2 container spacing={2} size={12} sx={{ marginTop: '3rem' }}>
			<Box sx={{ width: '100%' }}>
				{isMobile ? (
					<FormControl
						fullWidth
						variant="filled"
						sx={{
							marginBottom: '2rem',
							marginTop: '13rem',
						}}
					>
						<InputLabel
							id="anime-tab-select-label"
							sx={{
								color: loading
									? theme.palette.primary.main
									: theme.palette.secondary.main,
								'&:hover': {
									color: theme.palette.secondary.main,
								},
								'&.Mui-focused': {
									color: theme.palette.secondary.main,
								},
								'& .Mui-disabled': {
									color: theme.palette.primary.main,
								},
							}}
						>
							List
						</InputLabel>
						<Select
							labelId="anime-tab-select-label"
							value={activeTab}
							onChange={(event) =>
								handleSelectChange(event, event.target.value)
							}
							sx={{
								height: '3rem',
								border: 'solid 1px  ',
								borderRadius: '0.25rem',
								borderColor: loading
									? theme.palette.primary.main
									: theme.palette.secondary.main,
								'& .Mui-disabled': {
									borderColor: theme.palette.primary.main,
								},
							}}
						>
							{tabs.map((tab) => (
								<MenuItem key={tab.value} value={tab.value}>
									{`${tab.label} (${getAnimeCount(
										tab.value
									)})`}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				) : (
					<Tabs
						value={activeTab}
						onChange={handleTabChange}
						centered
						indicatorColor="secondary"
						variant="fullWidth"
						sx={{
							marginBottom: '2rem',
							'& .Mui-selected': {
								color: theme.palette.secondary.main,
							},
						}}
					>
						{tabs.map((tab) => (
							<Tab
								key={tab.value}
								value={tab.value}
								label={
									<>
										<Typography
											variant="h5"
											sx={{
												textTransform: 'none',
												color:
													activeTab === tab.value
														? theme.palette
																.secondary.main
														: theme.palette.text
																.primary,
											}}
										>
											{tab.label}
										</Typography>
										<Typography
											variant="h5"
											sx={{
												marginTop: '0.2rem',
												color:
													activeTab === tab.value
														? theme.palette
																.secondary.main
														: theme.palette.text
																.secondary,
											}}
										>
											{getAnimeCount(tab.value)}
										</Typography>
									</>
								}
								sx={{
									minWidth: 'auto',
									marginTop: {
										sm: '5rem',
										md: '0rem',
									},
								}}
							/>
						))}
					</Tabs>
				)}

				<Grid2 container spacing={4}>
					<Grid2
						size={{ xs: 12, sm: 4 }}
						sx={{ display: 'flex', gap: '1rem' }}
					>
						<FormControl fullWidth variant="filled">
							<InputLabel
								id="rating-filter-label"
								sx={{
									color: loading
										? theme.palette.primary.main
										: theme.palette.secondary.main,
									'&:hover': {
										color: theme.palette.secondary.main,
									},
									'&.Mui-focused': {
										color: theme.palette.secondary.main,
									},
									'& .Mui-disabled': {
										color: theme.palette.primary.main,
									},
								}}
							>
								Rating
							</InputLabel>
							<Select
								labelId="rating-filter-label"
								value={ratingFilter}
								onChange={(event) =>
									handleFilterChange(event, 'rating')
								}
								sx={{
									height: '3rem',
									border: 'solid 1px  ',
									borderRadius: '0.25rem',
									borderColor: loading
										? theme.palette.primary.main
										: theme.palette.secondary.main,
									'& .Mui-disabled': {
										borderColor: theme.palette.primary.main,
									},
								}}
							>
								{ratingOptions.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid2>
					<Grid2
						size={{ xs: 12, sm: 4 }}
						sx={{ display: 'flex', gap: '1rem' }}
					>
						<FormControl fullWidth variant="filled">
							<InputLabel
								id="type-filter-label"
								sx={{
									color: loading
										? theme.palette.primary.main
										: theme.palette.secondary.main,
									'&:hover': {
										color: theme.palette.secondary.main,
									},
									'&.Mui-focused': {
										color: theme.palette.secondary.main,
									},
									'& .Mui-disabled': {
										color: theme.palette.primary.main,
									},
								}}
							>
								Type
							</InputLabel>
							<Select
								labelId="type-filter-label"
								value={typeFilter}
								onChange={(event) =>
									handleFilterChange(event, 'type')
								}
								sx={{
									height: '3rem',
									border: 'solid 1px  ',
									borderRadius: '0.25rem',
									borderColor: loading
										? theme.palette.primary.main
										: theme.palette.secondary.main,
									'& .Mui-disabled': {
										borderColor: theme.palette.primary.main,
									},
								}}
							>
								{typeOptions.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid2>

					{filteredAnime.length > itemsPerPage ? (
						<Grid2
							size={{ xs: 12, sm: 4 }}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<PagePagination
								loading={loading}
								page={page}
								count={totalPages}
								onChange={handlePageChange}
							/>
						</Grid2>
					) : (
						<Grid2
							size={{ xs: 12, sm: 4 }}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						></Grid2>
					)}

					{paginatedAnime.length > 0 ? (
						paginatedAnime.map((anime) =>
							activeTab === 'Score' ? (
								<ScoreCard
									key={anime.id}
									image={anime.image}
									title={anime.name}
									score={anime.userRating || 0}
									episodes={`${anime.episodes}/${anime.episodes}`}
									type={anime.type}
								/>
							) : (
								<Grid2
									key={anime.id}
									size={{ xs: 6, sm: 3, md: 3, lg: 2 }}
								>
									<ListCard
										image={anime.image}
										title={anime.name}
										genres={anime.genres}
										score={anime.score}
										rating={anime.rating}
										playerScore={anime.userRating}
										id={anime.id}
									/>
								</Grid2>
							)
						)
					) : (
						<EmptyList />
					)}
				</Grid2>
				{filteredAnime.length > itemsPerPage ? (
					<Grid2
						size={{ xs: 12 }}
						sx={{
							padding: '1rem',
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<PagePagination
							loading={loading}
							page={page}
							count={totalPages}
							onChange={handlePageChange}
						/>
					</Grid2>
				) : null}
			</Box>
		</Grid2>
	);
};

export default AnimeTabs;
