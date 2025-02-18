import {
	Button,
	Checkbox,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid2,
	Typography,
} from '@mui/material';
import theme from '../../styles/theme';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import MainButton from '../Buttons/MainButton';

const DeleteSettings = () => {
	const [open, setOpen] = useState(false);
	const [agreeToTerms, setAgreeToTerms] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCheckboxChange = () => {
		setAgreeToTerms((prev) => !prev);
	};

	const handleDelete = () => {
		setOpen(false);
		setAgreeToTerms(false);
	};

	return (
		<Grid2 container spacing={2} size={12}>
			<Grid2
				size={12}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '1rem',
				}}
			>
				<Typography
					variant="h2"
					sx={{
						textAlign: 'center',
						marginTop: '2rem',
						fontSize: {
							xs: theme.typography.h4.fontSize,
							sm: theme.typography.h3.fontSize,
							md: theme.typography.h3.fontSize,
							lg: theme.typography.h2.fontSize,
							xl: theme.typography.h2.fontSize,
						},
					}}
				>
					Delete account
				</Typography>
			</Grid2>

			<Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
				<Typography
					variant="body1"
					sx={{
						textAlign: { xs: 'center', md: 'left' },
						marginTop: { xs: '0rem', md: '0.75rem' },
						fontSize: {
							xs: theme.typography.body1.fontSize,
							sm: theme.typography.body1.fontSize,
							md: theme.typography.body1.fontSize,
							lg: theme.typography.body1.fontSize,
							xl: theme.typography.body1.fontSize,
						},
					}}
				>
					If you want to delete your account, please click “delete”
					button.
				</Typography>
			</Grid2>

			<Grid2
				size={{ xs: 12, sm: 12, md: 4 }}
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<ButtonWithIcon
					onClick={handleClickOpen}
					icon={<DeleteOutlineOutlinedIcon />}
					sx={{
						minWidth: '10rem',
						ml: 'auto',
					}}
				>
					Delete
				</ButtonWithIcon>

				<Dialog
					open={open}
					onClose={() => {
						setOpen(false), setAgreeToTerms(false);
					}}
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
						<DialogTitle
							id="dialog-title"
							sx={{ color: theme.palette.secondary.main }}
						>
							Delete account
						</DialogTitle>

						<Button
							aria-label="close"
							onClick={() => {
								setOpen(false), setAgreeToTerms(false);
							}}
							sx={{
								color: theme.palette.primary.main,
								fontSize: '4rem',
							}}
						>
							<CloseIcon />
						</Button>
					</Grid2>

					<DialogContent>
						<Grid2 size={12}>
							<Typography
								variant="h5"
								sx={{
									color: theme.palette.secondary.main,
									textAlign: 'center',
								}}
							>
								Are you sure you want to delete your account?{' '}
							</Typography>
							<Typography
								variant="body1"
								sx={{
									textAlign: 'center',
									marginTop: '1rem',
									marginBottom: '1rem',
								}}
							>
								Your account will be permanently deleted in 14
								days. <br />
								If you change your mind, you can log in to
								cancel the deletion before this period expires.{' '}
								<br />
								This action is irreversible after the deadline.{' '}
								<br />
								To continue, please confirm your agreement to
								the deletion of your account.
							</Typography>

							<FormControlLabel
								control={
									<Checkbox
										checked={agreeToTerms}
										name="agreeToTerms"
										onChange={handleCheckboxChange}
										sx={{
											color: theme.palette.primary.main,
										}}
									/>
								}
								label="I still want to delete my account "
							/>

							<Grid2
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: '1rem',
								}}
							>
								<Grid2 size={{ xs: 12, sm: 6 }}>
									<MainButton
										onClick={() => {
											setOpen(false),
												setAgreeToTerms(false);
										}}
										sx={{
											marginTop: {
												sm: '2rem',
												xs: '1rem',
											},
										}}
									>
										Cancel
									</MainButton>
								</Grid2>

								<Grid2 size={{ xs: 12, sm: 6 }}>
									<MainButton
										onClick={handleDelete}
										disabled={!agreeToTerms}
										sx={{
											marginTop: {
												sm: '2rem',
												xs: '1rem',
											},
										}}
									>
										Delete account
									</MainButton>
								</Grid2>
							</Grid2>
						</Grid2>
					</DialogContent>
				</Dialog>
			</Grid2>
		</Grid2>
	);
};

export default DeleteSettings;
