import { Grid2 } from '@mui/material';
import React from 'react';
import MainButton from './MainButton';
import { Anime } from '@tutkli/jikan-ts';
import { useNavigate } from 'react-router-dom';

interface RandomizerBtnProps {
	loading: boolean;
	randomAnime: Anime | null;
	getRandomize: (timeout: boolean) => void;
}

const RandomizerBtn: React.FC<RandomizerBtnProps> = ({
	loading,
	randomAnime,
	getRandomize,
}) => {
	const navigate = useNavigate();

	const handleRandomize = () => {
		getRandomize(randomAnime !== null);
	};

	const handleReturnToFilter = () => {
		navigate(`/randomizer`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ sm: 6, xs: 12 }}>
				<MainButton
					onClick={handleRandomize}
					disabled={loading || !randomAnime}
					sx={{
						marginTop: { sm: '2rem', xs: '1rem' },
					}}
				>
					Randomize
				</MainButton>
			</Grid2>

			<Grid2 size={{ sm: 6, xs: 12 }}>
				<MainButton
					onClick={handleReturnToFilter}
					sx={{
						marginTop: { sm: '2rem', xs: '0rem' },
					}}
					disabled={loading || !randomAnime}
				>
					New Filter
				</MainButton>
			</Grid2>
		</Grid2>
	);
};

export default RandomizerBtn;
