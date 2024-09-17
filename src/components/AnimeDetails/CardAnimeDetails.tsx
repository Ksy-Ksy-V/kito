import { Card, CardMedia, CardActionArea } from '@mui/material';
import theme from '../../styles/theme';

interface CardAnimeDetailsProps {
	title: string;
	imageUrl: string;
}

function CardAnimeDetails({ title, imageUrl }: CardAnimeDetailsProps) {
	return (
		<Card
			sx={{
				width: '17rem',
				height: '25rem',
				borderRadius: '1rem',
				border: `0.125rem solid ${theme.palette.secondary.main}`,

				transition:
					'transform 0.30s ease-in-out, box-shadow 0.30s ease-in-out, border 0.30s ease-in-out',
				'&:hover': {
					transform: 'scale(1.1)',
					boxShadow: `0px 0px 1rem ${theme.palette.secondary.main}`,
				},
				'&:hover .card-media': {
					transform: 'scale(1.1)',
				},
			}}
		>
			<CardActionArea
				sx={{
					width: '100%',
					height: '100%',
				}}
			>
				<CardMedia
					component="img"
					image={imageUrl}
					alt={title}
					sx={{
						width: '100%',
						height: '100%',
						transition: 'transform 0.30s ease-in-out',
					}}
				/>
			</CardActionArea>
		</Card>
	);
}

export default CardAnimeDetails;
