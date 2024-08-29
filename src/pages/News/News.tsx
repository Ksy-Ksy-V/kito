import { Typography } from '@mui/material';
import { AnimeClient, JikanResponse, JikanNews } from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';

function News() {
	const animeClient = new AnimeClient();
	const [newsList, setNewsList] = useState<JikanNews[]>([]);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response: JikanResponse<JikanNews[]> =
					await animeClient.getAnimeNews(1, 1);
				console.log(response, 'resp');
				console.log(response.data, 'res');
				setNewsList(response.data);
			} catch (error) {
				console.error('Failed to fetch news:', error);
			}
		};

		if (newsList.length === 0) {
			fetchNews();
		}
	}, [animeClient, newsList]);

	return (
		<div>
			<Typography variant="h2">Anime News</Typography>
			{newsList.map((news, index) => (
				<Typography key={index} variant="body1">
					{news.title}
				</Typography>
			))}
		</div>
	);
}

export default News;
