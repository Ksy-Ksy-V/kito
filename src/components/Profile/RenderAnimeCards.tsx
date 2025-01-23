import { Grid2 } from '@mui/material';
import AnimeTabCard from '../Cards/AnimeTabCard';
import EmptyList from './EmptyList';
import { RenderAnimeCardsProps } from '../../models/Interfaces';
import { useUserContext } from '../../context/UserContext';
import AnimeOverviewCard from '../Cards/AnimeOverviewCard';

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
			<AnimeOverviewCard key={anime.id} anime={anime} loading={loading} />
		) : (
			<Grid2 key={anime.id} size={{ xs: 6, sm: 3, md: 3, lg: 2 }}>
				<AnimeTabCard anime={anime} />
			</Grid2>
		)
	);
};

export default RenderAnimeCards;
