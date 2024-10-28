import {
	Card,
	CardMedia,
	Grid2,
	Skeleton,
	Typography,
	useMediaQuery,
} from '@mui/material';
import RandomCard from './RandomCard';
import notFoundImg from '../../images/notFound.png';
import { Anime } from '@tutkli/jikan-ts';
import theme from '../../styles/theme';
import StyledButton from '../Buttons/StyledButton';
import { useNavigate } from 'react-router-dom';

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
			{!isLargeScreen && (
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

			{loading ? (
				<Skeleton variant="rectangular" width="100%" height={300} />
			) : randomAnime ? (
				<RandomCard
					title={randomAnime.title}
					imageUrl={randomAnime.images.jpg.image_url}
					mal_id={randomAnime.mal_id}
				/>
			) : (
				<Card
					sx={{
						background: 'rgba(29, 51, 53, 0.51)',
						borderRadius: '8px',
						boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
						backdropFilter: 'blur(4.9px)',
						border: '1px solid rgba(29, 51, 53, 0.3)',
					}}
				>
					<CardMedia
						component="img"
						width="100%"
						height="300"
						image={notFoundImg}
						alt="Default Image"
					/>
				</Card>
			)}

			{!isLargeScreen && (
				<Grid2 container spacing={2}>
					<Grid2 size={{ md: 6, xs: 12 }}>
						<StyledButton
							onClick={handleRandomize}
							disabled={loading || !randomAnime}
							sx={{
								marginTop: {
									md: '2rem',
									xs: '0.5rem',
								},
							}}
						>
							Randomize
						</StyledButton>
					</Grid2>

					<Grid2 size={{ md: 6, xs: 12 }}>
						<StyledButton
							onClick={handleReturnToFilter}
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
