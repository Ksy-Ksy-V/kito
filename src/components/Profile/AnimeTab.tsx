import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Grid2 } from '@mui/material';
import { user } from '../../data/profileInformation';
import ListCard from '../Cards/ListCard';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';
import ScoreCard from '../Cards/ScoreCard';
import PagePagination from '../PagePagination';

interface Tab {
	label: string;
	value: string;
}

const AnimeTabs = () => {
	const navigate = useNavigate();
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

	const [activeTab, setActiveTab] = useState<string>(tabs[0].value);

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

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const filteredAnime = user.animeList.filter((anime) => {
		if (activeTab === 'Score') {
			return anime.userRating !== undefined;
		}
		return anime.listName === activeTab;
	});

	const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);

	const paginatedAnime = filteredAnime.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);
	return (
		<Grid2 container spacing={2} size={12} sx={{ marginTop: '3rem' }}>
			<Box sx={{ width: '100%' }}>
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
													? theme.palette.secondary
															.main
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
													? theme.palette.secondary
															.main
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
							}}
						/>
					))}
				</Tabs>

				<Grid2 container spacing={4}>
					{filteredAnime.length > itemsPerPage ? (
						<Grid2
							size={{ xs: 12 }}
							sx={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<PagePagination
								loading={loading}
								page={page}
								count={totalPages}
								onChange={handlePageChange}
							/>
						</Grid2>
					) : null}

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
										list={anime.listName}
										playerScore={anime.userRating}
										onClick={() =>
											navigate(`/anime/${anime.id}`)
										}
									/>
								</Grid2>
							)
						)
					) : (
						<Typography
							variant="h3"
							sx={{
								color: theme.palette.secondary.main,
								display: 'flex',
								textAlign: 'center',
								justifyContent: 'center',
								width: '100%',
							}}
						>
							No anime in this category.
						</Typography>
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
