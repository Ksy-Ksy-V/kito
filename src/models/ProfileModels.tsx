import { ListName, type } from '../data/tabs';

export interface Anime {
	id: number;
	name: string;
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
	animeList: Anime[];
}
