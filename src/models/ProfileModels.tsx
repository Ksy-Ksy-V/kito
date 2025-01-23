import { ListName, type } from '../data/tabs';
export interface AnimeKito {
	id: number;
	// name: string;
	title: string;
	image: string;
	userRating?: number;
	episodes: number;
	episodesWatched: number;
	type: type;
	listName: ListName;
	description: string;
	genres: string[];
	score: number;
	rating: string;
}

export interface UserAccount {
	id: number;
	name: string;
	status: string;
	avatar: string;
	background: string;
	animeList: AnimeKito[];
}
