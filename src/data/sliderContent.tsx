import {
	sliderPosters,
	sliderThumbnails,
} from '../images/homePageSliderImg/index';

export interface SliderItem {
	title: string;
	description: string;
	backgroundImage: string;
	thumbnailImage: string;
	mal_id: number;
}
export const sliderItems: SliderItem[] = [
	{
		title: 'One Piece',
		description:
			'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as the "One Piece.',
		backgroundImage: sliderPosters.poster1,
		thumbnailImage: sliderThumbnails.thumb1,
		mal_id: 21,
	},
	{
		title: "Frieren: Beyond Journey's End",
		description:
			'An elf and her friends defeat a demon king in a great war. But the war is over, and the elf must search for a new way of life.',
		backgroundImage: sliderPosters.poster2,
		thumbnailImage: sliderThumbnails.thumb2,
		mal_id: 52991,
	},
	{
		title: 'Cyberpunk: Edgerunners',
		description:
			'A Street Kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an Edgerunner, a Mercenary outlaw also known as a Cyberpunk.',
		backgroundImage: sliderPosters.poster3,
		thumbnailImage: sliderThumbnails.thumb3,
		mal_id: 42310,
	},
];
