import { Typography, Grid } from '@mui/material';
import {
	AnimeClient,
	JikanResponse,
	Anime as GeneralAnime,
} from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';

interface Anime {
	// mal_id: number;
	// url: string;
	// approved: boolean;
	title: string;
	// title_english?: string;
	// title_japanese: string;
	// title_synonyms: string[];
	// source: string;
	// episodes: number;
	// airing: boolean;
	// duration: string;
	// score: number;
	// scored_by: number;
	// rank: number;
	// popularity: number;
	// members: number;
	// favorites: number;
	// synopsis: string;
	// background: string;
	// year: number;
}

function Popularity() {
	const animeClient = new AnimeClient();
	const [animeList, setAnimeList] = useState<GeneralAnime[]>([]);
	const [anime, setAnime] = useState<Anime>();
	useEffect(() => {
		if (!anime) {
			animeClient
				.getAnimeById(1)
				.then((response: JikanResponse<GeneralAnime>) => {
					setAnime({ title: response.data.title });
				});
		}
		if (animeList.length === 0) {
			animeClient
				.getAnimeSearch()
				.then((response: JikanResponse<GeneralAnime[]>) => {
					console.log(response.data, 'res');
					setAnimeList(response.data);
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
					{anime?.title}
					{animeList.length === 0 ? 'Not loaded' : animeList[0].title}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default Popularity;
