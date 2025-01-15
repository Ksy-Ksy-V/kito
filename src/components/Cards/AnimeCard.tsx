import React from 'react';
import { Grid2, Typography, useTheme } from '@mui/material';

interface AnimeCardProps {
	image: string;
	title: string;
	mal_id?: number;
	isTitle?: boolean;
}

const AnimeCard: React.FC<AnimeCardProps> = ({
	image,
	title,
	mal_id,
	isTitle,
}) => {
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
					width: '10.625rem',
					height: '15.625rem',
					borderRadius: '1rem',
					marginBottom: '0.625rem',
					boxShadow: 'rgba(29, 51, 53, 0.7)',
					overflow: 'hidden',
					cursor: 'pointer',
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
						component="a"
						href={`/anime/${mal_id}`}
						rel="noopener noreferrer"
						sx={{
							width: '100%',
							height: '100%',
							display: 'block',
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
								borderRadius: '0.625rem',
								transition: 'transform 0.30s ease-in-out',
							}}
						/>
					</Grid2>
				) : (
					<Grid2
						component="img"
						src={image}
						alt={title}
						sx={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							borderRadius: '0.625rem',
							transition: 'transform 0.30s ease-in-out',
						}}
					/>
				)}
			</Grid2>

			{isTitle ? (
				<Typography
					variant="h5"
					sx={{
						textAlign: 'center',
						color: theme.palette.secondary.main,
					}}
				>
					{title}
				</Typography>
			) : null}
		</Grid2>
	);
};

export default AnimeCard;
