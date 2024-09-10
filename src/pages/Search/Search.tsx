import { useEffect, useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import { AnimeClient, JikanResponse, Anime } from '@tutkli/jikan-ts';

import SearchFilter from '../../components/Search/SearchFilter';

const Search: React.FC = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12 }}>
				<Typography
					variant="h1"
					sx={{ textAlign: 'center', margin: '1.5rem' }}
				>
					There's something for everyone!
				</Typography>
				<SearchFilter />
			</Grid2>
		</Grid2>
	);
};

export default Search;
