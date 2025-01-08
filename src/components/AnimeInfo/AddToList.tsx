import { useState } from 'react';
import AddButton from '../Buttons/AddButton';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid2,
	Skeleton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../styles/theme';
import MainButton from '../Buttons/MainButton';

import { ratingOptions, tabs } from '../../data/tabs';
import StyledSearchFilters from '../Search/StyledSelectFilters';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/authSlice';

interface AddToListProps {
	loading?: boolean;
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

	const [listValue, setListValue] = useState<string>('');
	const [scoreValue, setScoreValue] = useState<string>('');
	// const [episodesValue, setEpisodesValue] = useState<number>(1);

	const handleListChange = (newValue: string) => {
		setListValue(newValue);
	};

	const handleScoreChange = (newValue: string) => {
		setScoreValue(newValue);
	};

	const handleAdd = () => {
		setOpen(false);
	};

	const handleCancel = () => {
		setListValue('');
		setScoreValue('');
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

			<Dialog open={open} onClose={handleClose} fullWidth>
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

				<DialogContent>
					<Grid2 size={12} sx={{ marginTop: '1rem' }}>
						{loading ? (
							<Skeleton
								variant="rectangular"
								width="100%"
								sx={{
									marginTop: '0.5rem',
									backgroundColor:
										theme.palette.primary.light,
								}}
							/>
						) : (
							<StyledSearchFilters
								label="List"
								value={listValue}
								onChange={(e) =>
									handleListChange(e.target.value)
								}
								options={tabs.map((option) => option.value)}
								clearValue={() => setListValue('')}
								defaultValue={tabs[0].value}
								capitalizeOptions={false}
							/>
						)}

						{loading ? (
							<Skeleton
								variant="rectangular"
								width="100%"
								sx={{
									marginTop: '0.5rem',
									backgroundColor:
										theme.palette.primary.light,
								}}
							/>
						) : (
							<StyledSearchFilters
								label="Your Score"
								value={scoreValue}
								onChange={(e) =>
									handleScoreChange(e.target.value)
								}
								options={ratingOptions.map(
									(option) => option.label
								)}
								clearValue={() => setScoreValue('')}
								defaultValue={ratingOptions[0].value}
								capitalizeOptions={false}
							/>
						)}

						{loading ? (
							<Skeleton
								variant="rectangular"
								width="100%"
								sx={{
									marginTop: '0.5rem',
									backgroundColor:
										theme.palette.primary.light,
								}}
							/>
						) : (
							<StyledSearchFilters
								label="Episodes Watched"
								value={scoreValue}
								onChange={(e) =>
									handleScoreChange(e.target.value)
								}
								options={ratingOptions.map(
									(option) => option.label
								)}
								clearValue={() => setScoreValue('')}
								defaultValue={ratingOptions[0].value}
								capitalizeOptions={false}
							/>
						)}

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
									onClick={handleAdd}
									disabled={loading}
									sx={{
										marginTop: { sm: '2rem', xs: '1rem' },
									}}
								>
									Add
								</MainButton>
							</Grid2>

							<Grid2 size={{ xs: 12, sm: 6 }}>
								<MainButton
									disabled={loading}
									onClick={handleCancel}
									sx={{
										marginTop: { sm: '2rem', xs: '1rem' },
									}}
								>
									Cancel
								</MainButton>
							</Grid2>
						</Grid2>
					</Grid2>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AddToList;
