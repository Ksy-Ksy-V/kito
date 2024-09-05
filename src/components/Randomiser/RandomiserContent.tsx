import React from 'react';
import {
	Grid2,
	Typography,
	Skeleton,
	Card,
	CardMedia,
	Box,
} from '@mui/material';
import { Anime } from '@tutkli/jikan-ts';
import StyledButton from '../../components/StyledButton';
import RandomCard from '../../components/RandomCard';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import notFoundImg from '../../images/not-found.png';
import theme from '../../styles/theme';
import Synopsis from '../Synopsis';

interface RandomiserContentProps {
	randomAnime: Anime | null;
	loading: boolean;
	handleRandomize: () => void;
	handleReturnToFilter: () => void;
}

const RandomiserContent: React.FC<RandomiserContentProps> = ({
	randomAnime,
	loading,
	handleRandomize,
	handleReturnToFilter,
}) => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100vw',
				left: '50%',
				right: '50%',
				marginLeft: '-50vw',
				marginRight: '-50vw',
				height: '500px',
				marginTop: '2rem',
			}}
		>
			{randomAnime && (
				<Box
					sx={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						backgroundImage: `url(${randomAnime.images.jpg.large_image_url})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						zIndex: 1,
					}}
				></Box>
			)}

			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					zIndex: 2,
				}}
			></Box>

			<Grid2
				container
				spacing={2}
				sx={{
					position: 'relative',
					zIndex: 3,
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Grid2 size={2} offset={3} sx={{ marginTop: '4rem' }}>
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="100%"
							height={300}
						/>
					) : randomAnime ? (
						<RandomCard
							title={randomAnime.title}
							imageUrl={randomAnime.images.jpg.image_url}
						/>
					) : (
						<Card
							sx={{
								background: 'rgba(29, 51, 53, 0.51)',
								borderRadius: '8px',
								boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
								backdropFilter: 'blur(4.9px)',
								webkitBackdropFilter: 'blur(4.9px)',
								border: '1px solid rgba(29, 51, 53, 0.3)',
							}}
						>
							<CardMedia
								component="img"
								height="300"
								image={notFoundImg}
								alt="Default Image"
							/>
						</Card>
					)}
				</Grid2>

				<Grid2 size={4} offset={1} sx={{ marginTop: '5rem' }}>
					{loading ? (
						<Skeleton variant="text" width="80%" height={40} />
					) : (
						<Box>
							<Box sx={{ display: 'flex' }}>
								<Typography variant="h3">
									{randomAnime
										? randomAnime.title
										: 'Sorry...'}
								</Typography>

								{randomAnime && randomAnime.score && (
									<Typography
										variant="h4"
										sx={{
											color: theme.palette.primary.main,
											marginLeft: '1rem',
											marginTop: '0.5rem',
											display: 'flex',
										}}
									>
										<StarOutlinedIcon
											sx={{
												marginTop: '0.25rem',
												marginRight: '0.25rem',
											}}
										/>
										{randomAnime.score}
									</Typography>
								)}
							</Box>

							{randomAnime && (
								<Typography
									variant="h6"
									sx={{
										marginTop: '0.5rem',
										color: theme.palette.primary.main,
									}}
								>
									<b>
										{randomAnime.rating?.match(
											/[A-Z0-9-]+/
										) || 'N/A'}
									</b>
								</Typography>
							)}

							<Box
								sx={{
									marginTop: '0.5rem',
									display: 'flex',
									flexWrap: 'wrap',
									gap: '0.5rem',
								}}
							>
								{randomAnime?.genres.map((genre) => (
									<Box
										key={genre.mal_id}
										sx={{
											backgroundColor:
												'rgba(29, 51, 53, 0.7)',
											padding: '0.25rem 0.5rem',
											borderRadius: '12px',
											fontSize: '0.875rem',
											display: 'inline-block',
										}}
									>
										{genre.name}
									</Box>
								))}
							</Box>
						</Box>
					)}
					<Synopsis
						synopsis={randomAnime?.synopsis || ''}
						loading={loading}
					/>

					<Grid2 container spacing={2}>
						<Grid2 size={6}>
							<StyledButton
								onClick={handleRandomize}
								disabled={loading || !randomAnime}
							>
								Randomize
							</StyledButton>
						</Grid2>

						<Grid2 size={6}>
							<StyledButton onClick={handleReturnToFilter}>
								New Filter
							</StyledButton>
						</Grid2>
					</Grid2>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default RandomiserContent;
