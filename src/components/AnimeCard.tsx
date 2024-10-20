import React from 'react';
import { Card, CardActionArea, CardMedia, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AnimeCardProps {
	image: string;
	title: string;
	mal_id?: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ image, title, mal_id }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Card
			sx={{
				width: '170px',
				height: '250px',
				borderRadius: '16px',
				marginBottom: '10px',
				cursor: 'pointer',
				boxShadow: 'rgba(29, 51, 53, 0.7)',
				overflow: 'hidden',
				transition:
					'transform 0.30s ease-in-out, box-shadow 0.30s ease-in-out, border 0.30s ease-in-out',
				'&:hover': {
					transform: 'scale(1.1)',
					border: `2px solid ${theme.palette.secondary.main}`,
					boxShadow: `0px 0px 15px ${theme.palette.secondary.main}`,
				},
				'&:hover .card-media': {
					transform: 'scale(1.1)',
				},
			}}
			onClick={() => navigate(`/anime/${mal_id}`)}
		>
			<CardActionArea
				sx={{
					width: '100%',
					height: '100%',
					borderRadius: '10px',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<CardMedia
					component="img"
					image={image}
					alt={title}
					className="card-media"
					sx={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						borderRadius: '10px',
						transition: 'transform 0.30s ease-in-out',
					}}
				/>
			</CardActionArea>
		</Card>
	);
};

export default AnimeCard;
