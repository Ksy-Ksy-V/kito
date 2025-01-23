import { DialogContent, Grid2, Skeleton } from '@mui/material';
import theme from '../../styles/theme';
import StyledSearchFilters from '../Search/StyledSelectFilters';
import MainButton from '../Buttons/MainButton';
import { ratingOptions, tabs } from '../../data/tabs';
import { FC, useState } from 'react';
import { AddAnimeDialogProps } from '../../models/Interfaces';

const ChangeList: FC<AddAnimeDialogProps> = ({ loading, handleClose }) => {
	const [listValue, setListValue] = useState<string>('');
	const [scoreValue, setScoreValue] = useState<string>('');

	const handleListChange = (newValue: string) => {
		setListValue(newValue);
	};

	const handleScoreChange = (newValue: string) => {
		setScoreValue(newValue);
	};

	const handleAdd = () => {
		handleClose();
	};

	const handleCancel = () => {
		setListValue('');
		setScoreValue('');
		handleClose();
	};

	return (
		<DialogContent>
			<Grid2 size={12} sx={{ marginTop: '1rem' }}>
				{loading ? (
					<Skeleton
						variant="rectangular"
						width="100%"
						sx={{
							marginTop: '0.5rem',
							backgroundColor: theme.palette.primary.light,
						}}
					/>
				) : (
					<StyledSearchFilters
						label="List"
						value={listValue}
						onChange={(e) => handleListChange(e.target.value)}
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
							backgroundColor: theme.palette.primary.light,
						}}
					/>
				) : (
					<StyledSearchFilters
						label="Your Score"
						value={scoreValue}
						onChange={(e) => handleScoreChange(e.target.value)}
						options={ratingOptions.map((option) => option.label)}
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
							backgroundColor: theme.palette.primary.light,
						}}
					/>
				) : (
					<StyledSearchFilters
						label="Episodes Watched"
						value={scoreValue}
						onChange={(e) => handleScoreChange(e.target.value)}
						options={ratingOptions.map((option) => option.label)}
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
							Add changes
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
							Cancel changes
						</MainButton>
					</Grid2>
				</Grid2>
			</Grid2>
		</DialogContent>
	);
};

export default ChangeList;
