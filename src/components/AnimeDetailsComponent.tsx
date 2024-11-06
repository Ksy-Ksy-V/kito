import { Grid2 } from '@mui/material';
import DetailsInformationAboutAnime from './Randomizer/DetailsInformationAboutAnime';
import AnimeDescriptionSection from './Randomizer/AnimeDescriptionSection';
import CharacterSection from './AnimeInfo/CharactersSection';
import SimilarTitlesSection from './AnimeInfo/SimilarTitlesSection';
import { AbstractAnime } from '../models/AbstractAnime';

interface AnimeDetailsProps {
	anime?: AbstractAnime | null;
	loading: boolean;
	getRandomize?: (timeout: boolean) => void;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({
	anime,
	loading,
	getRandomize,
}) => {
	const isRandomizerPage = location.pathname === '/randomizer-search';

	return (
		<Grid2 container spacing={2}>
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
