import { Card, CardMedia } from '@mui/material';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

interface CardAnimeDetailsProps {
	title?: string;
	imageUrl?: string;
	mal_id?: number;
	loading: boolean;
}

function CardAnimeDetails({
	title,
	imageUrl,
	mal_id,
	loading,
}: CardAnimeDetailsProps) {
	const navigate = useNavigate();

	if (loading) {
		return (
			<Card
				sx={{
					width: {
						xs: '11rem',
						sm: '12rem',
						md: '14rem',
					},
					height: {
						xs: '16rem',
						sm: '18rem',
						md: '20rem',
					},
					borderRadius: '1rem',
					border: `0.125rem solid ${theme.palette.secondary.main}`,

					background: 'rgba(29, 51, 53, 0.51)',
					marginTop: { xs: '1rem', md: '0' },
				}}
			></Card>
		);
	}
	return (
		<Card
			sx={{
				width: {
					xs: '11rem',
					sm: '12rem',
					md: '14rem',
				},
				height: {
					xs: '16rem',
					sm: '18rem',
					md: '20rem',
				},
				borderRadius: '1rem',
				border: `0.125rem solid ${theme.palette.secondary.main}`,
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
