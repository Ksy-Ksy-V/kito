import ProfileAvatar from '../../images/ProfileAvatar.png';
import background from '../../images/accountBackground.jpg';
import { ProfileContent } from '../models/ProfileModels';

export const profileContent: ProfileContent[] = [
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
