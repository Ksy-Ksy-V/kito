import { Grid2, Skeleton, Box, Typography } from '@mui/material';
import RandBackground from './RandBackground';
import RandCardContainer from './RandCardContainer';

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { RandomAnime } from '../../models/randomAnime';
import theme from '../../styles/theme';
import RandInformation from './RandInformation';
import StyledButton from '../StyledButton';
import { useNavigate } from 'react-router-dom';

interface RandHeroSectionProps {
	randomAnime: RandomAnime;
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

	return (
		<>
			<RandBackground randomAnime={randomAnime} />
			<RandCardContainer loading={loading} randomAnime={randomAnime} />

			<Grid2 size={5} offset={1} sx={{ marginTop: '3.5rem', zIndex: 3 }}>
				{loading ? (
					<Skeleton variant="text" width="80%" height={40} />
				) : (
					<>
						<Box sx={{ display: 'flex' }}>
							<Typography variant="h3">
								{randomAnime ? randomAnime.title : 'Sorry...'}
							</Typography>
						</Box>
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
								marginTop: '0.5rem',
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

				<RandInformation loading={loading} randomAnime={randomAnime} />

				<Grid2 container spacing={2}>
					<Grid2 size={6}>
						<StyledButton
							onClick={handleRandomize}
							disabled={loading || !randomAnime}
							sx={{ marginTop: '2rem' }}
						>
							Randomize
						</StyledButton>
					</Grid2>

					<Grid2 size={6}>
						<StyledButton
							onClick={handleReturnToFilter}
							sx={{ marginTop: '2rem' }}
						>
							New Filter
						</StyledButton>
					</Grid2>
				</Grid2>
			</Grid2>
		</>
	);
};

export default RandHeroSection;
