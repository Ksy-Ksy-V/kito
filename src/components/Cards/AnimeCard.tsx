import React from 'react';
import { Grid2, Typography, useTheme } from '@mui/material';
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
		<Grid2
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Grid2
				sx={{
					width: '170px',
					height: '250px',
					borderRadius: '16px',
					marginBottom: '10px',
					boxShadow: 'rgba(29, 51, 53, 0.7)',
					overflow: 'hidden',
					transition:
						'transform 0.20s ease-in-out, box-shadow 0.20s ease-in-out, border 0.20s ease-in-out',
					'&:hover': {
						transform: 'scale(1.1)',
						border: `2px solid ${theme.palette.secondary.main}`,
					},
					'&:hover .card-media': {
						transform: 'scale(1.1)',
					},
				}}
			>
				{mal_id ? (
					<Grid2
						component="img"
						src={image}
						alt={title}
						sx={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							borderRadius: '10px',
							transition: 'transform 0.30s ease-in-out',
						}}
						onClick={() => navigate(`/anime/${mal_id}`)}
					/>
				) : (
					<Grid2
						component="img"
						src={image}
						alt={title}
						sx={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							borderRadius: '10px',
							transition: 'transform 0.30s ease-in-out',
						}}
					/>
				)}
			</Grid2>
			<Typography
				variant="h5"
				sx={{
					textAlign: 'center',
					color: theme.palette.secondary.main,
				}}
			>
				{title}
			</Typography>
		</Grid2>
	);
};

export default AnimeCard;
