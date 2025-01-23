import { FC, useState } from 'react';
import {
	Box,
	Typography,
	Button,
	Skeleton,
	Grid2,
	useMediaQuery,
} from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import AnimeCard from '../Cards/AnimeCard';
import theme from '../../styles/theme';
import StyledInformation from '../../styles/StyledInformation';
import { AnimeInfoCardProps } from '../../models/Interfaces';
import AddToList from '../AnimeInfo/AddToList';

const AnimeInfoCard: FC<AnimeInfoCardProps> = ({ number, anime, loading }) => {
	const [showFullDescription, setShowFullDescription] = useState(false);
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid2
			container
			spacing={2}
			size={12}
			sx={{
				padding: {
					xs: '1rem',
					sm: '1rem',
					md: '1.5rem',
				},
				border: 'solid 1px',
				borderColor: theme.palette.primary.main,
				borderRadius: '12px',
				boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
				position: 'relative',

				marginBottom: '1rem',
			}}
		>
			<Grid2
				container
				spacing={2}
				size={{ xs: 12, sm: 5, md: 4, lg: 3 }}
				sx={{
					alignContent: 'flex-start',
				}}
			>
				<Grid2
					size={12}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="3rem"
							height="4rem"
							sx={{ marginRight: { md: '2rem' } }}
						/>
					) : (
						<Typography
							variant="h3"
							sx={{
								fontWeight: 'bold',
								marginRight: '1rem',
							}}
						>
							#{number.toString().padStart(2, '0')}
						</Typography>
					)}
				</Grid2>
				<Grid2
					size={12}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="10rem"
							height="15rem"
						/>
					) : (
						<AnimeCard
							image={anime.images.jpg.image_url}
							title={anime.title}
							mal_id={anime.mal_id}
						/>
					)}
				</Grid2>
				<Grid2
					size={12}
					sx={{
						alignItems: 'center',
						justifyContent: 'center',
						display: 'flex',
					}}
				>
					{anime ? (
						<>
							<AddToList anime={anime} />
						</>
					) : (
						<AddToList loading={loading} anime={anime} />
					)}
				</Grid2>
			</Grid2>

			<Grid2
				container
				spacing={2}
				size={{ xs: 12, sm: 6, md: 8, lg: 8 }}
				sx={{ marginLeft: { lg: '2rem', md: '0rem' } }}
			>
				<Grid2 size={12}>
					{loading ? (
						<Skeleton variant="text" width="30%" height="2rem" />
					) : (
						<Typography
							variant="h3"
							sx={{
								textAlign: {
									xs: 'center',
									sm: 'inherit',
								},
								fontSize: {
									xs: theme.typography.h5.fontSize,
									sm: theme.typography.h4.fontSize,
									md: theme.typography.h4.fontSize,
									lg: theme.typography.h3.fontSize,
									xl: theme.typography.h3.fontSize,
								},
							}}
						>
							{anime.title}
						</Typography>
					)}

					<Grid2
						size={12}
						sx={{
							display: !isSmallScreen ? 'flex' : 'none',
							marginTop: '1rem',
							marginBottom: '1rem',
						}}
					>
						{loading ? (
							<Skeleton
								variant="text"
								width="4rem"
								height="3rem"
								sx={{ marginRight: '2rem' }}
							/>
						) : (
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
								{anime.score || 0}
							</Typography>
						)}
					</Grid2>

					<Grid2
						size={12}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: { xs: 'center', sm: 'unset' },
							marginTop: '1rem',
							marginBottom: '1rem',
						}}
					>
						{loading ? (
							<Skeleton
								variant="rectangular"
								width="6rem"
								height={24}
							/>
						) : (
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '0.5rem',
								}}
							>
								{anime.genres
									.map((genre) => genre.name)
									.map((genre) => (
										<Box
											key={genre}
											sx={{
												backgroundColor:
													'rgba(56, 113, 113, 0.7)',
												padding: '0.25rem 0.5rem',
												borderRadius: '8px',
												fontSize: '0.875rem',
												display: 'inline-block',
												color: theme.palette.text
													.primary,
											}}
										>
											{genre}
										</Box>
									))}
							</Box>
						)}
					</Grid2>

					<Grid2
						size={12}
						sx={{
							display: isSmallScreen ? 'flex' : 'none',
							marginTop: '1rem',
						}}
					>
						{loading ? (
							<Skeleton
								variant="text"
								width="4rem"
								height="3rem"
								sx={{ marginRight: '2rem' }}
							/>
						) : (
							<StyledInformation
								label="Score:"
								value={anime.score.toString() || 'Not score'}
							/>
						)}
					</Grid2>

					<Box sx={{ position: 'relative', width: '100%' }}>
						{loading ? (
							<>
								{[...Array(4)].map((_, index) => (
									<Skeleton
										key={index}
										variant="text"
										width="100%"
										height={20}
										sx={{ marginBottom: '0.5rem' }}
									/>
								))}
							</>
						) : (
							<Typography
								variant="body1"
								sx={{
									marginBottom: '1rem',
									maxHeight: {
										xs: showFullDescription
											? 'none'
											: '6rem',
										sm: showFullDescription
											? 'none'
											: '10.5rem',
										md: showFullDescription
											? 'none'
											: '10.5rem',
									},
									overflow: 'hidden',
									display: 'block',
									textOverflow: 'ellipsis',
									whiteSpace: 'normal',
									marginTop: { xs: '0.5rem', sm: '2rem' },
								}}
							>
								{anime.synopsis || 'No description available.'}
							</Typography>
						)}
						<Box
							sx={{
								display: 'flex',
								justifyContent: {
									xs: 'center',
									sm: 'flex-end',
								},
							}}
						>
							{!loading && (
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
							)}
						</Box>
					</Box>
				</Grid2>
			</Grid2>

			{!loading && (
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
						{anime.rating?.split(' - ')[0]}
					</Typography>
				</Box>
			)}
		</Grid2>
	);
};

export default AnimeInfoCard;
