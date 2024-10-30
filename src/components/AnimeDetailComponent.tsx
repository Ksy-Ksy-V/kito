import { Grid2 } from '@mui/material';
import DetailInformatioAboutAnime from './Randomizer/DetailInformatioAboutAnime';
import AnimeDescriptionSection from './Randomizer/AnimeDescriptionSection';
import CharacterSection from './Anime/CharactersSection';
import SimilarTitlesSection from './Anime/SimilarTitlesSection';
import { AbstractAnime } from '../models/AbstractAnime';

interface AnimeDetailProps {
	anime?: AbstractAnime | null;
	loading: boolean;
	fetchAnimeList?: () => void;
}

const AnimeDetail: React.FC<AnimeDetailProps> = ({
	anime,
	loading,
	fetchAnimeList,
}) => {
	const isRandomizerPage = location.pathname === '/randomizer-search';

	return (
		<Grid2 container spacing={2}>
			{fetchAnimeList ? (
				<DetailInformatioAboutAnime
					loading={loading}
					anime={anime as AbstractAnime}
					fetchAnimeList={() => fetchAnimeList()}
				/>
			) : (
				<DetailInformatioAboutAnime
					loading={loading}
					anime={anime as AbstractAnime}
				/>
			)}

			<AnimeDescriptionSection
				loading={loading}
				randomAnime={anime as AbstractAnime}
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

export default AnimeDetail;
