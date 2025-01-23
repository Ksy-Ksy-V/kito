import { DialogContent, Grid2, Skeleton, Typography } from '@mui/material';
import theme from '../../styles/theme';
import StyledSearchFilters from '../Search/StyledSelectFilters';
import MainButton from '../Buttons/MainButton';
import { useEffect, useState } from 'react';
import { ListName, ratingOptions, tabs } from '../../data/tabs';
import { AddAnimeDialogProps } from '../../models/Interfaces';
import { useUserContext } from '../../context/UserContext';

const AddAnimeDialog: React.FC<AddAnimeDialogProps> = ({
	loading,
	handleClose,
	anime,
}) => {
	const { dispatch } = useUserContext();
	const [listValue, setListValue] = useState<string>('');
	const [scoreValue, setScoreValue] = useState<string>('');
	const [episodesValue, setEpisodesValue] = useState<string>('');

	const [validateError, setValidationsErrors] = useState<boolean>(false);
	const validateErrorText = 'Please select a list to add anime';

	const handleListChange = (newValue: string) => {
		setListValue(newValue);
	};

	const handleScoreChange = (newValue: string) => {
		setScoreValue(newValue);
	};

	const handleEpisodeChange = (newValue: string) => {
		setEpisodesValue(newValue);
	};

	const handleAdd = () => {
		if (listValue === '') {
			setValidationsErrors(true);
		} else {
			dispatch({
				type: 'SET_ADD_ANIME',
				payload: {
					animeId: anime.mal_id,
					updates: {
						userRating: Number(scoreValue),
						listName: listValue as ListName,
						episodesWatched: Number(episodesValue),
					},
				},
			});

			handleClose();
		}
	};

	const handleCancel = () => {
		setListValue('');
		setScoreValue('');
		setEpisodesValue('');
		handleClose();
	};

	const episodeOptions = Array.from(
		{ length: anime?.episodes || 1 },
		(_, index) => (index + 1).toString()
	);

	useEffect(() => {
		if (listValue === 'Completed') {
			setEpisodesValue(String(anime.episodes || 1));
		}
	}, [listValue, anime.episodes]);

	return (
		<DialogContent>
			<Grid2 size={12}>
				<Typography variant="h3" sx={{ textAlign: 'center' }}>
					{' '}
					{anime?.title || anime?.title_english}
				</Typography>
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
						validationError={
							validateError ? validateErrorText : undefined
						}
						hasValidationError={validateError}
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
						value={episodesValue}
						onChange={(e) => handleEpisodeChange(e.target.value)}
						options={episodeOptions}
						clearValue={() => setEpisodesValue('')}
						defaultValue={''}
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
							disabled={loading}
							onClick={handleCancel}
							sx={{
								marginTop: { sm: '2rem', xs: '1rem' },
							}}
						>
							Cancel
						</MainButton>
					</Grid2>

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
				</Grid2>
			</Grid2>
		</DialogContent>
	);
};

export default AddAnimeDialog;
