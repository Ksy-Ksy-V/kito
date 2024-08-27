import { Typography, Grid } from '@mui/material';
import {
	AnimeClient,
	JikanResponse,
	Anime as GeneralAnime,
} from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';

function Popularity() {
	const animeClient = new AnimeClient();
	const [animeList, setAnimeList] = useState<GeneralAnime[]>([]);

	useEffect(() => {
		if (animeList.length === 0) {
			animeClient
				.getAnimeSearch({
					page: 1,
					limit: 1,
					sort: 'asc',
					order_by: 'popularity',
					genres: '9,8',
				})
				.then((response: JikanResponse<GeneralAnime[]>) => {
					console.log(response, 'resp');
					console.log(response.data, 'res');
					setAnimeList(response.data);
				})
				.catch((err) => {
					console.log(err, 'err');
				});
		}
	}, [anime, animeClient, animeList]);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography
					variant="h1"
					sx={{
						textAlign: 'center',
						marginTop: '1rem',
						marginBottom: '2rem',
					}}
				>
					Top Anime by Popularity
					{animeList.length === 0 ? 'Not loaded' : animeList[0].title}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default Popularity;
