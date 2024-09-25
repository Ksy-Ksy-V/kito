import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import AnimeCard from '../AnimeCard';
import theme from '../../styles/theme';
import AddButton from '../Buttons/AddButton';

interface AnimeInfoCardProps {
	number: number;
	image: string;
	title: string;
	score: number;
	genres: string[];
	description: string;
	rating: string;
	onAddToList: () => void;
	loading: boolean;
}

const AnimeInfoCard: React.FC<AnimeInfoCardProps> = ({
	number,
	image,
	title,
	score,
	genres,
	description,
	rating,
	loading,
}) => {
	const [showFullDescription, setShowFullDescription] = useState(false);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				padding: '1rem',
				border: 'solid 1px',
				borderColor: theme.palette.primary.main,
				borderRadius: '12px',
				boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
				alignItems: { xs: 'flex-start', md: 'center' },
				position: 'relative',
				marginBottom: '1rem',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					marginRight: { md: '2rem' },
					marginBottom: { xs: '1rem', md: 0 },
				}}
			>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 'bold',
						marginRight: '1rem',
					}}
				>
					#{number.toString().padStart(2, '0')}
				</Typography>

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

				<Box sx={{ position: 'relative', width: '100%' }}>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '1rem',
							maxHeight: showFullDescription ? 'none' : '6rem',
							overflow: 'hidden',
							display: 'block',
							textOverflow: 'ellipsis',
							whiteSpace: 'normal',
						}}
					>
						{description}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Button
							variant="text"
							onClick={() =>
								setShowFullDescription((prev) => !prev)
							}
							sx={{
								textTransform: 'none',
							}}
						>
							{showFullDescription
								? 'Show less'
								: 'See all description'}
						</Button>
					</Box>
				</Box>

				<AddButton loading={loading}>Add to list</AddButton>
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
					variant="body1"
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
