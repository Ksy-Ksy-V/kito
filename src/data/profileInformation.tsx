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
			description:
				'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure.',
			genres: ['Action', 'Award Winning', 'Drama', 'Suspense'],
			score: 8.55,
			rating: 'R - 17+ (violence & profanity)',
		},
		{
			id: 20,
			name: 'Naruto',
			image: 'https://cdn.myanimelist.net/images/anime/1141/142503.jpg',
			episodes: 220,
			type: 'TV',
			listName: 'Watching',
			description:
				"Moments before Naruto Uzumaki's birth, a huge demon known as the Nine-Tailed Fox attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the demon's rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto. In the present, Naruto is a hyperactive and knuckle-headed ninja growing up within Konohagakure. Shunned because of the demon inside him, Naruto struggles to find his place in the village. His one burning desire to become the Hokage and be acknowledged by the villagers who despite him. However, while his goal leads him to unbreakable bonds with lifelong friends, it also lands him in the crosshairs of many deadly foes.",
			genres: ['Action', 'Adventure', 'Fantasy'],
			score: 8,
			rating: 'PG-13 - Teens 13 or older',
		},
		{
			id: 1535,
			name: 'Death Note',
			image: 'https://cdn.myanimelist.net/images/anime/1079/138100.jpg',
			episodes: 37,
			userRating: 9,
			type: 'TV',
			listName: 'Completed',
			description:
				'Brutal murders, petty thefts, and senseless violence pollute the human world. In contrast, the realm of death gods is a humdrum, unchanging gambling den. The ingenious 17-year-old Japanese student Light Yagami and sadistic god of death Ryuk share one belief: their worlds are rotten. For his own amusement, Ryuk drops his Death Note into the human world.',
			genres: ['Supernatural', 'Suspense'],
			score: 8.62,
			rating: 'R - 17+ (violence & profanity)',
		},
		{
			id: 11757,
			name: 'Sword Art Online',
			image: 'https://cdn.myanimelist.net/images/anime/11/39717.jpg',
			userRating: 6,
			episodes: 10,
			type: 'TV',
			listName: 'On-Hold',
			description:
				"Ever since the release of the innovative NerveGear, gamers from all around the globe have been given the opportunity to experience a completely immersive virtual reality. Sword Art Online (SAO), one of the most recent games on the console, offers a gateway into the wondrous world of Aincrad, a vivid, medieval landscape where users can do anything within the limits of imagination. With the release of this worldwide sensation, gaming has never felt more lifelike. However, the idyllic fantasy rapidly becomes a brutal nightmare when SAO's creator traps thousands of players inside the game.",
			genres: ['Action', 'Adventure', 'Fantasy', 'Romance'],
			score: 7.21,
			rating: 'PG-13 - Teens 13 or older',
		},
	],
};
