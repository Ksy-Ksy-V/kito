import { Grid2 } from '@mui/material';
import SearchCard from '../Cards/SearchCard';
import { useMemo } from 'react';
import { useSearchContext } from '../../context/SearchContext';

const CardSection = () => {
	const { state } = useSearchContext();

	const uniqueAnimeList = useMemo(() => {
		return state.animeList.filter(
			(anime, index, self) =>
				index === self.findIndex((a) => a.mal_id === anime.mal_id)
		);
	}, [state.animeList]);
	return (
		<Grid2 size={12}>
			<Grid2
				container
				spacing={2}
				sx={{
					marginTop: '1rem',
					justifyContent: 'center',
				}}
			>
				{uniqueAnimeList.map((anime) => (
					<Grid2
						key={anime.mal_id}
						size={{ xs: 6, sm: 4, md: 4, lg: 3 }}
					>
						<SearchCard anime={anime} />
					</Grid2>
				))}
			</Grid2>
		</Grid2>
	);
};

export default CardSection;
