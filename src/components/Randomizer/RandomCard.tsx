import { Card, CardMedia, CardActionArea } from '@mui/material';

interface RandomCardProps {
	title: string;
	imageUrl: string;
}

function RandomCard({ title, imageUrl }: RandomCardProps) {
	return (
		<Card
			sx={{
				position: 'relative',
				overflow: 'visible',
				borderRadius: '0.5rem',
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
				/>
			</CardActionArea>
		</Card>
	);
}

export default RandomCard;
