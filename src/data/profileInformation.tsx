import { UserAccount } from '../models/ProfileModels';

export const user: UserAccount = {
	id: 1,
	name: 'Catch Me',
	status: "Sometimes good people make bad choices. It doesn't mean they are bad people. It means they're human.",
	avatar: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
	background: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
	animeList: [
		{
			id: 16498,
			name: 'Attack on Titan',
			image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
			userRating: 10,
			episodes: 25,
			type: 'TV',
			listName: 'Completed',
		},
		{
			id: 20,
			name: 'Naruto',
			image: 'https://cdn.myanimelist.net/images/anime/1141/142503.jpg',
			episodes: 220,
			type: 'TV',
			listName: 'Watching',
		},
		{
			id: 1535,
			name: 'Death Note',
			image: 'https://cdn.myanimelist.net/images/anime/1079/138100.jpg',
			episodes: 37,
			userRating: 9,
			type: 'TV',
			listName: 'Completed',
		},
		{
			id: 11757,
			name: 'Sword Art Online',
			image: 'https://cdn.myanimelist.net/images/anime/11/39717.jpg',
			userRating: 6,
			episodes: 10,
			type: 'TV',
			listName: 'On-Hold',
		},
	],
};
