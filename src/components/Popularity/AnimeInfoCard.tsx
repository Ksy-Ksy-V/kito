import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import AnimeCard from '../AnimeCard';
import theme from '../../styles/theme';
import StyledButton from '../StyledButton';

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
	// onAddToList,
}) => {
	const [showFullDescription, setShowFullDescription] = useState(false);
	return (
		<Box
			sx={{
				display: 'flex',
				padding: '1rem',
				border: 'solid 1px',
				borderColor: theme.palette.primary.main,
				borderRadius: '12px',
				boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
				alignItems: 'center',
				position: 'relative',
				marginBottom: '1rem',
			}}
		>
			<Typography
				variant="h3"
				sx={{
					marginRight: '2rem',
					fontWeight: 'bold',
				}}
			>
				#{number.toString().padStart(2, '0')}
			</Typography>

			<Box
				sx={{
					marginRight: '2rem',
				}}
			>
				<AnimeCard image={image} title={title} />
			</Box>

			<Box sx={{ flex: 1 }}>
				<Typography variant="h4">{title}</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						marginTop: '1rem',
						marginBottom: '1rem',
					}}
				>
					<Typography
						variant="h5"
						sx={{
							color: theme.palette.primary.main,
							display: 'flex',
							alignItems: 'center',
							marginRight: '2rem',
						}}
					>
						<StarOutlinedIcon
							sx={{
								marginRight: '0.5rem',
							}}
						/>
						{score}
					</Typography>

					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '0.5rem',
						}}
					>
						{genres.map((genre) => (
							<Box
								key={genre}
								sx={{
									backgroundColor: 'rgba(56, 113, 113, 0.7)',
									padding: '0.25rem 0.5rem',
									borderRadius: '8px',
									fontSize: '0.875rem',
									display: 'inline-block',
									color: theme.palette.text.primary,
								}}
							>
								{genre}
							</Box>
						))}
					</Box>
				</Box>

				<Box>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '1rem',
							display: '-webkit-box',
							overflow: 'hidden',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: showFullDescription ? 'none' : 4,
							textOverflow: 'ellipsis',
						}}
					>
						{description}
					</Typography>
					<Button
						variant="text"
						onClick={() => setShowFullDescription((prev) => !prev)}
						sx={{
							position: 'absolute',
							right: 0,
							textTransform: 'none',
						}}
					>
						{showFullDescription
							? 'Show less'
							: 'See all description'}
					</Button>
				</Box>

				<StyledButton sx={{ width: '23rem' }}>
					Add to list +
				</StyledButton>
			</Box>

			<Box
				sx={{
					position: 'absolute',
					top: 0,
					right: 0,
					transform: 'translate(-20%, -15%)',
					height: '6rem',
					width: '4rem',
					backgroundColor: 'rgba(38, 71, 71, 0.85)',
					borderEndStartRadius: '1rem',
					borderEndEndRadius: '1rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography
					variant="h5"
					sx={{
						color: theme.palette.text.secondary,
						textAlign: 'center',
					}}
				>
					{rating?.split(' - ')[0]}
				</Typography>
			</Box>
		</Box>
	);
};

export default AnimeInfoCard;
