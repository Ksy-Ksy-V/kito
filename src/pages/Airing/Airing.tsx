import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Grid2, Checkbox, FormControlLabel, Skeleton } from '@mui/material';
import {
	Anime,
	SeasonsClient,
	JikanResponse,
	JikanPagination,
} from '@tutkli/jikan-ts';
import { ExtendedSeasonNowParams } from '../../models/ContinuingSeason';
import PagePagination from '../../components/PagePagination';
import theme from '../../styles/theme';
import Error from '../../components/Error';
import SearchCard from '../../components/Cards/SearchCard';
import BackgroundImg from '../../components/BackgroundImg';

const SeasonAnimePage: FC = () => {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [continuingValue, setContinuingValue] = useState(false);
	const [page, setPage] = useState(1);
	const [paginationData, setPaginationData] =
		useState<JikanPagination | null>(null);

	const fetchSeasonAnime = async () => {
		setLoading(true);
		setAnimeList([]);
		const seasonsClient = new SeasonsClient();

		try {
			const response: JikanResponse<Anime[]> =
				await seasonsClient.getSeasonNow({
					continuing: continuingValue ? true : null,
					sfw: true,
					page: page,
					limit: 24,
				} as ExtendedSeasonNowParams);
			setAnimeList(response.data);
			setPaginationData(response.pagination as JikanPagination);
			setLoading(false);
		} catch (error) {
			console.error('Failed to fetch seasonal anime:', error);
			setError(true);
			setLoading(false);
		}
	};

	const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	useEffect(() => {
		fetchSeasonAnime();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [continuingValue, page]);

	if (error) {
		return <Error />;
	}

	const uniqueAnimeList = animeList.filter(
		(anime, index, self) =>
			index === self.findIndex((a) => a.mal_id === anime.mal_id)
	);

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={12}>
				<BackgroundImg
					title={'Now on screens'}
					backgroundImage={animeList[0]?.images.jpg.large_image_url}
					loading={loading}
					height={'31.25rem'}
				/>
			</Grid2>

			<Grid2
				container
				spacing={2}
				size={12}
				sx={{
					marginTop: { lg: '1rem', xs: '0rem' },
					paddingTop: '0.5rem',
					paddingBottom: '0.5rem',
					borderTop: 'solid 1px',
					borderBottom: 'solid 1px',
					borderColor: theme.palette.primary.main,
				}}
			>
				{loading ? (
					<Skeleton
						variant="rectangular"
						width="300px"
						height="30px"
					/>
				) : (
					<Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={continuingValue}
									onChange={(e) =>
										setContinuingValue(e.target.checked)
									}
									color="primary"
								/>
							}
							label="Include continuing from previous seasons"
						/>
					</Grid2>
				)}

				{paginationData && (
					<Grid2
						size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
						container
						justifyContent="center"
						sx={{ justifyContent: 'end', marginTop: '0.25rem' }}
					>
						{loading ? (
							<Skeleton
								variant="rectangular"
								width="350px"
								height="30px"
							/>
						) : (
							<PagePagination
								loading={loading}
								page={page}
								count={paginationData.last_visible_page}
								onChange={handlePageChange}
							/>
						)}
					</Grid2>
				)}
			</Grid2>

			<Grid2
				container
				spacing={2}
				size={12}
				sx={{ marginTop: { lg: '1rem', xs: '0rem' } }}
			>
				{loading
					? [...Array(24)].map((_, index) => (
							<Grid2
								key={index}
								size={{ xs: 6, sm: 4, md: 4, lg: 3 }}
								sx={{ justifyContent: 'center' }}
							>
								<Skeleton
									variant="rectangular"
									width="100%"
									height={400}
								/>
							</Grid2>
					  ))
					: uniqueAnimeList.map((anime) => (
							<Grid2
								key={anime.mal_id}
								size={{ xs: 6, sm: 4, md: 4, lg: 3 }}
								sx={{ justifyContent: 'center' }}
							>
								<SearchCard anime={anime} />
							</Grid2>
					  ))}
			</Grid2>

			<Grid2
				container
				spacing={2}
				size={12}
				sx={{
					marginTop: '2rem',
					paddingTop: '0.5rem',
					paddingBottom: '0.5rem',
					borderTop: 'solid 1px',
					borderBottom: 'solid 1px',
					borderColor: theme.palette.primary.main,
				}}
			>
				{paginationData && (
					<Grid2
						size={12}
						container
						justifyContent="center"
						sx={{ justifyContent: 'end', marginTop: '0.25rem' }}
					>
						{loading ? (
							<Skeleton
								variant="rectangular"
								width="350px"
								height="30px"
							/>
						) : (
							<PagePagination
								loading={loading}
								page={page}
								count={paginationData.last_visible_page}
								onChange={handlePageChange}
							/>
						)}
					</Grid2>
				)}
			</Grid2>
		</Grid2>
	);
};

export default SeasonAnimePage;
