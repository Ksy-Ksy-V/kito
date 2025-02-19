import { Grid2, Skeleton, Box, Typography, useMediaQuery } from '@mui/material';
import AnimeCardContainer from './AnimeCardContainer';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { AbstractAnime } from '../../models/AbstractAnime';
import theme from '../../styles/theme';
import MainInformation from './MainInformation';
import BackgroundImg from '../BackgroundImg';
import RatingLabel from '../AnimeInfo/RatingLabel';
import RandomizerBtn from '../Buttons/RandomizerBtn';
import { AbstractAnimeProps } from '../../models/Interfaces';
import { FC } from 'react';
import defaultAnimeImage from '../../images/defaultAnimeImage.jpg';

const DetailsInformationAboutAnime: FC<AbstractAnimeProps> = ({
	anime,
	loading,
	randomizerPage,
	getRandomize,
}) => {
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
	const isMobile = useMediaQuery(theme.breakpoints.up('md'));
	const isDefaultApiImage =
		anime?.images.jpg.image_url ===
		'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

	return (
		<>
			<BackgroundImg
				backgroundImage={
					isDefaultApiImage
						? defaultAnimeImage
						: anime?.images.jpg.large_image_url
				}
				loading={loading}
				height={'31.25rem'}
			/>

			<AnimeCardContainer loading={loading} anime={anime || null} />

			{randomizerPage && !isLargeScreen && getRandomize && (
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
						anime={anime || null}
						getRandomize={(timeout) => getRandomize(timeout)}
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
									textAlign: 'center',
									justifyContent: {
										xs: 'center',
										sm: 'left',
									},
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
								justifyContent: { xs: 'center', sm: 'left' },
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
					anime={anime as AbstractAnime}
				/>

				{randomizerPage && isLargeScreen && getRandomize && (
					<RandomizerBtn
						loading={loading}
						anime={anime || null}
						getRandomize={getRandomize}
					/>
				)}
			</Grid2>

			<Grid2 size={1} sx={{ zIndex: 3, marginTop: '2rem' }}>
				{isMobile && (
					<RatingLabel anime={anime || null} loading={loading} />
				)}
			</Grid2>
		</>
	);
};

export default DetailsInformationAboutAnime;
