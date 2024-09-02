import { Typography, Grid2 } from '@mui/material';
import {
	AnimeClient,
	JikanResponse,
	JikanNews,
	TopClient,
	Anime,
} from '@tutkli/jikan-ts';
import { useEffect, useState } from 'react';
import NewsCard from '../../components/NewsCard';
// import theme from '../../styles/theme';

function News() {
	const [newsList, setNewsList] = useState<JikanNews[]>([]);
	const [topList, setTopList] = useState<Anime[]>([]);

	useEffect(() => {
		const animeClient = new AnimeClient();

		const top = new TopClient();
		const fetchNews = async () => {
			try {
				// if (redux had topAnime in store) => using theme, if not >>

				const topListResponse: JikanResponse<Anime[]> =
					await top.getTopAnime({
						page: 1,
						limit: 3,
					});

				setTopList(topListResponse.data);
				const fetchNewsForTopItems = async () => {
					const newsData = await Promise.all(
						topList.map(async (topItem) => {
							const newsResponse: JikanResponse<JikanNews[]> =
								await animeClient.getAnimeNews(
									topItem.mal_id,
									1
								);
							return newsResponse.data;
						})
					);

					setNewsList(newsData.flat());
				};

				fetchNewsForTopItems();
			} catch (error) {
				console.error('Failed to fetch news:', error);
			}
		};

		fetchNews();
	}, [topList]);

	return (
		<div>
			<Typography
				variant="h2"
				sx={{ margin: '2rem', textAlign: 'center' }}
			>
				News of 3 most popular anime at the moment
			</Typography>
			<Grid2 container spacing={2}>
				{newsList.map((news, index) => (
					<Grid2 size={{ xs: 3 }} key={index}>
						<NewsCard
							title={news.title}
							date={news.date}
							author={news.author_username}
							excerpt={news.excerpt}
							imageUrl={news.images.jpg.image_url}
							newsId={news.mal_id}
						/>
					</Grid2>
				))}
			</Grid2>
		</div>
	);
}

export default News;
