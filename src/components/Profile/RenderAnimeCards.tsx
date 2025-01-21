import { Grid2 } from '@mui/material';
import ListCard from '../Cards/ListCard';
import ScoreCard from '../Cards/ScoreCard';
import EmptyList from './EmptyList';

import { RenderAnimeCardsProps } from '../../models/Interfaces';

const RenderAnimeCards: React.FC<RenderAnimeCardsProps> = ({
	paginatedAnime,
	activeTab,
	isFiltrated,
}) => {
	if (paginatedAnime.length === 0) {
		return <EmptyList isFiltrated={isFiltrated} />;
	}

	return paginatedAnime.map((anime) =>
		activeTab === 'Score' ? (
			<ScoreCard key={anime.id} anime={anime} />
		) : (
			<Grid2 key={anime.id} size={{ xs: 6, sm: 3, md: 3, lg: 2 }}>
				<ListCard anime={anime} />
			</Grid2>
		)
	);
};

export default RenderAnimeCards;
