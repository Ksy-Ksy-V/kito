import {
	Anime,
	AnimeClient,
	AnimeRating,
	AnimeSearchStatus,
	AnimeType,
	JikanResponse,
} from '@tutkli/jikan-ts';
import { SearchFilters } from '../components/Search/SearchFilters';

class AnimeService {
	private animeClient: AnimeClient;

	constructor() {
		this.animeClient = new AnimeClient();
	}

	async searchAnime(filters: SearchFilters): Promise<Anime[]> {
		try {
			const response: JikanResponse<Anime[]> =
				await this.animeClient.getAnimeSearch({
					q: filters.q,
					genres: filters.genres,
					type: filters.type as AnimeType,
					status: filters.status as AnimeSearchStatus,
					rating: filters.rating as AnimeRating,
					limit: 25,
				});
			return response.data;
		} catch (error) {
			console.error('Failed to fetch anime:', error);
			throw error;
		}
	}
}

export const animeService = new AnimeService();
