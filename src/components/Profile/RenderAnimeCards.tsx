import { Grid2 } from '@mui/material';
import ListCard from '../Cards/ListCard';
import ScoreCard from '../Cards/ScoreCard';
import EmptyList from './EmptyList';

import { Anime } from '../../models/ProfileModels';

interface RenderAnimeCardsProps {
	paginatedAnime: Anime[];
	activeTab: string;
	isFiltrated: boolean;
	loading: boolean;
}

const RenderAnimeCards: React.FC<RenderAnimeCardsProps> = ({
	paginatedAnime,
	activeTab,
	isFiltrated,
	loading,
}) => {
	if (paginatedAnime.length === 0) {
		return <EmptyList isFiltrated={isFiltrated} />;
	}

	return paginatedAnime.map((anime) =>
		activeTab === 'Score' ? (
			<ScoreCard
				id={anime.id}
				loading={loading}
				key={anime.id}
				image={anime.image}
				title={anime.name}
				score={anime.userRating || 0}
				episodes={`${anime.episodesWatched}/${anime.episodes}`}
				type={anime.type}
				genres={anime.genres}
				description={anime.description}
			/>
		) : (
			<Grid2 key={anime.id} size={{ xs: 6, sm: 3, md: 3, lg: 2 }}>
				<ListCard
					image={anime.image}
					title={anime.name}
					genres={anime.genres}
					score={anime.score}
					rating={anime.rating}
					playerScore={anime.userRating}
					id={anime.id}
				/>
			</Grid2>
		)
	);
};

export default RenderAnimeCards;
