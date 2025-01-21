import { Card, CardMedia } from '@mui/material';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { AnimeAvatarProps } from '../../models/Interfaces';

function AnimeAvatar({ title, imageUrl, mal_id, loading }: AnimeAvatarProps) {
	const navigate = useNavigate();

	if (loading) {
		return (
			<Card
				sx={{
					width: '100%',
					maxWidth: '14rem',
					aspectRatio: '11 / 16',
					borderRadius: '1rem',
					border: `0.125rem solid ${theme.palette.secondary.main}`,
					marginBottom: '2rem',
					background: 'rgba(29, 51, 53, 0.51)',
					marginTop: { xs: '1rem', md: '0' },
				}}
			></Card>
		);
	}
	return (
		<Card
			sx={{
				width: '100%',
				maxWidth: '14rem',
				aspectRatio: '11 / 16',
				borderRadius: '1rem',
				border: `0.125rem solid ${theme.palette.secondary.main}`,
			}}
		>
			<CardMedia
				component="img"
				image={imageUrl}
				alt={title}
				sx={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					cursor: 'pointer',
					transition: 'transform 0.3s ease-in-out',
					'&:hover': mal_id
						? {
								transform: 'scale(1.05)',
						  }
						: null,
				}}
				onClick={
					mal_id ? () => navigate(`/anime/${mal_id}`) : undefined
				}
			/>
		</Card>
	);
}

export default AnimeAvatar;
