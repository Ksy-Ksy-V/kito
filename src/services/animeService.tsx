import {
	Anime,
	AnimeClient,
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
	JikanResponse,
} from '@tutkli/jikan-ts';
import { SearchState } from '../context/SearchReducers';

class AnimeService {
	private animeClient: AnimeClient;
	constructor() {
		this.animeClient = new AnimeClient();
	}
	async searchAnime(
		query: SearchState['query'],
		limit: number,
		filters?: SearchState['filters']
	): Promise<Anime[]> {
		try {
			const response: JikanResponse<Anime[]> =
				await this.animeClient.getAnimeSearch({
					q: query,
					limit,
					genres: filters?.genres,
					type: filters?.format as AnimeType,
					status: filters?.status as AnimeSearchStatus,
					rating: filters?.rating as AnimeRating,
				});
			return response.data;
		} catch (error) {
			console.error('Failed to fetch anime:', error);
			throw error;
		}
	}
}
export const animeService = new AnimeService();
