import { DialogContent, Grid2, Skeleton, Typography } from '@mui/material';
import theme from '../../styles/theme';
import StyledSearchFilters from '../Search/StyledSelectFilters';
import MainButton from '../Buttons/MainButton';
import { ratingOptions, tabs } from '../../data/tabs';
import { useState } from 'react';
import { Anime } from '../../models/ProfileModels';

interface ChangeListProps {
	loading?: boolean;
	anime: Anime;
	handleClose: () => void;
}

const ChangeList: React.FC<ChangeListProps> = ({
	loading,
	anime,
	handleClose,
}) => {
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
		handleClose();
	};

	const handleCancel = () => {
		setListValue('');
		setScoreValue('');
		handleClose();
	};

	return (
		<DialogContent>
			<Typography variant="h3" sx={{ textAlign: 'center' }}>
				{' '}
				{anime.name}
			</Typography>
			<Grid2 size={12}>
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
