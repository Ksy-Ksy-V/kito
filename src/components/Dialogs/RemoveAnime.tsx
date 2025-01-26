import {
	Button,
	DialogContent,
	DialogTitle,
	Grid2,
	Typography,
} from '@mui/material';
import MainButton from '../Buttons/MainButton';
import { RemoveListProps } from '../../models/Interfaces';
import { FC } from 'react';
import { useUserContext } from '../../context/UserContext';
import theme from '../../styles/theme';

import CloseIcon from '@mui/icons-material/Close';

const RemoveAnime: FC<RemoveListProps> = ({
	loading,
	anime,
	handleClose,
	handleCloseRemove,
}) => {
	const { dispatch } = useUserContext();

	const handleRemoveFromList = () => {
		dispatch({
			type: 'SET_DELETE_ANIME',
		});
		handleClose();
		handleCloseRemove();
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
					onClick={handleCloseRemove}
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
					Confirm that you want to remove anime {anime.title} from
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
								onClick={() => handleCloseRemove()}
								sx={{
									marginTop: { sm: '2rem', xs: '1rem' },
								}}
							>
								Cancel
							</MainButton>
						</Grid2>

						<Grid2 size={{ xs: 12, sm: 6 }}>
							<MainButton
								onClick={handleRemoveFromList}
								disabled={loading}
								sx={{
									marginTop: { sm: '2rem', xs: '1rem' },
								}}
							>
								Remove
							</MainButton>
						</Grid2>
					</Grid2>
				</Grid2>
			</DialogContent>
		</>
	);
};

export default RemoveAnime;
