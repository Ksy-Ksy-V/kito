import { Card, CardMedia } from '@mui/material';
import theme from '../../styles/theme';

interface CardAnimeDetailsProps {
	title?: string;
	imageUrl?: string;
}

function CardAnimeDetails({ title, imageUrl }: CardAnimeDetailsProps) {
	return (
		<Card
			sx={{
				width: {
					xs: '12rem',
					sm: '14rem',
					md: '17rem',
				},
				height: {
					xs: '18rem',
					sm: '21rem',
					md: '25rem',
				},
				borderRadius: '1rem',
				border: `0.125rem solid ${theme.palette.secondary.main}`,
				marginBottom: '2rem',
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
		</Card>
	);
}

export default CardAnimeDetails;
