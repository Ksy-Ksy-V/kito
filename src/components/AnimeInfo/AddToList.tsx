import { useState } from 'react';
import AddButton from '../Buttons/AddButton';
import { Button, Dialog, DialogTitle, Grid2 } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../styles/theme';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/authSlice';
import AddAnimeDialog from '../Dialogs/AddAnimeDialog';
import AuthRedirect from '../Dialogs/AuthRedirect';

interface AddToListProps {
	loading: boolean;
}

const AddToList: React.FC<AddToListProps> = ({ loading }) => {
	const { isLoggedIn } = useAppSelector(selectAuth);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<AddButton
				onClick={handleClickOpen}
				loading={loading}
				sx={{
					width: {
						xs: '11rem',
						sm: '12rem',
						md: '14rem',
					},
					marginTop: '1rem',
				}}
			>
				Add To List
			</AddButton>

			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth
				disableEnforceFocus
			>
				<Grid2
					container
					spacing={2}
					sx={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<DialogTitle id="dialog-title">Add to list</DialogTitle>

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

				{isLoggedIn ? (
					<AddAnimeDialog
						loading={loading}
						handleClose={() => handleClose()}
					/>
				) : (
					<AuthRedirect loading={loading} />
				)}
			</Dialog>
		</>
	);
};

export default AddToList;
