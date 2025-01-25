import { DialogContent, Grid2, Skeleton } from '@mui/material';
import theme from '../../styles/theme';
import CustomSelect from '../Search/CustomSelect';
import MainButton from '../Buttons/MainButton';
import { FC, useEffect, useState } from 'react';
import {
	GenreKitoValues,
	ListName,
	listNameValues,
	ratingOptions,
	tabs,
	type,
} from '../../data/tabs';
import { AddAnimeDialogProps } from '../../models/Interfaces';
import { useUserContext } from '../../context/UserContext';
import { Anime } from '@tutkli/jikan-ts';
import { AnimeKito } from '../../models/ProfileModels';

const AddAnimeDialog: FC<AddAnimeDialogProps> = ({
	loading,
	handleClose,
	anime,
}) => {
	const { dispatch } = useUserContext();
	const [listValue, setListValue] = useState<listNameValues>(
		listNameValues.Empty
	);
	const [scoreValue, setScoreValue] = useState<string>('');
	const [episodesValue, setEpisodesValue] = useState<string>('');

	const [validateError, setValidationsErrors] = useState<boolean>(false);

	const validateErrorText = 'Please select a list to add anime';

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
		if (listValue === listNameValues.Empty) {
			setValidationsErrors(true);
		} else {
			const animeKito = createAnimeKitoObject(
				anime,
				listValue,
				Number(scoreValue),
				Number(episodesValue)
			);

			dispatch({
				type: 'SET_ADD_ANIME',
				payload: { anime: animeKito },
			});

			handleClose();
		}
	};

	const handleCancel = () => {
		setListValue(listNameValues.Empty);
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

	const createAnimeKitoObject = (
		anime: Anime,
		listName: string,
		userRating: number,
		episodesWatched: number
	): AnimeKito => {
		const genres = anime.genres
			.map((genre) => {
				const genreValue =
					GenreKitoValues[genre.name as keyof typeof GenreKitoValues];
				return genreValue || null;
			})
			.filter((genre) => genre !== null) as GenreKitoValues[];
		return {
			id: anime.mal_id,
			title: anime.title,
			image: anime.images.jpg.image_url,
			episodes: anime.episodes || 0,
			type: anime.type as type,
			description: anime.synopsis as string,
			genres,
			score: anime.score,
			rating: anime.rating,
			userRating,
			listName: listName as ListName,
			episodesWatched,
		};
	};

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
						options={tabs.map((option) => option.value)}
						clearValue={() => setListValue(listNameValues.Empty)}
						defaultValue={tabs[0].value}
						capitalizeOptions={false}
						validationError={
							validateError ? validateErrorText : null
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
					<CustomSelect
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
					<CustomSelect
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
							Save
						</MainButton>
					</Grid2>
				</Grid2>
			</Grid2>
		</DialogContent>
	);
};

export default AddAnimeDialog;
