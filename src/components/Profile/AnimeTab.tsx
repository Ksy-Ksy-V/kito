import {
	ChangeEvent,
	SyntheticEvent,
	useEffect,
	useMemo,
	useState,
} from 'react';
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
import theme from '../../styles/theme';
import PagePagination from '../PagePagination';
import { tabs } from '../../data/tabs';
import RenderAnimeCards from './RenderAnimeCards';
import TabFilters from './TabFilters';
import { UserInfoProps } from '../../models/Interfaces';

const AnimeTabs: React.FC<UserInfoProps> = ({ user }) => {
	const [page, setPage] = useState(1);
	const [itemsPerPage] = useState<number>(18);
	const [loading] = useState(false);

	const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [ratingFilter, setRatingFilter] = useState<string>('All');
	const [typeFilter, setTypeFilter] = useState<string>('All');

	const [isFiltrated, setIsFiltrated] = useState(false);

	const getAnimeCount = (tabValue: string) => {
		if (tabValue === 'Score') {
			return user.animeList.filter(
				(anime) => anime.userRating !== undefined
			).length;
		}
		return user.animeList.filter((anime) => anime.listName === tabValue)
			.length;
	};

	const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
		setActiveTab(newValue);
		setPage(1);
		setIsFiltrated(false);
		setTypeFilter('All');
		setRatingFilter('All');
	};

	const handleSelectChange = (
		_event: SelectChangeEvent<string>,
		newValue: string
	) => {
		setActiveTab(newValue);
		setPage(1);
	};

	const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
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
		const isValidRating =
			ratingFilter === 'All' ||
			anime.userRating?.toString() === ratingFilter;

		const isValidType = typeFilter === 'All' || anime.type === typeFilter;

		const isInActiveTab =
			activeTab === 'Score'
				? anime.userRating !== null
				: anime.listName === activeTab;

		return isValidRating && isValidType && isInActiveTab;
	});

	useEffect(() => {
		if (ratingFilter === 'All' && typeFilter === 'All') {
			setIsFiltrated(false);
		} else {
			setIsFiltrated(true);
		}
	}, [ratingFilter, typeFilter]);

	const totalPages = useMemo(
		() => Math.ceil(filteredAnime.length / itemsPerPage),
		[filteredAnime.length, itemsPerPage]
	);

	const paginatedAnime = useMemo(
		() =>
			filteredAnime.slice((page - 1) * itemsPerPage, page * itemsPerPage),
		[filteredAnime, page, itemsPerPage]
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

				<Grid2 container spacing={4} size={12}>
					<Grid2
						size={{ xs: 12, sm: 8 }}
						sx={{
							flexDirection: { xs: 'column', sm: 'row' },
							display: 'flex',
						}}
					>
						{(filteredAnime.length > 1 ||
							(filteredAnime.length === 0 && isFiltrated)) && (
							<TabFilters
								loading={loading}
								ratingFilter={ratingFilter}
								typeFilter={typeFilter}
								onFilterChange={handleFilterChange}
							/>
						)}
					</Grid2>

					{filteredAnime.length > itemsPerPage ? (
						<Grid2
							size={{ xs: 12, sm: 4 }}
							sx={{
								display: 'flex',
								justifyContent: {
									xs: 'center',
									sm: 'flex-end',
								},
							}}
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

					<RenderAnimeCards
						loading={loading}
						paginatedAnime={paginatedAnime}
						activeTab={activeTab}
						isFiltrated={isFiltrated}
					/>
				</Grid2>
				{filteredAnime.length > itemsPerPage ? (
					<Grid2
						size={{ xs: 12 }}
						sx={{
							padding: '1rem',
							display: 'flex',
							justifyContent: {
								xs: 'center',
								sm: 'flex-end',
							},
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
