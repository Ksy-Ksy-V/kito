import ProfileAvatar from '../../images/ProfileAvatar.png';
import background from '../../images/accountBackground.jpg';

export interface AnimeDetailsKito {
	mal_id: number;
	image: string;
	title: string;
	movie: boolean;
	episodes: number;
}

export interface ProfileContet {
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

export const profileContet: ProfileContet[] = [
	{
		userId: 1,
		name: 'Catch Me',
		status: "Sometimes good people make bad choices. It doesn't mean they are bad people. It means they're human.",
		avatar: ProfileAvatar,
		backgroundCover: background,
		userAnimeList: {
			watching: [],
			completed: [],
			onHold: [],
			dropped: [],
			planToWatch: [],
		},
	},
];
