import React from 'react';
import {
	Card,
	CardActionArea,
	CardMedia,
	Typography,
	Box,
	useTheme,
} from '@mui/material';

interface SearchCardProps {
	image: string;
	title: string;
	onClick?: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ image, title, onClick }) => {
	const theme = useTheme();

	return (
		<Card
			sx={{
				width: '250px',
				height: '450px',
				marginBottom: '10px',
				cursor: 'pointer',
				boxShadow: 'rgba(29, 51, 53, 0.7)',
				overflow: 'hidden',
				backgroundColor:
					// 'theme.palette.primary.light' ,

					'transparent',
				transition:
					'transform 0.50s ease-in-out, box-shadow 0.50s ease-in-out, border 0.50s ease-in-out',
				'&:hover': {
					transform: 'scale(1.05)',
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
					position: 'relative',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box sx={{ flex: '1 1 auto', width: '100%' }}>
					<CardMedia
						component="img"
						image={image}
						alt="Anime thumbnail"
						className="card-media"
						sx={{
							width: '100%',
							height: '400px',
							objectFit: 'cover',
							transition: 'transform 0.50s ease-in-out',
						}}
					/>
				</Box>

				<Box
					sx={{
						width: '100%',
						padding: '10px 8px',
						textAlign: 'center',
					}}
				>
					<Typography
						variant="body1"
						sx={{
							color: theme.palette.text.primary,
						}}
					>
						{title}
					</Typography>
				</Box>
			</CardActionArea>
		</Card>
	);
};

export default SearchCard;
