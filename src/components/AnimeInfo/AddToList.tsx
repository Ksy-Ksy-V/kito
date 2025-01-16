import { useState } from 'react';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { Button, Dialog, DialogTitle, Grid2 } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../styles/theme';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/authSlice';
import AddAnimeDialog from '../Dialogs/AddAnimeDialog';
import AuthRedirect from '../Dialogs/AuthRedirect';
import { Anime } from '@tutkli/jikan-ts';

interface AddToListProps {
	loading: boolean;
	anime: Anime;
}

const AddToList: React.FC<AddToListProps> = ({ loading, anime }) => {
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
			<ButtonWithIcon
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
						anime={anime}
					/>
				) : (
					<AuthRedirect loading={loading} />
				)}
			</Dialog>
		</>
	);
};

export default AddToList;
