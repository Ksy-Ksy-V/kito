import { Card, CardMedia, Grid2, Skeleton } from '@mui/material';
import RandomCard from './RandomCard';
import notFoundImg from '../../images/not-found.png';
import { Anime } from '@tutkli/jikan-ts';

interface RandCardContainerProps {
	loading: boolean;
	randomAnime: Anime | null;
}

const RandCardContainer: React.FC<RandCardContainerProps> = ({
	loading,
	randomAnime,
}) => {
	return (
		<Grid2
			size={3}
			offset={1}
			sx={{ marginTop: '6rem', position: 'relative', zIndex: 3 }}
		>
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
						height="300"
						image={notFoundImg}
						alt="Default Image"
					/>
				</Card>
			)}
		</Grid2>
	);
};

export default RandCardContainer;
