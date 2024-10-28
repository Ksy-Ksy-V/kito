import { Card, CardMedia } from '@mui/material';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

interface CardAnimeDetailsProps {
	title?: string;
	imageUrl?: string;
	mal_id?: number;
}

function CardAnimeDetails({ title, imageUrl, mal_id }: CardAnimeDetailsProps) {
	const navigate = useNavigate();
	return (
		<Card
			sx={{
				width: {
					xs: '12rem',
					sm: '14rem',
					md: '17rem',
				},
				height: {
					xs: '16rem',
					sm: '21rem',
					md: '25rem',
				},
				borderRadius: '1rem',
				border: `0.125rem solid ${theme.palette.secondary.main}`,
				marginBottom: '2rem',
			}}
		>
			{mal_id ? (
				<CardMedia
					component="img"
					image={imageUrl}
					alt={title}
					sx={{
						width: '100%',
						height: '100%',
						transition: 'transform 0.30s ease-in-out',
					}}
					onClick={() => navigate(`/anime/${mal_id}`)}
				/>
			) : (
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
			)}
		</Card>
	);
}

export default CardAnimeDetails;
