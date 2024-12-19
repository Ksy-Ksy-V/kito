import React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';
import theme from '../../styles/theme';
import MainButton from '../Buttons/MainButton';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface ScoreCardProps {
	image: string;
	title: string;
	score: number;
	episodes: string;
	type: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
	image,
	title,
	score,
	episodes,
	type, 
}) => {
	return (
		<Grid2
			container
			spacing={2}
			size={12}
			sx={{
				display: 'flex',
				alignItems: 'center',
				padding: '0.5rem',
				border: 'solid 1px',
				borderColor: theme.palette.secondary.main,
				borderRadius: '1rem',
			}}
		>
			<Grid2 size={1}>
				<Typography
					variant="h6"
					sx={{
						textAlign: 'center',
					}}
				>
					1
				</Typography>
			</Grid2>

			<Grid2 size={2}>
				<Box
					component="img"
					src={image}
					alt={title}
					sx={{
						width: '6rem',
						height: '10rem',
						borderRadius: '0.5rem',
						objectFit: 'cover',
					}}
				/>
			</Grid2>

			<Grid2 size={6}>
				<Typography
					variant="h6"
					sx={{
						marginBottom: '1rem',
						color: theme.palette.secondary.main,
					}}
				>
					{title}
				</Typography>

				<Grid2 size={12} sx={{ display: 'flex' }}>
					<Grid2 size={6} sx={{ marginRight: '1rem' }}>
						<MainButton
							sx={{
								backgroundColor: 'transparent',
								borderColor: 'primary.main',
							}}
						>
							Change list
						</MainButton>
					</Grid2>

					<Grid2 size={6} sx={{ marginRight: '1rem' }}>
						<MainButton
							sx={{
								backgroundColor: 'transparent',
								borderColor: 'primary.main',
							}}
						>
							Change my score
						</MainButton>
					</Grid2>
				</Grid2>
			</Grid2>

			<Grid2 size={1}>
				<>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '0.3rem',
							color: theme.palette.primary.main,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						My score:
					</Typography>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '0.3rem',
							color: theme.palette.text.primary,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<StarOutlinedIcon
							sx={{
								marginRight: '0.25rem',
								color: theme.palette.secondary.main,
							}}
						/>
						{score}
					</Typography>
				</>
			</Grid2>
			<Grid2 size={1}>
				<>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '0.3rem',
							color: theme.palette.primary.main,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						Episodes:
					</Typography>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '0.3rem',
							color: theme.palette.text.primary,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						{episodes}
					</Typography>
				</>
			</Grid2>
			<Grid2 size={1}>
				<>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '0.3rem',
							color: theme.palette.primary.main,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						Type:
					</Typography>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '0.3rem',
							color: theme.palette.text.primary,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						{type}
					</Typography>
				</>
			</Grid2>
		</Grid2>
	);
};

export default ScoreCard;
