import { Grid2, Skeleton, Box, Typography, useMediaQuery } from '@mui/material';
import AnimeCardContainer from './AnimeCardContainer';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { AbstractAnime } from '../../models/AbstractAnime';
import theme from '../../styles/theme';
import MainInformation from './MainInformation';
import BackgroundImg from '../BackgroundImg';
import RatingLabel from '../Anime/RatingLabel';
import RandomizerBtn from '../Buttons/RandomizerBtn';

interface DetailInformatioAboutAnimeProps {
	anime: AbstractAnime | null;
	loading: boolean;
	fetchAnimeList?: () => void;
}

const DetailInformatioAboutAnime: React.FC<DetailInformatioAboutAnimeProps> = ({
	anime,
	loading,
	fetchAnimeList,
}) => {
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
	const isPhone = useMediaQuery(theme.breakpoints.up('md'));
	return (
		<>
			<BackgroundImg
				anime={anime}
				loading={loading}
				height={'31.25rem'}
			/>

			<AnimeCardContainer loading={loading} randomAnime={anime} />

			{fetchAnimeList && !isLargeScreen && (
				<Grid2
					size={12}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<RandomizerBtn
						loading={loading}
						randomAnime={anime}
						fetchAnimeList={fetchAnimeList}
					/>
				</Grid2>
			)}

			<Grid2
				size={{ md: 6, sm: 6, xs: 12 }}
				offset={{ md: 1, xs: 0 }}
				sx={{
					zIndex: 3,
					marginTop: {
						xs: '0rem',
						sm: '2rem',
						md: '0rem',
					},
				}}
			>
				{loading ? (
					<>
						<Skeleton
							variant="text"
							width="80%"
							height={40}
							sx={{ marginTop: '3rem' }}
						/>
						<Skeleton variant="text" width="20%" height={30} />
					</>
				) : (
					<>
						{isLargeScreen && (
							<Box
								sx={{
									display: 'flex',
									textAlign: {
										xs: 'center',
										sm: 'left',
									},
								}}
							>
								<Typography
									variant="h3"
									sx={{
										marginTop: { md: '3.5rem', xs: '0rem' },
									}}
								>
									{anime?.title}
								</Typography>
							</Box>
						)}

						{anime && anime.score && (
							<Typography
								variant="h5"
								sx={{
									color: theme.palette.text.secondary,
									display: 'flex',
								}}
							>
								<StarOutlinedIcon
									sx={{
										marginRight: '0.25rem',
									}}
								/>
								{anime.score}
							</Typography>
						)}
						<Box
							sx={{
								marginTop: { md: '0.5rem', xs: '1rem' },
								display: 'flex',
								flexWrap: 'wrap',
								gap: '0.5rem',
							}}
						>
							{anime?.genres.map((genre) => (
								<Box
									key={genre.mal_id}
									sx={{
										backgroundColor:
											'rgba(56, 113, 113, 0.7)',
										padding: '0.25rem 0.5rem',
										borderRadius: '8px',
										fontSize: '0.875rem',
										display: 'inline-block',
										color: theme.palette.text.secondary,
										transition:
											'background-color 0.3s ease, color 0.3s ease',
									}}
								>
									{genre.name}
								</Box>
							))}
						</Box>
					</>
				)}

				<MainInformation
					loading={loading}
					randomAnime={anime as AbstractAnime}
				/>

				{isLargeScreen && fetchAnimeList && (
					<RandomizerBtn
						loading={loading}
						randomAnime={anime}
						fetchAnimeList={fetchAnimeList}
					/>
				)}
			</Grid2>

			<Grid2 size={1} sx={{ zIndex: 3, marginTop: '2rem' }}>
				{isPhone && <RatingLabel anime={anime} loading={loading} />}
			</Grid2>
		</>
	);
};

export default DetailInformatioAboutAnime;
