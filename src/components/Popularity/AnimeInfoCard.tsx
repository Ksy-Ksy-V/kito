import React from 'react';
import { Box, Typography, Button, Chip, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import theme from '../../styles/theme';

interface AnimeInfoCardProps {
	number: number;
	image: string;
	title: string;
	score: number;
	genres: string[];
	description: string;
	rating: string;
	onAddToList: () => void;
}

const AnimeInfoCard: React.FC<AnimeInfoCardProps> = ({
	number,
	image,
	title,
	score,
	genres,
	description,
	rating,
	onAddToList,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				padding: '1rem',
				border: 'solid 1px ',
				borderColor: 'theme.palette.primary.main',
				borderRadius: '12px',
				boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
				alignItems: 'center',
				width: '100%',
				maxWidth: '900px',
			}}
		>
			<Typography
				variant="h3"
				sx={{
					color: '#00BFA6',
					marginRight: '2rem',
					fontWeight: 'bold',
				}}
			>
				#{number.toString().padStart(2, '0')}
			</Typography>

			<Box
				sx={{
					width: '150px',
					height: '225px',
					marginRight: '2rem',
					backgroundImage: `url(${image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					borderRadius: '12px',
				}}
			></Box>

			<Box sx={{ flex: 1 }}>
				<Typography
					variant="h5"
					sx={{ color: '#fff', fontWeight: 'bold' }}
				>
					{title}
				</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '1rem',
					}}
				>
					<StarIcon
						sx={{ color: '#FFD700', marginRight: '0.25rem' }}
					/>
					<Typography sx={{ color: '#fff', marginRight: '1rem' }}>
						{score}
					</Typography>

					{genres.map((genre) => (
						<Chip
							key={genre}
							label={genre}
							sx={{
								backgroundColor: '#333',
								color: '#fff',
								marginRight: '0.5rem',
								height: '24px',
							}}
						/>
					))}
				</Box>

				<Typography
					variant="body2"
					sx={{
						color: '#bbb',
						marginBottom: '1rem',
						lineHeight: '1.5',
					}}
				>
					{description}
				</Typography>

				<Button
					variant="outlined"
					sx={{
						color: '#00BFA6',
						borderColor: '#00BFA6',
						'&:hover': {
							backgroundColor: '#00BFA6',
							color: '#fff',
						},
					}}
					onClick={onAddToList}
				>
					Add to list +
				</Button>
			</Box>

			<Box
				sx={{
					marginLeft: '2rem',
					padding: '0.25rem 0.5rem',
					borderRadius: '8px',
					backgroundColor: '#2b2b2b',
					color: '#fff',
				}}
			>
				<Typography variant="body2">{rating}</Typography>
			</Box>
		</Box>
	);
};

export default AnimeInfoCard;
