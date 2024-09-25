import { Card, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RandomCardProps {
	title: string;
	imageUrl: string;
	mal_id: number;
}

function RandomCard({ title, imageUrl, mal_id }: RandomCardProps) {
	const navigate = useNavigate();
	return (
		<Card
			sx={{
				position: 'relative',
				overflow: 'visible',
				borderRadius: '8px',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: '105%',
					height: '105%',
					transform: 'translate(-50%, -50%) scale(1)',
					background: 'linear-gradient(145deg, #64fcf2, #E5BDC4)',
					borderRadius: 'inherit',
					transition:
						'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
					filter: 'blur(10px)',
					zIndex: 1,
				},
				'&:hover::before': {
					transform: 'translate(-50%, -50%) scale(1.10)',
					filter: 'blur(30px)',
					background: 'linear-gradient(145deg, #E5BDC4, #64fcf2)',
				},
				'&:hover .MuiCardMedia-root': {
					transform: 'scale(1.05)',
				},
			}}
		>
			<CardActionArea
				sx={{
					position: 'relative',
					zIndex: 2,
					overflow: 'hidden',
					borderRadius: 'inherit',
				}}
			>
				<CardMedia
					component="img"
					image={imageUrl}
					alt={title}
					sx={{
						transition: 'transform 0.3s ease-in-out',
						width: '100%',
						height: 'auto',
						borderRadius: 'inherit',
					}}
					onClick={() => navigate(`/anime/${mal_id}`)}
				/>
			</CardActionArea>
		</Card>
	);
}

export default RandomCard;
