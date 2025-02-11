import { ListName, type } from '../data/tabs';
export interface AnimeKito {
	id: number;
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
	isPrivate: boolean;
	name: string;
	status: string;
	avatar: string;
	background: string;
	animeList: AnimeKito[];
}
