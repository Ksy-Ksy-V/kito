import { DialogContent, Grid2, Skeleton, Typography } from '@mui/material';
import theme from '../../styles/theme';
import StyledSearchFilters from '../Search/StyledSelectFilters';
import MainButton from '../Buttons/MainButton';
import { ListName, ratingOptions, tabs } from '../../data/tabs';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { ChangeListProps } from '../../models/Interfaces';

const ChangeList: React.FC<ChangeListProps> = ({
	loading,
	anime,
	handleClose,
}) => {
	const { dispatch } = useUserContext();

	const [listValue, setListValue] = useState<string>(anime.listName);
	const [scoreValue, setScoreValue] = useState<string>(
		String(anime?.userRating)
	);
	const [episodesValue, setEpisodesValue] = useState<string>(
		String(anime?.userRating || 1)
	);

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
	};

	const handleCancel = () => {
		setListValue(anime.listName);
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

export default ChangeList;
