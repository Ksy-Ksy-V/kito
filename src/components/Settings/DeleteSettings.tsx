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
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import MainButton from '../Buttons/MainButton';
import { useUserContext } from '../../context/UserContext';

const DeleteSettings = () => {
	const { state, dispatch } = useUserContext();
	const [isDeletedState, setIsDeletedState] = useState(
		state.user?.deleteAt !== null
	);
	const [open, setOpen] = useState(false);
	const [agreeToTerms, setAgreeToTerms] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCheckboxChange = () => {
		setAgreeToTerms((prev) => !prev);
	};

	const handleDelete = () => {
		dispatch({
			type: isDeletedState
				? 'CANCEL_DELETE_ACCOUNT'
				: 'SET_DELETE_ACCOUNT',
		});

		setOpen(false);
		setAgreeToTerms(false);
	};

	useEffect(() => {
		setIsDeletedState(state.user?.deleteAt !== null);
	}, [state.user?.deleteAt]);

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
					{isDeletedState
						? 'Cancel Account Deletion'
						: 'Delete Account'}
				</Typography>
			</Grid2>

			<Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
				<Typography
					variant="body1"
					sx={{
						textAlign: { xs: 'center', md: 'left' },
						marginTop: { xs: '0rem', md: '0.75rem' },
					}}
				>
					{isDeletedState
						? 'Your account is scheduled for deletion. You can cancel this action before the 14-day period expires.'
						: 'If you want to delete your account, please click the “Delete” button.'}
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
					icon={
						isDeletedState ? (
							<CloseIcon />
						) : (
							<DeleteOutlineOutlinedIcon />
						)
					}
					sx={{
						minWidth: '10rem',
						ml: 'auto',
					}}
				>
					{isDeletedState ? 'Cancel deletion' : 'Delete'}
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
							{isDeletedState
								? 'Cancel Account Deletion'
								: 'Delete Account'}
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
								{isDeletedState
									? 'Do you want to cancel the account deletion?'
									: 'Are you sure you want to delete your account?'}
							</Typography>
							<Typography
								variant="body1"
								sx={{
									textAlign: 'center',
									marginTop: '1rem',
									marginBottom: '1rem',
									whiteSpace: 'pre-line',
								}}
							>
								{isDeletedState
									? 'Your account is scheduled for deletion.\n\nIf you cancel now, your account will remain active.\n\nThis action cannot be undone after the 14-day period expires.'
									: 'Your account will be permanently deleted in 14 days.\n\nIf you change your mind, you can log in to cancel the deletion before this period expires.\n\nThis action is irreversible after the deadline.\n\nTo continue, please confirm your agreement.'}
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
								label={
									isDeletedState
										? 'I want to cancel the account deletion'
										: 'I still want to delete my account'
								}
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
										{isDeletedState
											? 'Cancel deletion'
											: 'Delete account'}
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
