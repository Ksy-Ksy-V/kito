import {
	Button,
	DialogContent,
	DialogTitle,
	Grid2,
	Typography,
} from '@mui/material';
import MainButton from '../Buttons/MainButton';
import { DeleteListProps } from '../../models/Interfaces';
import { FC } from 'react';
import { useUserContext } from '../../context/UserContext';
import theme from '../../styles/theme';

import CloseIcon from '@mui/icons-material/Close';

const DeleteAnime: FC<DeleteListProps> = ({
	loading,
	anime,
	handleClose,
	handleCloseDelete,
}) => {
	const { dispatch } = useUserContext();

	const handleDeleteFromList = () => {
		dispatch({
			type: 'SET_DELETE_ANIME',
		});
		handleClose();
		handleCloseDelete();
	};

	return (
		<>
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
					Delete from list "{anime.title}"
				</DialogTitle>

				<Button
					aria-label="close"
					onClick={handleCloseDelete}
					sx={{
						color: theme.palette.primary.main,
						fontSize: '4rem',
					}}
				>
					<CloseIcon />
				</Button>
			</Grid2>

			<DialogContent>
				<Typography sx={{ textAlign: 'center' }}>
					Confirm that you want to delete anime {anime.title} from
					lists
				</Typography>
				<Grid2 size={12}>
					<Grid2
						container
						spacing={2}
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Grid2 size={{ xs: 12, sm: 6 }}>
							<MainButton
								disabled={loading}
								onClick={() => handleCloseDelete}
								sx={{
									marginTop: { sm: '2rem', xs: '1rem' },
								}}
							>
								Cancel
							</MainButton>
						</Grid2>

						<Grid2 size={{ xs: 12, sm: 6 }}>
							<MainButton
								onClick={handleDeleteFromList}
								disabled={loading}
								sx={{
									marginTop: { sm: '2rem', xs: '1rem' },
								}}
							>
								Delete
							</MainButton>
						</Grid2>
					</Grid2>
				</Grid2>
			</DialogContent>
		</>
	);
};

export default DeleteAnime;
