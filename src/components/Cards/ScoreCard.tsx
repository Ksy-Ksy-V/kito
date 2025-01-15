import React, { useState } from 'react';
import {
	Box,
	Typography,
	Grid2,
	Button,
	DialogTitle,
	Dialog,
} from '@mui/material';
import theme from '../../styles/theme';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ChangeList from '../Dialogs/ChangeList';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';

interface ScoreCardProps {
	loading: boolean;
	image: string;
	title: string;
	score: number;
	episodes: string;
	type: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
	loading,
	image,
	title,
	score,
	episodes,
	type,
}) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

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
			<Grid2 size={{ xs: 4, sm: 2 }}>
				<Box
					component="img"
					src={image}
					alt={title}
					sx={{
						width: '6rem',
						height: '10rem',
						borderRadius: '0.5rem',
						objectFit: 'cover',
						margin: '1rem',
					}}
				/>
			</Grid2>

			<Grid2
				size={{ xs: 6, sm: 3, md: 6 }}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					marginLeft: '2rem',
				}}
			>
				<Typography
					variant="h6"
					sx={{
						marginBottom: '1rem',
						color: theme.palette.secondary.main,
						display: 'flex',
						justifyContent: {
							xs: 'space-evenly',
							sm: 'flex-start',
						},
						alignContent: 'flex-start',
						textAlign: {
							xs: 'center',
							sm: 'left',
						},
					}}
				>
					{title}
				</Typography>

				<Grid2
					size={12}
					sx={{
						display: 'flex',
						justifyContent: {
							xs: 'space-evenly',
							sm: 'flex-start',
						},
					}}
				>
					<Grid2 size={8}>
						<ButtonWithIcon
							onClick={handleClickOpen}
							loading={loading}
							icon={<CreateOutlinedIcon />}
							sx={{
								width: {
									xs: '11rem',
									sm: '12rem',
									md: '14rem',
								},
								marginTop: '1rem',
							}}
						>
							Change list
						</ButtonWithIcon>
					</Grid2>

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
						/>
					</Dialog>
				</Grid2>
			</Grid2>

			<Grid2 size={{ xs: 4, sm: 2, md: 1 }}>
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
			<Grid2 size={{ xs: 4, sm: 2, md: 1 }}>
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
							justifyContent: 'center',
						}}
					>
						{episodes}
					</Typography>
				</>
			</Grid2>
			<Grid2 size={{ xs: 4, sm: 2, md: 1 }}>
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
