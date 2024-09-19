import React from 'react';
import {
	Card,
	CardActionArea,
	CardMedia,
	Typography,
	useTheme,
} from '@mui/material';

interface AnimeCardProps {
	image: string;
	title: string;
	onClick?: () => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ image, title, onClick }) => {
	const theme = useTheme();

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
					'transform 0.50s ease-in-out, box-shadow 0.50s ease-in-out, border 0.50s ease-in-out',
				'&:hover': {
					transform: 'scale(1.1)',
					border: `2px solid ${theme.palette.secondary.main}`,
					boxShadow: `0px 0px 15px ${theme.palette.secondary.main}`,
				},
				'&:hover .card-media': {
					transform: 'scale(1.1)',
				},
			}}
			onClick={onClick}
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
					alt="Anime thumbnail"
					className="card-media"
					sx={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						borderRadius: '10px',
						transition: 'transform 0.50s ease-in-out',
					}}
				/>
				<Typography
					variant="body1"
					sx={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						background:
							'linear-gradient(to top, #1d3335 15%, rgba(29, 51, 53, 0) 100%)',
						textAlign: 'center',
						padding: '8px',
						boxSizing: 'border-box',
					}}
				>
					{title}
				</Typography>
			</CardActionArea>
		</Card>
	);
};

export default AnimeCard;
