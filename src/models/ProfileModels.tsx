export interface AnimeDetailsKito {
	mal_id: number;
	image: string;
	title: string;
	movie: boolean;
	episodes: number;
}

export interface ProfileContent {
	userId: number;
	name: string;
	status: string;

	avatar: string;
	backgroundCover: string;

	userAnimeList: {
		watching: AnimeDetailsKito[];
		completed: AnimeDetailsKito[];
		onHold: AnimeDetailsKito[];
		dropped: AnimeDetailsKito[];
		planToWatch: AnimeDetailsKito[];
	};
}
