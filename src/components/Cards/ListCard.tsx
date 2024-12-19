import React from 'react';
import {
	Card,
	CardMedia,
	Typography,
	Box,
	useTheme,
	CardActionArea,
	Grid2,
} from '@mui/material';

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface ListCardProps {
	image: string;
	title: string;
	genres: string[];
	score: number;
	rating: string;
	list: string;
	playerScore?: number;
	onClick?: () => void;
}

const ListCard: React.FC<ListCardProps> = ({
	image,
	title,
	genres,
	score,
	rating,
	list,
	playerScore,
	onClick,
}) => {
	const theme = useTheme();

	return (
		<>
			<Card
				sx={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					aspectRatio: '9 / 16',
					maxWidth: '16.25rem',
					overflow: 'hidden',
					cursor: 'pointer',
					borderRadius: '1rem',
					backgroundColor: 'transparent',
					boxShadow:
						'0 4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)',
					transition: 'transform 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
					'&:hover': {
						transform: 'scale(1.05)',
					},
					'&:hover .rating-label': {
						opacity: 1,
						top: '-0.5rem',
					},
					'&:hover .content': {
						transform: 'translateY(0)',
					},
					'&:hover .card-media': {
						transform: 'scale(1.2)',
						opacity: 0.3,
					},
				}}
				onClick={onClick}
			>
				{playerScore ? (
					<Box
						className="rating-label"
						sx={{
							position: 'absolute',
							right: '0.5rem',
							height: '3rem',
							width: '4rem',
							backgroundColor: 'rgba(38, 71, 71)',
							borderEndStartRadius: '0.5rem',
							borderEndEndRadius: '0.5rem',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							zIndex: 2,
							opacity: 1,
							boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
							padding: '1rem',
						}}
					>
						<Typography
							variant="body1"
							sx={{
								color: theme.palette.text.primary,
								display: 'flex',
								alignItems: 'center',
								fontSize: {
									xs: theme.typography.body1.fontSize,
									sm: theme.typography.body1.fontSize,
									md: theme.typography.body1.fontSize,
									lg: theme.typography.body1.fontSize,
									xl: theme.typography.body1.fontSize,
								},
							}}
						>
							<StarOutlinedIcon
								sx={{
									marginRight: '0.3rem',
									marginBottom: '0.15rem',
									fontSize: '1.15rem',
									color: theme.palette.secondary.main,
								}}
							/>
							{playerScore}
						</Typography>
					</Box>
				) : null}

				<CardActionArea
					sx={{
						width: '100%',
						height: '100%',
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
							transition:
								'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease-in-out',
							opacity: 1,
						}}
					/>

					<Grid2
						className="content"
						sx={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							width: '100%',
							background:
								'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
							color: 'whitesmoke',
							padding: '1rem',
							transform: 'translateY(100%)',
							transition:
								'transform 0.7s cubic-bezier(0.19, 1, 0.22, 1)',
						}}
					>
						<Typography
							variant="h3"
							sx={{
								overflow: 'hidden',
								WebkitLineClamp: 3,
								textOverflow: 'ellipsis',
								transition: 'WebkitLineClamp 0.7s ease',
								color: theme.palette.secondary.main,
								fontSize: {
									xs: theme.typography.h6.fontSize,
									sm: theme.typography.h6.fontSize,
									md: theme.typography.h5.fontSize,
									lg: theme.typography.h5.fontSize,
									xl: theme.typography.h5.fontSize,
								},
							}}
						>
							{title}
						</Typography>

						<Typography
							variant="h5"
							sx={{
								color: theme.palette.text.primary,
								display: 'flex',
								alignItems: 'center',
								fontSize: {
									xs: theme.typography.body1.fontSize,
									sm: theme.typography.body1.fontSize,
									md: theme.typography.body1.fontSize,
									lg: theme.typography.h5.fontSize,
									xl: theme.typography.h5.fontSize,
								},
							}}
						>
							<StarOutlinedIcon
								sx={{
									marginRight: '0.5rem',
								}}
							/>
							{score}
						</Typography>

						<Typography
							variant="body1"
							className="description"
							sx={{
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								WebkitLineClamp: 4,
								textOverflow: 'ellipsis',
								transition: 'WebkitLineClamp 0.7s ease',
								fontSize: {
									xs: theme.typography.body2.fontSize,
									sm: theme.typography.body2.fontSize,
									md: theme.typography.body1.fontSize,
									lg: theme.typography.body1.fontSize,
									xl: theme.typography.body1.fontSize,
								},
								color: theme.palette.secondary.main,
							}}
						>
							{rating}
						</Typography>

						<Grid2
							sx={{
								marginTop: '1rem',
								display: 'flex',
								flexWrap: 'wrap',
								gap: '0.5rem',
							}}
						>
							{genres.slice(0, 2).map((genre) => (
								<Box
									key={genre}
									sx={{
										backgroundColor:
											'rgba(56, 113, 113, 0.7)',
										padding: '0.25rem 0.5rem',
										borderRadius: '0.5rem',
										fontSize: '0.875rem',
										display: 'inline-block',
										color: theme.palette.text.primary,
									}}
								>
									{genre}
								</Box>
							))}
						</Grid2>
					</Grid2>
				</CardActionArea>
			</Card>
			<Typography
				variant="h3"
				sx={{
					marginTop: '1rem',

					textAlign: 'center',
					color: theme.palette.secondary.main,
					fontSize: {
						xs: theme.typography.h5.fontSize,
						sm: theme.typography.h5.fontSize,
						md: theme.typography.h5.fontSize,
						lg: theme.typography.h4.fontSize,
						xl: theme.typography.h4.fontSize,
					},
				}}
			>
				{title}
			</Typography>
		</>
	);
};

export default ListCard;
