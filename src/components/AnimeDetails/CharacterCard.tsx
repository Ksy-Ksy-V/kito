import React from 'react';
import { Grid2, Typography, useTheme } from '@mui/material';

interface AnimeCardProps {
	image: string;
	title: string;
}

const CharacterCard: React.FC<AnimeCardProps> = ({ image, title }) => {
	const theme = useTheme();

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
						'transform 0.30s ease-in-out,  border 0.30s ease-in-out',
					'&:hover': {
						transform: 'scale(1.1)',
					},
				}}
			>
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

export default CharacterCard;
