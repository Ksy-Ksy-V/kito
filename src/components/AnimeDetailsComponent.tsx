import { Grid2 } from '@mui/material';
import DetailsInformationAboutAnime from './Randomizer/DetailsInformationAboutAnime';
import AnimeDescriptionSection from './Randomizer/AnimeDescriptionSection';
import CharacterSection from './AnimeInfo/CharactersSection';
import SimilarTitlesSection from './AnimeInfo/SimilarTitlesSection';
import { AbstractAnime } from '../models/AbstractAnime';
import { AbstractAnimeProps } from '../models/Interfaces';
import { FC } from 'react';

const AnimeDetails: FC<AbstractAnimeProps> = ({
	anime,
	loading,
	getRandomize,
}) => {
	const isRandomizerPage = location.pathname === '/randomizer-search';

	return (
		<Grid2
			container
			spacing={2}
			sx={{
				display: 'flex',
				justifyContent: { xs: 'center', sm: 'flex-start' },
			}}
		>
			{isRandomizerPage && getRandomize ? (
				<DetailsInformationAboutAnime
					loading={loading}
					anime={anime as AbstractAnime}
					randomizerPage={true}
					getRandomize={(timeout) => getRandomize(timeout)}
				/>
			) : (
				<DetailsInformationAboutAnime
					loading={loading}
					anime={anime as AbstractAnime}
				/>
			)}

			<AnimeDescriptionSection
				loading={loading}
				anime={anime as AbstractAnime}
			/>

			{!isRandomizerPage && (
				<>
					<Grid2
						size={12}
						sx={{
							display: 'flex',
							alignContent: 'flex-start',
							alignItems: 'flex-start',
						}}
					>
						<CharacterSection anime={anime as AbstractAnime} />
					</Grid2>
					<Grid2
						size={12}
						sx={{
							display: 'flex',
							alignContent: 'flex-start',
							alignItems: 'flex-start',
						}}
					>
						<SimilarTitlesSection anime={anime as AbstractAnime} />
					</Grid2>
				</>
			)}
		</Grid2>
	);
};

export default AnimeDetails;
