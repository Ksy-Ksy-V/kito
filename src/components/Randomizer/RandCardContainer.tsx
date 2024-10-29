import { Grid2, Skeleton, Typography, useMediaQuery } from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';
import theme from '../../styles/theme';
import StyledButton from '../Buttons/StyledButton';
import { useNavigate } from 'react-router-dom';
import CardAnimeDetails from '../Cards/CardAnimeDetails';

interface RandCardContainerProps {
	loading: boolean;
	randomAnime: Anime | null;
	fetchAnimeList: () => void;
}

const RandCardContainer: React.FC<RandCardContainerProps> = ({
	loading,
	randomAnime,
	fetchAnimeList,
}) => {
	const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
	const navigate = useNavigate();

	const handleRandomize = () => {
		fetchAnimeList();
	};

	const handleReturnToFilter = () => {
		navigate(`/randomizer`);
	};
	return (
		<Grid2
			container
			size={{ md: 3, sm: 6, xs: 7 }}
			offset={{ md: 1, sm: 3, xs: 2 }}
			sx={{
				marginTop: { md: '4rem', xs: '2rem' },
				position: 'relative',
				zIndex: 3,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{loading
				? !isLargeScreen && (
						<Skeleton
							variant="rectangular"
							width="80%"
							height="2rem"
						/>
				  )
				: !isLargeScreen && (
						<Typography
							variant="h4"
							sx={{
								color: theme.palette.secondary.main,
								textAlign: 'center',
							}}
						>
							{randomAnime?.title}
						</Typography>
				  )}

			<CardAnimeDetails
				title={randomAnime?.title}
				imageUrl={randomAnime?.images.jpg.image_url}
				mal_id={randomAnime?.mal_id}
				loading={loading}
			/>

			{!isLargeScreen && (
				<Grid2 container spacing={2}>
					<Grid2 size={{ md: 6, xs: 12 }}>
						<StyledButton
							onClick={handleRandomize}
							disabled={loading || !randomAnime}
						>
							Randomize
						</StyledButton>
					</Grid2>

					<Grid2 size={{ md: 6, xs: 12 }}>
						<StyledButton
							onClick={handleReturnToFilter}
							disabled={loading || !randomAnime}
							sx={{
								marginTop: {
									md: '2rem',
									xs: '0rem',
								},
							}}
						>
							New Filter
						</StyledButton>
					</Grid2>
				</Grid2>
			)}
		</Grid2>
	);
};

export default RandCardContainer;
