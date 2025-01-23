import { Grid2 } from '@mui/material';

import MainButton from './MainButton';
import { useNavigate } from 'react-router-dom';
import { AbstractAnimeProps } from '../../models/Interfaces';
import { FC } from 'react';

const RandomizerBtn: FC<AbstractAnimeProps> = ({
	loading,
	anime,
	getRandomize,
}) => {
	const navigate = useNavigate();

	const handleRandomize = () => {
		if (getRandomize) {
			getRandomize(anime !== null);
		}
	};

	const handleReturnToFilter = () => {
		navigate(`/randomizer`);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ sm: 6, xs: 12 }}>
				<MainButton
					onClick={handleRandomize}
					disabled={loading || !anime}
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
					disabled={loading || !anime}
				>
					New Filter
				</MainButton>
			</Grid2>
		</Grid2>
	);
};

export default RandomizerBtn;
