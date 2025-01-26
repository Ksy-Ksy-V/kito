import { DialogContent, Grid2, Skeleton, Typography } from '@mui/material';
import theme from '../../styles/theme';
import CustomSelect from '../Search/CustomSelect';
import MainButton from '../Buttons/MainButton';
import { ListName, listNameValues, ratingOptions, tabs } from '../../data/tabs';
import { FC, useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { ChangeListProps } from '../../models/Interfaces';

const ChangeList: FC<ChangeListProps> = ({
	loading,
	anime,
	handleClose,
	handleRemoveOpen,
}) => {
	const { dispatch } = useUserContext();

	const [listValue, setListValue] = useState<listNameValues>(
		anime.listName as listNameValues
	);

	const [scoreValue, setScoreValue] = useState<string>(
		String(anime?.userRating)
	);
	const [episodesValue, setEpisodesValue] = useState<string>(
		String(anime?.episodesWatched || 1)
	);

	const [validateError, setValidationsErrors] = useState<boolean>(false);

	const handleListChange = (newValue: listNameValues) => {
		setListValue(newValue);
	};

	const handleScoreChange = (newValue: string) => {
		setScoreValue(newValue);
	};

	const handleEpisodeChange = (newValue: string) => {
		setEpisodesValue(newValue);
	};

	const handleAdd = () => {
		if (listValue === ' ') {
			setValidationsErrors(true);
		} else {
			dispatch({
				type: 'UPDATE_ANIME',
				payload: {
					animeId: anime.id,
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
		setListValue(anime.listName as listNameValues);
		setScoreValue(
			anime.userRating !== undefined ? String(anime.userRating) : ''
		);
		setEpisodesValue(
			anime.episodesWatched !== undefined
				? String(anime.episodesWatched)
				: ''
		);
		handleClose();
	};

	useEffect(() => {
		if (listValue === 'Completed') {
			setEpisodesValue(String(anime.episodes || 1));
		}
	}, [listValue, anime.episodes]);

	const episodeOptions = Array.from(
		{ length: anime?.episodes || 1 },
		(_, index) => (index + 1).toString()
	);

	return (
		<DialogContent>
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
					<CustomSelect
						label="List"
						value={listValue}
						onChange={(e) =>
							handleListChange(e.target.value as listNameValues)
						}
						options={tabs.map(
							(option) => option.value as listNameValues
						)}
						clearValue={() => setListValue(listNameValues.Empty)}
						defaultValue={tabs[0].value as listNameValues}
						capitalizeOptions={false}
						hasValidationError={validateError}
					/>
				)}

				{validateError ? (
					<Typography
						color={theme.palette.text.primary}
						sx={{
							textAlign: 'center',
						}}
					>
						<span>
							If you want to remove anime from lists, click{' '}
						</span>
						<span
							onClick={handleRemoveOpen}
							style={{
								color: theme.palette.secondary.main,
								cursor: 'pointer',
							}}
						>
							confirm
						</span>
					</Typography>
				) : null}

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
					<CustomSelect
						label="Your Score"
						value={scoreValue}
						onChange={(e) => handleScoreChange(e.target.value)}
						options={ratingOptions.map((option) => option.value)}
						clearValue={() => setScoreValue('')}
						defaultValue={scoreValue}
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
					<CustomSelect
						label="Episodes Watched"
						value={episodesValue}
						onChange={(e) => handleEpisodeChange(e.target.value)}
						options={episodeOptions}
						clearValue={() => setEpisodesValue('')}
						defaultValue={episodesValue}
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
							Save
						</MainButton>
					</Grid2>
				</Grid2>
			</Grid2>
		</DialogContent>
	);
};

export default ChangeList;
