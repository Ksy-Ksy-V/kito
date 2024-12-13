export interface Anime {
	id: number;
	name: string;
	image: string;
	userRating?: number;
	episodes: number;
	type: 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA';
	listName:
		| 'Watching'
		| 'Completed'
		| 'On-Hold'
		| 'Dropped'
		| 'Plan to Watch';
}

export interface UserAccount {
	id: number;
	name: string;
	status: string;
	avatar: string;
	background: string;
	animeList: Anime[];
}
