import { Grid2, Skeleton, Box, Typography, useMediaQuery } from '@mui/material';
import RandBackground from './RandBackground';
import RandCardContainer from './RandCardContainer';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { AbstractAnime } from '../../models/AbstractAnime';
import theme from '../../styles/theme';
import RandInformation from './RandInformation';
import StyledButton from '../Buttons/StyledButton';
import { useNavigate } from 'react-router-dom';

interface RandHeroSectionProps {
	randomAnime: AbstractAnime | null;
	loading: boolean;
	fetchAnimeList: () => void;
}

const RandHeroSection: React.FC<RandHeroSectionProps> = ({
	randomAnime,
	fetchAnimeList,
	loading,
}) => {
	const navigate = useNavigate();

	const handleRandomize = () => {
		fetchAnimeList();
	};

	const handleReturnToFilter = () => {
		navigate(`/randomizer`);
	};

	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<>
			<RandBackground randomAnime={randomAnime} loading={loading} />
			<RandCardContainer
				loading={loading}
				randomAnime={randomAnime}
				fetchAnimeList={fetchAnimeList}
			/>

			<Grid2
				size={{ md: 5, xs: 12 }}
				offset={{ md: 1, xs: 0 }}
				sx={{ zIndex: 3 }}
			>
				{loading ? (
					<>
						<Skeleton variant="text" width="80%" height={40} />
						<Skeleton variant="text" width="20%" height={30} />
					</>
				) : (
					<>
						{isLargeScreen && (
							<Box
								sx={{
									display: 'flex',
									textAlign: { xs: 'center', md: 'left' },
								}}
							>
								<Typography
									variant="h3"
									sx={{
										marginTop: { md: '3.5rem', xs: '0rem' },
									}}
								>
									{randomAnime
										? randomAnime.title
										: 'Sorry...'}
								</Typography>
							</Box>
						)}

						{randomAnime && randomAnime.score && (
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
								{randomAnime.score}
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
							{randomAnime?.genres.map((genre) => (
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
				{loading || !randomAnime ? (
					<>
						<Typography variant="body1">
							We couldn't find matching anime.
						</Typography>
						<Typography variant="body1">
							Try changing your filter parameters
						</Typography>
					</>
				) : (
					<RandInformation
						loading={loading}
						randomAnime={randomAnime as AbstractAnime}
					/>
				)}

				{isLargeScreen && (
					<Grid2 container spacing={2}>
						<Grid2 size={{ md: 6, xs: 12 }}>
							<StyledButton
								onClick={handleRandomize}
								disabled={loading || !randomAnime}
								sx={{ marginTop: { md: '2rem', xs: '1rem' } }}
							>
								Randomize
							</StyledButton>
						</Grid2>

						<Grid2 size={{ md: 6, xs: 12 }}>
							<StyledButton
								onClick={handleReturnToFilter}
								sx={{ marginTop: { md: '2rem', xs: '0rem' } }}
							>
								New Filter
							</StyledButton>
						</Grid2>
					</Grid2>
				)}
			</Grid2>
		</>
	);
};

export default RandHeroSection;
