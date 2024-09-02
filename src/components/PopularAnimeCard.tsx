import React from 'react';
// import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Card, CardMedia, CardActionArea } from '@mui/material';

interface CustomCardProps {
	title: string;
	imageUrl: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, imageUrl }) => {
	return (
		<Card
			sx={{
				borderRadius: '8px',
				width: '250px',

				'&::before': {
					transform: 'translate(-50%, -50%) scale(1)',

					transition:
						'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
					filter: 'blur(10px)',
					zIndex: 1,
				},
				'&:hover::before': {
					transform: 'translate(-50%, -50%) scale(1.20)',
					filter: 'blur(30px)',
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
};

export default CustomCard;
