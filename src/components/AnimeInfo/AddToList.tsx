import { FC, useEffect, useState } from 'react';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { Button, Dialog, DialogTitle, Grid2 } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../styles/theme';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/authSlice';
import AddAnimeDialog from '../Dialogs/AddAnimeDialog';
import AuthRedirect from '../Dialogs/AuthRedirect';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { AnimeSectionProps } from '../../models/Interfaces';
import { useUserContext } from '../../context/UserContext';
import ChangeList from '../Dialogs/ChangeList';
import { AnimeKito } from '../../models/ProfileModels';
import DeleteAnime from '../Dialogs/DeleteAnime';

const AddToList: FC<AnimeSectionProps> = ({ loading, anime }) => {
	const { isLoggedIn } = useAppSelector(selectAuth);
	const { state } = useUserContext();
	const { animeList } = state.user || {};
	const [open, setOpen] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

	const [inList, setInList] = useState(false);
	const [localAnime, setLocalAnime] = useState<AnimeKito | null>(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (anime && animeList) {
			const foundAnime = animeList.find(
				(item) => item.id === anime.mal_id
			);
			setInList(!!foundAnime);
			setLocalAnime(foundAnime ? foundAnime : null);
		}
	}, [anime, animeList]);

	const btnLabel = inList && isLoggedIn ? 'Change list' : 'Add To List';

	return (
		<>
			<ButtonWithIcon
				onClick={handleClickOpen}
				loading={loading}
				icon={inList && <CreateOutlinedIcon />}
				sx={{
					width: {
						xs: '11rem',
						sm: '12rem',
						md: '14rem',
					},
					marginTop: '1rem',
				}}
			>
				{btnLabel}
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
					<DialogTitle
						id="dialog-title"
						sx={{ color: theme.palette.secondary.main }}
					>
						{btnLabel} "{anime?.title}"
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

				{isLoggedIn && anime !== null ? (
					inList && localAnime ? (
						<ChangeList
							loading={loading}
							handleClose={() => handleClose()}
							anime={localAnime}
							handleDeleteOpen={() => setOpenDeleteDialog(true)}
						/>
					) : (
						<AddAnimeDialog
							loading={loading}
							handleClose={() => handleClose()}
							anime={anime}
						/>
					)
				) : (
					<AuthRedirect />
				)}

				{openDeleteDialog && localAnime && (
					<Dialog
						open={openDeleteDialog}
						onClose={() => setOpenDeleteDialog(false)}
						fullWidth
						disableEnforceFocus
					>
						<DeleteAnime
							loading={loading}
							handleClose={handleClose}
							handleCloseDelete={() => setOpenDeleteDialog(false)}
							anime={localAnime}
						/>
					</Dialog>
				)}
			</Dialog>
		</>
	);
};

export default AddToList;
