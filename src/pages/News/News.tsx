import { Typography, Grid2 } from '@mui/material';
import { AnimeClient, JikanResponse, JikanNews } from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';
import NewsCard from '../../components/NewsCard';

function News() {
	const animeClient = new AnimeClient();
	const [newsList, setNewsList] = useState<JikanNews[]>([]);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response: JikanResponse<JikanNews[]> =
					await animeClient.getAnimeNews(1, 1);
				setNewsList(response.data);
			} catch (error) {
				console.error('Failed to fetch news:', error);
			}
		};

		fetchNews();
	}, []);

	return (
		<div>
			<Typography variant="h2">Anime News</Typography>
			<Grid2 container spacing={2}>
				{newsList.map((news, index) => (
					<Grid2 size={{ xs: 4 }} key={index}>
						<NewsCard
							title={news.title}
							date={news.date}
							author={news.author_username}
							excerpt={news.excerpt}
							imageUrl={news.images.jpg.image_url}
							newsUrl={news.url}
						/>
					</Grid2>
				))}
			</Grid2>
		</div>
	);
}

export default News;
