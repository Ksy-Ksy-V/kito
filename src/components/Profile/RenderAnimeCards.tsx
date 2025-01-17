import { Grid2 } from '@mui/material';
import ListCard from '../Cards/ListCard';
import ScoreCard from '../Cards/ScoreCard';
import EmptyList from './EmptyList';

import { Anime } from '../../models/ProfileModels';
import { useUserContext } from '../../context/UserContext';

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
	const { state } = useUserContext();
	const { animeList } = state.user || {};

	if (!animeList || animeList.length === 0) {
		return <p>No anime found</p>;
	}

	if (paginatedAnime.length === 0) {
		return <EmptyList isFiltrated={isFiltrated} />;
	}

	return paginatedAnime.map((anime) =>
		activeTab === 'Score' || activeTab === 'Watching' ? (
			<ScoreCard anime={anime} loading={loading} key={anime.id} />
		) : (
			<Grid2 key={anime.id} size={{ xs: 6, sm: 3, md: 3, lg: 2 }}>
				<ListCard anime={anime} />
			</Grid2>
		)
	);
};

export default RenderAnimeCards;
