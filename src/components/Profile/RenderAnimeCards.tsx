import { Grid2 } from '@mui/material';
import AnimeTabCard from '../Cards/AnimeTabCard';
import ScoreCard from '../Cards/ScoreCard';
import EmptyList from './EmptyList';

import { RenderAnimeCardsProps } from '../../models/Interfaces';
import { FC } from 'react';

const RenderAnimeCards: FC<RenderAnimeCardsProps> = ({
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
			<ScoreCard key={anime.id} anime={anime} loading={loading} />
		) : (
			<Grid2 key={anime.id} size={{ xs: 6, sm: 3, md: 3, lg: 2 }}>
				<AnimeTabCard anime={anime} />
			</Grid2>
		)
	);
};

export default RenderAnimeCards;
