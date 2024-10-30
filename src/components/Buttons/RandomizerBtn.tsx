import { Grid2 } from '@mui/material';
import React from 'react';
import StyledButton from './StyledButton';
import { Anime } from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';

interface RandomizerBtnProps {
	loading: boolean;
	randomAnime: Anime | null;
	fetchAnimeList: () => void;
}

const RandomizerBtn: React.FC<RandomizerBtnProps> = ({
	loading,
	randomAnime,
	fetchAnimeList,
}) => {
	const navigate = useNavigate();

	const handleRandomize = () => {
		fetchAnimeList();
	};

	const handleReturnToFilter = () => {
		navigate(`/randomizer`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ sm: 6, xs: 12 }}>
				<StyledButton
					onClick={handleRandomize}
					disabled={loading || !randomAnime}
					sx={{
						marginTop: { sm: '2rem', xs: '1rem' },
					}}
				>
					Randomize
				</StyledButton>
			</Grid2>

			<Grid2 size={{ sm: 6, xs: 12 }}>
				<StyledButton
					onClick={handleReturnToFilter}
					sx={{
						marginTop: { sm: '2rem', xs: '0rem' },
					}}
					disabled={loading || !randomAnime}
				>
					New Filter
				</StyledButton>
			</Grid2>
		</Grid2>
	);
};

export default RandomizerBtn;
