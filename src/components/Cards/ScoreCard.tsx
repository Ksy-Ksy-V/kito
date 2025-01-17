import React, { useState } from 'react';
import {
	Typography,
	Grid2,
	Button,
	DialogTitle,
	Dialog,
	Card,
	Skeleton,
	Box,
	useMediaQuery,
} from '@mui/material';
import theme from '../../styles/theme';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ChangeList from '../Dialogs/ChangeList';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Anime } from '../../models/ProfileModels';
interface ScoreCardProps {
	anime: Anime;
	loading: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ anime, loading }) => {
	const [open, setOpen] = useState(false);
	const [showFullDescription, setShowFullDescription] = useState(false);
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Card
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'row',
				padding: '1rem',
				borderRadius: '1rem',
				boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
				backgroundColor: theme.palette.background.paper,
				transition: 'transform 0.3s ease',
				'&:hover': {
					transform: 'scale(1.02)',
				},
			}}
		>
			<Grid2
				container
				spacing={2}
				size={12}
				sx={{
					padding: '0.5rem',
				}}
			>
				<Grid2
					component="a"
					href={`/anime/${anime.id}`}
					rel="noopener noreferrer"
					size={{ xs: 12, sm: 3, md: 3 }}
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="10rem"
							height="15rem"
						/>
					) : (
						<Grid2
							component="img"
							src={anime.image}
							alt={anime.name}
							sx={{
								width: '10rem',
								height: '16rem',
								objectFit: 'cover',
								borderRadius: '0.625rem',
								transition: 'transform 0.30s ease-in-out',
							}}
						/>
					)}
				</Grid2>

				<Grid2
					container
					spacing={2}
					size={{ xs: 12, sm: 5, md: 6 }}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						marginLeft: { sm: '1rem', md: '0rem' },
					}}
				>
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
							{anime.name}
						</Typography>
					)}

					{!isSmallScreen ? (
						<Grid2
							size={12}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: { xs: 'center', sm: 'unset' },
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
									{anime.genres.map((genre) => (
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
					) : null}

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
									textAlign: { xs: 'center', sm: 'left' },
									maxHeight: {
										xs: showFullDescription
											? 'none'
											: '6rem',
										sm: showFullDescription
											? 'none'
											: '5.8rem',
										md: showFullDescription
											? 'none'
											: '4.3rem',
									},
									overflow: 'hidden',
									display: 'block',
									textOverflow: 'ellipsis',
									whiteSpace: 'normal',
									marginTop: { xs: '0.5rem', sm: '1rem' },
								}}
							>
								{anime.description}
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

				<Grid2
					container
					spacing={2}
					size={{ xs: 12, sm: 3, md: 3 }}
					sx={{ marginLeft: { xs: '0rem', sm: '1rem', md: '0rem' } }}
				>
					<Grid2
						size={{ xs: 4, sm: 12, md: 4 }}
						sx={{
							display: 'flex',
							flexDirection: {
								xs: 'column',
								md: 'column',
								sm: 'row',
							},
							justifyContent: {
								xs: 'center',
								md: 'normal',
								sm: 'space-between',
							},
						}}
					>
						<>
							<Typography
								variant="body1"
								sx={{
									marginBottom: '0.3rem',
									color: theme.palette.primary.main,
									display: 'flex',
									justifyContent: 'center',
									textAlign: 'center',
								}}
							>
								Score:
							</Typography>
							<Typography
								variant="body1"
								sx={{
									marginBottom: '0.3rem',
									color: theme.palette.text.primary,
									display: 'flex',
									justifyContent: {
										xs: 'center',
										md: 'center',
										sm: 'flex-end',
									},
								}}
							>
								<StarOutlinedIcon
									sx={{
										marginRight: '0.25rem',
										color: theme.palette.secondary.main,
									}}
								/>
								{anime.userRating || '?'}
							</Typography>
						</>
					</Grid2>
					<Grid2
						size={{ xs: 4, sm: 12, md: 4 }}
						sx={{
							display: 'flex',
							flexDirection: {
								xs: 'column',
								md: 'column',
								sm: 'row',
							},
							justifyContent: {
								xs: 'center',
								md: 'normal',
								sm: 'space-between',
							},
						}}
					>
						<>
							<Typography
								variant="body1"
								sx={{
									marginBottom: '0.3rem',
									color: theme.palette.primary.main,
									display: 'flex',
									justifyContent: 'center',
									textAlign: 'center',
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
									justifyContent: {
										xs: 'center',
										md: 'center',
										sm: 'flex-end',
									},
								}}
							>
								{`${anime.episodesWatched}/${anime.episodes}`}
							</Typography>
						</>
					</Grid2>
					<Grid2
						size={{ xs: 4, sm: 12, md: 4 }}
						sx={{
							display: 'flex',
							flexDirection: {
								xs: 'column',
								md: 'column',
								sm: 'row',
							},
							justifyContent: {
								xs: 'center',
								md: 'normal',
								sm: 'space-between',
							},
						}}
					>
						<>
							<Typography
								variant="body1"
								sx={{
									marginBottom: '0.3rem',
									color: theme.palette.primary.main,
									display: 'flex',
									justifyContent: 'center',
									textAlign: 'center',
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
									justifyContent: {
										xs: 'center',
										md: 'center',
										sm: 'flex-end',
									},
								}}
							>
								{anime.type}
							</Typography>
						</>
					</Grid2>

					<Grid2 size={12}>
						<ButtonWithIcon
							onClick={handleClickOpen}
							loading={loading}
							icon={<CreateOutlinedIcon />}
							sx={{
								marginTop: '1rem',
							}}
						>
							Change list
						</ButtonWithIcon>

						<Dialog
							open={open}
							onClose={handleClose}
							fullWidth
							disableEnforceFocus
						>
							<Grid2
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<DialogTitle id="dialog-title">
									Change list
								</DialogTitle>

								<Button
									aria-label="close"
									onClick={handleClose}
									sx={{
										color: theme.palette.primary.main,
										fontSize: '4rem',
									}}
								>
									<CloseIcon />
								</Button>
							</Grid2>

							<ChangeList
								loading={loading}
								handleClose={() => handleClose()}
								anime={anime}
							/>
						</Dialog>

						<ButtonWithIcon
							onClick={handleClickOpen}
							loading={loading}
							icon={<DeleteOutlineOutlinedIcon />}
							sx={{
								marginTop: '1rem',
							}}
						>
							Delete from list
						</ButtonWithIcon>
					</Grid2>
				</Grid2>
			</Grid2>
		</Card>
	);
};

export default ScoreCard;
